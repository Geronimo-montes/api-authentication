import { Model } from '../config/model';
import DB from '../database';
import { Ipackdocumentacion } from './model.model';

class PaqueteDocumentosModel extends Model {

  /**
   * Lista los paquetes de documetnos registrados en el sistema
   */
  public getAllPaquetesDocumentos(): Promise<Ipackdocumentacion[]> {
    const
      qry = `SELECT * FROM paquete_documento ORDER BY estatus, idpaquete;`,
      params: any[] = [];
    return this.executeQry(qry, ...params);
  }

  /**
   * consulta los datos de un paquete de docuementos mediante su id
   */
  public getPaqueteDocumentosById(idpaquete: number): Promise<Ipackdocumentacion> {
    const
      qry = `SELECT * FROM paquete_documento WHERE idpaquete = ?`,
      params = [idpaquete];
    return this.executeQry(qry, ...params)
      .then((r) => Promise.resolve(r[0]))
      .catch((err) => Promise.reject(err));
  }

  /**
   * actualiza los datos [nombre, descipcion, estatus, fecha_modificacion]
   */
  public updatePaqueteDocumentos(idpaquete: number, nombre: string, descripcion: string): Promise<string> {
    const
      qry = `UPDATE paquete_documento SET nombre = ?, descripcion = ?,fecha_modificacion = NOW() WHERE idpaquete = ?`,
      params = [nombre, descripcion, idpaquete];

    return this.executeQry(qry, ...params)
      .then((respons) =>
        Promise.resolve(`El paquete de datos se ha actualizado correctamente.`))
      .catch((err) => Promise.reject());
  }

  /**
   * actualiza los datos [nombre, descipcion, estatus, fecha_modificacion]
   */
  public deletePaqueteDocumentos(idpaquete: number, estatus: string): Promise<string> {
    const
      qry = `UPDATE paquete_documento SET estatus = ?,fecha_modificacion = NOW() WHERE idpaquete = ?`,
      params = [estatus, idpaquete];

    return this.executeQry(qry, ...params)
      .then((respons) =>
        Promise.resolve(`El paquete se ha dado de baja del sistema.`))
      .catch((err) => Promise.reject());
  }

  /**
   * Regitra un nuevo paquete de documentos, recorre el array de docs y los registra uno a uno.
   */
  public newPaqueteDocumentos(data: any, filenames: string[]): Promise<string> {
    return new Promise((resolve, reject) => {
      const
        qry_pack = `INSERT INTO paquete_documento SET ?;`,
        qry_docs = `INSERT INTO documento SET ?`,
        data_pack = {
          ruta_imagen: `http://localhost:3000/static/${filenames[0]}`,
          nombre: data.nombre,
          descripcion: data.descripcion,
          numero_documentos: data.numero_documentos,
        };

      // INICIAMOS LA TRANSACCION OBTENIENDO LA INSTANCIA DE LA CONEXION
      DB.getConnection((err, conn) => {
        if (err) reject(err);
        // ABRIMOS LA TRANSACCION
        conn.beginTransaction((err) => {
          if (err) reject(err);
          // REGISTRAMOS LOS DATOS GENERALES DEL PACK DE DOCUMENTOS
          conn.query(qry_pack, data_pack, (err, res) => {
            // EN CASO DE ERROR DESHACEMOS LA TRANSACCION Y MANDAMOS ERROR
            if (err) return conn.rollback(() => { reject(err); throw err; });
            // insertId CONTIENE EL ID ASIGANDO AL PAQUETE QUE SE ESTA REGISTRANDO
            const idpaquete = res.insertId;

            if (data.numero_documentos === 1) {
              data.detalle_nombre = Array(data.detalle_nombre);
              data.detalle_formato = Array(data.detalle_formato);
              data.detalle_peso_max = Array(data.detalle_peso_max);
              data.detalle_requerido = Array(data.detalle_requerido);
            }

            console.log({ data });

            // REGISTRAMOS EL DETALLE DE CADA DOCUMENTO DEL PAQUETE
            for (let i = 0; i < data.numero_documentos; i++) {
              const
                iddocumento = i + 1,
                nombre = data.detalle_nombre[i],
                formato = data.detalle_formato[i],
                peso_max = data.detalle_peso_max[i],
                requerido = (data.detalle_requerido[i]) ? 'a' : 'b',
                foto_ejemplo = `http://localhost:3000/static/${filenames[i + 1]}`;

              const insertData = {
                iddocumento,
                idpaquete,
                nombre,
                formato,
                peso_max,
                requerido,
                foto_ejemplo,
              };
              // LANZAMOS LA CONSULTA
              conn.query(qry_docs, insertData, (err, res) => {
                if (err) return conn.rollback(() => { reject(err); throw err; });
              });
            }
            // AL TERMINA DE REALIZAR LA CONSULTA CONFIRMAMOS LA TRANSACCION
            conn.commit(function (err) {
              if (err) {
                reject(err);
                return conn.rollback((err) => { reject(err); throw err; });
              }

              // RESOLVEMOS LA PROMESA
              resolve(`El paquete de documentos fue registrado con exito.`);
              // LIBERAMOS LA CONEXION
              conn.release();
            });
          });
        });
      });
    });
  }

  /**
   * Valida si el paquete ya esta registrada en la base de datos. 
   */
  public exists(idpaquete: number): Promise<boolean> {
    const qry =
      `SELECT COUNT(1) AS exist FROM paquete_documento WHERE idpaquete = ?; `,
      params = [idpaquete];

    return this.executeQry(qry, ...params)
      .then((respons) =>
        (Boolean(respons[0].exist)) ? Promise.resolve(true) : Promise.reject())
      .catch((err) => Promise.reject(err));
  }
}

export default new PaqueteDocumentosModel();
