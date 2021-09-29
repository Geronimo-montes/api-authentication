import DB from '../database';
import { Erol, Iusuario } from './model.model';

class EmpleadoModel {

  /**
   * Lista los datos de los empleados con rol: auxiliar y jefatura. En caso de ser auxiliar se realiza una consulta para obtener los datos de la jefatura asignada
   * @returns {Promise<Iusuario[]>}
   */
  public async getAllEmpleados(): Promise<Iusuario[]> {
    const qry =
      `SELECT
      usuario.idusuario AS idusuario,
      usuario.perfil AS perfil,
      usuario.email AS email,
      usuario.password AS password,
      usuario.rol AS rol,
      usuario.sesion_conectada AS sesion_conectada,
      usuario.clave AS clave,
      usuario.idjefatura AS idjefatura,
      CONCAT(u.nombre, ' ', u.ape_1, ' ', u.ape_2) as jefatura,
      usuario.nombre AS nombre,
      usuario.ape_1 AS ape_1,
      usuario.ape_2 AS ape_2,
      usuario.telefono AS telefono,
      usuario.ultima_conexion AS ultima_conexion,
      usuario.estatus AS estatus
    FROM usuario
    LEFT JOIN usuario AS u ON usuario.idjefatura = u.idusuario
    WHERE usuario.rol IN (? , ?)
    ORDER BY usuario.estatus, CONCAT(usuario.nombre,' ',usuario.ape_1,' ',usuario.ape_2)`;

    return new Promise(async (resolve, reject) => {
      DB.query(qry, [Erol.AUXILIAR, Erol.JEFATURA], (err, res, fields) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }

  public getAllEmpleadosByUnidad(clave: string): Promise<Iusuario[]> {
    const qry =
      `SELECT
      usuario.idusuario AS idusuario,
      usuario.perfil AS perfil,
      usuario.email AS email,
      usuario.password AS password,
      usuario.rol AS rol,
      usuario.sesion_conectada AS sesion_conectada,
      usuario.clave AS clave,
      usuario.idjefatura AS idjefatura,
      CONCAT(u.nombre, ' ', u.ape_1, ' ', u.ape_2) as jefatura,
      usuario.nombre AS nombre,
      usuario.ape_1 AS ape_1,
      usuario.ape_2 AS ape_2,
      usuario.telefono AS telefono,
      usuario.ultima_conexion AS ultima_conexion,
      usuario.estatus AS estatus
    FROM usuario
    LEFT JOIN usuario AS u ON usuario.idjefatura = u.idusuario
    WHERE usuario.clave = ? AND usuario.rol IN (? , ?)
    ORDER BY usuario.estatus, CONCAT(usuario.nombre,' ',usuario.ape_1,' ',usuario.ape_2)`;

    return new Promise((resolve, reject) => {
      DB.query(qry, [clave, Erol.AUXILIAR, Erol.JEFATURA], async (err, res, fields) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }

  public getEmpleadoByid(idempleado: number): Promise<Iusuario> {
    const qry = `SELECT * FROM usuario WHERE idusuario = ?`;

    return new Promise((resolve, reject) => {
      DB.query(qry, [idempleado], (err, res, fields) => {
        if (err) reject(err);
        if (res.length > 0) resolve(<Iusuario>res[0]);
        else reject();

      });
    });
  }

  public updateEmpleado(data: Iusuario): Promise<string> {
    const
      qry =
        `UPDATE usuario SET 
        email = ?,
        rol = ?,
        clave = ?,
        nombre = ?,
        ape_1 = ?,
        ape_2 = ?,
        telefono = ?
        WHERE idusuario = ?;`,

      params = [
        data.email,
        data.rol,
        data.clave,
        data.nombre,
        data.ape_1,
        data.ape_2,
        data.telefono,
        data.idusuario,
      ];

    return new Promise((resolve, reject) => {
      DB.query(qry, params, (err, res, fields) => {
        if (err) reject(err);
        if (res.affectedRows > 0) resolve(`Datos del empleado actualizados.`);
        else reject();
      });
    });
  }

  public updateEstatusEmpleado(idusuario: number, estatus: string): Promise<string> {
    const
      qry =
        `UPDATE usuario SET estatus = ? WHERE idusuario = ?`,
      params = [estatus, idusuario,];

    return new Promise((resolve, reject) => {
      DB.query(qry, params, (err, res, fields) => {
        if (err) reject(err);
        if (res.affectedRows > 0) resolve(`El empleado con id ${idusuario} ha sido dado de ${(estatus === 'a') ? 'alta' : 'bja'} del sistema.`);
        else reject();
      });
    });
  }

  public newEmpleado(data: Iusuario): Promise<string> {
    const
      qry = `INSERT INTO usuario SET ?;`,
      insertData = {
        perfil: `http://localhost:3000/static/${data.perfil}`,
        email: data.email,
        password: data.password,
        rol: data.rol,
        clave: data.clave,
        nombre: data.nombre,
        ape_1: data.ape_1,
        ape_2: data.ape_2,
        telefono: data.telefono,
      };

    return new Promise((resolve, reject) => {
      DB.query(qry, insertData, (err, res, fields) => {
        if (err) reject(err);
        if (res['affectedRows'] > 0) resolve(`Empleado registado con exito.`);
        else reject();
      });
    });
  }

  /**
 * Valida si la matricula ya esta registrada en la base de datos. 
 * @param {string} idempleado 
 * @returns {Promise<boolean>} 
 * @throws {ERRORS_MODEL.UNIDAD.NOTFOUNT}
 */
  public exists(idempleado: string): Promise<boolean> {
    const qry = `SELECT COUNT(1) AS exist FROM usuario WHERE idusuario = ?; `;

    return new Promise((resolve, reject) => {
      DB.query(qry, [idempleado], (err, res, fields) => {
        if (err) reject(err);

        const exist = Boolean(res[0].exist)
        if (exist) resolve(exist);
        else reject();
      });
    });
  }

  /**
   * Valida si la matricula ya esta registrada en la base de datos. Para evitar duplicidad en los registros.
   * @param {string} idempleado 
   * @returns {Promise<boolean>} 
   * @throws {ERRORS_MODEL.UNIDAD.DUPLICATE}
   */
  public isRegistrer(idempleado: string): Promise<boolean> {
    const qry = `SELECT COUNT(1) AS isRegistrer FROM usuario WHERE idusuario = ?; `;

    return new Promise((resolve, reject) => {
      DB.query(qry, [idempleado], (err, res, fields) => {
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
    const qry = `SELECT COUNT(1) AS isRegistrer FROM usuario WHERE email = ?; `;

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

export default new EmpleadoModel();