import { Model } from '../config/model';
import fs from 'fs';
import {
  Idocumento,
  IdocumentoEntregado,
} from './model.model';

class DocumentoModel extends Model {

  public getDocumentosByPaquete(idpaquete: number): Promise<Idocumento[]> {
    const
      qry = `SELECT * FROM documento WHERE idpaquete = ?;`,
      params = [idpaquete];
    return this.executeQry(qry, ...params);
  }

  public getDocumentoById(idpaquete: number, iddocumento: number): Promise<Idocumento> {
    const
      qry = `SELECT * FROM documento WHERE idpaquete = ? AND iddocumento = ?;`,
      params = [idpaquete, iddocumento];

    return this.executeQry(qry, ...params)
      .then((r) =>
        (r.length > 0) ?
          Promise.resolve(r[0]) :
          Promise.reject('EL documento solicitado no esta registrado en el sistema'))
      .catch((err) => Promise.reject(err));
  }

  public getDocsEntregadosAlumnoPack(idpaquete: number, matricula: string): Promise<IdocumentoEntregado[]> {
    const qry =
      `SELECT * FROM documento_alumno WHERE matricula = ? AND idpaquete = ?;`,
      params = [matricula, idpaquete];

    return this.executeQry(qry, ...params)
      .then((r) => Promise.resolve(r))
      .catch((err) => Promise.reject(err));
  }

  public getDocumentosEntregadosByPaquete(idpaquete: number, matricula: string): Promise<IdocumentoEntregado[]> {
    const
      qry =
        `SELECT * FROM documento_alumno WHERE idpaquete = ? AND matricula = ?;`,
      params = [idpaquete, matricula];
    return this.executeQry(qry, ...params)
      .then((r) =>
        (r.length > 0) ?
          Promise.resolve(r) :
          Promise.reject('No existen entregas realizadas.'))
      .catch((err) => Promise.reject(err));
  }

  public getDocumentoEntregadoById(idpaquete: number, iddocumento: number, matricula: string): Promise<IdocumentoEntregado> {
    const
      qry = `SELECT * FROM documento_alumno WHERE idpaquete = ? AND iddocumento = ? AND matricula = ?;`,
      params = [idpaquete, iddocumento, matricula];
    return this.executeQry(qry, ...params)
      .then((r) =>
        (r.length > 0) ?
          Promise.resolve(r[0]) :
          Promise.resolve())
      // Promise.reject('No existen entregas para el documento.'))
      .catch((err) => Promise.reject(err));
  }


  public isEntregado(idpaquete: number, iddocumento: number, matricula: string): Promise<string | boolean> {
    const
      qry = `SELECT * FROM documento_alumno WHERE idpaquete = ? AND iddocumento = ? AND matricula = ?;`,
      params = [idpaquete, iddocumento, matricula];

    return this.executeQry(qry, ...params)
      .then((res) => {
        if (res.length > 0) {
          fs.unlinkSync(res[0].ruta);
          return Promise.resolve(res[0].ruta);
        } else
          return Promise.resolve(false);

      })
      .catch((err) => Promise.reject(err));
  }


  public insertDocumentoEntregado(filename: string | undefined, matricula: string, idpaquete: number, iddocumento: number): Promise<string> {
    const
      qry = `INSERT INTO documento_alumno SET ?;`,
      params = { ruta: filename, matricula, idpaquete, iddocumento };

    return this.executeQry(qry, params)
      .then((respons) =>
        (respons.affectedRows > 0) ?
          Promise.resolve('Documento entregado con exito.') :
          Promise.reject())
      .catch((err) => Promise.reject('El archivo ya ha sido entregado.'));
  }

  public updateDocumentoEntregado(filename: string | undefined, oldPath: string, matricula: string, idpaquete: number, iddocumento: number): Promise<string> {
    const
      qry = `UPDATE documento_alumno SET ruta = ? WHERE idpaquete = ?  AND iddocumento = ? AND matricula = ?;`,
      params = [filename, idpaquete, iddocumento, matricula];

    return this.executeQry(qry, ...params)
      .then((respons) =>
        (respons.affectedRows > 0) ?
          Promise.resolve('Documento entregado con exito.') :
          Promise.reject())
      .catch((err) => Promise.reject('Error al actualizar el documento.'));
  }

  public Exist(iddocumento: number): Promise<boolean> {
    const qry =
      `SELECT COUNT(1) AS exist FROM documento WHERE iddocumento = ?; `,
      params = [iddocumento];

    return this.executeQry(qry, ...params)
      .then((respons) =>
        (Boolean(respons[0].exist)) ?
          Promise.resolve(true) :
          Promise.reject())
      .catch((err) => Promise.reject(err));
  }
}

export default new DocumentoModel();
