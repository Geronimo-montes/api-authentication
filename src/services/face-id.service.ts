import { Inject } from 'typedi';
import { Service } from 'typedi';
import { Logger } from 'winston';
import { spawn } from 'child_process';

import config from '@config';
import ServiceBase from '@models/model-base.model';
import { IUser } from '@interfaces/IUser.interface';
import { EventDispatcher } from '@decorators/eventDispatcher';
import { EArgs, IFaceId } from '@interfaces/IFaceId.interface';
import { EventDispatcherInterface } from '@decorators/eventDispatcher';
import UserError from '@errors/user.error';
import FaceIdError from '@errors/face_id.error';
import ServerError from '@errors/server.error';

/**
 * 
 */
@Service()
export default class FaceIdService extends ServiceBase {
  constructor(
    @Inject('logger') private Log: Logger,
    @Inject('faceIdModel') private FaceIdModel: Models.FaceIdModel,
    @Inject('userModel') private UserModel: Models.UserModel,
    @EventDispatcher() private event: EventDispatcherInterface,
  ) {
    super();
  }

  /**
   * Agrega los datos biometricos de un usuario al modelo FaceId
   * @param {string} _id
   * @param {any} files
   * @returns {Promise<{ data: IFaceId, msg: string }>}
   */
  public async Add(_id: string, files: any, direct_to_db: boolean = false):
    Promise<{ data: any, msg: string }> {
    const
      msg = `Face Id registrado.`,
      number_files = files.length,
      args = (direct_to_db)
        ? [EArgs.ADDG_DB, EArgs.NAME, _id]
        : [EArgs.ADDG, EArgs.NAME, _id];

    this.Log.debug(`🔍🚦⚠️  Recognice Face: Valid Exists User  🚦⚠️🔍`);
    return this.UserModel
      .exists({ _id })
      .then((exists: boolean) => {
        if (!exists)
          throw new UserError('USER_NOT_FOUND');

        this.Log.debug(`🔍🚦⚠️  Recognice Face: Valid Exists Face Id  🚦⚠️🔍`);
        return this.FaceIdModel
          .exists({ _id_user: _id });
      })
      .then((exists: boolean) => {
        if (exists)
          throw new FaceIdError('FACE_DATA_DUPLICATE');

        this.Log.debug(`🔍🚦⚠️  Recognice Face: Exec Script  🚦⚠️🔍`);
        return this.executeScript(args);
      })
      .then((face_id) => {
        this.Log.debug(`🔍🚦⚠️  Recognice Face: Create Row In Mongosee  🚦⚠️🔍`);
        return this.FaceIdModel
          .create({ _id_user: _id, number_files });
      })
      .then((face_id: IFaceId) => {
        const
          query = { _id: face_id._id_user },
          update = { $set: { _id_face_id: face_id._id } },
          options = { upsert: true };

        this.Log.debug(`🔍🚦⚠️  Recognice Face: Update UserModel Add FaceId  🚦⚠️🔍`);
        return this.UserModel
          .updateOne(query, update, options);
      })
      .then(({ modifiedCount }) => {
        if (modifiedCount < 1)
          throw new UserError('USER_DATA_NOT_UPDATE');

        return this.UserModel
          .findOne({ _id });
      })
      .then((userRecord) => {
        this.Log.debug(`🔍🚦⚠️  User: Find Data Face_Id  🚦⚠️🔍`);
        return this.FaceIdModel
          .populate(
            userRecord,
            {
              path: "_id_face_id",
              select: {
                '_id': 1,
                'number_files': 1,
              },
            }
          );
      })
      .then((data) => {
        this.Log.debug(`🔍🚦⚠️  Recognice Face:{\ndata: ${data}',\nmsg: ${msg}}  🚦⚠️🔍`);
        return Promise.resolve({ data, msg });
      })
      .catch((err) => {
        this.Log.error(`❗⚠️ 🔥👽  Recognice Face: ${err}  👽🔥 ⚠️❗`);
        throw err;
      });
  }

  /**
   * Metodo de autenticacion Face-id
   * @returns {Promise<{ user: IUser, token: string, msg: string }>}
   */
  public async SignIn():
    Promise<{ user: IUser, token: string, msg: string }> {
    const
      msg = `Inicio de Sesión Exitoso`,
      args = [EArgs.RECOGNIZEG];


    this.Log.debug(`🔍🚦⚠️  Recognice Face: Exec Script  🚦⚠️🔍`);
    return this.executeScript(args)
      .then(({ _id }) => {
        if (_id == 'unknown')
          throw new FaceIdError('FACE_NOT_FOUND');

        this.Log.debug(`🔍🚦⚠️  Recognice Face: Find Data User  🚦⚠️🔍`);
        return this.UserModel
          .findOne({ _id })
      })
      .then((userRecord: IUser) => {
        if (!userRecord)
          throw new UserError('USER_NOT_FOUND');

        this.Log.debug(`🔍🚦⚠️  Recognice Face: Generating JWT  🚦⚠️🔍`);
        return this.generateToken(userRecord);
      })
      .then(({ user, token }) => {
        this.Log.debug(`🔍🚦⚠️  Recognice Face: { user: ${user},\ntoken: ${token},\n msg: ${msg}}  🚦⚠️🔍`);
        return Promise.resolve({ user, token, msg });
      })
      .catch((err) => {
        this.Log.error(`❗⚠️ 🔥👽  Recognice Face: ${err}  👽🔥 ⚠️❗`);
        throw err;
      });
  }

  /**
   * 
   * @param args 
   * @param face_id 
   * @returns 
   */
  private async executeScript(args: string[] | EArgs[]):
    Promise<{ _id: any }> {
    const
      cmd = spawn(config.PATH.PYTHON.EXE, [config.PATH.PYTHON.MODEL, ...args]);

    return new Promise((resolve, reject) => {
      var _data = null;

      cmd
        .on('error', (err) => {
          this.Log.error(`❗⚠️ 🔥👽  OnErr: ${err.name}: { ${err.message} }  👽🔥 ⚠️❗`);
          reject(new ServerError('FAIL_EXECUTE_SCRIPT'));
        })
        .on('exit', (code) => {
          this.Log.info(`⚠️🌐 🌐💻  Exited With Code: ${code}  💻🌐 🌐⚠️`);
          resolve({ _id: _data });
        })
        .stdout
        .on('data', (data) => {
          this.Log.debug(`🔍🔍 🚦⚠️  Data: {\ndata: ${data}}  🚦⚠️ 🔍🔍`);
          _data = data.toString();
        })
        .on('error', (err) => {
          this.Log.error(`❗⚠️ 🔥👽  ${err.name}: { ${err.message} }  👽🔥 ⚠️❗`);
          reject(new ServerError('FAIL_EXECUTE_SCRIPT'));
        })
    });
  }

}