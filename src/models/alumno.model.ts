import DB from '../database';
import { Ialumno, IdocumentoEntregado } from './model.model';

class AlumnoModel {

  /**
   * Lista la informacion de los alumnos de una unidad académica. ordenados por estatus
   * @param {number} idunidad 
   * @returns {Promise<Ialumno[]>}
   */
  public getAllAlumnosByUnidadAcademica(idunidad: number): Promise<Ialumno[]> {
    return new Promise((resolve, reject) => {
      //se verifica la existencia del usuario, si existe se toma el idusuario y el rol
      DB.query(
        `SELECT * FROM alumno WHERE idunidad = ? ORDER BY estatus, CONCAT(nombre, ' ', ape_1, ' ', ape_2);`,
        [idunidad],
        (err, res, fields) => {
          if (err) reject(err);

          resolve(res);
        });
    });
  }

  /**
   * Lista los datos de un alumno mediante la matricula.
   * @param {string} matricula 
   * @returns {Promise<Ialumno>}
   */
  public getAlumnoByMatricula(matricula: string): Promise<Ialumno> {
    return new Promise((resolve, reject) => {
      DB.query(
        `SELECT * FROM alumno WHERE matricula = ?`,
        [matricula],
        (err, res, fields) => {
          if (err) reject(err);

          if (res.length > 0)
            resolve(res[0]);
          else
            reject('No existen resultados para mostrar.');
        });
    });
  }

  /**
   * Actualiza la informacion general de un alumno
   * @param {Ialumno} data
   * @returns {Promise<boolean>}
   */
  public updateAlumno(data: Ialumno): Promise<boolean> {
    return new Promise((resolve, reject) => {
      DB.query(
        `UPDATE alumno SET
          nombre = ?,
          ape_1 = ?,
          ape_2 = ?,
          genero = ?,
          direccion = ?,
          telefono = ?,
          email = ?,
          estatus = ?
        WHERE matricula = ?`,
        [
          data.nombre,
          data.ape_1,
          data.ape_2,
          data.genero,
          data.direccion,
          data.telefono,
          data.email,
          data.estatus,
          data.matricula
        ],
        (err, res, fields) => {
          if (err) reject(err);

          if (res['affectedRows'] > 0)
            resolve(true);
          else
            resolve(false);
        });
    });
  }

  public newAlumno(alumno: Ialumno): Promise<boolean> {
    return new Promise((resolve, reject) => {
      DB.query(
        `INSERT INTO alumno VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          alumno.matricula,
          alumno.idunidad,
          'http://localhost:3000/static/default.png',
          alumno.nombre,
          alumno.ape_1,
          alumno.ape_2,
          alumno.genero,
          alumno.direccion,
          alumno.telefono,
          alumno.email,
          'a'
        ],
        (err, res, fields) => {
          if (err) reject(err);

          if (res['affectedRows'] > 0)
            resolve(true);
          else
            resolve(false);
        });
    });
  }

  public getDocsEntregadosAlumnoPack(matricula: string, idpaquete: number): Promise<IdocumentoEntregado[]> {
    return new Promise((resolve, reject) => {
      DB.query(
        `SELECT * FROM documento_alumno WHERE matricula = ? AND idpaquete = ?`,
        [matricula, idpaquete],
        (err, res, fields) => {
          if (err) reject(err);
          resolve(res);
        });
    });
  }
}

export default new AlumnoModel();