import DB from '../database';
import { Erol, Iusuario } from './model.model';

class UserModel {

  /**
   * Valida las credenciales de usuario y obtiene el rol y id del usuario
   * @param email 
   * @param password 
   * @returns {Promise<Iusuario>}
   */
  public singIn(email: string, password: string): Promise<Iusuario> {
    return new Promise((resolve, reject) => {
      //se verifica la existencia del usuario, si existe se toma el idusuario y el rol
      DB.query(
        `SELECT idusuario, rol FROM usuario WHERE email = ? AND password = ? AND estatus = 'a'`,
        [email, password],
        (err, res, fields) => {
          if (err) reject({ err });
          resolve(res[0]);
        });
    });
  }

  /**
   * Obtiene la informacion personal de un usario
   * @param rol 
   * @param idusuario 
   * @returns 
   */
  public getUsuarioById(idusuario: number): Promise<Iusuario> {
    return new Promise((resolve, reject) => {
      DB.query(
        `SELECT * FROM usuario WHERE idusuario = ?`,
        [idusuario],
        (err, res, fields) => {
          if (err) reject(err);
          resolve(res[0]);
        });
    });
  }

  /**
   * Inserta la bandera de sesion y actualiza la hora de su ultima conexion
   * @param token 
   * @param idusuario 
   * @returns 
   */
  public insertSesion(idusuario: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      DB.query(
        `UPDATE usuario SET sesion_conectada = 'a', ultima_conexion = NOW() WHERE idusuario = ?`,
        [idusuario],
        (err, res, fields) => {
          if (err) reject(err);
          if (res.affectedRows > 0) resolve(true);
          else reject(false);
        });
    });
  }

  /**
   * Establece el valor de la bandera de sesion en 'b'
   * @param idusuario 
   * @returns 
   */
  public deleteSesion(idusuario: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      DB.query(
        `UPDATE usuario SET sesion_conectada = 'b' WHERE idusuario = ?`,
        [idusuario],
        (err, res, fields) => {
          if (err) reject(err);
          if (res.affectedRows > 0) resolve(true);
          else reject(false);
        });
    });
  }

  /**
   * Verifica si el usuario esta logueado. Se verifica si token esta definido dentro de la bd
   * @param idusuario 
   * @returns 
   */
  public isAuthenticate(idusuario: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      DB.query(
        `SELECT IF(sesion_conectada = 'a', 0, 1) AS isAuthenticate FROM usuario WHERE idusuario = ?`,
        [idusuario],
        (err, res, fields) => {
          if (err) reject(err);
          resolve(<boolean>!res[0].isAuthenticate);
        }
      );
    });
  }

  /**
   * Se proporciona el rol de usuario para validar los permisos de acceso a las rutas. 
   * @param {Iusuario} idusuario 
   * @param {Erol} rol 
   * @returns {Promise<boolean>}
   */
  public isRol(idusuario: number, rol: Erol): Promise<boolean> {
    return new Promise((resolve, reject) => {
      DB.query(
        `SELECT IF(rol = ?, 0, 1) AS isRol FROM usuario WHERE idusuario = ?`,
        [rol, idusuario],
        (err, res, fields) => {
          if (err) reject(err);
          resolve(<boolean>!res[0].isRol);
        }
      );
    });
  }
}

export default new UserModel();