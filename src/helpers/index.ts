import expressLoader from "./express";
import mongooseLoader from "./mongoose";
import injectorLoader from "./injector";
import jobsLoader from "./jobs";
import Logger from './logger';


export default async ({ expressApp }) => {
    /**
     * 
     */
    const mongoConnection = await mongooseLoader();
    Logger.info("MongoDB Inicialized")

    /**
     * 
     */
    await expressLoader({ app: expressApp });
    Logger.info("Express Inicialized")

    /**
     * 
     */
    const userModel = {
        name: 'userModel',
        model: require('../models/user.model').default,
    };

    /**
     * 
     */
    const { agenda } = await injectorLoader({
        mongoConnection,
        models: [
            userModel,
            // salaryModel,
            // whateverModel
        ],
    });

    await jobsLoader({ agenda });
}