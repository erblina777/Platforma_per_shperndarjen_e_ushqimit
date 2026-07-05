-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 05, 2026 at 09:34 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `food_delivery`
--

-- --------------------------------------------------------

--
-- Table structure for table `addresses`
--

CREATE TABLE `addresses` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `emertimi` varchar(100) DEFAULT NULL,
  `adresa` varchar(255) DEFAULT NULL,
  `qyteti` varchar(50) DEFAULT NULL,
  `koordinatat` varchar(100) DEFAULT NULL,
  `eshte_kryesore` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `deliveries`
--

CREATE TABLE `deliveries` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `driver_id` int(11) DEFAULT NULL,
  `statusi` varchar(50) DEFAULT NULL,
  `data_marrjes` datetime DEFAULT NULL,
  `data_dorezimit` datetime DEFAULT NULL,
  `koha_vleresuar` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `deliveries`
--

INSERT INTO `deliveries` (`id`, `order_id`, `driver_id`, `statusi`, `data_marrjes`, `data_dorezimit`, `koha_vleresuar`) VALUES
(1, 9, 11, 'Assigned', '2026-07-07 21:07:00', '2026-07-22 21:08:00', 30);

-- --------------------------------------------------------

--
-- Table structure for table `deliverydrivers`
--

CREATE TABLE `deliverydrivers` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `automjeti` varchar(100) DEFAULT NULL,
  `targa` varchar(50) DEFAULT NULL,
  `zona` varchar(100) DEFAULT NULL,
  `statusi` varchar(50) DEFAULT NULL,
  `vleresimi` decimal(3,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `deliverydrivers`
--

INSERT INTO `deliverydrivers` (`id`, `user_id`, `automjeti`, `targa`, `zona`, `statusi`, `vleresimi`) VALUES
(11, 22, 'Toyota Prius', '01-234-AB', 'Prishtinë', 'offline', 0.00);

-- --------------------------------------------------------

--
-- Table structure for table `menucategories`
--

CREATE TABLE `menucategories` (
  `id` int(11) NOT NULL,
  `restaurant_id` int(11) DEFAULT NULL,
  `emertimi` varchar(100) DEFAULT NULL,
  `pershkrimi` text DEFAULT NULL,
  `renditja` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menucategories`
--

INSERT INTO `menucategories` (`id`, `restaurant_id`, `emertimi`, `pershkrimi`, `renditja`) VALUES
(2, NULL, 'Food', 'Ushqim', NULL),
(11, 9, 'Burgers', 'All Burgers', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `menuitems`
--

CREATE TABLE `menuitems` (
  `id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `emertimi` varchar(100) DEFAULT NULL,
  `pershkrimi` text DEFAULT NULL,
  `cmimi` decimal(10,2) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `disponueshme` tinyint(1) DEFAULT 1,
  `alergjene` text DEFAULT NULL,
  `kalori` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menuitems`
--

INSERT INTO `menuitems` (`id`, `category_id`, `emertimi`, `pershkrimi`, `cmimi`, `foto`, `disponueshme`, `alergjene`, `kalori`) VALUES
(9, 11, 'Big Mac', 'Beef patty, lettuce, tomato, cheese', 4.50, '1783162945348-Double-Big-Mac-McDonalds.webp', 1, '', 0),
(10, 11, 'Cheese Burger', 'Double cheese with beef patty', 5.00, '1783166778138-classic-cheeseburger-juicy-beef-patty-melted-cheddar-cheese-lettuce-tomato-onion-pickles-classic-cheeseburger-juicy-316261477.webp', 1, '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `orderitems`
--

CREATE TABLE `orderitems` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `menu_item_id` int(11) DEFAULT NULL,
  `sasia` int(11) DEFAULT NULL,
  `cmimi` decimal(10,2) DEFAULT NULL,
  `shenimet` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orderitems`
--

INSERT INTO `orderitems` (`id`, `order_id`, `menu_item_id`, `sasia`, `cmimi`, `shenimet`) VALUES
(3, 9, 9, 1, 4.50, '');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `restaurant_id` int(11) DEFAULT NULL,
  `adresa_dorezimit` varchar(255) DEFAULT NULL,
  `shuma_totale` decimal(10,2) DEFAULT NULL,
  `tarifa_dorezimit` decimal(10,2) DEFAULT NULL,
  `zbritja` decimal(10,2) DEFAULT NULL,
  `statusi` varchar(50) DEFAULT NULL,
  `metoda_pageses` varchar(50) DEFAULT NULL,
  `data_porosise` timestamp NOT NULL DEFAULT current_timestamp(),
  `shenimet` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `restaurant_id`, `adresa_dorezimit`, `shuma_totale`, `tarifa_dorezimit`, `zbritja`, `statusi`, `metoda_pageses`, `data_porosise`, `shenimet`) VALUES
(9, 21, 9, 'adresa', 5.60, 2.00, 0.90, 'Assigned', 'Cash', '2026-07-04 12:03:22', '');

-- --------------------------------------------------------

--
-- Table structure for table `promotions`
--

CREATE TABLE `promotions` (
  `id` int(11) NOT NULL,
  `restaurant_id` int(11) DEFAULT NULL,
  `kodi` varchar(50) DEFAULT NULL,
  `zbritja_perqind` decimal(5,2) DEFAULT NULL,
  `zbritja_max` decimal(10,2) DEFAULT NULL,
  `data_fillimit` date DEFAULT NULL,
  `data_perfundimit` date DEFAULT NULL,
  `statusi` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `promotions`
--

INSERT INTO `promotions` (`id`, `restaurant_id`, `kodi`, `zbritja_perqind`, `zbritja_max`, `data_fillimit`, `data_perfundimit`, `statusi`) VALUES
(3, 9, 'NEW20', 20.00, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `refreshtokens`
--

CREATE TABLE `refreshtokens` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `token` text DEFAULT NULL,
  `expires` datetime DEFAULT NULL,
  `created` datetime DEFAULT current_timestamp(),
  `revoked` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `refreshtokens`
--

INSERT INTO `refreshtokens` (`id`, `user_id`, `token`, `expires`, `created`, `revoked`) VALUES
(1, 19, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksImlhdCI6MTc4MzA3NDAxMCwiZXhwIjoxNzg1NjY2MDEwfQ.rF-gZZnUTdm6nYkIXG6YoEiWecjucsRGYrw1Z7T3P4w', '2026-08-02 12:20:10', '2026-07-03 12:20:10', 0),
(2, 19, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksImlhdCI6MTc4MzE1MTE3NywiZXhwIjoxNzg1NzQzMTc3fQ.syqIQ33HwfquOAPLcRTt38n40moJHzTh7lRdERJU8MI', '2026-08-03 09:46:17', '2026-07-04 09:46:17', 0),
(3, 20, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImlhdCI6MTc4MzE1NTUyNCwiZXhwIjoxNzg1NzQ3NTI0fQ.6tJ71MvBrlUBM6qHQm3t-dSx9OAYG4GCBzH5lcKa3qI', '2026-08-03 10:58:44', '2026-07-04 10:58:44', 0),
(4, 20, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImlhdCI6MTc4MzE1NzE1MCwiZXhwIjoxNzg1NzQ5MTUwfQ.5X0CGUoqGTEKCGRx1bcRr3fTPSMMVcJZ63ffyT08QxA', '2026-08-03 11:25:50', '2026-07-04 11:25:50', 0),
(5, 20, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImlhdCI6MTc4MzE1ODQ2OSwiZXhwIjoxNzg1NzUwNDY5fQ._Z1kGqA_BK6NzIRmNSsnHvEiXO7uTZHFd0Q5ZCsQZWI', '2026-08-03 11:47:49', '2026-07-04 11:47:49', 0),
(6, 21, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsImlhdCI6MTc4MzE2MzgwMywiZXhwIjoxNzg1NzU1ODAzfQ.XJ-0CIm9hKvOnDfZ2uLoJ7Y4wHslWU_WEUWzDyrIv-c', '2026-08-03 13:16:43', '2026-07-04 13:16:43', 0),
(7, 20, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImlhdCI6MTc4MzE2Mzk1NSwiZXhwIjoxNzg1NzU1OTU1fQ.DhJBEsy9SVKxGAvuTL0olJLplTjqTQ9_OwIE4PhXYx8', '2026-08-03 13:19:15', '2026-07-04 13:19:15', 0),
(8, 20, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImlhdCI6MTc4MzE2NTgzNywiZXhwIjoxNzg1NzU3ODM3fQ.8KB8h1A60tpmXXCPPtrSL_nOQROcPs1yzpWHPMMSPMU', '2026-08-03 13:50:37', '2026-07-04 13:50:37', 0),
(9, 21, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsImlhdCI6MTc4MzE2NTg2NSwiZXhwIjoxNzg1NzU3ODY1fQ.DP5OM56XHRf32FJwV70CL_vS00W-KqnC3aQwwAhCqrI', '2026-08-03 13:51:05', '2026-07-04 13:51:05', 0),
(10, 20, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImlhdCI6MTc4MzE2NjAyMiwiZXhwIjoxNzg1NzU4MDIyfQ.Lr85ZLVF7ia0kWJZm9rQ2-TysR8GTu2_s2W8F2iG2E0', '2026-08-03 13:53:42', '2026-07-04 13:53:42', 0),
(11, 21, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsImlhdCI6MTc4MzE2NjU4NSwiZXhwIjoxNzg1NzU4NTg1fQ.3x1KpDSeVKoAp0PA5XT5fXOZdEDJrTKf9GQcEAXybHE', '2026-08-03 14:03:05', '2026-07-04 14:03:05', 0),
(12, 20, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImlhdCI6MTc4MzE2NjYxNywiZXhwIjoxNzg1NzU4NjE3fQ.FoHonjEluRwy9Gn2q4yNbSZ8_HKHrbETuhgZr4IoCc8', '2026-08-03 14:03:37', '2026-07-04 14:03:37', 0),
(13, 21, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsImlhdCI6MTc4MzE2NzE4OSwiZXhwIjoxNzg1NzU5MTg5fQ.3r582gQJpWne6hpGt-s2ToZIWD52NGvpOw-IcIs49sY', '2026-08-03 14:13:09', '2026-07-04 14:13:09', 0),
(14, 18, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgsImlhdCI6MTc4MzE2ODQ1NSwiZXhwIjoxNzg1NzYwNDU1fQ.EY0R5SHt7q46pxx44j6TkoFt7XbsGni3xwGu7338dpE', '2026-08-03 14:34:15', '2026-07-04 14:34:15', 0),
(15, 21, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsImlhdCI6MTc4MzE2ODQ4MiwiZXhwIjoxNzg1NzYwNDgyfQ.9sU8Lz3_NQoAeIg-zvYtWZWJNcFQ4BNfeHkqpvwn92U', '2026-08-03 14:34:42', '2026-07-04 14:34:42', 0),
(16, 15, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTc4MzE2OTE3OSwiZXhwIjoxNzg1NzYxMTc5fQ.Dimf_EcpQHFjg-v5X_whJkaUomOeVh8Hx5N6MwuyfZU', '2026-08-03 14:46:19', '2026-07-04 14:46:19', 0),
(17, 19, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksImlhdCI6MTc4MzI1NzYxMywiZXhwIjoxNzg1ODQ5NjEzfQ.TzhnKze1DW2OP7oHi1CvtAuRME-YPeFoFi1jQQt6sQg', '2026-08-04 15:20:13', '2026-07-05 15:20:13', 0),
(18, 20, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImlhdCI6MTc4MzI1NzY1MywiZXhwIjoxNzg1ODQ5NjUzfQ.VThXarthHLSWPWsrULDBDf3M4v_ShQFvf8QHF1fY7Ew', '2026-08-04 15:20:53', '2026-07-05 15:20:53', 0),
(19, 21, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsImlhdCI6MTc4MzI1NzY3MCwiZXhwIjoxNzg1ODQ5NjcwfQ.7IWMopmYguld4svEeYfJ68fqOxcekrKbadTsnEXFot4', '2026-08-04 15:21:10', '2026-07-05 15:21:10', 0),
(20, 15, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTc4MzI1NzcxNSwiZXhwIjoxNzg1ODQ5NzE1fQ.VYVnVwn2glhlD65GA8n0-gTD7SXEt8B_O2EaEMmY7MA', '2026-08-04 15:21:55', '2026-07-05 15:21:55', 0),
(21, 18, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgsImlhdCI6MTc4MzI1Nzc3MywiZXhwIjoxNzg1ODQ5NzczfQ.GvMyrCwqndMuPS-HBc9bYRLVJF-ih94m0FefD1uhsIA', '2026-08-04 15:22:53', '2026-07-05 15:22:53', 0),
(22, 15, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTc4MzI1NzgwMCwiZXhwIjoxNzg1ODQ5ODAwfQ.8liZiL5nM0HKe8bJHOerNLOV4Glev8EmMOKxRmq-inY', '2026-08-04 15:23:20', '2026-07-05 15:23:20', 0),
(23, 22, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsImlhdCI6MTc4MzI3MTQwMiwiZXhwIjoxNzg1ODYzNDAyfQ.aa1JlWkcFehpb3g0yjHYy82yH-skgFEft9lI9WUlrNU', '2026-08-04 19:10:02', '2026-07-05 19:10:02', 0),
(24, 15, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTc4MzI3MTQ0MSwiZXhwIjoxNzg1ODYzNDQxfQ.gVfS77bHc21M3P3OIjUavDU50_6pShEqSOQjPiySE0o', '2026-08-04 19:10:41', '2026-07-05 19:10:41', 0),
(25, 21, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsImlhdCI6MTc4MzI3OTkwOCwiZXhwIjoxNzg1ODcxOTA4fQ.tMI2UP8qJkOuH6g-u9mflb2cXXn-b_Wqcc86gf7ToOc', '2026-08-04 21:31:48', '2026-07-05 21:31:48', 0);

-- --------------------------------------------------------

--
-- Table structure for table `restaurants`
--

CREATE TABLE `restaurants` (
  `id` int(11) NOT NULL,
  `emertimi` varchar(100) DEFAULT NULL,
  `pershkrimi` text DEFAULT NULL,
  `adresa` varchar(150) DEFAULT NULL,
  `qyteti` varchar(50) DEFAULT NULL,
  `telefoni` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `orari_hapjes` time DEFAULT NULL,
  `orari_mbylljes` time DEFAULT NULL,
  `vleresimi` decimal(3,2) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `restaurants`
--

INSERT INTO `restaurants` (`id`, `emertimi`, `pershkrimi`, `adresa`, `qyteti`, `telefoni`, `email`, `logo`, `orari_hapjes`, `orari_mbylljes`, `vleresimi`, `status`, `user_id`) VALUES
(8, 'Bella Napoli', 'Bella Napoli është një restorant italian që ofron pica tradicionale të pjekura në furrë me dru dhe pasta të freskëta. Ambienti është i ngrohtë dhe familjar, i përshtatshëm për darka me miqtë dhe familjen.', 'Rr. Dëshmorët e Kombit 25', 'Prizren', '+38344123456', 'info@bellanapoli.com', '1783155381536-OIP.webp', '10:00:00', '23:00:00', 0.00, 'active', 19),
(9, 'McDonald\'s', 'Fast food restaurant i njohur nderkombetarisht', 'Rruga Bill Clinton', 'Prishtine', '+38344111111', 'mcdonalds@demo.com', '1783155824619-mcdonalds_logo.webp', '10:00:00', '23:00:00', 0.00, 'active', 20);

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `restaurant_id` int(11) DEFAULT NULL,
  `vleresimi` int(11) DEFAULT NULL,
  `komenti` text DEFAULT NULL,
  `data_krijimit` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `emertimi` varchar(50) DEFAULT NULL,
  `pershkrimi` text DEFAULT NULL,
  `normalized_name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `emertimi`, `pershkrimi`, `normalized_name`) VALUES
(3, 'Admin', 'System admin', 'ADMIN'),
(4, 'Customer', 'Regular user', 'CUSTOMER'),
(5, 'Owner', 'Restaurant owner', 'OWNER'),
(15, 'Driver', 'Delivery Driver', 'DRIVER');

-- --------------------------------------------------------

--
-- Table structure for table `userclaims`
--

CREATE TABLE `userclaims` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `claim_type` varchar(100) DEFAULT NULL,
  `claim_value` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userclaims`
--

INSERT INTO `userclaims` (`id`, `user_id`, `claim_type`, `claim_value`) VALUES
(1, 19, 'role', 'customer'),
(2, 20, 'role', 'customer'),
(3, 21, 'role', 'customer'),
(4, 22, 'role', 'customer');

-- --------------------------------------------------------

--
-- Table structure for table `userroles`
--

CREATE TABLE `userroles` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userroles`
--

INSERT INTO `userroles` (`id`, `user_id`, `role_id`) VALUES
(6, 15, 3),
(9, 18, 15),
(10, 20, 5),
(11, 21, 4),
(16, 22, 15);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `emri` varchar(50) DEFAULT NULL,
  `mbiemri` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `email_confirmed` tinyint(1) DEFAULT 0,
  `lockout_enabled` tinyint(1) DEFAULT 0,
  `access_failed_count` int(11) DEFAULT 0,
  `data_krijimit` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `emri`, `mbiemri`, `email`, `password_hash`, `phone_number`, `email_confirmed`, `lockout_enabled`, `access_failed_count`, `data_krijimit`, `status`) VALUES
(15, 'Jon', 'Hoxha', 'jon@example.com', '$2b$10$Z1YZZo.GPDV40b13RD1wKOBRr24Qc3/ZCb4833xC4HJMn3LRfg7KC', NULL, 0, 0, 0, '2026-07-01 07:46:16', 'active'),
(18, 'vesa', 'Hoxha', 'vesa@example.com', '$2b$10$vhueD4hDk8tJHs9TTyjsteRVTvPyfDSyA8oBvB3F4jtLJh7whGJtC', NULL, 0, 0, 0, '2026-07-01 10:39:21', 'active'),
(19, 'ema', 'Krasniqi', 'ema@example.com', '$2b$10$nTsMSleaq/CEQ2WPawo3meyHC1aDeK9ZDGQixR9d7zXsV2IB8M2uu', '12345678', 0, 0, 0, '2026-07-03 10:19:59', 'active'),
(20, 'Denis', 'Krasniqi', 'denis@example.com', '$2b$10$l1rhDXwKxbdjPazWVi07XeTOjQDDRbQH/vE4dw999tQuHfA9UxK2q', '12345678', 0, 0, 0, '2026-07-04 08:58:20', 'active'),
(21, 'Hana', 'Krasniqi', 'hana@example.com', '$2b$10$7Z2h3wyCTPiGp11e2IO5huVsKWgwXf3btJY5knRUQYWBvSN.ciXb2', '12345678', 0, 0, 0, '2026-07-04 11:16:36', 'active'),
(22, 'Sara', 'Hoxha', 'sara@example.com', '$2b$10$hkrUDPxbAICM.BFW79o7Luy7fi8Q2/fjJdCrbTJjeF9YRcrqSsjA.', '02344555', 0, 0, 0, '2026-07-05 17:09:52', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `usertokens`
--

CREATE TABLE `usertokens` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `login_provider` varchar(100) DEFAULT NULL,
  `token_name` varchar(100) DEFAULT NULL,
  `token_value` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usertokens`
--

INSERT INTO `usertokens` (`id`, `user_id`, `login_provider`, `token_name`, `token_value`) VALUES
(1, 19, 'local', 'registration', 'registered'),
(2, 20, 'local', 'registration', 'registered'),
(3, 21, 'local', 'registration', 'registered'),
(4, 22, 'local', 'registration', 'registered');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `deliveries`
--
ALTER TABLE `deliveries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `driver_id` (`driver_id`);

--
-- Indexes for table `deliverydrivers`
--
ALTER TABLE `deliverydrivers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `menucategories`
--
ALTER TABLE `menucategories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `restaurant_id` (`restaurant_id`);

--
-- Indexes for table `menuitems`
--
ALTER TABLE `menuitems`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `orderitems`
--
ALTER TABLE `orderitems`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `menu_item_id` (`menu_item_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `restaurant_id` (`restaurant_id`);

--
-- Indexes for table `promotions`
--
ALTER TABLE `promotions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `restaurant_id` (`restaurant_id`);

--
-- Indexes for table `refreshtokens`
--
ALTER TABLE `refreshtokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `restaurants`
--
ALTER TABLE `restaurants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `restaurant_id` (`restaurant_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userclaims`
--
ALTER TABLE `userclaims`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `userroles`
--
ALTER TABLE `userroles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `usertokens`
--
ALTER TABLE `usertokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `deliveries`
--
ALTER TABLE `deliveries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `deliverydrivers`
--
ALTER TABLE `deliverydrivers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `menucategories`
--
ALTER TABLE `menucategories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `menuitems`
--
ALTER TABLE `menuitems`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `orderitems`
--
ALTER TABLE `orderitems`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `promotions`
--
ALTER TABLE `promotions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `refreshtokens`
--
ALTER TABLE `refreshtokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `restaurants`
--
ALTER TABLE `restaurants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `userclaims`
--
ALTER TABLE `userclaims`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `userroles`
--
ALTER TABLE `userroles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `usertokens`
--
ALTER TABLE `usertokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `deliveries`
--
ALTER TABLE `deliveries`
  ADD CONSTRAINT `deliveries_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `deliveries_ibfk_2` FOREIGN KEY (`driver_id`) REFERENCES `deliverydrivers` (`id`);

--
-- Constraints for table `deliverydrivers`
--
ALTER TABLE `deliverydrivers`
  ADD CONSTRAINT `fk_drivers_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `menucategories`
--
ALTER TABLE `menucategories`
  ADD CONSTRAINT `fk_menucategories_restaurant` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `menuitems`
--
ALTER TABLE `menuitems`
  ADD CONSTRAINT `menuitems_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `menucategories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orderitems`
--
ALTER TABLE `orderitems`
  ADD CONSTRAINT `orderitems_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orderitems_ibfk_2` FOREIGN KEY (`menu_item_id`) REFERENCES `menuitems` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_orders_restaurant` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_orders_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `promotions`
--
ALTER TABLE `promotions`
  ADD CONSTRAINT `fk_promotions_restaurant` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `refreshtokens`
--
ALTER TABLE `refreshtokens`
  ADD CONSTRAINT `fk_refreshtokens_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `restaurants`
--
ALTER TABLE `restaurants`
  ADD CONSTRAINT `fk_restaurants_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `fk_reviews_restaurant` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_reviews_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

--
-- Constraints for table `userclaims`
--
ALTER TABLE `userclaims`
  ADD CONSTRAINT `fk_userclaims_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `userroles`
--
ALTER TABLE `userroles`
  ADD CONSTRAINT `fk_userroles_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `userroles_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `usertokens`
--
ALTER TABLE `usertokens`
  ADD CONSTRAINT `fk_usertokens_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
