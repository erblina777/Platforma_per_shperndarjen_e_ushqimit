-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 22, 2026 at 05:06 PM
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
(2, NULL, NULL, NULL, NULL, NULL, NULL);

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
(7, 4, 'Burgers', 'All burger items', 1),
(8, 4, 'Drinks', 'Cold drinks', 2),
(9, 5, 'Pizzas', 'All pizza types', 1);

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
(6, 7, 'Classic Burger', 'Beef burger with cheese', 5.50, 'classicburger.png', 1, 'gluten,dairy', 650),
(7, 8, 'Coca Cola', 'Cold drink', 1.50, 'cocacola.png', 1, NULL, 150),
(8, 9, 'Margherita Pizza', 'Cheese & tomato', 6.00, 'margherita.png\r\n', 1, 'gluten,dairy', 700);

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
(1, 4, 'SAVE10', 10.00, 5.00, '2026-01-01', '2026-12-31', 'active'),
(2, 5, 'PIZZA20', 20.00, 8.00, '2026-01-01', '2026-12-31', 'active');

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
(3, 'Burger King', 'Burgers të freskëta dhe të shijshme çdo ditë.', 'Adresa...', 'Prishtinë', '049123789', 'burgerking@gmail.com', 'burgerking.png', '08:00:00', '20:00:00', 4.70, 'active', 6),
(4, 'Burger House', 'Best burgers in town', 'Rruga 1', 'Prishtinë', '049111222', 'burger@house.com', 'burgerhouse.png', '09:00:00', '23:00:00', 4.50, 'active', 1),
(5, 'Pizza Time', 'Italian style pizza', 'Rruga 2', 'Prishtinë', '049333444', 'pizza@time.com', 'pizzatime.png', '10:00:00', '00:00:00', 4.70, 'active', 1);

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

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `order_id`, `user_id`, `restaurant_id`, `vleresimi`, `komenti`, `data_krijimit`) VALUES
(1, NULL, NULL, 4, 5, 'Super ushqim dhe shërbim i shpejtë!', '2026-05-19 17:50:35'),
(2, NULL, NULL, 5, 4, 'Shumë pizza e mirë!', '2026-05-19 17:50:35');

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

-- --------------------------------------------------------

--
-- Table structure for table `userroles`
--

CREATE TABLE `userroles` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(1, 'test', 'testttT', 'test@email.com', '55554rt5y5', NULL, 0, 0, 0, '2026-05-05 09:08:17', 'active'),
(3, 'test', 'testttTee', 'tesdt@email.com', '55554rt5y5', NULL, 0, 0, 0, '2026-05-06 14:23:58', 'active'),
(4, 'test', 'dedde', 'dwedew@mail.com', 'wefwfw', NULL, 0, 0, 0, '2026-05-06 14:57:35', 'active'),
(5, 'Ardit', 'Hoxha', 'ardit@mail.com', '123456', NULL, 0, 0, 0, '2026-05-19 17:39:11', 'active'),
(6, 'Sara', 'Krasniqi', 'sara@mail.com', '123456', NULL, 0, 0, 0, '2026-05-19 17:39:11', 'active'),
(9, 'Arben', 'Krasniqi', 'arben@example.com', 'hashed123', NULL, 0, 0, 0, '2026-05-19 17:45:34', 'active'),
(10, 'Elira', 'Hoxha', 'elira@example.com', 'hashed123', NULL, 0, 0, 0, '2026-05-19 17:45:34', 'active');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `deliverydrivers`
--
ALTER TABLE `deliverydrivers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `menucategories`
--
ALTER TABLE `menucategories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `menuitems`
--
ALTER TABLE `menuitems`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `orderitems`
--
ALTER TABLE `orderitems`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `promotions`
--
ALTER TABLE `promotions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `refreshtokens`
--
ALTER TABLE `refreshtokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `restaurants`
--
ALTER TABLE `restaurants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `userroles`
--
ALTER TABLE `userroles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `usertokens`
--
ALTER TABLE `usertokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
  ADD CONSTRAINT `deliverydrivers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `menucategories`
--
ALTER TABLE `menucategories`
  ADD CONSTRAINT `menucategories_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE;

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
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`);

--
-- Constraints for table `promotions`
--
ALTER TABLE `promotions`
  ADD CONSTRAINT `promotions_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`);

--
-- Constraints for table `refreshtokens`
--
ALTER TABLE `refreshtokens`
  ADD CONSTRAINT `refreshtokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `restaurants`
--
ALTER TABLE `restaurants`
  ADD CONSTRAINT `restaurants_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `reviews_ibfk_3` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`);

--
-- Constraints for table `userclaims`
--
ALTER TABLE `userclaims`
  ADD CONSTRAINT `userclaims_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `userroles`
--
ALTER TABLE `userroles`
  ADD CONSTRAINT `userroles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `userroles_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `usertokens`
--
ALTER TABLE `usertokens`
  ADD CONSTRAINT `usertokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
