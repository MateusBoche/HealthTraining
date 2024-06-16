/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE IF NOT EXISTS `banco_de_dados_health_training` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `banco_de_dados_health_training`;

CREATE TABLE IF NOT EXISTS `carta` (
  `id` varchar(8) NOT NULL,
  `titulo` varchar(200) NOT NULL,
  `descricao` varchar(200) NOT NULL,
  `validade` char(1) DEFAULT NULL,
  `data_criacao` timestamp NOT NULL,
  `fase_id` varchar(8) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fase_id` (`fase_id`),
  CONSTRAINT `carta_ibfk_1` FOREIGN KEY (`fase_id`) REFERENCES `fase` (`id`),
  CONSTRAINT `carta_chk_1` CHECK ((`validade` in (_utf8mb4'V',_utf8mb4'F')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `fase` (
  `id` varchar(8) NOT NULL,
  `descricao` varchar(200) NOT NULL,
  `numero_fase` int DEFAULT NULL,
  `cor` varchar(20) NOT NULL,
  `jogo_id` varchar(8) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `numero_fase` (`numero_fase`,`jogo_id`),
  KEY `jogo_id` (`jogo_id`),
  CONSTRAINT `fase_ibfk_1` FOREIGN KEY (`jogo_id`) REFERENCES `jogo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `imagem_fase` (
  `id` varchar(8) NOT NULL,
  `imagem` blob,
  `fase_id` varchar(8) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fase_id` (`fase_id`),
  CONSTRAINT `imagem_fase_ibfk_1` FOREIGN KEY (`fase_id`) REFERENCES `fase` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `jogo` (
  `id` varchar(8) NOT NULL,
  `datahora_criacao` timestamp NOT NULL,
  `status` json DEFAULT NULL,
  `usuario_id` varchar(8) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `datahora_criacao` (`datahora_criacao`,`usuario_id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `jogo_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `pessoa` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `pessoa` (
  `id` varchar(8) NOT NULL,
  `nome` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `senha` varchar(200) NOT NULL,
  `status` varchar(200) NOT NULL,
  `data_criacao` timestamp NOT NULL,
  `preferencias` json DEFAULT NULL,
  `numero_de_jogos` int DEFAULT NULL,
  `tipo_usuario` BOOLEAN,
  `tipo_administrador` BOOLEAN,
  `telefone_contato` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `registro_de_auditoria` (
  `id` varchar(8) NOT NULL,
  `tabela_modificada` varchar(100) NOT NULL,
  `data_modificada` timestamp NOT NULL,
  `id_pessoa` varchar(8) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_pessoa` (`id_pessoa`,`data_modificada`),
  CONSTRAINT `registro_de_auditoria_ibfk_1` FOREIGN KEY (`id_pessoa`) REFERENCES `pessoa` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
