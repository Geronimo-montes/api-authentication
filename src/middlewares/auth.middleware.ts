import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import config from '../config/config';
import jwt from 'jsonwebtoken';
import userModel from '../models/user.model';
import { Erol, Iusuario } from '../models/model.model';
import { ERRORS_VALIDATOR } from '../errors/error.validators';
import { ERRORS_MODEL } from '../errors/error.controler';

/**
 * Genera el token de acceso apartir de los datos de usuario
 * @param usuario 
 * @returns 
 */
export const createToken = (usuario: Iusuario) => {
  return jwt.sign(
    { usuario: usuario },
    config.jwtSecret,
    { expiresIn: 86400 }//24 horas
  );
}

/**
 * Obtenemos la data del token en las cabezeras BearerToken
 * {id, email}
 */
const OPTIONS: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
};

/**
 * Funcion que valida los permisos de usuario. Encapsula la logica en una sola funcion dado que por cada rol se tiene que crear una funcion escucha.
 * @param usuario 
 * @param rol 
 * @returns 
 */
const ValidacionPermisos = (usuario: Iusuario, rol: Erol): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {

    if (!usuario)
      reject(ERRORS_VALIDATOR.AUTH.TOKEN.INVALID);

    const isAuthenticate = await userModel.isAuthenticate(usuario.idusuario);

    if (isAuthenticate) {
      const isRol = await userModel.isRol(usuario.idusuario, rol);
      resolve(isRol);
    } else {
      reject(ERRORS_MODEL.AUTH.SESION.UNDEFINED);
    }
  });
};

/**
 * Middleware para validacion de sesion y permisos de director
 */
export const AuthDirectorMiddleware = new Strategy(OPTIONS, async (payload, done) => {
  ValidacionPermisos(payload.usuario, Erol.DIRECTOR)
    .then((isAutorize: boolean) => done(null, (isAutorize) ? payload.usuario : null))
    .catch((err) => done(err, null));
});

/**
 * Middleware para validacion de sesion y permisos de auxiliar
 */
export const AuthAuxiliarMiddleware = new Strategy(OPTIONS, async (payload, done) => {
  ValidacionPermisos(payload.usuario, Erol.AUXILIAR)
    .then((isAutorize: boolean) => done(null, (isAutorize) ? payload.usuario : null))
    .catch((err) => done(err, null));
});

/**
 * Middleware para validacion de sesion y permisos de jefatura
 */
export const AuthJefaturaMiddleware = new Strategy(OPTIONS, async (payload, done) => {
  ValidacionPermisos(payload.usuario, Erol.JEFATURA)
    .then((isAutorize: boolean) => done(null, (isAutorize) ? payload.usuario : null))
    .catch((err) => done(err, null));
});
