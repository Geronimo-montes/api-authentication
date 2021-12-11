import { Container } from "typedi";
import agendaFactory from './agenda';
import LoggerInstance from './logger';


export default ({ mongoConnection, models }: {
    mongoConnection;
    models: { name: string; model: any; }[]
}) => {
    try {
        models.forEach(m => Container.set(m.name, m.model));

        const agendaInstance = agendaFactory({ mongoConnection });

        Container.set('agendaInstance', agendaInstance);
        Container.set('logger', LoggerInstance);

        return { agenda: agendaInstance }
    } catch (err) {
        LoggerInstance.error('🔥 Error on dependency injector loader: %o', err);
        throw err;
    }
};