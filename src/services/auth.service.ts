import argon2 from 'argon2';
import { Logger } from 'winston';
import { randomBytes } from 'crypto';
import { Inject } from 'typedi';

import ServiceBase from '@models/model-base.model';
import { ERol } from '@interfaces/models/IRol.interface';
import { IUser } from '@interfaces/models/IUser.interface';
import { EventDispatcher } from '@decorators/eventDispatcher';
import { EventDispatcherInterface } from '@decorators/eventDispatcher';
import { AuthenticateError, UserNotFoundError } from '@interfaces/models/models-errors.iterface';


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
  public async SignUp(
    { name, email, password }, role: ERol
  ): Promise<{ user: IUser, token: string, msg: string }> {
    const
      msg = `Usuario ${email} Registrado`,
      _salt = randomBytes(32),
      salt = _salt.toString('hex');

    this.Log.debug('🔍🚦⚠️  AuthService: Hashing password  🚦⚠️🔍');
    return argon2.hash(password, { salt: _salt })
      .then((password) => {
        this.Log.debug('🔍🚦⚠️  AuthService: Creating user db record  🚦⚠️🔍');
        return this.UserModel.create({ name, email, password, salt, role });
      })
      .then((userRow) => {
        this.Log.debug('🔍🚦⚠️  AuthService: Generating JWT  🚦⚠️🔍');
        return this.generateToken(userRow);
      })
      .then(({ user, token }) => {
        this.Log.debug('🔍🚦⚠️  AuthService: ${{ user, token, msg }}  🚦⚠️🔍');
        // this.event.dispatch(events.user.signUp, { user });
        return Promise.resolve({ user, token, msg });
      })
      .catch((err) => {
        this.Log.error(`❗⚠️ 🔥👽  AuthService: Error: ${err}  👽🔥 ⚠️❗`);
        throw err;
      });
  }

  /**
   * Autentica las credenciales del usuario y gnenera un token de acceso.
   * 
   * @param {string} email
   * @param {string} password
   * @returns 
   * TODO: Add PasswordNotValidError, 
   */
  public async SignIn(
    email: string, password: string
  ): Promise<{ user: IUser, token: string, msg: string }> {

    const
      msg = `Inicio de Sesión Exitoso`;

    return this.UserModel.findOne({ email })
      .then(async (userRecord) => {
        if (!userRecord)
          throw new UserNotFoundError('Usuario no registrado');

        this.Log.debug('🔍🚦⚠️  AuthService: Checking password  🚦⚠️🔍');
        const isAuthenticate = await argon2.verify(userRecord.password, password);

        if (!isAuthenticate)
          throw new AuthenticateError('Contraseña Invalida');

        this.Log.debug('🔍🚦⚠️  AuthService: Generating JWT  🚦⚠️🔍');
        return this.generateToken(userRecord);
      })
      .then(({ user, token }) => {
        this.Log.debug('🔍🚦⚠️  AuthService: ${{ user, token, msg }}  🚦⚠️🔍');
        // this.event.dispatch(events.user.signIn, { user: user });
        return Promise.resolve({ user, token, msg });
      })
      .catch((err) => {
        this.Log.error(`❗⚠️ 🔥👽  AuthService: Error: ${err}  👽🔥 ⚠️❗`);
        throw err;
      });
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
      this.Log.debug('🔍🚦⚠️  AuthService: Password is valid!  🚦⚠️🔍');

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
