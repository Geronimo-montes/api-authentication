import mongoose from 'mongoose';
import { Db } from 'mongodb';
import config from '@config';

export default async (): Promise<any> => {
    const connection = await mongoose.connect(config.DATABASEURI);
    return connection.connection.db;
}