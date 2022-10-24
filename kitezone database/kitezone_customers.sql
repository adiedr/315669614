-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: kitezone
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `userName` varchar(25) NOT NULL,
  `password` varchar(25) NOT NULL,
  `fullName` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `birthday` date DEFAULT NULL,
  `height` int DEFAULT NULL,
  `weight` int DEFAULT NULL,
  PRIMARY KEY (`userName`),
  UNIQUE KEY `ak_customers` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES ('aca','12345678','dsb','adiedri11@walla.com','2022-10-06',51,7),('aca1','12345678hsew1','gfg ff','bdg@cvdv','2022-10-05',2,2),('aca3','12345678hsew3','hh hh','adiedri11@walla.comsg','2001-12-22',1,1),('aca55','12345678hsew','acaca fff','gdgd@bsdgsvsd','2022-09-27',2,2),('aca551','12345678hsew','acaca fff','gdgd@bsdgsvsd1','2022-09-27',2,2),('aca5515','12345678hsew','acaca fff','gdgd@bsdgsvsd15','2022-09-27',2,2),('aca5515f','12345678hsew','acaca fff','gdgd@bsdgsvsd15f','2022-09-27',2,2),('aca5515fכ','12345678hsew','acaca fff','gdgd@bsdgsvsd15fr','2022-09-27',2,2),('aca5515fכh','12345678hsew','acaca fff','gdgd@bsdgsvsd15frh','2022-09-27',2,2),('aca5515fכhm','12345678hsew','acaca fff','gdgd@bsdgsvsd15frhm','2022-09-27',2,2),('aca5515fכhmg','12345678hsew','acaca fff','gdgd@bsdg','2022-09-27',2,2),('aca5515fכhmgd','12345678hsew','acaca fff','gdgd@bsdgd','2022-09-27',2,2),('acabretbeerb','rbtrbr','rbtrbr','adier@post.bgu.ac.il','2022-09-08',55,5555),('acavdv','12345678hsewvd','vdvd dv','adiedr@post.bgu.ac.ilvd','2022-02-22',4,140),('acavdvr','12345678hsewvdr','vdvd dvr','adiedr@post.bgu.ac.ilvdr','2022-02-22',44,140),('acavdvr423','12345678hsewvdr','vdvd dvr','adiedr@post.bgu.ac.ilvdr24','2022-02-22',44,140),('adgsdg','gsdgsdsg','sdgsdg sdgs','gdgd@bsdgs','2022-09-12',55,55),('adiedri','12345678','adi edri','adiedr@post.bgu.ac.io','2022-10-01',177,80),('adsfdfs','gsdgsdsg','sdgsdg sdgs','gdgd@bsdgssfds','2022-09-12',55,55),('agds','sgdfdgd','dfgd dfgd','rbhw4@vrqvwe','2022-09-13',33,535),('bgwrg','vwbvwbv','dsb','yrjt@vwe','2022-09-12',4,33),('cwew','vwewe','444','evrve@4f32','2022-09-05',33,44),('dsgsdfgsd','sgdsdgds','sgds sddg','sdgsdgs@dsvs','2022-08-30',44,44),('dsgsdfgsdgfg','sgdsdgds','sgds sddg','sdgsdgs@dsvsgfgf','2022-08-30',44,44),('e2ewec','wcewce','wcecwe','adiedr@post.bgu.ac.il','2022-09-22',32,22),('jdd','dfbdbdb','dbdfb dfbd','dfbdf@sdv','2022-09-21',33,2432),('rerer','12345678hsew','etr gg','gdgd@bsdgsgere','2022-09-30',5,4),('rwbwbw','ebwr','rewbrw','gwerbhw4@vrqvwe','2022-09-13',54,53),('wrewg','gwewegweg','gweweg her','wegew@gwegw','2022-08-30',444,4444),('wrewgsg','sdgsdgsdgs','gweweg her','wegew@gwegwsdgsd','2022-08-30',444,4444),('wrewgsgafs','sfdfsdfsd','gweweg her','wegew@gwegwsdgsdfsdf','2022-08-30',444,4444);
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-22 16:29:25
