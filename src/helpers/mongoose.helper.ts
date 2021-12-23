/**
 * Link de descarga
 * https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-5.0.5-signed.msi
 */
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