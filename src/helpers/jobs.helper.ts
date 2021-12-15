import config from '@config';
import Agenda from 'agenda';

export default ({ agenda }: { agenda: Agenda }) => {
  agenda.define(
    'send-email',
    { priority: 'high', concurrency: config.AGENDA.CONCURRENCY },
    // @TODO Could this be a static method? Would it be better?
    () => { },
  );

  agenda.start();
};
