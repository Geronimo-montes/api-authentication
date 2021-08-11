-- Roles
-- ->Director
-- ->Jefatura
-- ->Auxiliar

-- Catálogos básicos
-- -> Unidades (Escuelas)
-- -> Estudiantes
-- ->Documentos

-- El auxiliar pertenece a una unidad
-- La jefatura una sola unidad y 0 o mas auxiliares

-------------> + pantalla asignacion unidad
-------------> + pantalla asignacion----desplegar datos jefatura ´+ auxiliares asignados

-- los auxiliares y jefaturas podrán subir y consultar documentos de su unidad
-- el director podrá consulta documentos de cualquier unidad
-- se requieren reportes de documentos faltantes
-- envío de correo a los estudiantes con documentos faltantes

-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 13-07-2021 a las 07:31:50
-- Versión del servidor: 5.7.31
-- Versión de PHP: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gestion_doc`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumno`
--

DROP TABLE IF EXISTS `alumno`;
CREATE TABLE IF NOT EXISTS `alumno` (
  `matricula` varchar(10) COLLATE utf8_spanish2_ci NOT NULL,
  `idunidad` int(11) NOT NULL,
  `perfil` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `nombre` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `ape_1` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `ape_2` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `sexo` varchar(1) COLLATE utf8_spanish2_ci NOT NULL,
  `direccion` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `telefono` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `estatus` varchar(1) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'a',
  PRIMARY KEY (`matricula`),
  KEY `FK_alumnoidunidad` (`idunidad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `alumno`
--

INSERT INTO `alumno` (`matricula`, `idunidad`, `perfil`, `nombre`, `ape_1`, `ape_2`, `sexo`, `diraccion`, `telefono`, `email`, `estatus`) VALUES
('0101010101', 1, 'ruta', 'nombre', 'ape_1', 'ape_2', 'm', 'direccion', '1234567890', 'alumno_1@email.com', 'a'),
('1234567890', 1, 'ruta', 'nombre', 'ape_1', 'ape_2', 'm', 'direccion', '1234567890', 'alumno_1@email.com', 'a'),
('1324354678', 1, 'ruta', 'nombre', 'ape_1', 'ape_2', 'm', 'direccion', '1234567890', 'alumno_1@email.com', 'a');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auxiliar`
--

DROP TABLE IF EXISTS `auxiliar`;
CREATE TABLE IF NOT EXISTS `auxiliar` (
  `idusuario` int(11) NOT NULL,
  `idunidad` int(11) NOT NULL,
  `idjefatura` int(11) NOT NULL,
  `nombre` varchar(60) COLLATE utf8_spanish2_ci NOT NULL,
  `ape_1` varchar(60) COLLATE utf8_spanish2_ci NOT NULL,
  `ape_2` varchar(60) COLLATE utf8_spanish2_ci NOT NULL,
  `telefono` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (`idusuario`,`idunidad`,`idjefatura`),
  KEY `FK_auxiliaridusuario` (`idusuario`),
  KEY `FK_auxiliaridjefatura` (`idjefatura`),
  KEY `FK_auxiliaridunidad` (`idunidad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `auxiliar`
--

INSERT INTO `auxiliar` (`idusuario`, `idunidad`, `idjefatura`, `nombre`, `ape_1`, `ape_2`, `telefono`, `estatus`) VALUES
(3, 1, 2, 'nombre_aux', 'ape_1', 'ape_2', '1234567890', 'a');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documento`
--

DROP TABLE IF EXISTS `documento`;
CREATE TABLE IF NOT EXISTS `documento` (
  `iddocumento` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `formato` varchar(5) COLLATE utf8_spanish2_ci NOT NULL,
  `peso_max` tinyint(4) NOT NULL,
  `requerido` varchar(1) COLLATE utf8_spanish2_ci NOT NULL,
  `foto_ejemplo` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `estatus` varchar(1) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'a',
  PRIMARY KEY (`iddocumento`),
  KEY `FK_documentoidunidad` (`iddocumento`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `documento`
--

INSERT INTO `documento` (`iddocumento`, `nombre`, `formato`, `peso_max`, `requerido`, `foto_ejemplo`, `estatus`) VALUES
(1, 'Certificado de preparatoría', 'PDF', 1, 'a', 'ruta', 'a'),
(2, 'Acta de nacimiento', 'PDF', 1, 'a', 'ruta', 'a');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documento_alumno`
--

DROP TABLE IF EXISTS `documento_alumno`;
CREATE TABLE IF NOT EXISTS `documento_alumno` (
  `matricula` varchar(10) COLLATE utf8_spanish2_ci NOT NULL,
  `idpaquete` int(11) NOT NULL,
  `iddocumento` int(11) NOT NULL,
  `nombre` varchar(300) NOT NULL,
  `fecha_entrega` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`matricula`,`idpaquete`,`iddocumento`),
  KEY `FK_documento_alumno.matricula` (`matricula`),
  KEY `FK_documento_alumno.idpaquete` (`idpaquete`),
  KEY `FK_documento_alumno.iddocumento` (`iddocumento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jefatura`
--

DROP TABLE IF EXISTS `jefatura`;
CREATE TABLE IF NOT EXISTS `jefatura` (
  `idusuario` int(11) NOT NULL,
  `idunidad` int(11) NOT NULL,
  `nombre` varchar(60) COLLATE utf8_spanish2_ci NOT NULL,
  `ape_1` varchar(60) COLLATE utf8_spanish2_ci NOT NULL,
  `ape_2` varchar(60) COLLATE utf8_spanish2_ci NOT NULL,
  `telefono` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (`idusuario`),
  KEY `FK_jefaturaidusuario` (`idusuario`),
  KEY `FK_jefaturaidunidad` (`idunidad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `jefatura`
--

INSERT INTO `jefatura` (`idusuario`, `idunidad`, `nombre`, `ape_1`, `ape_2`, `telefono`, `estatus`) VALUES
(2, 1, 'nombre_jefa', 'ape_1', 'ape_2', '1234567890', 'a');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paquete_documento`
--

DROP TABLE IF EXISTS `paquete_documento`;
CREATE TABLE IF NOT EXISTS `paquete_documento` (
  `idpaquete` int(11) NOT NULL AUTO_INCREMENT,
  `ruta_imagen` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `nombre` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `descripcion` varchar(300) COLLATE utf8_spanish2_ci NOT NULL,
  `numero_documentos` tinyint(4) NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `estatus` varchar(1) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'a',
  PRIMARY KEY (`idpaquete`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `paquete_documento`
--

INSERT INTO `paquete_documento` (`idpaquete`, `ruta_imagen`, `nombre`, `descripcion`, `numero_documentos`, `fecha_creacion`, `fecha_modificacion`, `estatus`) VALUES
(1, 'ruta', 'Documentos para Incripción', 'Documentos necesarios para inscribirse en la unidad', 2, '2021-07-13 07:27:25', '2021-07-13 07:27:25', 'a');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paquete_documento_detalle`
--

DROP TABLE IF EXISTS `paquete_documento_detalle`;
CREATE TABLE IF NOT EXISTS `paquete_documento_detalle` (
  `idpaquete` int(11) NOT NULL,
  `iddocumento` int(11) NOT NULL,
  PRIMARY KEY (`idpaquete`,`iddocumento`),
  KEY `FK_paquete_documento_detalle.idpaquete` (`idpaquete`),
  KEY `FK_paquete_documento_detalle.iddocumento` (`iddocumento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `paquete_documento_detalle`
--

INSERT INTO `paquete_documento_detalle` (`idpaquete`, `iddocumento`) VALUES
(1, 1),
(1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `unidad`
--

DROP TABLE IF EXISTS `unidad`;
CREATE TABLE IF NOT EXISTS `unidad` (
  `idunidad` int(11) NOT NULL AUTO_INCREMENT,
  `clave` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `nombre` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `perfil` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `direccion` varchar(60) COLLATE utf8_spanish2_ci NOT NULL,
  `correo` varchar(60) COLLATE utf8_spanish2_ci NOT NULL,
  `telefono` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `estatus` varchar(1) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'a',
  PRIMARY KEY (`idunidad`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `unidad`
--

INSERT INTO `unidad` (`idunidad`, `clave`, `nombre`, `perfil`, `direccion`, `correo`, `telefono`, `estatus`) VALUES
(1, 'clave_unidad', 'Nombre de la unidad', 'ruta', 'dirección', 'unidad_uno@email.com', '1234567890', 'a');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `idusuario` int(11) NOT NULL AUTO_INCREMENT,
  `perfil` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `password` varchar(40) COLLATE utf8_spanish2_ci NOT NULL,
  `rol` enum('director','jefatura','auxiliar') COLLATE utf8_spanish2_ci DEFAULT NULL,
  `token` varchar(700) COLLATE utf8_spanish2_ci NOT NULL,
  `ultima_conexion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `estatus` varchar(1) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'a',
  PRIMARY KEY (`idusuario`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idusuario`, `perfil`, `email`, `password`, `rol`, `token`, `ultima_conexion`, `estatus`) VALUES
(1, 'ruta', 'admin@admin.com', '12345678', 'director', '', '2021-07-13 07:14:19', 'a'),
(2, 'ruta', 'jefa@jefa.com', '12345678', 'jefatura', '', '2021-07-13 07:14:19', 'a'),
(3, 'ruta', 'aux@aux.com', '12345678', 'auxiliar', '', '2021-07-13 07:14:19', 'a');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alumno`
--
ALTER TABLE `alumno`
  ADD CONSTRAINT `FK_alumnoidunidad` FOREIGN KEY (`idunidad`) REFERENCES `unidad` (`idunidad`);

--
-- Filtros para la tabla `auxiliar`
--
ALTER TABLE `auxiliar`
  ADD CONSTRAINT `FK_auxiliaridjefatura` FOREIGN KEY (`idjefatura`) REFERENCES `jefatura` (`idusuario`),
  ADD CONSTRAINT `FK_auxiliaridunidad` FOREIGN KEY (`idunidad`) REFERENCES `unidad` (`idunidad`),
  ADD CONSTRAINT `FK_auxiliaridusuario` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`idusuario`);

--
-- Filtros para la tabla `documento_alumno`
--
ALTER TABLE `documento_alumno`
  ADD CONSTRAINT `FK_documento_alumnoiddocumento` FOREIGN KEY (`iddocumento`) REFERENCES `documento` (`iddocumento`),
  ADD CONSTRAINT `FK_documento_alumnoidpaquete` FOREIGN KEY (`idpaquete`) REFERENCES `paquete_documento` (`idpaquete`),
  ADD CONSTRAINT `FK_documento_alumnomatricula` FOREIGN KEY (`matricula`) REFERENCES `alumno` (`matricula`);

--
-- Filtros para la tabla `jefatura`
--
ALTER TABLE `jefatura`
  ADD CONSTRAINT `FK_jefaturaidunidad` FOREIGN KEY (`idunidad`) REFERENCES `unidad` (`idunidad`),
  ADD CONSTRAINT `FK_jefaturaidusuario` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`idusuario`);

--
-- Filtros para la tabla `paquete_documento_detalle`
--
ALTER TABLE `paquete_documento_detalle`
  ADD CONSTRAINT `FK_paquete_documento_detalleiddocumento` FOREIGN KEY (`iddocumento`) REFERENCES `documento` (`iddocumento`),
  ADD CONSTRAINT `FK_paquete_documento_detalleidpaquete` FOREIGN KEY (`idpaquete`) REFERENCES `paquete_documento` (`idpaquete`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
