import mongoose, { ConnectOptions } from 'mongoose';
import config from '@config';

export default async (): Promise<any> => {
    const connection = await mongoose.connect(
        config.DATABASEURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions);

    return connection.connection.db;
}