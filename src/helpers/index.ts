import expressLoader from "./express.helper";
import mongooseLoader from "./mongoose.helper";
import injectorLoader from "./injector.helper";
import jobsLoader from "./jobs.helper";
import Logger from './logger.helper';


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
    const dataFaceModel = {
        name: 'dataFaceModel',
        model: require('../models/data_face.model').default,
    };

    /**
     * 
     */
    const { agenda } = await injectorLoader({
        mongoConnection,
        models: [
            userModel,
            dataFaceModel,
        ],
    });

    /**
     * 
     */
    await jobsLoader({ agenda });
}