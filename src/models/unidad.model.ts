import DB from '../database';
import { Iunidadacademica } from './model.model';

class UnidadModel {

  /**
   * Lista las unidades registradas en el sistema
   * @returns {Promise<Iunidadacademica[]>}
   */
  public getAllUnidadesAcademicas(): Promise<Iunidadacademica[]> {
    return new Promise((resolve, reject) => {
      DB.query(
        `SELECT * FROM unidad ORDER BY estatus, nombre`,
        [],
        (err, res, fields) => {
          if (err) reject(err);
          resolve(res);
        });
    });
  }

  /**
   * Lista los datos de una unidad académica atravez de su idunidad.
   * @param {number} idunidad 
   * @returns {Promise<Iunidadacademica>}
   */
  public getUnidadAcademicaById(idunidad: number): Promise<Iunidadacademica> {
    return new Promise((resolve, reject) => {
      DB.query(
        `SELECT * FROM unidad WHERE idunidad = ?`,
        [idunidad],
        (err, res, fields) => {
          if (err) reject(err);
          resolve(res[0]);
        });
    });
  }

  /**
   * Actualiza los datos nombre, direccion, correo, telefono, estatus de una unidad academica
   * @param {Iunidadacademica} data datos de la unidad academica 
   * @returns {Promise<boolean>}
   */
  public updateUnidadAcademica(data: Iunidadacademica): Promise<boolean> {
    return new Promise((resolve, reject) => {
      DB.query(
        `UPDATE unidad SET
          nombre = ?,
          direccion = ?,
          correo = ?,
          telefono = ?,
          estatus = ?
        WHERE idunidad = ?`,
        [data.nombre, data.direccion, data.correo, data.telefono, data.estatus, data.idunidad],
        (err, res, fields) => {
          if (err) reject(err);

          if (res['affectedRows'] > 0)
            resolve(true);
          else
            resolve(false);
        });
    });
  }

  /**
   * Actualiza los campos [clave, nombre, perfil, direccion, correo, telefono ] de la unidad academica proporcionada.
   * @param {Iunidadacademica} unidad_academica 
   * @returns {Promise<boolean>}
   */
  public newUnidadAcademica(unidad_academica: Iunidadacademica): Promise<boolean> {
    return new Promise((resolve, reject) => {
      DB.query(
        `INSERT INTO unidad (clave, nombre, perfil, direccion, correo, telefono) 
        VALUES (?, ?, ?, ?, ?, ?) `,
        [
          unidad_academica.clave,
          unidad_academica.nombre,
          'http://localhost:3000/static/default.png',
          unidad_academica.direccion,
          unidad_academica.correo,
          unidad_academica.telefono,
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
}

export default new UnidadModel();