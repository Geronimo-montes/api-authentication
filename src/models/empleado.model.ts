import DB from '../database';
import { Erol, Iusuario } from './model.model';

class EmpleadoModel {

  /**
   * Lista los datos de los empleados con rol: auxiliar y jefatura. En caso de ser auxiliar se realiza una consulta para obtener los datos de la jefatura asignada
   * @returns {Promise<Iusuario[]>}
   */
  public getAllEmpleados(): Promise<Iusuario[]> {
    const qry = `SELECT 
    idusuario, perfil, email, password, rol, sesion_conectada, clave, idjefatura, nombre, ape_1, ape_2, telefono, ultima_conexion, estatus 
    FROM usuario WHERE rol IN (? , ?) ORDER BY estatus, CONCAT(nombre, ' ', ape_1, ' ', ape_2)`;

    return new Promise((resolve, reject) => {
      DB.query(qry, [Erol.AUXILIAR, Erol.JEFATURA], async (err, res, fields) => {
        if (err) reject(err);

        let empleados: Iusuario[] = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].idjefatura)
            await this.getEmpleadoByid(res[i].idjefatura)
              .then(data => empleados.push({ ...res[i], dataJefatura: data }))
              .catch(err => reject(err));
        }

        resolve(empleados);
      });
    });
  }

  public getAllEmpleadosByUnidad(clave: string): Promise<Iusuario[]> {
    const qry = `SELECT idusuario, perfil, email, password, rol, sesion_conectada, clave, idjefatura, nombre, ape_1, ape_2, telefono, ultima_conexion, estatus FROM usuario WHERE clave = ? ORDER BY estatus, CONCAT(nombre, ' ', ape_1, ' ', ape_2)`;

    return new Promise((resolve, reject) => {
      DB.query(qry, [clave], async (err, res, fields) => {
        if (err) reject(err);

        let empleados: Iusuario[] = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].idjefatura)
            await this.getEmpleadoByid(res[i].idjefatura)
              .then(data => empleados.push({ ...res[i], dataJefatura: data }))
              .catch(err => reject(err));
        }

        resolve(empleados);
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
        `UPDATE usuario SET email = ?, rol = ?, clave = ?, idjefatura = ?, nombre = ?, ape_1 = ?, ape_2 = ?, telefono = ?, estatus = ? WHERE idusuario = ?`,
      params = [
        data.email,
        data.rol,
        data.clave,
        data.idjefatura,
        data.nombre,
        data.ape_1,
        data.ape_2,
        data.telefono,
        data.estatus,
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