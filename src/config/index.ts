import dotenv from 'dotenv';
import path from 'path';

process.env.NODE_ENV = process.env.NODE_ENV || 'develoment';
const envFound = dotenv.config();

if (envFound.error)
  throw new Error("⚠️  Couldn't find .env file  ⚠️");

const ROOT = path.join(__dirname, '..');
const PATH_MODEL_FACEID = path.join(__dirname, '..', '..', '..', 'biometric_recognition');
const PATH_PROJECT_ARDUINO = path.join(__dirname, '..', '..', '..', 'arduino');
export default {
  PATH: {
    /**
     * `PATH.ROOT`: Path que apunta a la carpeta `API.src`
     */
    ROOT: ROOT,
    FACEID: {
      /**
       * `PATH.PYTHON.EXE`: Path del executable del lunguaje `Python` 
       */
      EXE: path.join(PATH_MODEL_FACEID, '.venv', 'Scripts', 'python.exe'),
      /**
       * `PATH.PYTHON.MODEL`: Path del archivo `main.py`  
       */
      MODEL: path.join(PATH_MODEL_FACEID, 'src', 'main.py'),
      /**
       * `PATH.PYTHON.DATA`: Path del directorio que comunica a `Python` y `API`  
       */
      DATA: path.join(ROOT, '..', '..', 'data'),
      // DATA: path.join(PYTHON_PATH, 'data', 'data'),
    },
    ARDUINO: {
      EXE: path.join(PATH_PROJECT_ARDUINO, '.venv', 'Scripts', 'python.exe'),
      FILE: path.join(PATH_PROJECT_ARDUINO, 'huella.py'),
    }
  },
  API: {
    /**
     * `API.URI`: URI base para las rutas de la api
     */
    URL: process.env.ROOTURL || 'http://localhost:3000/api/',
    /**
     * `API.PREFIX`: Prefijo que se utiliza para referirse a la `URI.API`
     */
    PREFIX: '/api',
    /**
     * `API.PORT`: Puerto por el que la api se ejecuta
     */
    PORT: process.env.PORT || 3000,
  },
  JWT: {
    /**
     * `JWT:SECRET`: Token secreto para generacion de Tokens de acceso
     */
    SECRET: process.env.JWT_SECRET,
    /**
     * `JWT:ALGORITHM`: Algoritmo de encriptación utilizado
     */
    ALGORITHM: process.env.JWT_ALGORITMO,
  },
  /**
   * `URI.DATABASE`: Cadena de conexion con la base de datos
   */
  DATABASEURI: process.env.MONGODB_URI,
  LOGS: {
    /**
     * `LOG.LEVER`: Nivel de detalle del log
     */
    level: process.env.LOG_LEVEL || 'silly',
  },
  FILES: {
    /**
     * `PATH.FILES`: Path del directorio de archivos Publicos/Privados
     */
    PUBLIC: path.join(ROOT, 'assets', 'public'),
  },
  AGENDA: {
    DBCOLLECTION: process.env.AGENDA_DB_COLLECTION,
    POOLTIME: process.env.AGENDA_POOL_TIME,
    CONCURRENCY: parseInt(process.env.AGENDA_CONCURRENCY, 10),
  },
  CLOUDINARY_URL: process.env.CLOUDINARY_URL,
};