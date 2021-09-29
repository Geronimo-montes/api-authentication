-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 29-09-2021 a las 06:05:58
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
-- Base de datos: `gestor_documento`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumno`
--

DROP TABLE IF EXISTS `alumno`;
CREATE TABLE IF NOT EXISTS `alumno` (
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
  KEY `FK_alumnoclaveunidad` (`clave`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documento`
--

DROP TABLE IF EXISTS `documento`;
CREATE TABLE IF NOT EXISTS `documento` (
  `iddocumento` int(11) NOT NULL,
  `idpaquete` int(11) NOT NULL,
  `nombre` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `formato` varchar(5) COLLATE utf8_spanish2_ci NOT NULL,
  `peso_max` tinyint(4) NOT NULL,
  `requerido` varchar(1) COLLATE utf8_spanish2_ci NOT NULL,
  `foto_ejemplo` varchar(100) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'http://localhost:3000/static/default.png',
  `estatus` varchar(1) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'a',
  PRIMARY KEY (`iddocumento`,`idpaquete`),
  KEY `FK_documentoidpaquete` (`idpaquete`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documento_alumno`
--

DROP TABLE IF EXISTS `documento_alumno`;
CREATE TABLE IF NOT EXISTS `documento_alumno` (
  `ruta` varchar(300) COLLATE utf8_spanish2_ci NOT NULL,
  `matricula` varchar(10) COLLATE utf8_spanish2_ci NOT NULL,
  `idpaquete` int(11) NOT NULL,
  `iddocumento` int(11) NOT NULL,
  `fecha_entrega` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`matricula`,`idpaquete`,`iddocumento`),
  KEY `FK_documento_alumno.matricula` (`matricula`),
  KEY `FK_documento_alumno.idpaquete` (`idpaquete`),
  KEY `FK_documento_alumno.iddocumento` (`iddocumento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paquete_documento`
--

DROP TABLE IF EXISTS `paquete_documento`;
CREATE TABLE IF NOT EXISTS `paquete_documento` (
  `idpaquete` int(11) NOT NULL AUTO_INCREMENT,
  `ruta_imagen` varchar(100) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'http://localhost:3000/static/default.png',
  `nombre` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `descripcion` varchar(300) COLLATE utf8_spanish2_ci NOT NULL,
  `numero_documentos` tinyint(4) NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `estatus` varchar(1) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'a',
  PRIMARY KEY (`idpaquete`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `unidad`
--

DROP TABLE IF EXISTS `unidad`;
CREATE TABLE IF NOT EXISTS `unidad` (
  `clave` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `nombre` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `perfil` varchar(100) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'http://localhost:3000/static/default.png',
  `direccion` varchar(60) COLLATE utf8_spanish2_ci NOT NULL,
  `correo` varchar(60) COLLATE utf8_spanish2_ci NOT NULL,
  `telefono` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `estatus` varchar(1) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'a',
  PRIMARY KEY (`clave`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `idusuario` int(11) NOT NULL AUTO_INCREMENT,
  `perfil` varchar(100) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'http://localhost:3000/static/default.png',
  `email` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `password` varchar(40) COLLATE utf8_spanish2_ci NOT NULL,
  `rol` enum('director','jefatura','auxiliar') COLLATE utf8_spanish2_ci DEFAULT NULL,
  `sesion_conectada` enum('a','b') COLLATE utf8_spanish2_ci DEFAULT 'b',
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
  KEY `FK_usuarioclaveunidad` (`clave`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
