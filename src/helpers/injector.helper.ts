import { Container } from "typedi";
import agendaFactory from './agenda.helper';
import LoggerInstance from './logger.helper';


export default ({ mongoConnection, models }: {
    mongoConnection;
    models: { name: string; model: any; }[]
}) => {
    try {
        const agendaInstance = agendaFactory({ mongoConnection });

        /**
         * INYECCION DE MODELOS DE DATOS
         */
        models.forEach(m => Container.set(m.name, m.model));

        /**
         * INGECCION DE DEPENDENCIAS LOGGER Y AGENGA 
         */
        Container.set('agendaInstance', agendaInstance);
        Container.set('logger', LoggerInstance);

        return { agenda: agendaInstance }
    } catch (err) {
        LoggerInstance.error('🔥 Error on dependency injector loader: %o', err);
        throw err;
    }
};