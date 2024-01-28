-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 28, 2024 at 12:00 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `serveasy`
--

-- --------------------------------------------------------

--
-- Table structure for table `chef`
--

CREATE TABLE `chef` (
  `c_id` varchar(50) NOT NULL,
  `c_name` varchar(50) NOT NULL,
  `c_full_name` varchar(50) NOT NULL,
  `c_email` varchar(30) NOT NULL,
  `c_password` varchar(25) NOT NULL,
  `c_phone_number` bigint(15) NOT NULL,
  `c_status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `deliverer`
--

CREATE TABLE `deliverer` (
  `d_id` varchar(50) NOT NULL,
  `d_name` varchar(50) NOT NULL,
  `d_full_name` varchar(50) NOT NULL,
  `d_email` varchar(30) NOT NULL,
  `d_password` varchar(25) NOT NULL,
  `d_phone_number` bigint(15) NOT NULL,
  `d_status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `delivery`
--

CREATE TABLE `delivery` (
  `delivery_id` varchar(50) NOT NULL,
  `order_id` varchar(50) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `deliverer_id` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `food`
--

CREATE TABLE `food` (
  `FoodID` varchar(50) NOT NULL,
  `TranslatedRecipeName` varchar(129) DEFAULT NULL,
  `TranslatedIngredients` varchar(1199) DEFAULT NULL,
  `TotalTimeInMins` int(11) DEFAULT NULL,
  `Cuisine` varchar(50) DEFAULT NULL,
  `CleanedIngredients` varchar(2000) DEFAULT NULL,
  `imageurl` varchar(1000) DEFAULT NULL,
  `Ingredientcount` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` varchar(50) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `full_name` varchar(50) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(25) NOT NULL,
  `phone_number` bigint(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` varchar(50) NOT NULL,
  `food_name` varchar(75) NOT NULL,
  `ingredients` longtext NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `recommendation_data`
--

CREATE TABLE `recommendation_data` (
  `delivered_id` varchar(50) NOT NULL,
  `orderID` varchar(50) NOT NULL,
  `recipeID` varchar(50) NOT NULL,
  `recipe_name` varchar(1000) DEFAULT NULL,
  `comment_id` varchar(50) DEFAULT NULL,
  `user_id` varchar(100) NOT NULL,
  `user_name` varchar(50) DEFAULT NULL,
  `user_reputation` varchar(10) DEFAULT NULL,
  `created_at` int(11) DEFAULT NULL,
  `reply_count` varchar(50) DEFAULT NULL,
  `thumbs_up` varchar(10) DEFAULT NULL,
  `thumbs_down` int(11) DEFAULT NULL,
  `stars` varchar(10) DEFAULT NULL,
  `best_score` varchar(10) DEFAULT NULL,
  `text` varchar(2742) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


--
-- Indexes for dumped tables
--

--
-- Indexes for table `chef`
--
ALTER TABLE `chef`
  ADD PRIMARY KEY (`c_id`);

--
-- Indexes for table `deliverer`
--
ALTER TABLE `deliverer`
  ADD PRIMARY KEY (`d_id`);

--
-- Indexes for table `delivery`
--
ALTER TABLE `delivery`
  ADD PRIMARY KEY (`delivery_id`),
  ADD KEY `deliverer_id` (`deliverer_id`),
  ADD KEY `delivery_ibfk_1` (`order_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `food`
--
ALTER TABLE `food`
  ADD PRIMARY KEY (`FoodID`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `recommendation_data`
--
ALTER TABLE `recommendation_data`
  ADD PRIMARY KEY (`delivered_id`),
  ADD KEY `recipeID` (`recipeID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `delivery`
--
ALTER TABLE `delivery`
  ADD CONSTRAINT `delivery_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `recommendation_data`
--
ALTER TABLE `recommendation_data`
  ADD CONSTRAINT `recommendation_data_ibfk_1` FOREIGN KEY (`recipeID`) REFERENCES `food` (`FoodID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
