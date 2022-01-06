import argon2 from 'argon2';
import { Logger } from 'winston';
import { Inject, Service } from 'typedi';

import { EventDispatcher } from '@decorators/eventDispatcher';
import { EventDispatcherInterface } from '@decorators/eventDispatcher';
import { IUser } from '@interfaces/IUser.interface';
import UserError from '@errors/user.error';
import { IUserCredentials } from '@interfaces/IUserCredentials.interface';
import { randomBytes } from 'crypto';
import ServiceBase from '@models/model-base.model';
import UserCredentialsError from '@errors/user_credentials.error';

/**
 * 
 */
@Service()
export default class UserCredentialsService extends ServiceBase {
  constructor(
    @Inject('logger') private Log: Logger,
    @Inject('userModel') private UserModel: Models.UserModel,
    @Inject('userCredentialsModel') private UserCredentialsModel: Models.UserCredentialsModel,
    @EventDispatcher() private event: EventDispatcherInterface,
  ) {
    super();
  }

  /**
   * 
   * @param {IUserCredentials} user_credentials 
   * @returns {Promise<{ data: IUserCredentials, msg: string }>} 
   */
  public async Add(_id_user, email, password):
    Promise<{ data: IUserCredentials, msg: string }> {

    const
      msg = `User Credentials Registrado con Exito`,
      _salt = randomBytes(32),
      salt = _salt.toString('hex');

    this.Log.debug(`🔍🚦⚠️  User Credentials: Valid Exists User  🚦⚠️🔍`);
    return this.UserModel
      .exists({ _id: _id_user })
      .then((exists: boolean) => {
        if (!exists)
          throw new UserError('USER_NOT_FOUND');

        this.Log.debug(`🔍🚦⚠️  User Credentials: Valid Exists User Credentials  🚦⚠️🔍`);
        return this.UserCredentialsModel
          .exists({ _id: _id_user });
      })
      .then((exists: boolean) => {
        if (exists)
          throw new UserCredentialsError('CREDENTIALS_DUPLICATE');

        this.Log.debug(`🔍🚦⚠️  User Credentials: Hashing password  🚦⚠️🔍`);
        return argon2.hash(password, { salt: _salt });
      })
      .then((password) => {
        this.Log.debug(`🔍🚦⚠️  User Credentials: Create Row In Mongosee  🚦⚠️🔍`);
        const date = new Date();

        return this.UserCredentialsModel.create(
          { _id_user, email, password, salt });
      })
      .then((userCredentials: IUserCredentials) => {
        const
          query = { _id: userCredentials._id_user },
          update = { $set: { _id_credentials: userCredentials._id } },
          options = { upsert: true };

        this.Log.debug(`🔍🚦⚠️  Recognice Face: Update UserModel Add FaceId  🚦⚠️🔍`);
        return this.UserModel
          .updateOne(query, update, options);
      })
      .then(({ modifiedCount }) => {
        if (modifiedCount < 1)
          throw new UserError('USER_DATA_NOT_UPDATE');

        return this.UserModel
          .findOne({ _id: _id_user });
      })
      .then((userRecord) => {
        this.Log.debug(`🔍🚦⚠️  User: Find Data Face_Id  🚦⚠️🔍`);
        return this.UserCredentialsModel
          .populate(
            userRecord,
            {
              path: "_id_face_id",
              select: {
                '_id': 1,
                'email': 1,
              },
            }
          );
      })
      .then((data) => {
        console.log({ data });
        return Promise.resolve({ data, msg });
      })
      .catch((err) => {
        this.Log.error(`❗⚠️🔥  User Credentials: ${err}  🔥⚠️❗`);
        throw err;
      });
  }

  /**
   * 
   * @param {string} email 
   * @param {string} password 
   * @returns 
   */
  public async SignIn(email: string, password: string):
    Promise<{ user: IUser, token: string, msg: string }> {

    const
      msg = `Inicio de Sesión Exitoso`;

    this.Log.debug(`🔍🚦⚠️  User Credentials: Valid Exists Credentials  🚦⚠️🔍`);
    return this.UserCredentialsModel
      .exists({ email })
      .then((exists: boolean) => {
        if (!exists)
          throw new UserError('USER_NOT_FOUND');

        this.Log.debug(`🔍🚦⚠️  User Credentials: Find Credentials  🚦⚠️🔍`);
        return this.UserCredentialsModel
          .findOne({ email });
      })
      .then((userCredentialsRecord) => {
        this.Log.debug(`🔍🚦⚠️  User Credentials: Checking password  🚦⚠️🔍`);
        return argon2.verify(userCredentialsRecord.password, password);
      })
      .then((isAuthenticate: boolean) => {
        if (!isAuthenticate)
          throw new UserCredentialsError('INVALID_PASSWORD');

        this.Log.debug(`🔍🚦⚠️  User Credentials: Find Credentials  🚦⚠️🔍`);
        return this.UserCredentialsModel
          .findOne({ email });
      })
      .then(({ _id_user: _id }: IUserCredentials) => {
        this.Log.debug(`🔍🚦⚠️  User Credentials: Find Data User  🚦⚠️🔍`);
        return this.UserModel
          .findOne({ _id });
      })
      .then((userRecord: IUser) => {
        this.Log.debug(`🔍🚦⚠️  User Credentials: Generating JWT  🚦⚠️🔍`);
        return this.generateToken(userRecord);
      })
      .then(({ user, token }) => {
        console.log({ data: { user, token } });
        return Promise.resolve({ user, token, msg });
      })
      .catch((err) => {
        this.Log.error(`❗⚠️ 🔥👽  User Credentials: ${err}  👽🔥 ⚠️❗`);
        throw err;
      });
  }
}