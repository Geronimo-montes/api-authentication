import DB from '../database';
import {
  Idocumento,
  Ipackdocumentacion
} from './model.model';

class PackDocumentoModel {

  /**
   * Lista los paquetes de documetnos registrados en el sistema
   * @returns {Promise<Ipackdocumentacion[]>}
   */
  public getAllPaquetesDocumentos(): Promise<Ipackdocumentacion[]> {
    return new Promise((resolve, reject) => {
      DB.query(
        `SELECT * FROM paquete_documento ORDER BY estatus, idpaquete`,
        [],
        (err, res) => {
          if (err) reject(err);

          if (res.length > 0)
            resolve(res);
          else
            reject('No existen resultados para mostrar.');
        });
    });
  }

  /**
   * consulta los datos de un paquete de docuementos mediante su id
   * @param {number} idpaquete 
   * @returns {Promise<Ipackdocumentacion>}
   */
  public getPaqueteDocumentosById(idpaquete: number): Promise<Ipackdocumentacion> {
    return new Promise((resolve, reject) => {
      DB.query(
        `SELECT * FROM paquete_documento WHERE idpaquete = ?`,
        [idpaquete],
        (err, res) => {
          if (err) reject(err);

          if (res.length > 0)
            resolve(res[0]);
          else
            reject('No existen resultados para mostrar.');
        });
    });
  }

  /**
   * Lista los datos de los documentos que pertenecen al paquete
   * @param {number} idpaquete 
   * @returns {Promise<Idocumento[]>}
   */
  public getDetallePaqueteDocumentos(idpaquete: number): Promise<Idocumento[]> {
    return new Promise((resolve, reject) => {
      DB.query(
        `SELECT * FROM documento WHERE idpaquete = ?;`,
        [idpaquete],
        (err, res) => {
          if (err) reject(err);

          if (res.length > 0)
            resolve(res);
          else
            reject('No existen resultados para mostrar.');
        });
    });
  }

  /**
   * actualiza los datos [nombre, descipcion, estatus, fecha_modificacion]
   * @param {Ipackdocumentacion} data
   * @return {Promise<boolean>}
   */
  public updatePaqueteDocumentos(data: Ipackdocumentacion): Promise<boolean> {
    return new Promise((resolve, reject) => {
      DB.query(
        `UPDATE paquete_documento SET 
          nombre = ?,
          descripcion = ?, 
          estatus = ?,
          fecha_modificacion = NOW()
        WHERE idpaquete = ?`,
        [
          data.nombre,
          data.descripcion,
          data.estatus,
          data.idpaquete
        ],
        (err, res) => {
          if (err) reject(err);

          if (res['affectedRows'] > 0)
            resolve(true);
          else
            resolve(false);
        });
    });
  }

  /**
   * Regitra un nuevo paquete de documentos, recorre el array de docs y los registra uno a uno.
   * @param packs 
   * @returns 
   */
  public newPaqueteDocumentos(data: Ipackdocumentacion): Promise<boolean> {
    return new Promise((resolve, reject) => {
      DB.getConnection((err, conn) => {
        if (err) { reject(err); throw err; }
        conn.beginTransaction((err) => {
          if (err) { reject(err); throw err; }

          const
            qry_pack = `INSERT INTO paquete_documento (nombre, descripcion, numero_documentos) VALUES (?, ?, ?);`,
            qry_docs = `INSERT INTO documento (idpaquete, nombre, formato, peso_max, requerido) VALUES (?, ?, ?, ?, ?)`;

          // instert data general del paquete
          conn.query(
            qry_pack,
            [data.nombre, data.descripcion, data.numero_documentos],
            (err, res) => {
              if (err) return conn.rollback(() => { reject(err); throw err; });
              const id = res.insertId;

              // Insert documentos, de uno en uno
              data.detalleDocumento.forEach((d: Idocumento) => {
                conn.query(
                  qry_docs,
                  [id, d.nombre, d.formato, d.peso_max, ((d.requerido) ? 'a' : 'b')],
                  (err, res) => {
                    if (err) return conn.rollback(() => { reject(err); throw err; });
                  });
              });

              // Confirmacion de la transacción
              conn.commit(function (err) {
                if (err) return conn.rollback(() => { reject(err); throw err; });
                resolve(true);
                conn.release();
              });
            });
        });
      });
    });
  }
}

export default new PackDocumentoModel();
