import argon2 from 'argon2';
import { Logger } from 'winston';
import { randomBytes } from 'crypto';
import { Inject } from 'typedi';
// 
import ServiceBase from '@models/model-base.model';
// 
import { ERol } from '@interfaces/IRol.interface';
import { IUser } from '@interfaces/IUser.interface';
// 
import { EventDispatcher } from '@decorators/eventDispatcher';
import { EventDispatcherInterface } from '@decorators/eventDispatcher';
import UserError from '@errors/user.error';
import AuthenticateError from '@errors/auth.error';
// 

/**
 * Servicio para gestionar las peticiones de autenticación
 * @extends ServiceBase
 */
export default class AuthService extends ServiceBase {

  /**
   * Injecta las dependencias Logger, UserModel y el disparador de eventos.
   * @param {Logger} Log - Instancia del objeto que maneja el archivo log.
   * @param {EventDispatcherInterface} event - Disparador de eventos.
   * @param {Models.UserModel} UserModel - Modelo de datos de MongoDB
   */
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
   * @param {IUser} User Datos de usuarios a registrar.
   * @param {Erol} rol rol del usuario.
   * @returns {Promise<{ user: IUser, token: string, msg: string }>} Data del usuario registrado, token de acceso y mensaje del estadp del servidor
   * 
   * @throws {UserError} 'USER_PUPLICATE'
   */
  public async SignUp(
    { name, email, password, role }, _id_admin?
  ): Promise<{ user: IUser, token: string, msg: string }> {
    const
      msg = `Usuario ${email} Registrado`,
      _salt = randomBytes(32),
      salt = _salt.toString('hex');

    this.Log.debug(`🔍🚦⚠️  AuthService: Hashing password  🚦⚠️🔍`);
    return argon2.hash(password, { salt: _salt })
      .then((password) => {
        this.Log.debug(`🔍🚦⚠️  AuthService: Creating user db record  🚦⚠️🔍`);
        return this.UserModel.create({ _id_admin, name, email, password, salt, role });
      })
      .then((userRow) => {
        this.Log.debug(`🔍🚦⚠️  AuthService: Generating JWT  🚦⚠️🔍`);
        return this.generateToken(userRow);
      })
      .then(({ user, token }) => {
        this.Log.debug(`🔍🚦⚠️  AuthService: ${JSON.stringify({ user, token, msg })}  🚦⚠️🔍`);
        return Promise.resolve({ user, token, msg });
      })
      .catch((err) => {
        // ERRORs MONGO DB
        if (err.code == "11000")
          throw new UserError('USER_DUPLICATE');
        // ERROR SIN IDENTIFICAR
        else
          throw err;
      });
  }

  /**
   * Autentica las credenciales del usuario y gnenera un token de acceso.
   *
   * @param {string} email - Correo electronico del usuario a autenticar
   * @param {string} password - Contraseña 
   * @returns {Promise<{ user: IUser, token: string, msg: string }>} - Data del usuario, el token de acceso y mensaje del estado de la solicitud.
   * 
   * @throws {UserError} - 'USER_NOT_FOUNT'
   * @throws {AuthError} - 'INVALID_PASSWORD'
   */
  public async SignIn(
    email: string, password: string
  ): Promise<{ user: IUser, token: string, msg: string }> {

    const
      msg = `Inicio de Sesión Exitoso`;

    return this.UserModel.findOne({ email })
      .then(async (userRecord) => {
        if (!userRecord)
          throw new UserError('USER_NOT_FOUND');

        this.Log.debug(`🔍🚦⚠️  AuthService: Checking password  🚦⚠️🔍`);
        const isAuthenticate = await argon2.verify(userRecord.password, password);

        if (!isAuthenticate)
          throw new AuthenticateError('INVALID_PASSWORD');

        this.Log.debug(`🔍🚦⚠️  AuthService: Generating JWT  🚦⚠️🔍`);
        return this.generateToken(userRecord);
      })
      .then(({ user, token }) => {
        this.Log.debug(`🔍🚦⚠️  AuthService: ${JSON.stringify({ user, token, msg })}  🚦⚠️🔍`);
        return Promise.resolve({ user, token, msg });
      })
      .catch((err) => {
        this.Log.error(`❗⚠️ 🔥👽  AuthService: ${err}  👽🔥 ⚠️❗`);
        throw err;
      });
  }
}
