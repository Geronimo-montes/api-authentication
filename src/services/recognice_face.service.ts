import { Logger } from 'winston';
import { Service, Inject } from 'typedi';

import config from '@config';

import { EventDispatcher } from '@decorators/eventDispatcher';
import { EventDispatcherInterface } from '@decorators/eventDispatcher';
import { spawn } from 'child_process';


/**
 * 
 */
@Service()
export default class RecogniceFaceService {
  constructor(
    @Inject('logger') private Log: Logger,
    @Inject('dataFaceModel') private DataFaceModel: Models.DataFaceModel,
    @EventDispatcher() private event: EventDispatcherInterface,
  ) { }

  public async AddFaceToModel({ name, email, files }: any): Promise<any> {
    try {
      this.Log.debug('🔍🔍 🚦⚠️  Create Row In Mongosee  🚦⚠️ 🔍🔍');
      const new_face = await this.DataFaceModel
        .create({ name, email, number_files: files.length })

      this.Log.debug('🔍🔍 🚦⚠️  Execute File Python  🚦⚠️ 🔍🔍');
      const python = spawn(config.PYTHON.EXE, [config.PYTHON.MODEL, 'add_galery', name]);

      return new Promise((resolve, reject) => {
        python
          .on('exit', (code) => {
            const msg = `Child Process Exited With Code: ${code}`;
            this.Log.debug(`🔍🔍 🚦⚠️  ${msg}  🚦⚠️ 🔍🔍`);
            resolve({ msg, dataFace: new_face });
          })
          .stdout
          .on('error', (err) => {
            this.Log.error(`❗⚠️ 🔥👽  Child Process: "Error": { ${err} }  👽🔥 ⚠️❗`);
            throw err;
          })
          .on('data', (data) => {
            this.Log.debug(`🔍🔍 🚦⚠️  Child Process: ${data}  🚦⚠️ 🔍🔍`);
          });
      })
    } catch (err) {
      this.Log.error(`❗⚠️ 🔥👽  Error: ${err}  👽🔥 ⚠️❗`);
      throw new Error(err);
    }
  }
}