import { IError } from "./error.middleware";

// 0-499

export const ERRORS_VALIDATOR = {
	PARAMS: { // 200
		UNDEFINED: <IError>{
			CODIGO: 201,
			ERROR: `errors.param.undefined`,
			MENSAJE: `Faltan parametros para completar la solicitud.`,
		},
		INVALID: <IError>{
			CODIGO: 202,
			ERROR: `errors.params.invalid`,
			MENSAJE: `La petición contiene parametros invalidos.`,
		},
		EMPTY: <IError>{
			CODIGO: 203,
			ERROR: `errors.params.empty`,
			MENSAJE: `La petición contiene parametros que no contienen valor.`,
		},
	},
	AUTH: { // 100
		EMAIL: {
			UNDEFINED: <IError>{
				CODIGO: 101,
				ERROR: `errors.email.undefined`,
				MENSAJE: `Es obligatorio proporcionar el correo para iniciar seción.`,
			},
			INVALID: <IError>{
				CODIGO: 102,
				ERROR: `errors.email.invalid`,
				MENSAJE: `El correo proporcionado no pertenece a un formato valido.`,
			},
			NOTFOUNT: <IError>{
				CODIGO: 103,
				ERROR: `errors.email.not_fount`,
				MENSAJE: `EL correo proporcionado no se encuentra registrado.`,
			},
		},
		PASSWORD: {
			UNDEFINED: <IError>{
				CODIGO: 111,
				ERROR: `errors.password.undefined`,
				MENSAJE: `Es obligatorio proporcionar la contraseña para iniciar seción.`,
			},
			INVALID: <IError>{
				CODIGO: 112,
				ERROR: `errors.password.invalid`,
				MENSAJE: `El correo proporcionado no pertenece a un formato valido.`,
			},
		},
		TOKEN: {
			UNDEFINED: <IError>{
				CODIGO: 121,
				ERROR: `errors.token.undefined`,
				MENSAJE: `Es obligatorio proporcionar un token de sesion para continuar.`,
			},
			INVALID: <IError>{
				CODIGO: 122,
				ERROR: `errors.token.invalid`,
				MENSAJE: `El token de sesión proporcionado no es valido.`,
			},
			EXPIRES: <IError>{
				CODIGO: 123,
				ERROR: `errors.token.expires`,
				MENSAJE: `El token de sesión ha expirado.`,
			},
		},
	},
	UNIDAD: { // 300 corregir
		UNAUTORIZED: <IError>{
			CODIGO: 300,
			ERROR: `errors.unidad.unautorized`,
			MENSAJE: `El ususario no tiene permiso para consultar esta unidad academica.`,
		},
	},
	ALUMNO: {

	},
	DOCUMENTO: {

	},
	EMPLEADO: {

	},
};

/**
 export interface Iunidadacademica {
	idunidad: number;
	clave: string;
	nombre: string;
	direccion: string;
	correo: string;
	telefono: string;
	// perfil: string;
	// estatus: Eestatus;
};
 */