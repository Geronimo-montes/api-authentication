import { Inject } from 'typedi';
import { Service } from 'typedi';
import { Logger } from 'winston';
import { spawn } from 'child_process';

import config from '@config';
import ServiceBase from '@models/model-base.model';
import { IUser } from '@interfaces/IUser.interface';
import { EventDispatcher } from '@decorators/eventDispatcher';
import { EArgs, IDataFace } from '@interfaces/IDataFace.interface';
import { EventDispatcherInterface } from '@decorators/eventDispatcher';
import UserError from '@errors/user.error';
import FaceIdError from '@errors/face_id.error';
import ServerError from '@errors/server.error';

/**
 * 
 */
@Service()
export default class RecogniceFaceService extends ServiceBase {
  constructor(
    @Inject('logger') private Log: Logger,
    @Inject('dataFaceModel') private DataFaceModel: Models.DataFaceModel,
    @Inject('userModel') private UserModel: Models.UserModel,
    @EventDispatcher() private event: EventDispatcherInterface,
  ) {
    super();
  }

  /**
   * Agrega los datos biometricos de un usuario al modelo FaceId
   * @param {string} _id
   * @param {any} files
   * @returns {Promise<{ data: IDataFace, msg: string }>}
   */
  public async AddFaceToModel(_id, files): Promise<{ data: IDataFace, msg: string }> {
    const
      msg = `Face Id registrado.`;

    this.Log.debug('🔍🚦⚠️  Recognice Face: Find User Data  🚦⚠️🔍');
    return this.UserModel.findOne({ _id })
      .then((user: IUser) => {
        if (!user)
          throw new UserError('USER_NOT_FOUND');

        const
          { name, email } = user,
          number_files = files.length;

        this.Log.debug('🔍🚦⚠️  Recognice Face: Create Row In Mongosee  🚦⚠️🔍');
        return this.DataFaceModel.create({ name, email, number_files });
      })
      .then((face_id) => {
        this.Log.debug('🔍🚦⚠️  Recognice Face: Exec Script  🚦⚠️🔍');
        return this.executeScript([EArgs.ADDG, EArgs.NAME, face_id.name], face_id);
      })
      .then(({ face_id }) => {
        this.Log.debug('🔍🚦⚠️  Recognice Face: ${{ user, token, msg }}  🚦⚠️🔍');
        return Promise.resolve({ data: face_id, msg });
      })
      .catch((err) => {
        this.Log.error(`❗⚠️ 🔥👽  Recognice Face: ${err}  👽🔥 ⚠️❗`);
        // ERRORs MONGO DB
        if (err.code == "11000")
          throw new FaceIdError('FACE_DATA_DUPLICATE');
        // ERROR SIN IDENTIFICAR
        else
          throw err;
      });
  }

  /**
   * Metodo de autenticacion Face-id
   * @returns {Promise<{ user: IUser, token: string, msg: string }>}
   */
  public async SignIn(): Promise<{ user: IUser, token: string, msg: string }> {
    const
      msg = `Inicio de Sesión Exitoso`,
      args = [EArgs.RECOGNIZEG];


    this.Log.debug('🔍🚦⚠️  Recognice Face: Exec Script  🚦⚠️🔍');
    return this.executeScript(args)
      .then(({ data }) => {
        if (data == 'unknown')
          throw new FaceIdError('FACE_NOT_FOUND');

        this.Log.debug('🔍🚦⚠️  Recognice Face: Find Data User  🚦⚠️🔍');
        return this.UserModel.findOne({ name: data })
      })
      .then((user) => {
        if (!user)
          throw new UserError('USER_NOT_FOUND');

        const { _id, role, name, email } = user;
        this.Log.debug('🔍🚦⚠️  Recognice Face: Generating JWT  🚦⚠️🔍');
        return this.generateToken({ _id, role, name, email });
      })
      .then(({ user, token }) => {
        this.Log.debug('🔍🚦⚠️  Recognice Face: ${{ user, token, msg }}  🚦⚠️🔍');
        return Promise.resolve({ user, token, msg });
      })
      .catch((err) => {
        this.Log.error(`❗⚠️ 🔥👽  Recognice Face: ${err}  👽🔥 ⚠️❗`);
        throw err;
      });
  }

  private async executeScript(args: string[], face_id?): Promise<any> {
    const
      cmd = spawn(config.PYTHON.EXE, [config.PYTHON.MODEL, ...args]);

    return new Promise((resolve, reject) => {
      var _data = null;

      cmd
        .on('error', (err) => {
          this.Log.error(`❗⚠️ 🔥👽  OnErr: ${err.name}: { ${err.message} }  👽🔥 ⚠️❗`);
          reject(new ServerError('FAIL_EXECUTE_SCRIPT'));
        })
        .on('exit', (code) => {
          this.Log.info(`⚠️🌐 🌐💻  Exited With Code: ${code}  💻🌐 🌐⚠️`);
          resolve({ data: _data, face_id });
        })
        .stdout
        .on('data', (data) => {
          this.Log.debug(`🔍🔍 🚦⚠️  Data: ${data}  🚦⚠️ 🔍🔍`);
          _data = data.toString();
        })
        .on('error', (err) => {
          this.Log.error(`❗⚠️ 🔥👽  ${err.name}: { ${err.message} }  👽🔥 ⚠️❗`);
          reject(new ServerError('FAIL_EXECUTE_SCRIPT'));
        })
    });
  }

}