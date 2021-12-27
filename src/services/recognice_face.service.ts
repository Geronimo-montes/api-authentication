import { Inject } from 'typedi';
import { Service } from 'typedi';
import { Logger } from 'winston';
import { spawn } from 'child_process';

import config from '@config';


import { EventDispatcher } from '@decorators/eventDispatcher';
import { EventDispatcherInterface } from '@decorators/eventDispatcher';
import { IDataFace } from '@interfaces/models/IDataFace.interface';
import ServiceBase from '@models/model-base.model';
import { IUser } from '@interfaces/models/IUser.interface';


/**
 * 
 */
@Service()
export default class RecogniceFaceService extends ServiceBase {
  constructor(
    @Inject('logger') private Log: Logger,
    @Inject('dataFaceModel') private DataFaceModel: Models.DataFaceModel,
    @EventDispatcher() private event: EventDispatcherInterface,
  ) {
    super();
  }

  /**
   * 
   * @param <Object>{name, email, files} 
   * @returns 
   */
  public async AddFaceToModel({ name, email }, files): Promise<IDataFace> {
    try {
      this.Log.debug('🔍🔍 🚦⚠️  Create Row In Mongosee  🚦⚠️ 🔍🔍');
      const face_id = await this.DataFaceModel
        .create({ name, email, number_files: files.length });

      this.Log.debug('🔍🔍 🚦⚠️  Execute File Python  🚦⚠️ 🔍🔍');
      const python = spawn(
        config.PYTHON.EXE,
        [
          config.PYTHON.MODEL,
          '--add_galery',
          '-n',
          name
        ]);

      return new Promise((resolve, reject) => {
        python
          .on('exit', (code) => {
            const msg = `Child Process Exited With Code: ${code}`;
            this.Log.debug(`🔍🔍 🚦⚠️  ${msg}  🚦⚠️ 🔍🔍`);
            resolve(face_id);
          })
          .stdout
          .on('error', (err) => {
            this.Log.error(`❗⚠️ 🔥👽  Child Process: "Error": { ${err} }  👽🔥 ⚠️❗`);
            throw err;
          })
          .on('data', (data) => {
            this.Log.debug(`🔍🔍 🚦⚠️  Child Process: ${data}  🚦⚠️ 🔍🔍`);
          });
      })
    } catch (err) {
      this.Log.error(`❗⚠️ 🔥👽  Error: ${err}  👽🔥 ⚠️❗`);
      throw new Error(err);
    }
  }

  public async RecognizeFaceFromGalery(): Promise<any> {
    try {
      this.Log.debug('🔍🔍 🚦⚠️  Execute File Python  🚦⚠️ 🔍🔍');
      const python = spawn(config.PYTHON.EXE, [config.PYTHON.MODEL, '--recognize_galery']);

      return new Promise((resolve, reject) => {
        var _data = null;

        python
          .on('exit', (code) => {
            this.Log.debug(`🔍🔍 🚦⚠️  Child Process Exited With Code: ${code}  🚦⚠️ 🔍🔍`);
            resolve(_data);
          })
          .stdout
          .on('data', (data) => {
            this.Log.debug(`🔍🔍 🚦⚠️  Child Process: ${data}  🚦⚠️ 🔍🔍`);
            _data = data.toString()
          })
          .on('error', (err) => {
            this.Log.error(`❗⚠️ 🔥👽  Child Process: "Error": { ${err} }  👽🔥 ⚠️❗`);
            throw err;
          })
      })
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
  public async SignIn({ _id, role, name, email }: IUser): Promise<any> {
    try {
      this.Log.debug('🔍🔍 🚦⚠️  AuthService: Generating JWT  🚦⚠️ 🔍🔍');
      const { user, token } = this.generateToken({ _id, role, name, email });

      this.Log.debug('🔍🔍 🚦⚠️  AuthService: Password is valid!  🚦⚠️ 🔍🔍');
      return Promise.resolve({ user, token });
    } catch (err) {
      this.Log.error(`❗⚠️ 🔥👽  AuthService: Error: ${err}  👽🔥 ⚠️❗`);
      throw err;
    }
  }
}