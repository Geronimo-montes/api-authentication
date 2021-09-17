/*!40101 SET NAMES utf8 */;
/*!40014 SET FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET SQL_NOTES=0 */;
CREATE DATABASE
/*!32312 IF NOT EXISTS*/
gestor_documentos
/*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE gestor_documentos;
DROP TABLE IF EXISTS unidad;
CREATE TABLE `unidad` (
  `clave` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `nombre` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `perfil` varchar(100) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'http://localhost:3000/static/default.png',
  `direccion` varchar(60) COLLATE utf8_spanish2_ci NOT NULL,
  `correo` varchar(60) COLLATE utf8_spanish2_ci NOT NULL,
  `telefono` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `estatus` varchar(1) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'a',
  PRIMARY KEY (`clave`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_spanish2_ci;
DROP TABLE IF EXISTS alumno;
CREATE TABLE `alumno` (
  `matricula` varchar(10) COLLATE utf8_spanish2_ci NOT NULL,
  `clave` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `perfil` varchar(100) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'http://localhost:3000/static/default.png',
  `nombre` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `ape_1` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `ape_2` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `genero` varchar(1) COLLATE utf8_spanish2_ci NOT NULL,
  `direccion` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `telefono` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `estatus` varchar(1) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'a',
  PRIMARY KEY (`matricula`),
  UNIQUE KEY `matricula` (`matricula`),
  KEY `FK_alumnoclaveunidad` (`clave`),
  CONSTRAINT `FK_alumnoclaveunidad` FOREIGN KEY (`clave`) REFERENCES `unidad` (`clave`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_spanish2_ci;
DROP TABLE IF EXISTS paquete_documento;
CREATE TABLE `paquete_documento` (
  `idpaquete` int(11) NOT NULL AUTO_INCREMENT,
  `ruta_imagen` varchar(100) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'http://localhost:3000/static/default.png',
  `nombre` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `descripcion` varchar(300) COLLATE utf8_spanish2_ci NOT NULL,
  `numero_documentos` tinyint(4) NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `estatus` varchar(1) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'a',
  PRIMARY KEY (`idpaquete`)
) ENGINE = InnoDB AUTO_INCREMENT = 13 DEFAULT CHARSET = utf8 COLLATE = utf8_spanish2_ci;
DROP TABLE IF EXISTS documento;
CREATE TABLE `documento` (
  `iddocumento` int(11) NOT NULL AUTO_INCREMENT,
  `idpaquete` int(11) NOT NULL,
  `nombre` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `formato` varchar(5) COLLATE utf8_spanish2_ci NOT NULL,
  `peso_max` tinyint(4) NOT NULL,
  `requerido` varchar(1) COLLATE utf8_spanish2_ci NOT NULL,
  `foto_ejemplo` varchar(100) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'http://localhost:3000/static/default.png',
  `estatus` varchar(1) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'a',
  PRIMARY KEY (`iddocumento`),
  KEY `FK_documentoidpaquete` (`idpaquete`),
  CONSTRAINT `FK_documentoidpaquete` FOREIGN KEY (`idpaquete`) REFERENCES `paquete_documento` (`idpaquete`)
) ENGINE = InnoDB AUTO_INCREMENT = 8 DEFAULT CHARSET = utf8 COLLATE = utf8_spanish2_ci;
DROP TABLE IF EXISTS documento_alumno;
CREATE TABLE `documento_alumno` (
  `ruta` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `matricula` varchar(10) COLLATE utf8_spanish2_ci NOT NULL,
  `idpaquete` int(11) NOT NULL,
  `iddocumento` int(11) NOT NULL,
  `fecha_entrega` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`matricula`, `idpaquete`, `iddocumento`),
  KEY `FK_documento_alumno.matricula` (`matricula`),
  KEY `FK_documento_alumno.idpaquete` (`idpaquete`),
  KEY `FK_documento_alumno.iddocumento` (`iddocumento`),
  CONSTRAINT `FK_documento_alumnoiddocumento` FOREIGN KEY (`iddocumento`) REFERENCES `documento` (`iddocumento`),
  CONSTRAINT `FK_documento_alumnoidpaquete` FOREIGN KEY (`idpaquete`) REFERENCES `paquete_documento` (`idpaquete`),
  CONSTRAINT `FK_documento_alumnomatricula` FOREIGN KEY (`matricula`) REFERENCES `alumno` (`matricula`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_spanish2_ci;
DROP TABLE IF EXISTS usuario;
CREATE TABLE `usuario` (
  `idusuario` int(11) NOT NULL AUTO_INCREMENT,
  `perfil` varchar(100) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'http://localhost:3000/static/default.png',
  `email` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `password` varchar(40) COLLATE utf8_spanish2_ci NOT NULL,
  `rol` enum('director', 'jefatura', 'auxiliar') COLLATE utf8_spanish2_ci DEFAULT NULL,
  `sesion_conectada` enum('a', 'b') COLLATE utf8_spanish2_ci DEFAULT 'b',
  `clave` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idjefatura` int(11) DEFAULT NULL,
  `nombre` varchar(60) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `ape_1` varchar(60) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `ape_2` varchar(60) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `telefono` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `ultima_conexion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `estatus` varchar(1) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'a',
  PRIMARY KEY (`idusuario`),
  UNIQUE KEY `email` (`email`),
  KEY `FK_usuarioidusuario` (`idjefatura`),
  KEY `FK_usuarioclaveunidad` (`clave`),
  CONSTRAINT `FK_usuarioclaveunidad` FOREIGN KEY (`clave`) REFERENCES `unidad` (`clave`),
  CONSTRAINT `FK_usuarioidusuario` FOREIGN KEY (`idjefatura`) REFERENCES `usuario` (`idusuario`)
) ENGINE = InnoDB AUTO_INCREMENT = 10 DEFAULT CHARSET = utf8 COLLATE = utf8_spanish2_ci;
INSERT INTO
  alumno(
    matricula,
    clave,
    perfil,
    nombre,
    ape_1,
    ape_2,
    genero,
    direccion,
    telefono,
    email,
    estatus
  )
VALUES(
    '1111111111',
    '23141',
    'http://localhost:3000/static/undefined',
    'Pedro',
    'Cotez',
    'Cortez',
    'm',
    'Dirección conocida',
    '1111111111',
    'alumno_!@edu.com',
    'a'
  ),(
    '2222222222',
    '12345',
    'http://localhost:3000/static/1anbk7z4p7de.png',
    'Segundo',
    'Alumno',
    'Registrado',
    'f',
    'direccion conocida',
    '1111111111',
    'alumn_2@edu.com',
    'a'
  ),(
    '2222322220',
    '12345',
    'http://localhost:3000/static/1azg82wjuhbal.png',
    'Segundo',
    'Alumno',
    'Registrado',
    'f',
    'direccion conocida',
    '1111111111',
    'alumn_4@edu.com',
    'a'
  ),(
    '2222322222',
    '12345',
    'http://localhost:3000/static/1agonde0f8t7.png',
    'Segundo',
    'Alumno',
    'Registrado',
    'f',
    'direccion conocida',
    '1111111111',
    'alumn_3@edu.com',
    'a'
  );
INSERT INTO
  documento(
    iddocumento,
    idpaquete,
    nombre,
    formato,
    peso_max,
    requerido,
    foto_ejemplo,
    estatus
  )
VALUES(
    1,
    1,
    'Certificado de preparatoría',
    'pdf',
    1,
    'a',
    'http://localhost:3000/static/default.png',
    'a'
  ),(
    2,
    1,
    'Acta de nacimiento',
    'pdf',
    1,
    'a',
    '',
    'a'
  ),(
    4,
    9,
    'sdasdfsadf',
    'png',
    1,
    'b',
    'http://localhost:3000/static/default.png',
    'a'
  ),(
    5,
    10,
    'sdasdfsadf',
    'png',
    1,
    'b',
    'http://localhost:3000/static/default.png',
    'a'
  ),(
    6,
    11,
    'acta de nacimiento',
    'pdf',
    12,
    'b',
    'http://localhost:3000/static/default.png',
    'a'
  ),(
    7,
    12,
    'Nombre del documento',
    'pdf',
    1,
    'b',
    'http://localhost:3000/static/default.png',
    'a'
  );
INSERT INTO
  paquete_documento(
    idpaquete,
    ruta_imagen,
    nombre,
    descripcion,
    numero_documentos,
    fecha_creacion,
    fecha_modificacion,
    estatus
  )
VALUES(
    1,
    'http://localhost:3000/static/user.png',
    'Inscripción Escolar',
    'Documentos necesarios para inscribirse en la unidad',
    2,
    '2021-07-13 01:27:25',
    '2021-09-07 19:44:01',
    'b'
  ),(
    9,
    'http://localhost:3000/static/default.png',
    'asdfsdf',
    'asdfasdf',
    1,
    '2021-08-10 23:33:24',
    '2021-08-11 09:56:00',
    'a'
  ),(
    10,
    'http://localhost:3000/static/default.png',
    'asdfsdf',
    'asdfasdf',
    1,
    '2021-08-10 23:38:25',
    '2021-08-10 23:38:25',
    'a'
  ),(
    11,
    'http://localhost:3000/static/default.png',
    'nombre',
    'descripcio',
    2,
    '2021-08-11 20:08:47',
    '2021-08-11 20:08:47',
    'a'
  ),(
    12,
    'http://localhost:3000/static/default.png',
    'Prueba Registro',
    'Solo se trata de una prueba de registro.',
    1,
    '2021-08-15 15:14:48',
    '2021-08-15 15:14:48',
    'a'
  );
INSERT INTO
  unidad(
    clave,
    nombre,
    perfil,
    direccion,
    correo,
    telefono,
    estatus
  )
VALUES(
    '12345',
    'Facultad de Ingenieria',
    'http://localhost:3000/static/user.png',
    'Poseidon y pos',
    'inguas@uas.com',
    '6681454532',
    'a'
  ),(
    '23141',
    'Facultad de Ingenieria Los Mochis',
    'http://localhost:3000/static/undefined',
    'Avenida Poseidon',
    'facultadingenieria@uas.edu.com',
    '1231231231',
    'a'
  ),(
    '23456',
    'Preparatoria UAS',
    'http://localhost:3000/static/user.png',
    'Ciudad Universitaria',
    'prepauas@uas.com',
    '1234567890',
    'a'
  ),(
    '45678',
    'Facultad de negocios',
    'http://localhost:3000/static/default.png',
    'una calle mod',
    'negocio@uas.com',
    '1231231231',
    'a'
  );
INSERT INTO
  usuario(
    idusuario,
    perfil,
    email,
    password,
    rol,
    sesion_conectada,
    clave,
    idjefatura,
    nombre,
    ape_1,
    ape_2,
    telefono,
    ultima_conexion,
    estatus
  )
VALUES(
    1,
    'http://localhost:3000/static/user.png',
    'admin@admin.com',
    '1234',
    'director',
    'a',
    NULL,
    NULL,
    'Admin',
    'Admin',
    'Admin',
    NULL,
    '2021-09-16 22:39:36',
    'a'
  ),(
    2,
    'http://localhost:3000/static/user.png',
    'jefa@jefa.com',
    '1234',
    'jefatura',
    'a',
    '12345',
    NULL,
    'nombre_jefa',
    'ape_1',
    'ape_2',
    '1234567890',
    '2021-09-13 18:15:28',
    'a'
  ),(
    3,
    'http://localhost:3000/static/user.png',
    'aux@aux.com',
    '1234',
    'auxiliar',
    'b',
    '12345',
    2,
    'Juanita',
    'ape_1',
    'ape_2',
    '1234567890',
    '2021-09-07 21:06:03',
    'a'
  ),(
    4,
    'http://localhost:3000/static/default.png',
    'prueba@uas.edu',
    'Contraseña01!',
    'jefatura',
    'b',
    '12345',
    NULL,
    'Prueba',
    'Registro',
    'Registro',
    '1231231231',
    '2021-09-07 21:06:03',
    'a'
  ),(
    5,
    'http://localhost:3000/static/default.png',
    'nuevo@nuevo.com',
    '1234',
    'jefatura',
    'b',
    '12345',
    NULL,
    'Mod',
    'Apellido',
    'Apellido',
    '1231231231',
    '2021-09-14 17:58:47',
    'a'
  ),(
    6,
    'http://localhost:3000/static/undefined',
    'dddduevo@nuevo.com',
    '1234',
    'jefatura',
    'b',
    '12345',
    NULL,
    'Nombre',
    'Apellido',
    'Apellido',
    '1231231231',
    '2021-09-14 20:17:27',
    'a'
  ),(
    7,
    'http://localhost:3000/static/1act0kk9hptmj.png',
    'ddduevo@nuevo.com',
    '1234',
    'jefatura',
    'b',
    '12345',
    NULL,
    'Nombre',
    'Apellido',
    'Apellido',
    '1231231231',
    '2021-09-14 20:18:27',
    'a'
  ),(
    8,
    'http://localhost:3000/static/1a9i2k72alcaf.png',
    'empleado@nuevo.com',
    '1234',
    'jefatura',
    'b',
    '12345',
    NULL,
    'Nombre',
    'Apellido',
    'Apellido',
    '1231231231',
    '2021-09-14 20:39:55',
    'a'
  ),(
    9,
    'http://localhost:3000/static/1aiszfkzh5pu.png',
    'empleafdo@nuevo.com',
    '1234',
    'jefatura',
    'b',
    '12345',
    NULL,
    'Nombre',
    'Apellido',
    'Apellido',
    '1231231231',
    '2021-09-14 21:41:09',
    'a'
  );