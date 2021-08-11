import { Iusuario } from "../models/model.model";
import config from '../config/config';
import jwt from 'jsonwebtoken';

/**
 * Genera el token de acceso apartir de los datos de usuario
 * @param usuario 
 * @returns 
 */
export const createToken = function (usuario: Iusuario) {
  return jwt.sign(
    { usuario: usuario },
    config.jwtSecret,
    { expiresIn: 86400 }//24 horas
  );
}

/**
 * Obtiene la data contenidona en el token. Informacion del usuario
 * @param token 
 * @returns 
 */
export const getDataOfToken = function (token: string): any {
  return <any>jwt.verify(token, config.jwtSecret);
}

/**
 * Recupera el token de las cabezeras y elimina el texto Bearer
 * @param headers 
 * @returns 
 */
export const getToken = (headers: any): string => {
  return headers['authorization']?.substring(7);
}
