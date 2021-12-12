import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { Logger } from 'winston';
import { randomBytes } from 'crypto';
import { Service, Inject } from 'typedi';

import config from '@config';
import events from '@subscribers/events.subscriber';
import { EventDispatcher } from '@decorators/eventDispatcher';
import { EventDispatcherInterface } from '@decorators/eventDispatcher';
import { IUser, IUserInputDTO } from '@interfaces/IUser.interface';

@Service()
export default class AuthService {

  constructor(
    @Inject('logger') private logger: Logger,
    @Inject('userModel') private Model: Models.UserModel,
    @EventDispatcher() private event: EventDispatcherInterface,
  ) { }

  /**
   * Metodo para regisrar un usuario en el sistema.
   * 
   * @param {IUserInputDTO} userInputDTO Datos de usuarios a registrar.
   * @returns {Promise<INewUser>} Data del usuario registrado
   */
  public async SignUp(userInputDTO: IUserInputDTO): Promise<any> {
    try {

      this.logger.silly('Hashing password');
      const _s = randomBytes(32);
      const hash = await argon2.hash(userInputDTO.password, { salt: _s });
      console.log({ hash })

      this.logger.silly('Creating user db record');
      const userRow = await this.Model
        .create({ ...userInputDTO, salt: _s.toString('hex'), hash });
      console.log({ userRow })

      this.logger.silly('Generating JWT');
      const { user, token } = this.generateToken(userRow);
      console.log({ user, token })

      this.event.dispatch(events.user.signUp, { user: user });
      return Promise.resolve({ user, token });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  /**
   * Autentica las credenciales del usuario y gnenera un token de acceso.
   * 
   * @param {string} email
   * @param {string} password
   * @returns 
   */
  public async SignIn(email: string, password: string): Promise<any> {
    try {
      const userRecord = await this.Model.findOne({ email });

      if (!userRecord)
        throw new Error('Usuario no registrado');

      this.logger.silly('Checking password');
      const isAuthenticate = argon2.verify(userRecord.password, password);

      if (!isAuthenticate)
        throw (new Error('Contraseña Invalida'));

      this.logger.silly('Generating JWT');
      const { user, token } = this.generateToken(userRecord);

      // this.event.dispatch(events.user.signIn, { user: user });

      this.logger.silly('Password is valid!');
      return Promise.resolve({ user, token });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  /**
   * Genera el token de acceso con duracion de 1 hora.
   * @param {IUserInputDTO} user Datos de usuarios a registrar.
   * @returns {Promise<INewUser>} Usuario y token de acceso
   */
  private generateToken({ _id, role, name, email, password, salt }: IUser) {
    const
      exp = new Date(new Date().getDate() + 60).getTime() / 1000,
      user = { _id, role, name, email };

    this.logger.silly(`Sign JWT for userId: ${_id}`);
    return { user, token: jwt.sign({ ...user, exp }, config.JWT.SECRET) };
  }
}
