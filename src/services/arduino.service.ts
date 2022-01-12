import { Inject, Service } from "typedi";
import { Logger } from "winston";
import { spawn } from 'child_process';
import config from "@config";
import ServerError from "@errors/server.error";

@Service()
export default class ArduinoService {
  constructor(
    @Inject('logger') private Log: Logger,
    @Inject('faceIdModel') private FaceIdModel: Models.FaceIdModel,
  ) { }


  public async userCredentials(user, password): Promise<any> { }

  public async faceID(): Promise<any> { }

  public async huella(): Promise<any> {
    return this.executeScript(["--recognize"])
      .then((response) => {
        return response;
      })
      .catch((err) => {
        this.Log.error(`❗⚠️ 🔥👽  Arduino Service: ${err}  👽🔥 ⚠️❗`);
        throw err;
      });
  }

  public async huella_add(id): Promise<any> {
    return this.executeScript(["--add", "--identificador", id])
      .then((response) => {
        return response;
      })
      .catch((err) => {
        this.Log.error(`❗⚠️ 🔥👽  Arduino Service: ${err}  👽🔥 ⚠️❗`);
        throw err;
      });
  }

  private async executeScript(args: string[]):
    Promise<any> {
    const
      cmd = spawn(config.PATH.ARDUINO.EXE, [config.PATH.ARDUINO.FILE, ...args]);

    return new Promise((resolve, reject) => {
      var response = null;

      cmd
        .on('error', (err) => {
          this.Log.error(`❗⚠️ 🔥👽  OnErr: ${err.name}: { ${err.message} }  👽🔥 ⚠️❗`);
          reject(new ServerError('FAIL_EXECUTE_SCRIPT'));
        })
        .on('exit', (code) => {
          this.Log.info(`⚠️🌐 🌐💻  Exited With Code: ${code}  💻🌐 🌐⚠️`);
          resolve({ response });
        })
        .stdout
        .on('data', (data) => {
          this.Log.debug(`🔍🔍 🚦⚠️  Data: {\ndata: ${data}}  🚦⚠️ 🔍🔍`);
          response = data.toString();
        })
        .on('error', (err) => {
          this.Log.error(`❗⚠️ 🔥👽  ${err.name}: { ${err.message} }  👽🔥 ⚠️❗`);
          reject(new ServerError('FAIL_EXECUTE_SCRIPT'));
        })
    });
  }

}