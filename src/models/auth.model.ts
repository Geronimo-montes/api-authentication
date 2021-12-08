import DB from '@helpers/database';
import { Iusuario } from './interface/usuario.interface';
import { Erol } from './interface/common.interface';

class AuthModel {

  /**
   * Busca el si el correo esta registrado en la base de datos. 
   */
  public findOne(email: string): Promise<boolean> {
    const qry = `SELECT email FROM usuario WHERE email = ?`;
    return new Promise((resolve, reject) => {
      DB.query(qry, [email], (err, res, fields) => {
        if (err) reject(err);
        if (res.length > 0) resolve(true);
        else reject();
      });
    });
  }

  /**
   * Valida las credenciales de usuario y obtiene el rol y id del usuario
   */
  public singIn(email: string, password: string): Promise<number> {
    const qry = `SELECT idusuario FROM usuario WHERE email = ? AND password = ? AND estatus = 'a'`;
    return new Promise((resolve, reject) => {
      DB.query(qry, [email, password], (err, res, fields) => {
        if (err) reject(err);
        if (res.length > 0) resolve(res[0].idusuario);
        else reject();
      });
    });
  }

  /**
   * Obtiene la informacion personal de un usario
   */
  public getUsuarioById(idusuario: number): Promise<Iusuario> {
    const qry = `SELECT * FROM usuario WHERE idusuario = ? AND estatus = 'a' LIMIT 1`;
    return new Promise((resolve, reject) => {
      DB.query(qry, [idusuario], (err, res, fields) => {
        if (err) reject(err);
        if (res.length > 0) resolve(res[0]);
        else reject();
      });
    });
  }

  /**
   * Inserta la bandera de sesion y actualiza la hora de su ultima conexion
   */
  public insertSesion(idusuario: number): Promise<number> {
    const qry = `UPDATE usuario SET sesion_conectada = 'a', ultima_conexion = NOW() WHERE idusuario = ?`;
    return new Promise((resolve, reject) => {
      DB.query(qry, [idusuario], (err, res, fields) => {
        if (err) reject(err);
        if (res.affectedRows > 0) resolve(idusuario);
        else reject();
      });
    });
  }

  /**
   * Establece el valor de la bandera de sesion en 'b'
   */
  public deleteSesion(idusuario: number): Promise<boolean> {
    const qry = `UPDATE usuario SET sesion_conectada = 'b' WHERE idusuario = ?`;

    return new Promise((resolve, reject) => {
      DB.query(qry, [idusuario], (err, res, fields) => {
        if (err) reject(err);

        if (res.affectedRows > 0)
          resolve(true);
        else if (res.affectedRows === 0)
          reject(`No fue posible cerrar sesión. Intente nuevamente.`)
        else reject();
      });
    });
  }

  /**
   * Verifica si el usuario esta logueado. Se verifica si token esta definido dentro de la bd
   */
  public isAuthenticate(idusuario: number): Promise<boolean> {
    const qry = `SELECT IF(sesion_conectada = 'a', true, false) AS isAuthenticate FROM usuario WHERE idusuario = ?`;

    return new Promise((resolve, reject) => {
      DB.query(qry, [idusuario], (err, res, fields) => {
        if (err) reject(err);
        const isAuthenticate = Boolean(res[0].isAuthenticate);
        resolve(isAuthenticate);
      });
    });
  }

  /**
   * Se proporciona el rol de usuario para validar los permisos de acceso a las rutas. 
   */
  public isRol(idusuario: number, rol: Erol): Promise<boolean> {
    const qry = `SELECT IF(rol = ?, true, false) AS isRol FROM usuario WHERE idusuario = ?`;
    return new Promise((resolve, reject) => {
      DB.query(qry, [rol, idusuario], (err, res, fields) => {
        if (err) reject(err);
        const isRol = Boolean(res[0].isRol);
        resolve(isRol);
      });
    });
  }
}

export default new AuthModel();