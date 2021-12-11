import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'develoment';
const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");

}

export default {
  /**
   * 
   */
  PORT: process.env.PORT || 3000,
  /**
   * 
   */
  API: {
    PREFIX: '/api'
  },
  /**
   * 
   */
  JWT: {
    SECRET: process.env.JWT_SECRET || 'somesecrettoken',
    ALGORITHM: process.env.JWT_ALGO || 'RS256',
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
};