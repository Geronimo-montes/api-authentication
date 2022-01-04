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
    const { agenda } = await injectorLoader({
        mongoConnection,
        models: [{
            name: 'userModel',
            model: require('../models/user.model').default,
        }, {
            name: 'userCredentialsModel',
            model: require('../models/user-credentials.model').default,
        }, {
            name: 'faceIdModel',
            model: require('../models/face-id.model').default,
        }],
    });

    /**
     * 
     */
    await jobsLoader({ agenda });
}