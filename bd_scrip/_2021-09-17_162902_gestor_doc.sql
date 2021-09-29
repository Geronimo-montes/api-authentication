/*!40101 SET NAMES utf8 */;
/*!SET FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET SQL_NOTES=0 */;
CREATE DATABASE
/*!32312 IF NOT EXISTS*/
gestor_documentos
/*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE gestor_documentos;
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
DROP TABLE IF EXISTS documento;
ALTER TABLE
  `documento` (
    `iddocumento` int(11) NOT NULL,
    `idpaquete` int(11) NOT NULL,
    `nombre` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
    `formato` varchar(5) COLLATE utf8_spanish2_ci NOT NULL,
    `peso_max` tinyint(4) NOT NULL,
    `requerido` varchar(1) COLLATE utf8_spanish2_ci NOT NULL,
    `foto_ejemplo` varchar(100) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'http://localhost:3000/static/default.png',
    `estatus` varchar(1) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'a',
    PRIMARY KEY (`iddocumento`, `idpaquete`),
    KEY `FK_documento.iddocumento` (`iddocumento`),
    KEY `FK_documento.idpaquete` (`idpaquete`),
    CONSTRAINT `FK_documentoidpaquete` FOREIGN KEY (`idpaquete`) REFERENCES `paquete_documento` (`idpaquete`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_spanish2_ci;
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