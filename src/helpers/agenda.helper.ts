/**
 * TODO: Investigar las utilidades de la libreria agenda
 */
import config from "@config";
import Agenda from "agenda"

export default ({ mongoConnection }) => {
    return new Agenda({
        mongo: mongoConnection,
        db: {
            collection: config.AGENDA.DBCOLLECTION
        },
        processEvery: config.AGENDA.POOLTIME,
        maxConcurrency: config.AGENDA.CONCURRENCY,
    });
}