import dotenv from 'dotenv';
import path from 'path';

process.env.NODE_ENV = process.env.NODE_ENV || 'develoment';
const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");

}

const ROOT_PATH = path.join(__dirname, '..');

export default {
  /**
   * 
   */
  ROOT: {
    PATH: ROOT_PATH,
    URL: process.env.ROOTURL || 'http://localhost:3000/api/',
  },
  /**
   * 
   */
  PORT: process.env.PORT || 3000,
  /**
   * 
   */
  API: {
    PREFIX: '/api',
  },
  /**
   * 
   */
  FILES: {
    PUBLIC: path.join(ROOT_PATH, 'assets', 'public'),
    PRIVATE: path.join(ROOT_PATH, 'assets', 'private'),
  },
  /**
   * 
   */
  JWT: {
    SECRET: process.env.JWT_SECRET,
    // SECRET: process.env.JWT_SECRET || 'somesecrettoken',
    ALGORITHM: process.env.JWT_ALGORITMO,
    // ALGORITHM: process.env.JWT_ALGORITMO || 'RS256',
  },
  /**
   * 
   */
  DATABASEURI: process.env.MONGODB_URI,
  /**
   * 
   */
  LOGS: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  /**
   * 
   */
  AGENDA: {
    DBCOLLECTION: process.env.AGENDA_DB_COLLECTION,
    POOLTIME: process.env.AGENDA_POOL_TIME,
    CONCURRENCY: parseInt(process.env.AGENDA_CONCURRENCY, 10),
  },
  /**
   * 
   */
  CLOUDINARY_URL: process.env.CLOUDINARY_URL,
};