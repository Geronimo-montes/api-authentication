import DB from '../database';
import { Iunidadacademica } from './model.model';

class UnidadModel {

  /**
   * Lista las unidades registradas en el sistema
   * @returns {Promise<Iunidadacademica[]>}
   */
  public getAllUnidadesAcademicas(): Promise<Iunidadacademica[]> {
    const qry = `SELECT * FROM unidad ORDER BY estatus, clave;`;

    return new Promise((resolve, reject) => {
      DB.query(qry, [], (err, res, fields) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }

  /**
   * Lista los datos de una unidad académica atravez de su idunidad.
   * @param {number} clave 
   * @returns {Promise<Iunidadacademica>}
   * @throws {ERRORS_MODEL.UNIDAD.NOTFOUNT}
   */
  public getUnidadAcademicaById(clave: string): Promise<Iunidadacademica> {
    const qry = `SELECT * FROM unidad WHERE clave = ? LIMIT 1`;

    return new Promise((resolve, reject) => {
      DB.query(qry, [clave], (err, res, fields) => {
        if (err) reject(err);
        if (res.length > 0) resolve(res[0]);
        else reject();
      });
    });
  }

  /**
   * Actualiza los datos nombre, direccion, correo, telefono, estatus de una unidad academica
   * @param {Iunidadacademica} data datos de la unidad academica 
   * @returns {Promise<boolean>}
   * @throws {ERRORS_MODEL.UNIDAD.NOTUPDATE}
   */
  public updateUnidadAcademica(data: Iunidadacademica): Promise<string> {
    const qry =
      `UPDATE unidad SET nombre = ?, direccion = ?, correo = ?, telefono = ? WHERE clave = ?`;

    const params = [
      data.nombre,
      data.direccion,
      data.correo,
      data.telefono,
      data.clave
    ];

    return new Promise((resolve, reject) => {
      DB.query(qry, params, (err, res, fields) => {
        if (err) reject(err);
        if (res.affectedRows > 0) resolve(`Datos de la unidad académica actualizados con exito.`);
        else reject();
      });
    });
  }

  public putUnidadEstatus(clave: string, estatus: string): Promise<string> {
    const
      qry = `UPDATE unidad SET estatus = ? WHERE clave = ?;`,
      params = [estatus, clave];

    return new Promise((resolve, reject) => {
      DB.query(qry, params, (err, res, fields) => {
        if (err) reject(err);
        if (res.affectedRows > 0)
          resolve(`Unidad Academica ${clave} dada de  ${(estatus === 'a') ? 'alta' : 'baja'} del sistema.`);
        else reject();
      });
    });
  }

  /**
   * Actualiza los campos [clave, nombre, perfil, direccion, correo, telefono ] de la unidad academica proporcionada.
   * @param {Iunidadacademica} data 
   * @returns {Promise<boolean>}
   */
  public newUnidadAcademica(data: Iunidadacademica): Promise<string> {
    const qry = `INSERT INTO unidad SET ?;`;

    const insertData = {
      clave: data.clave,
      nombre: data.nombre,
      perfil: `http://localhost:3000/static/${data.perfil}`,
      direccion: data.direccion,
      correo: data.correo,
      telefono: data.telefono
    };

    return new Promise((resolve, reject) => {
      DB.query(qry, insertData, (err, res, fields) => {
        if (err) reject(err);
        if (res.affectedRows > 0) resolve(`Unidad académica registrada con exito.`);
        else reject();
      });
    });
  }

  /**
 * Valida si una unidad academica esta registrada mediante su clave. Para evitar duplicidad
 * @param {string} clave 
 * @returns
 * @throws {ERRORS_MODEL.UNIDAD.DUPLICATE}
 */
  public isRegistrer(clave: string): Promise<boolean> {
    const qry = `SELECT COUNT(1) AS isRegistrer FROM unidad WHERE clave = ?`;

    return new Promise((resolve, reject) => {
      DB.query(qry, [clave], (err, res, fields) => {
        if (err) reject(err);

        const isRegistrer = !Boolean(res[0].isRegistrer);
        if (isRegistrer) resolve(isRegistrer);
        else reject();
      });
    });
  }

  /**
   * Valida si el correo de la unidad ya esta registrado
   * @param {string} email 
   * @returns
   * @throws {ERRORS_MODEL.UNIDAD.EMAILDUPLICATE}
   */
  public emailIsRegistrer(email: string): Promise<boolean> {
    const qry = `SELECT COUNT(1) AS isRegistrer FROM unidad WHERE correo = ?;`;

    return new Promise((resolve, reject) => {
      DB.query(qry, [email], (err, res, fields) => {
        if (err) reject(err);

        const isRegistrer = !Boolean(res[0].isRegistrer);
        if (isRegistrer) resolve(isRegistrer);
        else reject();
      });
    });
  }

  /**
   * Valida la existencia de una unidad academica mediante su clave
   * @param {string} clave 
   * @returns {Promise<boolean>}
   * @throws {ERRORS_MODEL.UNIDAD.NOTFOUNT}
   */
  public exists(clave: string): Promise<boolean> {
    const qry = `SELECT COUNT(1) AS exist FROM unidad WHERE clave = ? `;

    return new Promise((resolve, reject) => {
      DB.query(qry, [clave], (err, res, fields) => {
        if (err) reject(err);

        const exist = Boolean(res[0].exist);
        if (exist) resolve(exist);
        else reject();
      });
    });
  }
}

export default new UnidadModel();