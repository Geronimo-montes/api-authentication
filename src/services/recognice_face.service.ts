import { Inject } from 'typedi';
import { Service } from 'typedi';
import { Logger } from 'winston';
import { spawn } from 'child_process';

import config from '@config';


import { EventDispatcher } from '@decorators/eventDispatcher';
import { EventDispatcherInterface } from '@decorators/eventDispatcher';
import { EArgs, IDataFace } from '@interfaces/models/IDataFace.interface';
import ServiceBase from '@models/model-base.model';
import { IUser } from '@interfaces/models/IUser.interface';
import { ExecuteScriptError, FaceNotFoundError, UserNotFoundError } from '@interfaces/models/models-errors.iterface';


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
   * 
   * @param <Object>{name, email, files} 
   * @returns 
   */
  public async AddFaceToModel(
    _id, files
  ): Promise<{ data: IDataFace, msg: string }> {
    const
      msg = `Face Id registrado.`;


    this.Log.debug('🔍🚦⚠️  Recognice Face: Find User Data  🚦⚠️🔍');
    return this.UserModel.findOne({ _id })
      .then((user: IUser) => {
        if (!user)
          throw new UserNotFoundError('Usuario no Registrado');

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
      .then(({ face_id }) =>
        Promise.resolve({ data: face_id, msg }))
      .catch((err) => {
        this.Log.error(`❗⚠️ 🔥👽  Recognice Face: Error: ${err}  👽🔥 ⚠️❗`);
        throw err;
      });
  }

  /**
   * 
   * Metodo de autenticacion Face-id
   * 
   * @returns 
   */
  public async SignIn(): Promise<{ user: IUser, token: string, msg: string }> {
    const
      msg = `Inicio de Sesión Exitoso`,
      args = [EArgs.RECOGNIZEG];


    this.Log.debug('🔍🚦⚠️  Recognice Face: Exec Script  🚦⚠️🔍');
    return this.executeScript(args).
      then(({ data }) => {
        if (data == 'unknown')
          throw new FaceNotFoundError('Face Not Recongized');

        this.Log.debug('🔍🚦⚠️  Recognice Face: Find Data User  🚦⚠️🔍');
        return this.UserModel.findOne({ name: data })
      })
      .then((user) => {
        if (!user)
          throw new UserNotFoundError('Usuario no Registrado');

        const { _id, role, name, email } = user;
        this.Log.debug('🔍🚦⚠️  Recognice Face: Generating JWT  🚦⚠️🔍');
        return this.generateToken({ _id, role, name, email });
      })
      .then(({ user, token }) => {
        this.Log.debug('🔍🚦⚠️  Recognice Face: ${{ user, token, msg }}  🚦⚠️🔍');
        // this.event.dispatch(events.user.signIn, { user: user });
        return Promise.resolve({ user, token, msg });
      })
      .catch((err) => {
        this.Log.error(`❗⚠️ 🔥👽  Recognice Face: Error: ${err}  👽🔥 ⚠️❗`);
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
          this.Log.error(`❗⚠️ 🔥👽  ONError: ${err.name}: { ${err.message} }  👽🔥 ⚠️❗`);
          reject(new ExecuteScriptError(err.message, err.name));
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
          reject(new ExecuteScriptError(err.message, err.name));
        })
    });
  }

}