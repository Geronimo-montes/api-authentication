import { resolve } from 'path';
import DB from '../database';
import { Ialumno, Idocumento, IdocumentoEntregado } from './model.model';

class AlumnoModel {
  private defaultError: string =
    `Se ha producido un error en el servidor. Trabajamos en una solución.`;

  /**
   * Lista la informacion de los alumnos de una unidad académica. ordenados por estatus
   * @param {number} idunidad 
   * @returns {Promise<Ialumno[]>}
   */
  public getAllAlumnosByUnidadAcademica(idunidad: number): Promise<Ialumno[]> {
    return new Promise((resolve, reject) => {
      DB.query(
        `SELECT * FROM alumno WHERE idunidad = ? ORDER BY estatus, matricula;`,
        [idunidad],
        (err, res, fields) => {
          if (err) { reject(err); throw err; };
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
          if (err) { reject(err); throw err; };

          if (res.length > 0) resolve(res[0]);
          else reject('No existen resultados para mostrar.');
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
        [data.nombre, data.ape_1, data.ape_2, data.genero, data.direccion, data.telefono, data.email, data.estatus, data.matricula],
        (err, res, fields) => {
          if (err) { reject(err); throw err; };

          if (res.affectedRows > 0) resolve(true);
          else reject(this.defaultError);
        });
    });
  }

  /**
   * Valida si la matricula ya esta registrada en la base de datos. 
   * @param {string} matricula 
   * @returns {Promise<boolean>} TRUE: si encuentra una coincidencia; FALSE: si no encuentra nada.
   */
  public validarMatricula(matricula: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      DB.query(`SELECT matricula FROM alumno WHERE matricula = ?;`,
        [matricula],
        (err, res, fields) => {
          if (err) { reject(err); throw err; };

          if (res.length === 0) resolve(false);
          else reject('La matricula ya esta registrada en el sistema.');
        })
    })
  }

  /**
   * Registra un alumno en la base de datos
   * @param {Ialumno} data
   * @returns {Promise<boolean>}
   */
  public newAlumno(alumno: Ialumno): Promise<boolean> {
    const insertData = {
      matricula: alumno.matricula,
      idunidad: alumno.idunidad,
      nombre: alumno.nombre,
      ape_1: alumno.ape_1,
      ape_2: alumno.ape_2,
      genero: alumno.genero,
      direccion: alumno.direccion,
      telefono: alumno.telefono,
      email: alumno.email,
    };

    return new Promise((resolve, reject) => {
      DB.query(`INSERT INTO alumno SET ?`, insertData, (err, res, fields) => {
        if (err) { reject(err); throw err; };
        if (res.affectedRows > 0) resolve(true);
        else reject(this.defaultError);
      });
    });
  }

  /**
   * Registra un alumno en la base de datos
   * @param {Ialumno} data
   * @returns {Promise<boolean>}
   */
  public updateRutaPerfil(matricula: string, name: string, ext: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      DB.query(
        `UPDATE alumno SET perfil = ? WHERE matricula = ?`,
        [`http://localhost:3000/static/${name}${ext}`, matricula],
        (err, res, fields) => {
          if (err) { reject(err); throw err; };

          if (res.affectedRows > 0) resolve(true);
          else reject('No se actualizo ningun registro.');
        });
    });
  }

  /**
   * Obtiene los datos de los documentos entregados por el alumno de un paquete en especifico
   * @param {string} matricula 
   * @param {number} idpaquete 
   * @returns {IdocumentoEntregado[]}
   */
  public getDocsEntregadosAlumnoPack(matricula: string, idpaquete: number): Promise<IdocumentoEntregado[]> {
    return new Promise((resolve, reject) => {
      DB.query(
        `SELECT * FROM documento_alumno WHERE matricula = ? AND idpaquete = ?`,
        [matricula, idpaquete],
        (err, res, fields) => {
          if (err) { reject(err); throw err; };
          resolve(res);
        });
    });
  }
}

export default new AlumnoModel();