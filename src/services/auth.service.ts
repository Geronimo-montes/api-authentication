import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { Logger } from 'winston';
import { randomBytes } from 'crypto';
import { Service, Inject } from 'typedi';

import config from '@config';
import events from '@subscribers/events.subscriber';

import { EventDispatcher } from '@decorators/eventDispatcher';
import { EventDispatcherInterface } from '@decorators/eventDispatcher';
import { IUser } from '@interfaces/models/IUser.interface';
import { ERol } from '@interfaces/models/IRol.interface';
import ServiceBase from '@models/model-base.model';


/**
 * 
 */
export default class AuthService extends ServiceBase {

  constructor(
    @Inject('logger') private Log: Logger,
    @EventDispatcher() private event: EventDispatcherInterface,
    @Inject('userModel') private UserModel: Models.UserModel,
  ) {
    super();
  }

  /**
   * Metodo para regisrar un usuario administrador en el sistema.
   * 
   * @param {} userInputDTO Datos de usuarios a registrar.
   * @returns {} Data del usuario registrado
   */
  public async SignUpAdmin(
    { name, email, password }
  ): Promise<{ user: IUser, token: string }> {
    try {

      this.Log.debug('🔍🔍 🚦⚠️  AuthService: Hashing password  🚦⚠️ 🔍🔍');
      const salt = randomBytes(32);
      const hash = await argon2.hash(password, { salt });

      this.Log.debug('🔍🔍 🚦⚠️  AuthService: Creating user db record  🚦⚠️ 🔍🔍');
      const userRow = await this.UserModel
        .create({
          name: name,
          email: email,
          password: hash,
          salt: salt.toString('hex'),
          role: ERol.ADMIN,
        });

      this.Log.debug('🔍🔍 🚦⚠️  AuthService: Generating JWT  🚦⚠️ 🔍🔍');
      const { user, token } = this.generateToken(userRow);

      this.Log.debug('🔍🔍 🚦⚠️  AuthService: Generating JWT  🚦⚠️ 🔍🔍');
      this.event.dispatch(events.user.signUp, { user: user });
      return Promise.resolve({ user, token });

    } catch (err) {
      this.Log.error(`❗⚠️ 🔥👽  AuthService: Error: ${err}  👽🔥 ⚠️❗`);
      throw err;
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

      this.Log.debug('🔍🔍 🚦⚠️  AuthService: Hashing password  🚦⚠️ 🔍🔍');
      const _s = randomBytes(32);
      const hash = await argon2.hash(password, { salt: _s });

      this.Log.debug('🔍🔍 🚦⚠️  AuthService: Creating user db record  🚦⚠️ 🔍🔍');
      const userRow = await this.UserModel
        .create({ name, email, password: hash, salt: _s.toString('hex') });

      this.Log.debug('🔍🔍 🚦⚠️  AuthService: Generating JWT  🚦⚠️ 🔍🔍');
      const { user, token } = this.generateToken(userRow);

      this.Log.debug('🔍🔍 🚦⚠️  AuthService: Generating JWT  🚦⚠️ 🔍🔍');
      this.event.dispatch(events.user.signUp, { user: user });
      return Promise.resolve({ user, token });

    } catch (err) {
      this.Log.error(`❗⚠️ 🔥👽  AuthService: Error: ${err}  👽🔥 ⚠️❗`);
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
  public async SignIn(email: string, password: string): Promise<any> {
    try {
      const userRecord = await this.UserModel.findOne({ email });

      if (!userRecord)
        throw new Error('Usuario no registrado');

      this.Log.debug('🔍🔍 🚦⚠️  AuthService: Checking password  🚦⚠️ 🔍🔍');
      const isAuthenticate = await argon2.verify(userRecord.password, password)

      if (!isAuthenticate)
        // TODO: Add PasswordNotValidError
        throw new Error('Contraseña Invalida');

      this.Log.debug('🔍🔍 🚦⚠️  AuthService: Generating JWT  🚦⚠️ 🔍🔍');
      const { user, token } = this.generateToken(userRecord);

      // TODO: Agregar eventos autodisparables
      // this.event.dispatch(events.user.signIn, { user: user });

      this.Log.debug('🔍🔍 🚦⚠️  AuthService: Password is valid!  🚦⚠️ 🔍🔍');
      return Promise.resolve({ user, token });
    } catch (err) {
      this.Log.error(`❗⚠️ 🔥👽  AuthService: Error: ${err}  👽🔥 ⚠️❗`);
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
  public async GetUser(
    user: { _id?: string, name?: string, email?: string }
  ): Promise<IUser> {
    // public async GetUser(name: string): Promise<IUser> {
    try {
      const userRecord = await this.UserModel.findOne(user);
      this.Log.debug('🔍🔍 🚦⚠️  AuthService: Password is valid!  🚦⚠️ 🔍🔍');

      return Promise.resolve(userRecord);
    } catch (err) {
      this.Log.error(`❗⚠️ 🔥👽  AuthService: Error: ${err}  👽🔥 ⚠️❗`);
      throw err;
    }
  }
}

/**
 * 
 *     { usuario: usuario },
    config.jwtSecret,
 * 
 */
