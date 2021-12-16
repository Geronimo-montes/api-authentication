import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { Logger } from 'winston';
import { randomBytes } from 'crypto';
import { Service, Inject } from 'typedi';

import config from '@config';
import events from '@subscribers/events.subscriber';

import { EventDispatcher } from '@decorators/eventDispatcher';
import { EventDispatcherInterface } from '@decorators/eventDispatcher';
import { ERol } from '@interfaces/IRol.interface';


/**
 * 
 */
@Service()
export default class AuthService {

  constructor(
    @Inject('logger') private Log: Logger,
    @Inject('userModel') private UserModel: Models.UserModel,
    @EventDispatcher() private event: EventDispatcherInterface,
  ) { }

  /**
   * Metodo para regisrar un usuario administrador en el sistema.
   * 
   * @param {} userInputDTO Datos de usuarios a registrar.
   * @returns {} Data del usuario registrado
   */
  public async SignUpAdmin({ name, email, password }): Promise<any> {
    try {

      this.Log.debug('🔍🔍 🚦⚠️  Hashing password  🚦⚠️ 🔍🔍');
      const _s = randomBytes(32);
      const hash = await argon2.hash(password, { salt: _s });
      this.Log.debug('🔍🔍 🚦⚠️  Creating user db record  🚦⚠️ 🔍🔍');
      const userRow = await this.UserModel
        .create({
          name: name,
          email: email,
          password: hash,
          salt: _s.toString('hex'),
          role: ERol.ADMIN,
        });

      this.Log.debug('🔍🔍 🚦⚠️  Generating JWT  🚦⚠️ 🔍🔍');
      const { user, token } = this.generateToken(userRow);

      this.Log.debug('🔍🔍 🚦⚠️  Generating JWT  🚦⚠️ 🔍🔍');
      this.event.dispatch(events.user.signUp, { user: user });
      return Promise.resolve({ user, token });

    } catch (err) {
      this.Log.error(`❗⚠️ 🔥👽  Error: ${err}  👽🔥 ⚠️❗`);
      throw new Error(err);
    }
  }

  /**
   * Metodo para regisrar un usuario  en el sistema.
   * 
   * @param {} userInputDTO Datos de usuarios a registrar.
   * @returns {} Data del usuario registrado
   */
  public async SignUp({ name, email, password }): Promise<any> {
    try {

      this.Log.debug('🔍🔍 🚦⚠️  Hashing password  🚦⚠️ 🔍🔍');
      const _s = randomBytes(32);
      const hash = await argon2.hash(password, { salt: _s });

      this.Log.debug('🔍🔍 🚦⚠️  Creating user db record  🚦⚠️ 🔍🔍');
      const userRow = await this.UserModel
        .create({ name, email, password: hash, salt: _s.toString('hex') });

      this.Log.debug('🔍🔍 🚦⚠️  Generating JWT  🚦⚠️ 🔍🔍');
      const { user, token } = this.generateToken(userRow);

      this.Log.debug('🔍🔍 🚦⚠️  Generating JWT  🚦⚠️ 🔍🔍');
      this.event.dispatch(events.user.signUp, { user: user });
      return Promise.resolve({ user, token });

    } catch (err) {
      this.Log.error(`❗⚠️ 🔥👽  Error: ${err}  👽🔥 ⚠️❗`);
      throw new Error(err);
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
      const userRecord = await this.UserModel.findOne({ email });

      if (!userRecord)
        throw new Error('Usuario no registrado');

      this.Log.debug('🔍🔍 🚦⚠️  Checking password  🚦⚠️ 🔍🔍');
      const isAuthenticate = await argon2.verify(userRecord.password, password)

      if (!isAuthenticate)
        throw new Error('Contraseña Invalida');

      this.Log.debug('🔍🔍 🚦⚠️  Generating JWT  🚦⚠️ 🔍🔍');
      const { user, token } = this.generateToken(userRecord);

      // this.event.dispatch(events.user.signIn, { user: user });

      this.Log.debug('🔍🔍 🚦⚠️  Password is valid!  🚦⚠️ 🔍🔍');
      return Promise.resolve({ user, token });
    } catch (err) {
      this.Log.error(`❗⚠️ 🔥👽  Error: ${err}  👽🔥 ⚠️❗`);
      throw err;
    }
  }

  /**
 * Autentica las credenciales del usuario y gnenera un token de acceso.
 * 
 * @param {string} email
 * @param {string} password
 * @returns 
 */
  public async GetUser(name: string): Promise<Models.User> {
    try {
      const userRecord = await this.UserModel.findOne({ name });

      if (!userRecord)
        throw new Error('Usuario no registrado');

      this.Log.debug('🔍🔍 🚦⚠️  Password is valid!  🚦⚠️ 🔍🔍');
      return Promise.resolve(userRecord);
    } catch (err) {
      this.Log.error(`❗⚠️ 🔥👽  Error: ${err}  👽🔥 ⚠️❗`);
      throw err;
    }
  }

  /**
   * Genera el token de acceso con duracion de 1 hora.
   * @param {IUserInputDTO} user Datos de usuarios a registrar.
   * @returns {Promise<INewUser>} Usuario y token de acceso
   */
  private generateToken({ _id, role, name, email, password, salt }: Models.User) {
    this.Log.debug(`🔍🔍 🚦⚠️  Sign JWT for userId: ${_id}  🚦⚠️ 🔍🔍`);
    return {
      user: { _id, role, name, email },
      token: jwt.sign(
        { _id, role, name, email },
        config.JWT.SECRET,
        // { expiresIn: 86400 }, //24 horas
        { expiresIn: 3153600 },   //1 año
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
