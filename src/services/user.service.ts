import { Logger } from 'winston';
import { Inject, Service } from 'typedi';

import { EventDispatcher } from '@decorators/eventDispatcher';
import { EventDispatcherInterface } from '@decorators/eventDispatcher';
import { IUser } from '@interfaces/IUser.interface';
import UserError from '@errors/user.error';
import ServerError from '@errors/server.error';
import { LiteralUnion } from 'express-jwt';

/**
 * 
 */
@Service()
export default class UserService {
  constructor(
    @Inject('logger') private Log: Logger,
    @Inject('userModel') private UserModel: Models.UserModel,
    @Inject('userCredentialsModel') private UserCredentialsModel: Models.UserCredentialsModel,
    @Inject('faceIdModel') private FaceIdModel: Models.FaceIdModel,
    @EventDispatcher() private event: EventDispatcherInterface,
  ) { }

  /**
   * 
   * @param {IUser} user
   * @returns 
   */
  public async Add({ _id_admin, name, role }: IUser):
    Promise<{ data: IUser, msg: string }> {

    const
      msg = `User ${name} Registrado con Exito`;

    this.Log.debug(`🔍🚦⚠️  User: Valid Exists User  🚦⚠️🔍`);
    return this.UserModel.exists({ name })
      .then((exists: boolean) => {
        if (exists)
          throw new UserError('USER_DUPLICATE');
        const date = new Date();

        this.Log.debug(`🔍🚦⚠️  User: Create Row In Mongosee  🚦⚠️🔍`);
        return this.UserModel.create({ _id_admin, name, role });
      })
      .then((user: IUser) => {
        return Promise.resolve({ data: user, msg });
      })
      .catch((err) => {
        this.Log.error(`❗⚠️🔥  User Credentials: ${err}  🔥⚠️❗`);
        throw err;
      });
  }

  /**
   * 
   * @param _id 
   * @returns {Promise<IUser>}
   * @throws {UserError}
   */
  public async FindOne(_id_admin: string, _id: string): Promise<any> {
    this.Log.debug(`🔍🚦⚠️  User: Find User By Id  🚦⚠️🔍`);
    return this.UserModel.findOne({ _id_admin, _id })
      .then((userRecord: IUser) => {
        if (!userRecord)
          throw new UserError('USER_NOT_FOUND');

        this.Log.debug(`🔍🚦⚠️  User: Find Data Face_Id  🚦⚠️🔍`);
        return this.FaceIdModel.populate(userRecord, this.SELECT_FACE_ID);
      })
      .then((data) => {
        this.Log.debug(`🔍🚦⚠️  User: Find Data User_Credentials  🚦⚠️🔍`);
        return this.UserCredentialsModel.populate(data, this.SELECT_CREDENTIALS)
      })
      .then((data) => {
        console.log({ data })
        return Promise.resolve(data);
      })
      .catch((err) => {
        this.Log.error(`❗⚠️ 🔥👽  User: ${err}  👽🔥 ⚠️❗`);
        throw err;
      })
  }

  /**
   * 
   * @param {string} _id_admin 
   * @returns {Promise<IUser[]>}
   */
  public async All(_id_admin: string): Promise<any[]> {
    this.Log.debug(`🔍🚦⚠️  User: Find User By Id  🚦⚠️🔍`);
    return this.UserModel.find({ _id_admin })
      .then((usersRecord: IUser[]) => {
        this.Log.debug(`🔍🚦⚠️  User: Find Data Face_Id  🚦⚠️🔍`);
        return this.FaceIdModel.populate(usersRecord, this.SELECT_FACE_ID);
      })
      .then((data) => {
        this.Log.debug(`🔍🚦⚠️  User: Find Data User_Credentials  🚦⚠️🔍`);
        return this.UserCredentialsModel.populate(data, this.SELECT_CREDENTIALS)
      })
      .then((data) => {
        console.log({ data });
        return Promise.resolve(data);
      })
      .catch((err) => {
        this.Log.error(`❗⚠️ 🔥👽  User: ${err}  👽🔥 ⚠️❗`);
        throw err;
      })
  }

  public async UpdateOne(_id_admin): Promise<IUser> {
    this.Log.debug(`🔍🚦⚠️  User: Update One User  🚦⚠️🔍`);
    return Promise.reject(new ServerError('METOD_NOT_IMPLEMENT'));
  }

  public async AltaBaja(
    _id_admin: string, _id: string, estatus: LiteralUnion<'a' | 'b'>
  ): Promise<any> {

    this.Log.debug(`🔍🚦⚠️  User: Valid Exists User  🚦⚠️🔍`);
    return this.UserModel.exists({ _id })
      .then((exists: boolean) => {
        if (!exists)
          throw new UserError('USER_NOT_FOUND');

        const
          query = { _id: _id },
          update = { $set: { estatus: estatus } },
          options = { upsert: false };

        this.Log.debug(`🔍🚦⚠️  User: Update Estatus In Mongosee  🚦⚠️🔍`);
        return this.UserModel.updateOne(query, update, options);
      })
      .then((data) => {
        console.log({ data });
        return Promise.resolve({ data });
      })
      .catch((err) => {
        this.Log.error(`❗⚠️🔥  User Credentials: ${err}  🔥⚠️❗`);
        throw err;
      });
  }

  /**
   * Schema select para el modelo face id
   */
  private SELECT_FACE_ID = {
    path: "_id_face_id",
    select: {
      '_id': 1,
      'number_files': 1,
      'index': 1,
      'create_date': 1,
      'update_date': 1,
    },
  }

  /**
   * Schema select para el modelo user-credentials
   */
  private SELECT_CREDENTIALS = {
    path: "_id_credentials",
    select: {
      '_id': 1,
      'email': 1,
      'create_date': 1,
      'update_date': 1,
    },
  }
}