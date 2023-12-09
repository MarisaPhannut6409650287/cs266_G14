-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 09, 2023 at 06:33 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `code_camp_bd_fos`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `adm_id` int(11) NOT NULL,
  `username` varchar(222) NOT NULL,
  `password` varchar(222) NOT NULL,
  `email` varchar(222) NOT NULL,
  `code` varchar(222) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`adm_id`, `username`, `password`, `email`, `code`, `date`) VALUES
(1, 'ccbd', '0d89ec971a7bcfe26d68c177a9d53334', 'admin@gmail.com', '', '2023-02-22 07:18:13'),
(2, 'admin', 'ad1234', 'ad@gmail.com', '002', '2023-11-12 13:20:48');

-- --------------------------------------------------------

--
-- Table structure for table `commentRes`
--

CREATE TABLE `commentRes` (
  `commentID` int(10) NOT NULL,
  `username` varchar(100) NOT NULL,
  `resID` int(20) NOT NULL,
  `type` varchar(20) NOT NULL,
  `detail` varchar(1000) NOT NULL,
  `time` date NOT NULL,
  `point` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `commentRes`
--

INSERT INTO `commentRes` (`commentID`, `username`, `resID`, `type`, `detail`, `time`, `point`) VALUES
(64, 'Anonymous', 1, 'Food', 'อาหารอร่อยมากกก', '2023-12-01', 3),
(87, 'helloWorld', 1, 'Service', 'อาหารมาเร็วมาก', '2023-12-05', 4),
(93, 'super_z', 2, 'Service', 'so fast', '2023-12-05', 3),
(97, 'Anonymous', 3, 'Food', 'delicious!!!', '2023-12-05', 5),
(100, 'helloWorld', 1, 'Service', 'ใช้ได้', '2023-12-07', 3);

-- --------------------------------------------------------

--
-- Table structure for table `dishes`
--

CREATE TABLE `dishes` (
  `d_id` int(11) NOT NULL,
  `rs_id` int(11) NOT NULL,
  `title` varchar(222) NOT NULL,
  `slogan` varchar(222) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `img` varchar(222) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `dishes`
--

INSERT INTO `dishes` (`d_id`, `rs_id`, `title`, `slogan`, `price`, `img`) VALUES
(1, 1, 'Yorkshire Lamb Patties', 'Lamb patties which melt in your mouth, and are quick and easy to make. Served hot with a crisp salad.', 14.00, '62908867a48e4.jpg'),
(2, 1, 'Lobster Thermidor', 'Lobster Thermidor is a French dish of lobster meat cooked in a rich wine sauce, stuffed back into a lobster shell, and browned.', 36.00, '629089fee52b9.jpg'),
(3, 4, 'Chicken Madeira', 'Chicken Madeira, like Chicken Marsala, is made with chicken, mushrooms, and a special fortified wine. But, the wines are different;', 23.00, '62908bdf2f581.jpg'),
(4, 1, 'Stuffed Jacket Potatoes', 'Deep fry whole potatoes in oil for 8-10 minutes or coat each potato with little oil. Mix the onions, garlic, tomatoes and mushrooms. Add yoghurt, ginger, garlic, chillies, coriander', 8.00, '62908d393465b.jpg'),
(5, 2, 'Pink Spaghetti Gamberoni', 'Spaghetti with prawns in a fresh tomato sauce. This dish originates from Southern Italy and with the combination of prawns, garlic, chilli and pasta. Garnish each with remaining tablespoon parsley.', 21.00, '606d7491a9d13.jpg'),
(6, 2, 'Cheesy Mashed Potato', 'Deliciously Cheesy Mashed Potato. The ultimate mash for your Thanksgiving table or the perfect accompaniment to vegan sausage casserole. Everyone will love it\'s fluffy, cheesy.', 5.00, '606d74c416da5.jpg'),
(7, 2, 'Crispy Chicken Strips', 'Fried chicken strips, served with special honey mustard sauce.', 8.00, '606d74f6ecbbb.jpg'),
(8, 2, 'Lemon Grilled Chicken And Pasta', 'Marinated rosemary grilled chicken breast served with mashed potatoes and your choice of pasta.', 11.00, '606d752a209c3.jpg'),
(9, 3, 'Vegetable Fried Rice', 'Chinese rice wok with cabbage, beans, carrots, and spring onions.', 5.00, '606d7575798fb.jpg'),
(10, 3, 'Prawn Crackers', '12 pieces deep-fried prawn crackers', 7.00, '606d75a7e21ec.jpg'),
(11, 3, 'Spring Rolls', 'Lightly seasoned shredded cabbage, onion and carrots, wrapped in house made spring roll wrappers, deep fried to golden brown.', 6.00, '606d75ce105d0.jpg'),
(12, 3, 'Manchurian Chicken', 'Chicken pieces slow cooked with spring onions in our house made manchurian style sauce.', 11.00, '606d7600dc54c.jpg'),
(13, 4, ' Buffalo Wings', 'Fried chicken wings tossed in spicy Buffalo sauce served with crisp celery sticks and Blue cheese dip.', 11.00, '606d765f69a19.jpg'),
(14, 4, 'Mac N Cheese Bites', 'Served with our traditional spicy queso and marinara sauce.', 9.00, '606d768a1b2a1.jpg'),
(15, 4, 'Signature Potato Twisters', 'Spiral sliced potatoes, topped with our traditional spicy queso, Monterey Jack cheese, pico de gallo, sour cream and fresh cilantro.', 6.00, '606d76ad0c0cb.jpg'),
(16, 4, 'Meatballs Penne Pasta', 'Garlic-herb beef meatballs tossed in our house-made marinara sauce and penne pasta topped with fresh parsley.', 10.00, '606d76eedbb99.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `remark`
--

CREATE TABLE `remark` (
  `id` int(11) NOT NULL,
  `frm_id` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `remark` mediumtext NOT NULL,
  `remarkDate` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `remark`
--

INSERT INTO `remark` (`id`, `frm_id`, `status`, `remark`, `remarkDate`) VALUES
(16, 23, 'in process', 'going!!', '2023-10-25 02:00:39'),
(17, 23, 'closed', 'wait', '2023-10-25 02:01:42'),
(18, 24, 'in process', 'on the way!!', '2023-11-17 09:27:14'),
(19, 24, 'closed', 'delived', '2023-11-17 10:17:21'),
(20, 24, 'in process', 'on\r\n', '2023-11-17 10:20:08'),
(21, 24, 'in process', '--', '2023-11-17 10:26:53'),
(22, 24, 'rejected', '!!', '2023-11-17 10:29:24'),
(23, 24, 'closed', 'de', '2023-11-17 10:39:52'),
(24, 25, 'in process', '..', '2023-11-22 04:44:48'),
(25, 26, 'closed', '.', '2023-11-22 05:40:35'),
(26, 27, 'rejected', '.', '2023-11-22 05:40:58'),
(27, 25, 'closed', '.', '2023-11-22 06:59:57'),
(28, 25, 'in process', '.', '2023-11-22 07:01:09'),
(29, 25, 'rejected', '.', '2023-11-22 07:04:12'),
(30, 25, 'in process', '.', '2023-11-22 07:05:51'),
(31, 25, 'closed', '.', '2023-11-22 07:13:35'),
(32, 25, 'rejected', '.', '2023-11-22 07:17:10'),
(33, 25, 'in process', '.', '2023-11-22 07:18:15'),
(34, 25, 'in process', '.', '2023-11-22 07:20:40'),
(35, 29, 'in process', '.', '2023-11-22 07:21:12'),
(36, 30, 'in process', '.', '2023-11-23 12:47:48'),
(37, 31, 'in process', '.', '2023-12-02 17:12:56'),
(38, 32, 'in process', '.', '2023-12-02 17:13:44');

-- --------------------------------------------------------

--
-- Table structure for table `restaurant`
--

CREATE TABLE `restaurant` (
  `rs_id` int(11) NOT NULL,
  `c_id` int(11) NOT NULL,
  `title` varchar(222) NOT NULL,
  `email` varchar(222) NOT NULL,
  `phone` varchar(222) NOT NULL,
  `url` varchar(222) NOT NULL,
  `o_hr` varchar(222) NOT NULL,
  `c_hr` varchar(222) NOT NULL,
  `o_days` varchar(222) NOT NULL,
  `address` text NOT NULL,
  `image` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `restaurant`
--

INSERT INTO `restaurant` (`rs_id`, `c_id`, `title`, `email`, `phone`, `url`, `o_hr`, `c_hr`, `o_days`, `address`, `image`, `date`) VALUES
(1, 1, 'North Street Tavern', 'nthavern@mail.com', '3547854700', 'www.northstreettavern.com', '8am', '8pm', 'mon-sat', '1128 North St, White Plains', '6290877b473ce.jpg', '2022-05-27 08:10:35'),
(2, 2, 'Eataly', 'eataly@gmail.com', '0557426406', 'www.eataly.com', '11am', '9pm', 'Mon-Sat', '800 Boylston St, Boston', '606d720b5fc71.jpg', '2022-05-27 08:06:41'),
(3, 3, 'Nan Xiang Xiao Long Bao', 'nanxiangbao45@mail.com', '1458745855', 'www.nanxiangbao45.com', '9am', '8pm', 'mon-sat', 'Queens, New York', '6290860e72d1e.jpg', '2022-05-27 08:04:30'),
(4, 4, 'Highlands Bar & Grill', 'hbg@mail.com', '6545687458', 'www.hbg.com', '7am', '8pm', 'mon-sat', '812 Walter Street', '6290af6f81887.jpg', '2022-05-27 11:01:03');

-- --------------------------------------------------------

--
-- Table structure for table `res_category`
--

CREATE TABLE `res_category` (
  `c_id` int(11) NOT NULL,
  `c_name` varchar(222) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `res_category`
--

INSERT INTO `res_category` (`c_id`, `c_name`, `date`) VALUES
(1, 'Continental', '2022-05-27 08:07:35'),
(2, 'Italian', '2021-04-07 08:45:23'),
(3, 'Chinese', '2021-04-07 08:45:25'),
(4, 'American', '2021-04-07 08:45:28');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `u_id` int(11) NOT NULL,
  `username` varchar(222) NOT NULL,
  `f_name` varchar(222) NOT NULL,
  `l_name` varchar(222) NOT NULL,
  `email` varchar(222) NOT NULL,
  `phone` varchar(222) NOT NULL,
  `password` varchar(222) NOT NULL,
  `address` text NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`u_id`, `username`, `f_name`, `l_name`, `email`, `phone`, `password`, `address`, `status`, `date`) VALUES
(9, 'watermelon', 'user', 'name', 'user4@mail.com', '7685764567', '5f129ed2b44dcd438c6d44938ee85137', 'lopburi', 1, '2023-12-05 08:44:46'),
(12, 'aom', 'user', 'name', 'user@gmail.com', '0876543456', 'b5b73fae0d87d8b4e2573105f8fbe7bc', 'dcondo', 1, '2023-12-05 08:40:53'),
(13, 'super_z', 'user2', 'name2', 'user2@gmail.com', '0845676543', 'b5b73fae0d87d8b4e2573105f8fbe7bc', 'dcondo2', 1, '2023-12-05 08:39:39'),
(14, 'helloWorld', 'John', 'Doe', 'user@hotmail.com', '0897654536', 'b5b73fae0d87d8b4e2573105f8fbe7bc', 'dcon', 1, '2023-12-05 08:42:32');

-- --------------------------------------------------------

--
-- Table structure for table `users_orders`
--

CREATE TABLE `users_orders` (
  `o_id` int(11) NOT NULL,
  `u_id` int(11) NOT NULL,
  `title` varchar(222) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `status` varchar(222) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users_orders`
--

INSERT INTO `users_orders` (`o_id`, `u_id`, `title`, `quantity`, `price`, `status`, `date`) VALUES
(23, 11, 'Yorkshire Lamb Patties', 1, 14.00, 'closed', '2023-10-25 02:01:42'),
(32, 12, 'Pink Spaghetti Gamberoni', 2, 21.00, 'in process', '2023-12-02 17:13:44'),
(33, 13, 'Yorkshire Lamb Patties', 1, 14.00, NULL, '2023-12-02 17:51:52'),
(34, 14, 'Yorkshire Lamb Patties', 1, 14.00, NULL, '2023-12-03 12:21:33');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`adm_id`);

--
-- Indexes for table `commentRes`
--
ALTER TABLE `commentRes`
  ADD PRIMARY KEY (`commentID`);

--
-- Indexes for table `dishes`
--
ALTER TABLE `dishes`
  ADD PRIMARY KEY (`d_id`);

--
-- Indexes for table `remark`
--
ALTER TABLE `remark`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `restaurant`
--
ALTER TABLE `restaurant`
  ADD PRIMARY KEY (`rs_id`);

--
-- Indexes for table `res_category`
--
ALTER TABLE `res_category`
  ADD PRIMARY KEY (`c_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`u_id`);

--
-- Indexes for table `users_orders`
--
ALTER TABLE `users_orders`
  ADD PRIMARY KEY (`o_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `adm_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `commentRes`
--
ALTER TABLE `commentRes`
  MODIFY `commentID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT for table `dishes`
--
ALTER TABLE `dishes`
  MODIFY `d_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `remark`
--
ALTER TABLE `remark`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `restaurant`
--
ALTER TABLE `restaurant`
  MODIFY `rs_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `res_category`
--
ALTER TABLE `res_category`
  MODIFY `c_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `u_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `users_orders`
--
ALTER TABLE `users_orders`
  MODIFY `o_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
