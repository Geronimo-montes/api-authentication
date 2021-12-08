import jwt from 'jsonwebtoken';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';

import config from '@config/config';
import userModel from '@models/auth.model';
import { Iusuario } from '@models/interface/usuario.interface';
import { Erol } from '@models/interface/common.interface';

/**
 * Genera el token de acceso apartir de los datos de usuario
 * @param {Iusuario} usuario 
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
 * Capa de autenticacion. Valida que el usuario tenga sesion activa , ademas de pertenercer a los roles definidos.
 */
export const isAuthenticate = new Strategy(OPTIONS, async (payload, done) => {
  new Promise(async (resolve, reject) => {
    // SI EL TOKEN ES INVALIDO USUARIO NO ESTARIA DEFINIDO
    if (!payload.usuario) reject(`El token de sesión proporcionado no es valido.`);
    // CON EL ID DEL USUARIO CONSULTAMOS LA BD, VERIFICANDO SI EL USUAIRO ESTA ONLINE
    const isAuthenticate = await userModel.isAuthenticate(payload.usuario.idusuario);
    // VERIFICAMOS QUE EL ROL PRETENESCA A UNO DE LOS DEFINIDOS EN EL SISTEMA
    const isVAlidRol = [Erol.AUXILIAR, Erol.JEFATURA, Erol.DIRECTOR]
      .find(valor => valor === payload.usuario.rol);
    // RESPUESTA PARA VALIDACION SIN ERRORES
    if (isAuthenticate && isVAlidRol) resolve(isAuthenticate);
    // MENSAJE DE ERROR EN CASO DE UNA VALIDACION CON ERROR
    else reject(`No fue posible iniciar sesión. Intente nuevamente.`);
  })
    .then((isAutorize) => done(null, (isAutorize) ? payload.usuario : null))
    .catch((err) => done(err, null));
});

/**
 * Es utilizada despues de la capa de middleware isAuthenticate. Valida que el rol del usuario tenga privilegios de administrador.
 */
export const isAdmin = new Strategy(OPTIONS, async (payload, done) => {
  new Promise(async (resolve, reject) => {
    // SI EL TOKEN ES INVALIDO USUARIO NO ESTARIA DEFINIDO
    if (!payload.usuario) reject(`El token de sesión proporcionado no es valido.`);
    // VERIFICAMOS QUE EL ROL DEL USUARIO SEA DIRECTOR
    const isAdmin = payload.usuario.rol === Erol.DIRECTOR;
    // RESPUESTA PARA VALIDACION SIN ERRORES
    if (isAdmin) resolve(isAdmin);
    // MENSAJE DE ERROR EN CASO DE UNA VALIDACION CON ERROR
    else reject(`Sesión de usuario invalida. Inicie sesion de nuevo.`);
  })
    .then((isAdmin) => done(null, (isAdmin) ? payload.usuario : null))
    .catch((err) => done(err, null));
});
