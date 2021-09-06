import { IError } from "./error.middleware";
// 500-999
export const ERRORS_MODEL = {
	AUTH: {// 500
		SESION: {
			UNDEFINED: <IError>{
				CODIGO: 501,
				ERROR: `errors.auth.sesion.undifinedd`,
				MENSAJE: `No fue posible iniciar sesión. Intente nuevamente.`,
			},
			INVALID: <IError>{
				CODIGO: 502,
				ERROR: `errors.auth.sesion.invalid`,
				MENSAJE: `Sesión de usuario invalida. Revalidacion de credenciales requerida.`,
			},
			FAILSINGOUT: <IError>{
				CODIGO: 503,
				ERROR: `errors.auth.sesion.fail`,
				MENSAJE: `No fue posible cerrar sesión. Intente nuevamente.`,
			},
		},
		INVALIDAUTH: <IError>{
			CODIGO: 510,
			ERROR: `errors.auth.invalid_credenciales`,
			MENSAJE: `No se pudo iniciar sesion. Usuario y/ó contraseña incorrectos.`,
		},
		INVALID: <IError>{
			CODIGO: 511,
			ERROR: `errors.auth.invalid`,
			MENSAJE: `Error en el servidor. No fue posible obtener la información del usuario.`,
		},
	},
	UNIDAD: { // 600
		NOTFOUNT: <IError>{
			CODIGO: 601,
			ERROR: `errors.unidad.notfount`,
			MENSAJE: `La unidad academica no se encuentra registrada en el sistema.`,
		},
		NOTUPDATE: {
			CODIGO: 602,
			ERROR: `errors.unidad.update`,
			MENSAJE: `No se realizaron cambios en la información de la unidad academica.`,
		},
		DUPLICATE: <IError>{
			CODIGO: 603,
			ERROR: `errors.unidad.duplicate`,
			MENSAJE: `La unidad academica ya se encuentra registrada en el sistema.`,
		},
		EMAILDUPLICATE: <IError>{
			CODIGO: 604,
			ERROR: `errors.unidad.email.duplicate`,
			MENSAJE: `El coreo electronico proporcionado ya se encuentra registrado.`,
		},
	},
};