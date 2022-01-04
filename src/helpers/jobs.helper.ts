import config from '@config';
import Agenda from 'agenda';

export default ({ agenda }: { agenda: Agenda }) => {
  agenda.define(
    'send-email',
    { priority: 'high', concurrency: config.AGENDA.CONCURRENCY },
    () => { },
  );

  agenda.start();
};
