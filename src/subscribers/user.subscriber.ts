import mongoose from 'mongoose';
import { Logger } from 'winston';
import { Container } from 'typedi';
import { EventSubscriber, On } from 'event-dispatch';
import events from './events.subscriber';
import { IUser } from '@interfaces/IUser.interface';

@EventSubscriber()
export default class UserSubscriber {
  /**
   * 
   */
  @On(events.user.signUp)
  public onUserSignUp({ name, email, _id }: Partial<IUser>) {
    const Log: Logger = Container.get('logger');

    try {
      const UserModel = Container.get('UserModel') as
        mongoose.Model<IUser & mongoose.Document>;

      UserModel.updateOne({ _id }, { $set: { lastLogin: new Date() } });
    } catch (err) {
      Log.error(`❗⚠️ 🔥👽  Error: ${events.user.signUp}  👽🔥 ⚠️❗`);
      throw err;
    }
  }
}
