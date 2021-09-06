import { ERRORS_MODEL } from '../errors/error.controler';
import DB from '../database';
import { Erol, Iusuario } from './model.model';
import { ERRORS_VALIDATOR } from '../errors/error.validators';

class UserModel {

  /**
   * Busca el si el correo esta registrado en la base de datos. 
   * @param email 
   * @returns {Promise<boolean>} true: para el caso de que si esta registrado. false: si no se encuntra registrado.
   */
  public findOne(email: string): Promise<boolean> {
    const qry = `SELECT email FROM usuario WHERE email = ?`;
    return new Promise((resolve, reject) => {
      DB.query(qry, [email], (err, res, fields) => {
        if (err) reject({ err });
        if (res.length > 0) resolve(true);
        else reject(ERRORS_VALIDATOR.AUTH.EMAIL.NOTFOUNT);
      });
    });
  }

  /**
   * Valida las credenciales de usuario y obtiene el rol y id del usuario
   * @param email 
   * @param password 
   * @returns {Promise<Iusuario>}
   */
  public singIn(email: string, password: string): Promise<number> {
    const qry = `SELECT idusuario FROM usuario WHERE email = ? AND password = ? AND estatus = 'a'`;
    return new Promise((resolve, reject) => {
      DB.query(qry, [email, password], (err, res, fields) => {
        if (err) reject({ err });
        if (res.length > 0) resolve(res[0]);
        else reject(ERRORS_MODEL.AUTH.INVALIDAUTH);
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
    const qry = `SELECT * FROM usuario WHERE idusuario = ? AND estatus = 'a' LIMIT 1`;
    return new Promise((resolve, reject) => {
      DB.query(qry, [idusuario], (err, res, fields) => {
        if (err) reject(err);
        if (res.length > 0) resolve(res[0]);
        else reject(ERRORS_MODEL.AUTH.INVALID);
      });
    });
  }

  /**
   * Inserta la bandera de sesion y actualiza la hora de su ultima conexion
   * @param token 
   * @param idusuario 
   * @returns 
   */
  public insertSesion(idusuario: number): Promise<number> {
    const qry = `UPDATE usuario SET sesion_conectada = 'a', ultima_conexion = NOW() WHERE idusuario = ?`;
    return new Promise((resolve, reject) => {
      DB.query(qry, [idusuario], (err, res, fields) => {
        if (err) reject(err);
        if (res.affectedRows > 0) resolve(idusuario);
        else reject(ERRORS_MODEL.AUTH.SESION.UNDEFINED);
      });
    });
  }

  /**
   * Establece el valor de la bandera de sesion en 'b'
   * @param idusuario 
   * @returns 
   */
  public deleteSesion(idusuario: number): Promise<boolean> {
    const qry = `UPDATE usuario SET sesion_conectada = 'b' WHERE idusuario = ?`;
    return new Promise((resolve, reject) => {
      DB.query(qry, [idusuario], (err, res, fields) => {
        if (err) reject(err);
        if (res.affectedRows > 0) resolve(true);
        else if (res.affectedRows === 0) reject(ERRORS_MODEL.AUTH.SESION.FAILSINGOUT)
        else reject(ERRORS_MODEL.AUTH.SESION.FAILSINGOUT);
      });
    });
  }

  /**
   * Verifica si el usuario esta logueado. Se verifica si token esta definido dentro de la bd
   * @param idusuario 
   * @returns 
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
   * @param {Iusuario} idusuario 
   * @param {Erol} rol 
   * @returns {Promise<boolean>}
   */
  public isRol(idusuario: number, rol: Erol): Promise<boolean> {
    const qry = `SELECT IF(rol = ?, true, false) AS isRol FROM usuario WHERE idusuario = ?`;
    return new Promise((resolve, reject) => {
      DB.query(qry, [rol, idusuario], (err, res, fields) => {
        if (err) reject(err);
        const isRol = Boolean(res[0].isRol);
        resolve(isRol);
      }
      );
    });
  }
}

export default new UserModel();