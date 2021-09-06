import DB from '../database';
import { Erol, Iusuario } from './model.model';

class EmpleadoModel {

  /**
   * Lista los datos de los empleados con rol: auxiliar y jefatura. En caso de ser auxiliar se realiza una consulta para obtener los datos de la jefatura asignada
   * @returns {Promise<Iusuario[]>}
   */
  public getAllEmpleados(): Promise<Iusuario[]> {
    return new Promise((resolve, reject) => {
      DB.query(
        `SELECT
          idusuario,
          perfil,
          email,
          password,
          rol,
          sesion_conectada,
          idunidad,
          idjefatura,
          nombre,
          ape_1,
          ape_2,
          telefono,
          ultima_conexion,
          estatus
        FROM usuario WHERE rol IN (? , ?) ORDER BY estatus, CONCAT(nombre, ' ', ape_1, ' ', ape_2)`,
        [Erol.AUXILIAR, Erol.JEFATURA],
        async (err, res, fields) => {
          if (err) reject(err);

          let empleados: Iusuario[] = [];
          for (let i = 0; i < res.length; i++) {
            let jefatura = null;

            if (res[i].idjefatura) {
              await this.getEmpleadoByid(res[i].idjefatura)
                .then(data => jefatura = data)
                .catch(err => console.log(err));
            }

            empleados.push({
              ...res[i],
              dataJefatura: jefatura
            });
          }
          console.log({ empleados });

          resolve(empleados);
        });
    });
  }

  public getAllEmpleadosByUnidad(idunidad: number): Promise<Iusuario[]> {
    return new Promise((resolve, reject) => {
      DB.query(
        `SELECT
          idusuario,
          perfil,
          email,
          password,
          rol,
          sesion_conectada,
          idunidad,
          idjefatura,
          nombre,
          ape_1,
          ape_2,
          telefono,
          ultima_conexion,
          estatus
        FROM usuario WHERE idunidad = ? ORDER BY estatus, CONCAT(nombre, ' ', ape_1, ' ', ape_2)`,
        [idunidad],
        async (err, res, fields) => {
          if (err) reject(err);

          let empleados: Iusuario[] = [];
          for (let i = 0; i < res.length; i++) {
            let jefatura = null;

            if (res[i].idjefatura) {
              await this.getEmpleadoByid(res[i].idjefatura)
                .then(data => jefatura = data)
                .catch(err => console.log(err));
            }

            empleados.push({
              ...res[i],
              dataJefatura: jefatura
            });
          }
          console.log({ empleados });

          resolve(empleados);
        });
    });
  }

  public getEmpleadoByid(idempleado: number): Promise<Iusuario> {
    return new Promise((resolve, reject) => {
      DB.query(
        `SELECT * FROM usuario WHERE idusuario = ?`,
        [idempleado],
        (err, res, fields) => {
          if (err) reject(err);

          if (res.length > 0)
            resolve(res[0]);
          else
            reject('No existen resultados para mostrar.')
        });
    });
  }

  public updateEmpleado(data: Iusuario): Promise<boolean> {
    return new Promise((resolve, reject) => {
      DB.query(
        `UPDATE usuario SET
          perfil = ?,
          email = ?,
          rol = ?,
          idunidad = ?,
          idjefatura = ?,
          nombre = ?,
          ape_1 = ?,
          ape_2 = ?,
          telefono = ?,
          estatus = ?
        WHERE idusuario = ?`,
        [
          data.perfil,
          data.email,
          data.rol,
          data.idunidad,
          data.idjefatura,
          data.nombre,
          data.ape_1,
          data.ape_2,
          data.telefono,
          data.estatus,
          data.idusuario,
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

  public newEmpleado(empleado: Iusuario): Promise<boolean> {
    return new Promise((resolve, reject) => {
      DB.query(
        `INSERT INTO usuario (
          perfil, email, password, rol, idunidad, nombre, ape_1, ape_2, telefono
        ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          'http://localhost:3000/static/default.png',
          empleado.email,
          empleado.password,
          empleado.rol,
          empleado.idunidad,
          empleado.nombre,
          empleado.ape_1,
          empleado.ape_2,
          empleado.telefono,
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

export default new EmpleadoModel();