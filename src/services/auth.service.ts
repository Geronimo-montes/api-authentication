import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import { Service, Inject, Token } from 'typedi';

import config from '@config';
import events from '@subscribers/events';
import { IUser, IUserInputDTO } from '@interfaces/IUser';
import { EventDispatcher } from '@decorators/eventDispatcher';
import { EventDispatcherInterface } from '@decorators/eventDispatcher';

interface INewUser {
  user: IUser;
  token: string;
}

@Service()
export default class AuthService {

  constructor(
    @Inject('logger') private logger,
    @Inject('userModel') private Model: Models.UserModel,
    @EventDispatcher() private event: EventDispatcherInterface,
  ) { }

  public async SignUp(user: IUserInputDTO): Promise<INewUser> {

    const _s = randomBytes(32);

    // this.logger.error('Hashing password');
    return argon2.hash(user.password, { salt: _s })
      // this.logger.silly('Creating user db record');
      .then(hash => this.Model.create({ ...user, salt: _s.toString('hex'), hash }))
      // this.logger.error(e);
      .then((user: IUser) => this.generateToken(user))
      // this.logger.silly('Generating JWT');
      .then(({ user, token }) =>
        new Promise<INewUser>(
          (res, rej) => {
            this.event.dispatch(events.user.signUp, { user: user });

            Reflect.deleteProperty(user, 'password');
            Reflect.deleteProperty(user, 'salt');

            res({ user, token });
          })).catch(err => { throw err });
  }

  private generateToken({ _id, role, name, password, salt }: IUser): Promise<any> {
    const exp = new Date(new Date().getDate() + 60).getTime() / 1000;
    let data = { _id, role, name, exp };

    this.logger.silly(`Sign JWT for userId: ${_id}`);

    return new Promise((resolve, reject) =>
      resolve({ data, token: jwt.sign(data, config.JWT.SECRET) }));
  }
}
