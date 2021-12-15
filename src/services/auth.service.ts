import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { Logger } from 'winston';
import { randomBytes } from 'crypto';
import { Service, Inject } from 'typedi';

import config from '@config';
import events from '@subscribers/events.subscriber';

import { EventDispatcher } from '@decorators/eventDispatcher';
import { EventDispatcherInterface } from '@decorators/eventDispatcher';

import { IUser } from '@interfaces/IUser.interface';

@Service()
export default class AuthService {

  constructor(
    @Inject('logger') private Log: Logger,
    @Inject('userModel') private Model: Models.UserModel,
    @EventDispatcher() private event: EventDispatcherInterface,
  ) { }

  /**
   * Metodo para regisrar un usuario administrador en el sistema.
   * 
   * @param {IUserInputDTO} userInputDTO Datos de usuarios a registrar.
   * @returns {Promise<INewUser>} Data del usuario registrado
   */
  public async SignUp({ name, email, password }): Promise<any> {
    try {

      this.Log.debug('Hashing password');
      const _s = randomBytes(32);
      const hash = await argon2.hash(password, { salt: _s });

      this.Log.debug('Creating user db record');
      const userRow = await this.Model
        .create({ name, email, password: hash, salt: _s.toString('hex') });
      console.log({ userRow })

      this.Log.debug('Generating JWT');
      const { user, token } = this.generateToken(userRow);
      console.log({ user, token })

      this.event.dispatch(events.user.signUp, { user: user });
      return Promise.resolve({ user, token });
    } catch (err) {
      this.Log.error('🔥🔥 error: %o 🔥🔥', err)
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
        Promise.reject(new Error('Usuario no registrado'));

      this.Log.debug('Checking password');
      const isAuthenticate = await argon2.verify(userRecord.password, password)

      if (!isAuthenticate)
        Promise.reject(new Error('Contraseña Invalida'));

      this.Log.debug('🚦⚠️ Generating JWT ⚠️🚦');
      const { user, token } = this.generateToken(userRecord);

      // this.event.dispatch(events.user.signIn, { user: user });

      this.Log.debug('Password is valid!');
      return Promise.resolve({ user, token });
    } catch (err) {
      this.Log.error('🔥🔥 error: %o 🔥🔥', err)
      throw err;
    }
  }

  /**
   * Genera el token de acceso con duracion de 1 hora.
   * @param {IUserInputDTO} user Datos de usuarios a registrar.
   * @returns {Promise<INewUser>} Usuario y token de acceso
   */
  private generateToken({ _id, role, name, email, password, salt }: IUser) {
    this.Log.debug(`🚦⚠️ Sign JWT for userId: ${_id} ⚠️🚦`);
    return {
      user: { _id, role, name, email },
      token: jwt.sign(
        { _id, role, name, email },
        config.JWT.SECRET,
        { expiresIn: 86400 }, //24 horas
      )
    };
  }
}

/**
 * 
 *     { usuario: usuario },
    config.jwtSecret,
 * 
 */
