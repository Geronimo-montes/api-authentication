import jwt from 'jsonwebtoken';
import { Service } from "typedi";

import config from '@config';
import { IUser } from "@interfaces/IUser.interface";

@Service()
export default abstract class ServiceBase {
  constructor(
  ) { }

  /**
 * Genera el token de acceso con duracion de 1 hora.
 * @param {IUserInputDTO} user Datos de usuarios a registrar.
 * @returns {Promise<INewUser>} Usuario y token de acceso
 */
  protected generateToken({ _id, role, name, email, password, salt }: IUser) {
    return {
      user: { _id, role, name, email },
      token: jwt.sign(
        { _id, role, name, email },
        config.JWT.SECRET,
        // { expiresIn: 86400 }, //24 horas
        { expiresIn: 3153600 },   //1 año
      )
    };
  }
}