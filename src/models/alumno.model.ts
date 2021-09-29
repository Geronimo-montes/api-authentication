import DB from '../database';
import { Ialumno } from './model.model';

class AlumnoModel {

  /**
   * Lista la informacion de los alumnos de una unidad académica. ordenados por estatus
   * @param {number} claveUnidad 
   * @returns {Promise<Ialumno[]>}
   */
  public getAllAlumnosByUnidadAcademica(claveUnidad: string): Promise<Ialumno[]> {
    const qry =
      `SELECT * FROM alumno WHERE clave = ? ORDER BY estatus, matricula;`;

    return new Promise((resolve, reject) => {
      DB.query(qry, [claveUnidad], (err, res, fields) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }

  /**
   * Lista los datos de un alumno mediante la matricula.
   * @param {string} matricula 
   * @returns {Promise<Ialumno>}
   * @throws {ERRORS_MODEL.ALUMNO.NOTFOUNT}
   */
  public getAlumnoByMatricula(matricula: string): Promise<Ialumno> {
    const qry = `SELECT * FROM alumno WHERE matricula = ?`;

    return new Promise((resolve, reject) => {
      DB.query(qry, [matricula], (err, res, fields) => {
        if (err) reject(err);
        if (res.length > 0) resolve(res[0]);
        else reject();
      });
    });
  }

  /**
   * Actualiza la informacion general de un alumno
   * @param {Ialumno} data
   * @returns {Promise<string>}
   * @throws {ERRORS_MODEL.ALUMNO.NOTUPDATE}
   */
  public updateAlumno(data: Ialumno): Promise<string> {
    const qry =
      `UPDATE alumno SET nombre = ?, ape_1 = ?, ape_2 = ?, genero = ?, direccion = ?, telefono = ?, email = ? WHERE matricula = ?;`;

    const params = [
      data.nombre,
      data.ape_1,
      data.ape_2,
      data.genero,
      data.direccion,
      data.telefono,
      data.email,
      data.matricula,
    ];

    return new Promise((resolve, reject) => {
      DB.query(qry, params, (err, res, fields) => {
        if (err) reject(err);
        if (res.affectedRows > 0) resolve(`Datos del alumno actualizados con exito`);
        else reject();
      });
    });
  }

  public putAlumnoEstatus(matricula: string, estatus: string): Promise<string> {
    const qry =
      `UPDATE alumno SET estatus = ? WHERE matricula = ?;`;

    return new Promise((resolve, reject) => {
      DB.query(qry, [estatus, matricula], (err, res, fields) => {
        if (err) reject(err);
        if (res.affectedRows > 0)
          resolve(`Alumno con matricula ${matricula} dado de ${(estatus === 'a') ? 'alta' : 'baja'} del sistema.`);
        else reject();
      });
    });
  }

  /**
   * Registra un alumno en la base de datos
   * @param {Ialumno} data
   * @returns {Promise<boolean>}
   */
  public newAlumno(data: Ialumno): Promise<string> {
    const
      qry = `INSERT INTO alumno SET ?;`,
      insertData = {
        perfil: `http://localhost:3000/static/${data.perfil}`,
        matricula: data.matricula,
        clave: data.clave,
        nombre: data.nombre,
        ape_1: data.ape_1,
        ape_2: data.ape_2,
        genero: data.genero,
        direccion: data.direccion,
        telefono: data.telefono,
        email: data.email,
      };

    return new Promise((resolve, reject) => {
      DB.query(qry, insertData, (err, res, fields) => {
        if (err) return reject(err);
        if (res.affectedRows > 0) resolve(`Alumno registrado con exito.`);
        else reject();
      });
    });
  }

  /**
   * Valida si la matricula ya esta registrada en la base de datos. 
   * @param {string} matricula 
   * @returns {Promise<boolean>} 
   * @throws {ERRORS_MODEL.UNIDAD.NOTFOUNT}
   */
  public exists(matricula: string): Promise<boolean> {
    const qry = `SELECT COUNT(1) AS exist FROM alumno WHERE matricula = ?; `;

    return new Promise((resolve, reject) => {
      DB.query(qry, [matricula], (err, res, fields) => {
        if (err) reject(err);

        const exist = Boolean(res[0].exist)
        if (exist) resolve(exist);
        else reject();
      });
    });
  }

  /**
   * Valida si la matricula ya esta registrada en la base de datos. Para evitar duplicidad en los registros.
   * @param {string} matricula 
   * @returns {Promise<boolean>} 
   * @throws {ERRORS_MODEL.UNIDAD.DUPLICATE}
   */
  public isRegistrer(matricula: string): Promise<boolean> {
    const qry = `SELECT COUNT(1) AS isRegistrer FROM alumno WHERE matricula = ?; `;

    return new Promise((resolve, reject) => {
      DB.query(qry, [matricula], (err, res, fields) => {
        if (err) reject(err);

        const isRegistrer = !Boolean(res[0].isRegistrer)
        if (isRegistrer) resolve(isRegistrer);
        else reject();
      });
    });
  }


  /**
   * Valida si el email ya esta registrado en la base de datos. Para evitar duplicidad en los registros.
   * @param {string} email 
   * @returns {Promise<boolean>} 
   * @throws {ERRORS_MODEL.UNIDAD.EMAILDUPLICATE}
   */
  public emailIsRegistrer(email: string): Promise<boolean> {
    const qry = `SELECT COUNT(1) AS isRegistrer FROM alumno WHERE email = ?; `;

    return new Promise((resolve, reject) => {
      DB.query(qry, [email], (err, res, fields) => {
        if (err) reject(err);

        const isRegistrer = !Boolean(res[0].isRegistrer)
        if (isRegistrer) resolve(isRegistrer);
        else reject();
      });
    });
  }
}

export default new AlumnoModel();