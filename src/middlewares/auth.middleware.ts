import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import config from '../config/config';
import userModel from '../models/user.model';
import { Erol, Iusuario } from '../models/model.model';

/**
 * Obtenemos la data del token en las cabezeras BearerToken
 * {id, email}
 */
const OPTIONS: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
};

/**
 * Middleware para validacion de sesion y permisos de director
 */
export const AuthDirectorMiddleware = new Strategy(OPTIONS, async (payload, done) => {
  const isAuthenticate = await userModel.isAuthenticate(payload.usuario.idusuario);

  if (isAuthenticate) {
    const isRol = await userModel.isRol(payload.usuario.idusuario, Erol.DIRECTOR);

    if (isRol) {
      const usuario: Iusuario = await userModel.getUsuarioById(payload.usuario.idusuario);
      return done(null, usuario);
    }

    return done(null, null);
  }
});

/**
 * Middleware para validacion de sesion y permisos de auxiliar
 */
export const AuthAuxiliarMiddleware = new Strategy(OPTIONS, async (payload, done) => {
  const isAuthenticate = await userModel.isAuthenticate(payload.usuario.idusuario);

  if (isAuthenticate) {
    const isRol = await userModel.isRol(payload.usuario.idusuario, Erol.AUXILIAR);

    if (isRol) {
      const usuario = await userModel.getUsuarioById(payload.usuario.idusuario);
      return done(null, usuario);
    }

    return done(null, null);
  }
});

/**
 * Middleware para validacion de sesion y permisos de jefatura
 */
export const AuthJefaturaMiddleware = new Strategy(OPTIONS, async (payload, done) => {
  const isAuthenticate = await userModel.isAuthenticate(payload.usuario.idusuario);

  if (isAuthenticate) {
    const isRol = await userModel.isRol(payload.usuario.idusuario, Erol.JEFATURA);

    if (isRol) {
      const usuario = await userModel.getUsuarioById(payload.usuario.idusuario);
      return done(null, usuario);
    }

    return done(null, null);
  }
});

