import winston from 'winston';
import config from '@config';
import { allColors } from 'winston/lib/winston/config';

const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(info => {
  if (info instanceof Error) {
    return `${info.timestamp}  [${info.level}]: ${info.message} ${info.stack}`;
  }
  return `${info.timestamp}  [${info.level}]: ${info.message} `;
});

const transports = [];
if (process.env.NODE_ENV !== 'development') {
  transports.push(
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'LOG.log' }),
  )
} else {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.cli(),
        winston.format.splat(),
      )
    }),
  )
}

const LoggerInstance = winston.createLogger({
  level: config.LOGS.level,
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.colorize(allColors),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json(),
    myFormat,
  ),
  transports
});

export default LoggerInstance;
