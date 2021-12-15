import { Logger } from 'winston';
import { Router } from 'express';
import { Request } from 'express';
import { Response } from 'express';
import { Container } from 'winston';
import { spawn } from 'child_process';
import { NextFunction } from 'express';
import { checkSchema } from 'express-validator';

import validator from '@api/middlewares/validator.middleware';

import utils from '@utils';

const route = Router();

export default (app: Router) => {
  app.use('/model', route)
  route
    // METODOS DE LA RUTA
    .get(
      // 
      '/train',
      // 
      validator(checkSchema({})),
      // 
      async (req: Request, res: Response, next: NextFunction) => {
        const Logger: Logger = Container.get('logger')
        // DEBUG: GENERATE MODULE RUN-PY
        /*
         * OPC #1: spawn from childprocess
         *  
         * import { spawn } from 'child_process';
         * import utils from '@utils';
         */
        const PyProg = spawn('python', [utils.PATH_PYTHON])

        PyProg.on('exit', (code) => {
          const msg = `child process exited with code ${code}`;
          Logger.debug(msg);
          return res.status(200).json({ msg });
        });

        PyProg.stdout.on('close', () => console.log('close...'));
        PyProg.stdout.on('data', (data) => console.log(data.toString()));
        PyProg.stdout.on('end', () => console.log('end...'));
        PyProg.stdout.on('error', (err) => next(err));
        PyProg.stdout.on('pause', () => console.log('pause...'));
        PyProg.stdout.on('resume', () => console.log('resume...'));

      }
    );
};
