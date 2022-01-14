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


  /**
   * 
   * @param user 
   * @param password 
   */
  public async userCredentials(user, password): Promise<any> {
    this.Log.info(`⚠️🌐💻  Arduino Service: LogIn Credenciales de usario...  💻🌐⚠️`);
    const args = ["--credenciales", "--nombre", user, "--password", password];

    return this.executeScript(args)
      .then((response) => response)
      .catch((err) => {
        this.Log.error(`❗⚠️👽  Arduino Service: ${err}  👽⚠️❗`);
        throw err;
      });
  }

  /**
   * 
   * @param name 
   * @returns 
   */
  public async faceID(name): Promise<any> {
    this.Log.info(`⚠️🌐💻  Arduino Service: Reconosimiento Facial...  💻🌐⚠️`);

    return this.executeScript(["--facial"])
      .then((response) => response)
      .catch((err) => {
        this.Log.error(`❗⚠️👽  Arduino Service: ${err}  👽⚠️❗`);
        throw err;
      });
  }

  /**
   * 
   * @returns 
   */
  public async huella(): Promise<any> {
    this.Log.info(`⚠️🌐💻  Arduino Service: Reconosimiento de huella...  💻🌐⚠️`);

    return this.executeScript(["--huella"])
      .then((response) => response)
      .catch((err) => {
        this.Log.error(`❗⚠️👽  Arduino Service: ${err}  👽⚠️❗`);
        throw err;
      });
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  public async huella_add(id): Promise<any> {
    this.Log.info(`⚠️🌐💻  Arduino Service: Add huella al modelo...  💻🌐⚠️`);

    return this.executeScript(["--add", "--identificador", id])
      .then((response) => response)
      .catch((err) => {
        this.Log.error(`❗⚠️👽  Arduino Service: ${err}  👽⚠️❗`);
        throw err;
      });
  }

  /**
   * 
   * @param args 
   * @returns 
   */
  private async executeScript(args: string[]):
    Promise<any> {
    this.Log.info(`⚠️🌐💻  Arduino Service: Run Script Python...  💻🌐⚠️`);

    const
      cmd = spawn(config.PATH.ARDUINO.EXE, [config.PATH.ARDUINO.FILE, ...args]);

    return new Promise((resolve, reject) => {
      var response = null;

      cmd
        .on('error', (err) => {
          this.Log.error(`❗⚠️👽  OnErr: ${err.name}: { ${err.message} }  👽⚠️❗`);
          reject(new ServerError('FAIL_EXECUTE_SCRIPT'));
        })
        .on('exit', (code) => {
          this.Log.info(`⚠️🌐💻  Exited With Code: ${code}  💻🌐⚠️`);
          resolve(response);
        })
        .stdout
        .on('data', (data) => {
          this.Log.debug(`🔍🚦⚠️  Data: {\ndata: ${data}\n}  🚦⚠️🔍`);
          response = data.toString();
        })
        .on('error', (err) => {
          this.Log.error(`❗⚠️👽  ${err.name}: {\n ${err.message} \n}  👽⚠️❗`);
          reject(new ServerError('FAIL_EXECUTE_SCRIPT'));
        })
    });
  }

}