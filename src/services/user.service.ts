import { Logger } from 'winston';
import { Inject, Service } from 'typedi';

import { EventDispatcher } from '@decorators/eventDispatcher';
import { EventDispatcherInterface } from '@decorators/eventDispatcher';
import { IUser } from '@interfaces/IUser.interface';
import UserError from '@errors/user.error';
import ServerError from '@errors/server.error';

/**
 * 
 */
@Service()
export default class UserService {
  constructor(
    @Inject('logger') private Log: Logger,
    @Inject('userModel') private UserModel: Models.UserModel,
    @EventDispatcher() private event: EventDispatcherInterface,
  ) { }

  /**
   * 
   * @param _id 
   * @returns {Promise<IUser>}
   * @throws {UserError}
   */
  public async FindOne(_id_admin: string, _id: string): Promise<IUser> {
    this.Log.debug('🔍🚦⚠️  User: Find User By Id  🚦⚠️🔍');
    return this.UserModel.findOne({ _id_admin, _id })
      .then((user: IUser) => {
        if (!user)
          throw new UserError('USER_NOT_FOUND');

        const { _id_admin, _id, name, email, role } = user;

        return Promise.resolve({ _id_admin, _id, name, email, role });
      })
      .catch((err) => {
        throw err;
      })
  }

  /**
   * 
   * @param {string} _id_admin 
   * @returns {Promise<IUser[]>}
   */
  public async All(_id_admin: string): Promise<IUser[]> {
    this.Log.debug('🔍🚦⚠️  User: Find User By Id  🚦⚠️🔍');
    return this.UserModel.find({ _id_admin })
      .then((users: IUser[]) => {
        const response_users = users
          .map(({ _id_admin, _id, name, email, role }) => {
            return { _id_admin, _id, name, email, role };
          });

        return Promise.resolve(response_users);
      })
      .catch((err) => {
        throw err;
      })
  }

  public async UpdateOne(_id_admin): Promise<IUser> {
    this.Log.debug('🔍🚦⚠️  User: Update One User  🚦⚠️🔍');
    return Promise.reject(new ServerError('METOD_NOT_IMPLEMENT'));
  }

  public async DeleteOne(_id_admin): Promise<IUser> {
    this.Log.debug('🔍🚦⚠️  User: Delete One User  🚦⚠️🔍');
    return Promise.reject(new ServerError('METOD_NOT_IMPLEMENT'));
  }
}