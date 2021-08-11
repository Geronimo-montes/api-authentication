import mysql from 'mysql';
import config from './config/config';

//Conexion con la base de datos
const DB = mysql.createPool(config.DB.URI);

DB.getConnection((err, conn) => {
  console.log('¡Conexion a la base de datos exitosa!');
  conn.release();

  if (err) console.log({ err });
});

export default DB;