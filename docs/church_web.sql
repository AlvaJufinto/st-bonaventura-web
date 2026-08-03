-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 03, 2026 at 09:00 AM
-- Server version: 8.0.30
-- PHP Version: 8.5.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `church_web`
--

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `id` bigint UNSIGNED NOT NULL,
  `main_image_name` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `preview` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `published_date` date NOT NULL,
  `content` longtext NOT NULL,
  `publisher_id` bigint UNSIGNED DEFAULT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `status_id` bigint UNSIGNED NOT NULL,
  `article_type_id` bigint UNSIGNED NOT NULL,
  `expired_date` date DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `main_image_name`, `title`, `preview`, `slug`, `published_date`, `content`, `publisher_id`, `user_id`, `status_id`, `article_type_id`, `expired_date`, `note`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Selamat Datang di Website Paroki St. Bonaventura', 'Website resmi Paroki St. Bonaventura Pulo Gadung.', 'selamat-datang', '2025-06-01', '<p>Selamat datang di website resmi Paroki St. Bonaventura Pulo Gadung. Website ini menyediakan informasi tentang kegiatan, berita, dan pengumuman dari paroki kami.</p>', NULL, 1, 3, 1, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `article_types`
--

CREATE TABLE `article_types` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `article_types`
--

INSERT INTO `article_types` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'berita', NULL, NULL),
(2, 'kegiatan', NULL, NULL),
(3, 'pengumuman', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `audit_logs`
--

CREATE TABLE `audit_logs` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `action` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `auditable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `auditable_id` bigint UNSIGNED NOT NULL,
  `old_values` json DEFAULT NULL,
  `new_values` json DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `councils`
--

CREATE TABLE `councils` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `order` int UNSIGNED NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `councils`
--

INSERT INTO `councils` (`id`, `title`, `user_id`, `order`, `created_at`, `updated_at`) VALUES
(1, 'Ketua Umum DP / PGDP', NULL, 1, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(2, 'Ketua I DP / PGDP', NULL, 2, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(3, 'Wakil Ketua I DP / PGDP', NULL, 3, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(4, 'Wakil Ketua II DP / PGDP', NULL, 4, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(5, 'Sekretaris I DP / PGDP', NULL, 5, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(6, 'Sekretaris II DP / PGDP', NULL, 6, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(7, 'Sekretaris III DP / PGDP', NULL, 7, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(8, 'Bendahara I DP / PGDP', NULL, 8, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(9, 'Bendahara II DP / PGDP', NULL, 9, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(10, 'Bendahara III DP / PGDP', NULL, 10, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(11, 'Bidang Peribadatan', NULL, 11, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(12, 'Bidang Pewartaan', NULL, 12, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(13, 'Bidang Persekutuan & Pendampingan Teritorial dan Kategorial', NULL, 13, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(14, 'Bidang Pelayanan & Tim Khusus', NULL, 14, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(15, 'Bidang Kesaksian', NULL, 15, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(16, 'Bidang Pelatihan dan Pengembangan Paroki', NULL, 16, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(17, 'Bidang Perencanaan & Evaluasi', NULL, 17, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(18, 'Pendampingan Bagian', NULL, 18, '2026-08-01 15:51:30', '2026-08-01 15:51:30');

-- --------------------------------------------------------

--
-- Table structure for table `council_user`
--

CREATE TABLE `council_user` (
  `id` bigint UNSIGNED NOT NULL,
  `council_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `period_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `council_user`
--

INSERT INTO `council_user` (`id`, `council_id`, `user_id`, `period_id`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 1, '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(2, 2, 3, 1, '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(3, 3, 4, 1, '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(4, 4, 5, 1, '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(5, 5, 6, 1, '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(6, 6, 7, 1, '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(7, 7, 8, 1, '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(8, 8, 9, 1, '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(9, 9, 10, 1, '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(10, 10, 11, 1, '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(11, 11, 12, 1, '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(12, 12, 13, 1, '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(13, 12, 14, 1, '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(14, 13, 15, 1, '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(15, 13, 16, 1, '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(16, 14, 17, 1, '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(17, 14, 18, 1, '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(18, 15, 19, 1, '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(19, 16, 20, 1, '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(20, 17, 21, 1, '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(21, 17, 22, 1, '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(22, 18, 23, 1, '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(23, 1, 2, 2, '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(24, 2, 3, 2, '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(25, 3, 5, 2, '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(26, 4, 119, 2, '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(27, 5, 7, 2, '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(28, 6, 121, 2, '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(29, 7, 122, 2, '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(30, 8, 10, 2, '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(31, 9, 124, 2, '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(32, 10, 125, 2, '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(33, 11, 25, 2, '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(34, 12, 15, 2, '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(35, 13, 14, 2, '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(36, 13, 320, 2, '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(37, 14, 17, 2, '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(38, 14, 18, 2, '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(39, 15, 16, 2, '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(40, 16, 19, 2, '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(41, 17, 22, 2, '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(42, 17, 50, 2, '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(43, 18, 29, 2, '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(44, 12, 347, 2, '2026-08-03 05:13:54', '2026-08-03 05:13:54');

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL DEFAULT 'Warta Minggu Paroki Pulomas',
  `alternate_title` varchar(255) NOT NULL,
  `document_name` varchar(255) NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `status_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `title`, `alternate_title`, `document_name`, `user_id`, `status_id`, `created_at`, `updated_at`) VALUES
(1, 'Warta Minggu Paroki Pulomas', 'HARI MINGGU ADVEN II', '2025-12-06-17x38x45-DNH.pdf', 1, 3, '2025-12-06 03:38:45', '2026-02-27 04:25:12'),
(2, 'Warta Minggu Paroki Pulomas', 'warta minggu test', 'docs/warta-minggu/2026/02/warta-minggu-test-879301.pdf', 2, 3, '2026-02-27 04:59:32', '2026-02-27 04:59:32'),
(3, 'Warta Minggu Paroki Pulomas', 'asdasd', 'docs/warta-minggu/2026/02/asdasd-b0732d1f-1fc1-497.pdf', 2, 3, '2026-02-28 01:06:07', '2026-02-28 01:06:23'),
(4, 'Warta Minggu Paroki Pulomas', 'HARI MINGGU PRAPASKAH I', 'docs/warta-minggu/2026/02/hari-minggu-prapaskah-i.pdf', 2, 3, '2026-02-28 01:18:47', '2026-02-28 01:18:59'),
(5, 'Warta Minggu Paroki Pulomas', 'HARI MINGGU PRAPASKAH II', 'docs/warta-minggu/2026/03/hari-minggu-prapaskah-ii.pdf', 2, 3, '2026-03-04 07:21:39', '2026-03-04 07:21:39'),
(6, 'Warta Minggu Paroki Pulomas', 'Hari Raya Paskah Kebangkitan Tuhan', 'docs/warta-minggu/2026/04/hari-raya-paskah-kebangkitan.pdf', 2, 3, '2026-04-06 01:45:57', '2026-04-06 01:45:57'),
(7, 'Warta Minggu Paroki Pulomas', 'Hari Minggu Paskah II', 'docs/warta-minggu/2026/04/hari-minggu-paskah-ii.pdf', 2, 3, '2026-04-11 04:37:52', '2026-04-11 04:37:52'),
(8, 'Warta Minggu Paroki Pulomas', 'Hari Minggu Paskah IV', 'docs/warta-minggu/2026/05/hari-minggu-paskah-iv.pdf', 2, 3, '2026-05-01 04:48:40', '2026-05-01 04:48:40'),
(9, 'Warta Minggu Paroki Pulomas', 'Hari Minggu Paskah V', 'docs/warta-minggu/2026/05/hari-minggu-paskah-v.pdf', 2, 3, '2026-05-05 04:37:44', '2026-05-05 04:37:57'),
(10, 'Warta Minggu Paroki Pulomas', 'Hari Minggu Paskah VI', 'docs/warta-minggu/2026/05/hari-minggu-paskah-vi.pdf', 2, 3, '2026-05-19 17:29:21', '2026-05-19 17:29:21'),
(11, 'Warta Minggu Paroki Pulomas', 'Hari Minggu Paskah VII', 'docs/warta-minggu/2026/05/hari-minggu-paskah-vii.pdf', 2, 3, '2026-05-19 17:29:59', '2026-05-19 17:29:59'),
(12, 'Warta Minggu Paroki Pulomas', 'Hari Raya Pentakosta', 'docs/warta-minggu/2026/05/hari-raya-pentakosta.pdf', 2, 3, '2026-05-24 16:48:40', '2026-05-24 16:48:40'),
(13, 'Warta Minggu Paroki Pulomas', 'Hari Raya Tritunggal Maha Kudus', 'docs/warta-minggu/2026/06/hari-raya-tritunggal-maha-kudus.pdf', 2, 3, '2026-06-02 23:56:54', '2026-06-02 23:56:54'),
(14, 'Warta Minggu Paroki Pulomas', 'Hari Raya Tubuh dan Darah Kristus', 'docs/warta-minggu/2026/06/hari-raya-tubuh-dan-darah-kristus.pdf', 2, 3, '2026-06-10 00:02:51', '2026-06-10 00:02:51'),
(15, 'Warta Minggu Paroki Pulomas', 'Hari Minggu Biasa XI', 'docs/warta-minggu/2026/06/hari-minggu-biasa-xi.pdf', 2, 3, '2026-06-12 23:04:48', '2026-06-12 23:04:48'),
(16, 'Warta Minggu Paroki Pulomas', 'Hari Minggu Biasa XII', 'docs/warta-minggu/2026/06/hari-minggu-biasa-xii.pdf', 2, 3, '2026-06-20 01:52:48', '2026-06-20 01:52:48'),
(17, 'Warta Minggu Paroki Pulomas', 'Hari Minggu Biasa XIV', 'docs/warta-minggu/2026/07/hari-minggu-biasa-xiv.pdf', 2, 3, '2026-07-07 20:49:13', '2026-07-07 20:49:13'),
(18, 'Warta Minggu Paroki Pulomas', 'Hari Minggu Biasa XV', 'docs/warta-minggu/2026/07/hari-minggu-biasa-xv.pdf', 2, 3, '2026-07-11 00:35:06', '2026-07-11 00:35:06'),
(19, 'Warta Minggu Paroki Pulomas', 'Hari Minggu XVI', 'docs/warta-minggu/2026/07/hari-minggu-xvi.pdf', 2, 3, '2026-07-21 00:51:16', '2026-07-21 00:51:16'),
(20, 'Warta Minggu Paroki Pulomas', 'Hari Minggu Biasa XVIII', 'docs/warta-minggu/2026/08/hari-minggu-biasa-xviii.pdf', 2, 3, '2026-07-31 22:14:28', '2026-07-31 22:14:28');

-- --------------------------------------------------------

--
-- Table structure for table `organizations`
--

CREATE TABLE `organizations` (
  `id` bigint UNSIGNED NOT NULL,
  `banner` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `alternate_name` varchar(255) DEFAULT NULL,
  `description` text,
  `slug` varchar(255) NOT NULL,
  `organization_type_id` bigint UNSIGNED NOT NULL,
  `status_id` bigint UNSIGNED NOT NULL DEFAULT '3',
  `head_id` bigint UNSIGNED DEFAULT NULL,
  `parent_id` bigint UNSIGNED DEFAULT NULL,
  `address` text,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `organizations`
--

INSERT INTO `organizations` (`id`, `banner`, `logo`, `name`, `alternate_name`, `description`, `slug`, `organization_type_id`, `status_id`, `head_id`, `parent_id`, `address`, `created_at`, `updated_at`) VALUES
(1, NULL, NULL, 'Paroki St. Bonaventura', NULL, NULL, 'paroki', 9, 3, 1, NULL, NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(2, NULL, NULL, 'Wilayah I', 'Santa Maria Ratu Rosari', NULL, 'wilayah-i', 1, 3, NULL, 1, 'Ria Rio Pacuan Kuda', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(3, NULL, NULL, 'Wilayah II', 'Santo Maximilian Kolbe', NULL, 'wilayah-ii', 1, 3, NULL, 1, 'Pulo Mas Selatan', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(4, NULL, NULL, 'Wilayah III', 'Santo Gregorius Agung', NULL, 'wilayah-iii', 1, 3, NULL, 1, 'Kp. Baru Waringin', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(5, NULL, NULL, 'Wilayah IV', 'Santo Gabriel', NULL, 'wilayah-iv', 1, 3, NULL, 1, 'Kp. Ambon', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(6, NULL, NULL, 'Wilayah V', 'Santa Veronika', NULL, 'wilayah-v', 1, 3, NULL, 1, 'Rawamangun', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(7, NULL, NULL, 'Wilayah VI', 'Santo Yohanes Paulus II', NULL, 'wilayah-vi', 1, 3, NULL, 1, 'Pulo Asem', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(8, NULL, NULL, 'Wilayah VII', 'Santa Maria Bunda Allah', NULL, 'wilayah-vii', 1, 3, NULL, 1, 'Kayu Putih', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(9, NULL, NULL, 'Wilayah VIII', 'Santo Yusuf Pekerja', NULL, 'wilayah-viii', 1, 3, NULL, 1, 'Kayu Putih & Pulo Nangka', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(10, NULL, NULL, 'Wilayah IX', 'Santo Yohanes', NULL, 'wilayah-ix', 1, 3, NULL, 1, 'Pulo Gadung', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(11, NULL, NULL, 'Wilayah X', 'Santo Fransiskus Xaverius', NULL, 'wilayah-x', 1, 3, NULL, 1, 'Jati Pulo Gadung', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(12, NULL, NULL, 'Wilayah XI', 'Santa Etheldreda', NULL, 'wilayah-xi', 1, 3, NULL, 1, 'Vila Sari Mas', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(13, NULL, NULL, 'Lingkungan Santa Anna', 'Pulo Mas Utara I', NULL, 'lingkungan-santa-anna', 2, 3, NULL, 2, 'Pulo Mas Utara I', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(14, NULL, NULL, 'Lingkungan Santo Antonius dari Padua', 'Pulo Mas Timur I', NULL, 'lingkungan-santo-antonius', 2, 3, NULL, 2, 'Pulo Mas Timur I', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(15, NULL, NULL, 'Lingkungan Santo Yoakim', 'Pulo Mas Utara II & III', NULL, 'lingkungan-santo-yoakim', 2, 3, NULL, 2, 'Pulo Mas Utara II & III', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(16, NULL, NULL, 'Lingkungan Santo Carolus Borromeus', 'Pacuan Kuda', NULL, 'lingkungan-santo-carolus', 2, 3, NULL, 2, 'Pacuan Kuda', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(17, NULL, NULL, 'Lingkungan Santa Agnes', 'Pulo Mas Timur', NULL, 'lingkungan-santa-agnes', 2, 3, NULL, 3, 'Pulo Mas Timur', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(18, NULL, NULL, 'Lingkungan Santa Angela', 'Pulo Mas V Kalbis', NULL, 'lingkungan-santa-angela', 2, 3, NULL, 3, 'Pulo Mas V Kalbis', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(19, NULL, NULL, 'Lingkungan Santa Sesilia', 'Pulo Mas Barat', NULL, 'lingkungan-santa-sesilia', 2, 3, NULL, 3, 'Pulo Mas Barat', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(20, NULL, NULL, 'Lingkungan Santo Andreas', 'Pasadena', NULL, 'lingkungan-santo-andreas', 2, 3, NULL, 3, 'Pasadena', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(21, NULL, NULL, 'Lingkungan Santo Mikael', 'Pulo Mas Barat VI', NULL, 'lingkungan-santo-mikael', 2, 3, NULL, 3, 'Pulo Mas Barat VI', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(22, NULL, NULL, 'Lingkungan Santo Stefanus', 'Kp. Baru Timur', NULL, 'lingkungan-santo-stefanus', 2, 3, NULL, 4, 'Kp. Baru Timur', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(23, NULL, NULL, 'Lingkungan Santa Monika', 'Waringin Tuparev', NULL, 'lingkungan-santa-monika', 2, 3, NULL, 4, 'Waringin Tuparev', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(24, NULL, NULL, 'Lingkungan Santo Tarsisius', 'Mahoni Mutiara', NULL, 'lingkungan-santo-tarsisius', 2, 3, NULL, 4, 'Mahoni Mutiara', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(25, NULL, NULL, 'Lingkungan Santa Elisabeth', 'Kp. Baru Barat', NULL, 'lingkungan-santa-elisabeth', 2, 3, NULL, 4, 'Kp. Baru Barat', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(26, NULL, NULL, 'Lingkungan Santo Lukas Penginjil', 'Kayu', NULL, 'lingkungan-santo-lukas', 2, 3, NULL, 5, 'Kayu', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(27, NULL, NULL, 'Lingkungan Santo Matius Penginjil', 'Kikir', NULL, 'lingkungan-santo-matius', 2, 3, NULL, 5, 'Kikir', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(28, NULL, NULL, 'Lingkungan Santo Blasius', 'Tembok', NULL, 'lingkungan-santo-blasius', 2, 3, NULL, 5, 'Tembok', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(29, NULL, NULL, 'Lingkungan Santo Thomas Aquinas', 'Kusen Tener', NULL, 'lingkungan-santo-thomas', 2, 3, NULL, 5, 'Kusen Tener', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(30, NULL, NULL, 'Lingkungan Santo Benediktus', 'Pasar Ampera', NULL, 'lingkungan-santo-benediktus', 2, 3, NULL, 5, 'Pasar Ampera', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(31, NULL, NULL, 'Lingkungan Santa Maria', 'Haji Ten', NULL, 'lingkungan-santa-maria', 2, 3, NULL, 6, 'Haji Ten', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(32, NULL, NULL, 'Lingkungan Santo Yusuf', 'Pemuda', NULL, 'lingkungan-santo-yusuf', 2, 3, NULL, 6, 'Pemuda', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(33, NULL, NULL, 'Lingkungan Santa Maria Magdalena', 'Kayu Jati Velodrome', NULL, 'lingkungan-santa-magdalena', 2, 3, NULL, 6, 'Kayu Jati Velodrome', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(34, NULL, NULL, 'Lingkungan Santo Markus Penginjil', 'Pulo Asem Utara', NULL, 'lingkungan-santo-markus', 2, 3, NULL, 7, 'Pulo Asem Utara', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(35, NULL, NULL, 'Lingkungan Santo Valentinus', 'Pulo Asem Timur', NULL, 'lingkungan-santo-valentinus', 2, 3, NULL, 7, 'Pulo Asem Timur', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(36, NULL, NULL, 'Lingkungan Santa Katarina Labore', 'Pulo Asem Puskesmas', NULL, 'lingkungan-santa-katarina', 2, 3, NULL, 7, 'Pulo Asem Puskesmas', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(37, NULL, NULL, 'Lingkungan Santa Klara', 'Taman Pulo Asem Utara', NULL, 'lingkungan-santa-klara', 2, 3, NULL, 7, 'Taman Pulo Asem Utara', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(38, NULL, NULL, 'Lingkungan Santo Petrus', 'Pulo Asem Sekolahan', NULL, 'lingkungan-santo-petrus', 2, 3, NULL, 7, 'Pulo Asem Sekolahan', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(39, NULL, NULL, 'Lingkungan Santa Lidwina', 'Kayu Putih Tengah IV', NULL, 'lingkungan-santa-lidwina', 2, 3, NULL, 8, 'Kayu Putih Tengah IV', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(40, NULL, NULL, 'Lingkungan Santo Paulus Rasul', 'Tanah Mas', NULL, 'lingkungan-santo-paulus', 2, 3, NULL, 8, 'Tanah Mas', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(41, NULL, NULL, 'Lingkungan Santa Bernadette Soubirous', 'Kayu Putih Tengah I-II', NULL, 'lingkungan-santa-bernadette', 2, 3, NULL, 8, 'Kayu Putih Tengah I-II', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(42, NULL, NULL, 'Lingkungan Santa Margaretha', 'Kayu Putih Selatan', NULL, 'lingkungan-santa-margaretha', 2, 3, NULL, 8, 'Kayu Putih Selatan', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(43, NULL, NULL, 'Lingkungan Santa Teresa dari Kalkuta', 'Kayu Putih Tengah III', NULL, 'lingkungan-santa-teresa', 2, 3, NULL, 8, 'Kayu Putih Tengah III', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(44, NULL, NULL, 'Lingkungan Santa Kristina', 'Kayu Putih Tirtamas', NULL, 'lingkungan-santa-kristina', 2, 3, NULL, 8, 'Kayu Putih Tirtamas', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(45, NULL, NULL, 'Lingkungan Santo Damianus', 'Kayu Putih Utara I', NULL, 'lingkungan-santo-damianus', 2, 3, NULL, 9, 'Kayu Putih Utara I', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(46, NULL, NULL, 'Lingkungan Santo Fransiskus Asisi', 'Kayu Putih Timur I & II', NULL, 'lingkungan-santo-fransiskus', 2, 3, NULL, 9, 'Kayu Putih Timur I & II', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(47, NULL, NULL, 'Lingkungan Santo Eduardus', 'Pulo Nangka', NULL, 'lingkungan-santo-eduardus', 2, 3, NULL, 9, 'Pulo Nangka', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(48, NULL, NULL, 'Lingkungan Santo Yohanes Pemandi', 'Palad', NULL, 'lingkungan-santo-yohanes-pemandi', 2, 3, NULL, 10, 'Palad', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(49, NULL, NULL, 'Lingkungan Santa Anastasia', 'Kayu Mas', NULL, 'lingkungan-santa-anastasia', 2, 3, NULL, 10, 'Kayu Mas', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(50, NULL, NULL, 'Lingkungan Santo Theofilus', 'Taruna', NULL, 'lingkungan-santo-theofilus', 2, 3, NULL, 10, 'Taruna', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(51, NULL, NULL, 'Lingkungan Santo Yustinus', 'Griya Indah', NULL, 'lingkungan-santo-yustinus', 2, 3, NULL, 10, 'Griya Indah', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(52, NULL, NULL, 'Lingkungan Santo Albertus Agung', 'Gading Icon', NULL, 'lingkungan-santo-albertus', 2, 3, NULL, 10, 'Gading Icon', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(53, NULL, NULL, 'Lingkungan Santo Agustinus', 'Jati Pratama', NULL, 'lingkungan-santo-agustinus', 2, 3, NULL, 11, 'Jati Pratama', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(54, NULL, NULL, 'Lingkungan Santo Ignatius', 'Jati Kenari', NULL, 'lingkungan-santo-ignatius', 2, 3, NULL, 11, 'Jati Kenari', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(55, NULL, NULL, 'Lingkungan Santa Ursula', 'Jati Mundu', NULL, 'lingkungan-santa-ursula', 2, 3, NULL, 11, 'Jati Mundu', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(56, NULL, NULL, 'Lingkungan Santo Yulius', 'Terminal Pulo Gadung', NULL, 'lingkungan-santo-yulius', 2, 3, NULL, 11, 'Terminal Pulo Gadung', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(57, NULL, NULL, 'Lingkungan Santa Agatha', 'Villa Sari Mas Raya', NULL, 'lingkungan-santa-agatha', 2, 3, NULL, 12, 'Villa Sari Mas Raya', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(58, NULL, NULL, 'Lingkungan Santa Lucia', 'Villa Sari Mas Barat', NULL, 'lingkungan-santa-lucia', 2, 3, NULL, 12, 'Villa Sari Mas Barat', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(59, NULL, NULL, 'Lingkungan Santo Laurensius', 'Villa Sari Mas Tengah', NULL, 'lingkungan-santo-laurensius', 2, 3, NULL, 12, 'Villa Sari Mas Tengah', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(60, NULL, NULL, 'Lingkungan Santa Yustina', 'Villa Sari Mas Timur', NULL, 'lingkungan-santa-yustina', 2, 3, NULL, 12, 'Villa Sari Mas Timur', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(61, NULL, NULL, 'Bidang Peribadatan', NULL, NULL, 'bidang-peribadatan', 3, 3, NULL, 1, NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(62, NULL, NULL, 'Bidang Pewartaan', NULL, NULL, 'bidang-pewartaan', 3, 3, NULL, 1, NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(63, NULL, NULL, 'Bidang Persekutuan & Pendampingan', NULL, NULL, 'bidang-persekutuan', 3, 3, NULL, 1, NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(64, NULL, NULL, 'Bidang Pelayanan & Tim Khusus', NULL, NULL, 'bidang-pelayanan', 3, 3, NULL, 1, NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(65, NULL, NULL, 'Bidang Kesaksian', NULL, NULL, 'bidang-kesaksian', 3, 3, NULL, 1, NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(66, NULL, NULL, 'Bidang Pelatihan & Pengembangan Paroki', NULL, NULL, 'bidang-pelatihan', 3, 3, NULL, 1, NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(67, NULL, NULL, 'Bidang Perencanaan & Evaluasi', NULL, NULL, 'bidang-perencanaan', 3, 3, NULL, 1, NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(68, NULL, NULL, 'Seksi Liturgi', NULL, NULL, 'seksi-liturgi', 4, 3, NULL, 61, NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(69, NULL, NULL, 'Seksi Katekese', NULL, NULL, 'seksi-katekese', 4, 3, NULL, 62, NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(70, NULL, NULL, 'Seksi Kerasulan Kitab Suci', NULL, NULL, 'seksi-kitab-suci', 4, 3, NULL, 62, NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(71, NULL, NULL, 'Seksi Komunikasi Sosial', NULL, NULL, 'seksi-komunikasi', 4, 3, NULL, 62, NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(72, NULL, NULL, 'Seksi Kerasulan Keluarga', NULL, NULL, 'seksi-keluarga', 4, 3, NULL, 63, NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(73, NULL, NULL, 'Seksi Kepemudaan', NULL, NULL, 'seksi-kepemudaan', 4, 3, NULL, 63, NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(74, NULL, NULL, 'Seksi Panggilan', NULL, NULL, 'seksi-panggilan', 4, 3, NULL, 63, NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(75, NULL, NULL, 'Seksi Pengembangan Sosial Ekonomi', NULL, NULL, 'seksi-sosial-ekonomi', 4, 3, NULL, 64, NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(76, NULL, NULL, 'Seksi Pendidikan', NULL, NULL, 'seksi-pendidikan', 4, 3, NULL, 64, NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(77, NULL, NULL, 'Seksi Kesehatan', NULL, NULL, 'seksi-kesehatan', 4, 3, NULL, 64, NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(78, NULL, NULL, 'Seksi Keadilan Perdamaian', NULL, NULL, 'seksi-keadilan', 4, 3, NULL, 65, NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(79, NULL, NULL, 'Seksi Hubungan Antar Agama', NULL, NULL, 'seksi-antar-agama', 4, 3, NULL, 65, NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(80, NULL, NULL, 'Seksi Lingkungan Hidup', NULL, NULL, 'seksi-lingkungan', 4, 3, NULL, 65, NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(81, NULL, NULL, 'Seksi Penelitian dan Pengembangan', NULL, NULL, 'seksi-penelitian', 4, 3, NULL, 66, NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(82, NULL, NULL, 'Seksi Pelatihan dan Kaderisasi', NULL, NULL, 'seksi-kaderisasi', 4, 3, NULL, 66, NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(83, NULL, NULL, 'Seksi Perencanaan dan Evaluasi', NULL, NULL, 'seksi-perencanaan', 4, 3, NULL, 67, NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(84, NULL, NULL, 'Komunitas Legio Mariae', NULL, NULL, 'komunitas-legio-mariae', 6, 3, NULL, 63, NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(85, NULL, NULL, 'Komunitas Gerakan Imam Maria', NULL, NULL, 'komunitas-gim', 6, 3, NULL, 63, NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(86, NULL, NULL, 'Komunitas PDKK', NULL, NULL, 'komunitas-pdkk', 6, 3, NULL, 63, NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(87, NULL, NULL, 'Komunitas KKIT', NULL, NULL, 'komunitas-kkit', 6, 3, NULL, 63, NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(88, NULL, NULL, 'Komunitas Meditasi Kitab Suci', NULL, NULL, 'komunitas-meditasi', 6, 3, NULL, 63, NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(89, NULL, NULL, 'Komunitas Marriage Encounter', NULL, NULL, 'komunitas-marriage', 6, 3, NULL, 63, NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(90, NULL, NULL, 'Komunitas PWK St. Monika', NULL, NULL, 'komunitas-pwk', 6, 3, NULL, 63, NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(91, NULL, NULL, 'Komunitas Paguyuban Simeon Hanna', NULL, NULL, 'komunitas-simeon', 6, 3, NULL, 63, NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(92, NULL, NULL, 'Komunitas Adorasi Sakramen Mahakudus', NULL, NULL, 'komunitas-adorasi', 6, 3, NULL, 63, NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(93, NULL, NULL, 'Komunitas Wanita Katolik Republik Indonesia', NULL, NULL, 'komunitas-wkri', 6, 3, NULL, 63, NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(94, NULL, NULL, 'Tim Khusus ASAK', NULL, NULL, 'tim-asak', 7, 3, NULL, 64, NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(95, NULL, NULL, 'Tim Khusus Usaha Sejahtera Bonaventura', NULL, NULL, 'tim-cu', 7, 3, NULL, 64, NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(96, NULL, NULL, 'Tim Khusus APP', NULL, NULL, 'tim-app', 7, 3, NULL, 64, NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(97, NULL, NULL, 'Bagian Pemeliharaan Komplek Gereja', NULL, NULL, 'bagian-pemeliharaan', 5, 3, NULL, 1, NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(98, NULL, NULL, 'Bagian Rumah Tangga Pastoran', NULL, NULL, 'bagian-rumah-tangga', 5, 3, NULL, 1, NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(99, NULL, NULL, 'Bagian Keamanan', NULL, NULL, 'bagian-keamanan', 5, 3, NULL, 1, NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(100, NULL, NULL, 'Bagian Kekaryawanan', NULL, NULL, 'bagian-karyawan', 5, 3, NULL, 1, NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(101, NULL, NULL, 'Sekolah TK/SD/SMP St. Fransiskus', NULL, NULL, 'sekolah-tk-smp', 6, 3, NULL, 1, 'Kp. Ambon', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(102, NULL, NULL, 'Sekolah SMA/SMK St. Fransiskus', NULL, NULL, 'sekolah-sma-smk', 6, 3, NULL, 1, 'Kp. Ambon', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(103, NULL, NULL, 'Sekolah Don Bosco', NULL, NULL, 'sekolah-don-bosco', 6, 3, NULL, 1, 'Kp. Ambon', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(104, NULL, NULL, 'Susteran FSGM', NULL, NULL, 'susteran-fsgm', 6, 3, NULL, 1, 'Kp. Ambon', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(105, NULL, NULL, 'Komunitas Serikat Jesus Pulo Nangka', NULL, NULL, 'komunitas-sj-pulo-nangka', 6, 3, NULL, 1, 'Pulo Nangka', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(106, NULL, NULL, 'Komunitas Serikat Jesus Kp. Ambon', NULL, NULL, 'komunitas-sj-kp-ambon', 6, 3, NULL, 1, 'Kp. Ambon', '2026-08-01 15:51:30', '2026-08-01 15:51:30');

-- --------------------------------------------------------

--
-- Table structure for table `organization_types`
--

CREATE TABLE `organization_types` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `organization_types`
--

INSERT INTO `organization_types` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Wilayah', 'Head dari Lingkungan', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(2, 'Lingkungan', 'Lingkungan', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(3, 'Bidang', 'Head dari Seksi dan Komunitas', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(4, 'Seksi', 'Seksi', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(5, 'Bagian', 'Can be Head of Bagian', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(6, 'Komunitas', 'Can be Head of Komunitas', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(7, 'Tim', 'Can be Head of Tim', '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(9, 'Paroki', 'Paroki', '2026-08-01 15:51:30', '2026-08-01 15:51:30');

-- --------------------------------------------------------

--
-- Table structure for table `organization_user`
--

CREATE TABLE `organization_user` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `organization_id` bigint UNSIGNED NOT NULL,
  `period_id` bigint UNSIGNED DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `organization_user`
--

INSERT INTO `organization_user` (`id`, `user_id`, `organization_id`, `period_id`, `role`, `created_at`, `updated_at`) VALUES
(1, 25, 68, 1, 'Seksi Liturgi', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(2, 26, 69, 1, 'Seksi Katekese', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(3, 27, 70, 1, 'Seksi Kerasulan Kitab Suci', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(4, 28, 71, 1, 'Seksi Komunikasi Sosial', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(5, 29, 72, 1, 'Seksi Kerasulan Keluarga', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(6, 30, 73, 1, 'Seksi Kepemudaan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(7, 31, 74, 1, 'Seksi Panggilan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(8, 32, 84, 1, 'Komunitas Legio Mariae', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(9, 33, 85, 1, 'Komunitas Gerakan Imam Maria', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(10, 34, 86, 1, 'Komunitas PDKK', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(11, 35, 87, 1, 'Komunitas KKIT', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(12, 36, 88, 1, 'Komunitas Meditasi Kitab Suci', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(13, 37, 89, 1, 'Komunitas Marriage Encounter', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(14, 38, 90, 1, 'Komunitas PWK St. Monika', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(15, 39, 91, 1, 'Komunitas Paguyuban Simeon Hanna', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(16, 40, 93, 1, 'Wanita Katolik RI', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(17, 41, 75, 1, 'Seksi Pengembangan Sosial Ekonomi', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(18, 42, 76, 1, 'Seksi Pendidikan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(19, 43, 77, 1, 'Seksi Kesehatan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(20, 44, 94, 1, 'Tim Khusus ASAK', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(21, 45, 95, 1, 'Tim Khusus CU', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(22, 46, 96, 1, 'Tim Khusus APP', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(23, 47, 78, 1, 'Seksi Keadilan Perdamaian', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(24, 48, 79, 1, 'Seksi Hubungan Antar Agama', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(25, 49, 80, 1, 'Seksi Lingkungan Hidup', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(26, 50, 81, 1, 'Seksi Penelitian dan Pengembangan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(27, 51, 82, 1, 'Seksi Pelatihan dan Kaderisasi', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(28, 52, 83, 1, 'Seksi Perencanaan dan Evaluasi', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(29, 53, 97, 1, 'Bagian Pemeliharaan Komplek Gereja', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(30, 54, 98, 1, 'Bagian Rumah Tangga Pastoran', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(31, 55, 99, 1, 'Bagian Keamanan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(32, 167, 2, 1, 'Koordinator Wilayah', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(33, 119, 3, 1, 'Koordinator Wilayah', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(34, 169, 4, 1, 'Koordinator Wilayah', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(35, 172, 7, 1, 'Koordinator Wilayah', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(36, 173, 8, 1, 'Koordinator Wilayah', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(37, 174, 9, 1, 'Koordinator Wilayah', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(38, 177, 12, 1, 'Koordinator Wilayah', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(39, 178, 13, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(40, 301, 14, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(41, 302, 15, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(42, 303, 16, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(43, 304, 17, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(44, 183, 18, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(45, 184, 19, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(46, 168, 20, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(47, 186, 21, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(48, 187, 22, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(49, 189, 23, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(50, 310, 24, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(51, 191, 26, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(52, 313, 27, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(53, 193, 29, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(54, 194, 28, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(55, 195, 30, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(56, 317, 31, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(57, 197, 32, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(58, 198, 33, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(59, 320, 34, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(60, 321, 35, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(61, 201, 36, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(62, 202, 37, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(63, 324, 38, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(64, 204, 40, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(65, 326, 42, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(66, 206, 39, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(67, 207, 44, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(68, 124, 41, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(69, 209, 43, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(70, 331, 45, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(71, 211, 46, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(72, 333, 47, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(73, 334, 48, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(74, 335, 49, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(75, 336, 50, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(76, 337, 51, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(77, 338, 52, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(78, 218, 55, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-03 06:03:27'),
(79, 340, 54, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(80, 341, 53, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-03 06:03:27'),
(81, 220, 56, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(82, 221, 59, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(83, 222, 60, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(84, 224, 57, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(85, 346, 58, 1, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(86, 134, 68, 2, 'Seksi Liturgi', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(87, 26, 69, 2, 'Seksi Katekese', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(88, 136, 70, 2, 'Seksi Kerasulan Kitab Suci', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(89, 137, 71, 2, 'Seksi Komunikasi Sosial', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(90, 138, 72, 2, 'Seksi Kerasulan Keluarga', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(91, 139, 73, 2, 'Seksi Kepemudaan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(92, 53, 74, 2, 'Seksi Panggilan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(93, 141, 84, 2, 'Komunitas Legio Mariae', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(94, 33, 85, 2, 'Komunitas Gerakan Imam Maria', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(95, 34, 86, 2, 'Komunitas PDKK', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(96, 35, 87, 2, 'Komunitas KKIT', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(97, 36, 88, 2, 'Komunitas Meditasi Kitab Suci', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(98, 37, 89, 2, 'Komunitas Marriage Encounter', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(99, 147, 90, 2, 'Komunitas PWK St. Monika', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(100, 148, 91, 2, 'Komunitas Paguyuban Simeon Hanna', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(101, 149, 92, 2, 'Komunitas Adorasi Sakramen Mahakudus', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(102, 150, 93, 2, 'Wanita Katolik RI', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(103, 41, 75, 2, 'Seksi Pengembangan Sosial Ekonomi', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(104, 42, 76, 2, 'Seksi Pendidikan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(105, 43, 77, 2, 'Seksi Kesehatan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(106, 154, 94, 2, 'Tim Khusus ASAK', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(107, 45, 95, 2, 'Tim Khusus CU', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(108, 156, 96, 2, 'Tim Khusus APP', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(109, 157, 78, 2, 'Seksi Keadilan Perdamaian', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(110, 158, 79, 2, 'Seksi Hubungan Antar Agama', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(111, 49, 80, 2, 'Seksi Lingkungan Hidup', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(112, 160, 81, 2, 'Seksi Penelitian dan Pengembangan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(113, 161, 82, 2, 'Seksi Pelatihan dan Kaderisasi', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(114, 52, 83, 2, 'Seksi Perencanaan dan Evaluasi', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(115, 163, 97, 2, 'Bagian Pemeliharaan Komplek Gereja', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(116, 164, 98, 2, 'Bagian Rumah Tangga Pastoran', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(117, 48, 99, 2, 'Bagian Keamanan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(118, 166, 100, 2, 'Bagian Kekaryawanan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(119, 167, 2, 2, 'Koordinator Wilayah', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(120, 168, 3, 2, 'Koordinator Wilayah', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(121, 169, 4, 2, 'Koordinator Wilayah', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(122, 170, 5, 2, 'Koordinator Wilayah', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(123, 171, 6, 2, 'Koordinator Wilayah', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(124, 172, 7, 2, 'Koordinator Wilayah', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(125, 173, 8, 2, 'Koordinator Wilayah', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(126, 174, 9, 2, 'Koordinator Wilayah', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(127, 175, 10, 2, 'Koordinator Wilayah', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(128, 176, 11, 2, 'Koordinator Wilayah', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(129, 177, 12, 2, 'Koordinator Wilayah', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(130, 178, 13, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(131, 179, 14, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(132, 180, 15, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(133, 181, 16, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(134, 182, 17, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(135, 183, 18, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(136, 184, 19, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(137, 185, 20, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(138, 186, 21, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(139, 187, 22, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(140, 188, 24, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(141, 189, 23, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(142, 190, 25, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(143, 191, 26, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(144, 192, 27, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(145, 193, 29, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(146, 194, 28, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(147, 195, 30, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(148, 196, 31, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(149, 197, 32, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(150, 198, 33, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(151, 199, 34, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(152, 200, 35, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(153, 201, 36, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(154, 202, 37, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(155, 203, 38, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(156, 204, 40, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(157, 205, 42, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(158, 206, 39, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(159, 207, 44, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(160, 44, 41, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(161, 209, 43, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(162, 210, 45, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(163, 211, 46, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(164, 212, 47, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(165, 213, 48, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(166, 214, 49, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(167, 215, 50, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(168, 216, 51, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(169, 217, 52, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(170, 219, 53, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(171, 340, 54, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(172, 218, 55, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(173, 220, 56, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(174, 224, 57, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(175, 221, 59, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(176, 222, 60, 2, 'Ketua Lingkungan', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(177, 226, 101, 2, 'Sekolah', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(178, 227, 102, 2, 'Sekolah', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(179, 228, 103, 2, 'Sekolah', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(180, 229, 104, 2, 'Biara', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(181, 231, 105, 2, 'Biara', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(182, 232, 106, 2, 'Biara', '2026-08-01 17:41:17', '2026-08-01 17:41:17'),
(183, 349, 106, 2, 'Biara', '2026-08-03 05:14:02', '2026-08-03 05:14:02'),
(184, 225, 58, 2, 'Ketua Lingkungan', '2026-08-03 05:18:20', '2026-08-03 05:18:20'),
(185, 350, 5, 1, 'Koordinator Wilayah', '2026-08-03 05:50:45', '2026-08-03 05:50:45'),
(186, 351, 6, 1, 'Koordinator Wilayah', '2026-08-03 05:50:45', '2026-08-03 05:50:45'),
(187, 352, 10, 1, 'Koordinator Wilayah', '2026-08-03 05:50:45', '2026-08-03 05:50:45'),
(188, 353, 11, 1, 'Koordinator Wilayah', '2026-08-03 05:50:45', '2026-08-03 05:50:45'),
(189, 354, 25, 1, 'Ketua Lingkungan', '2026-08-03 05:50:45', '2026-08-03 05:50:45'),
(190, 355, 43, 1, 'Ketua Lingkungan', '2026-08-03 05:50:45', '2026-08-03 05:50:45'),
(192, 356, 102, 1, 'Sekolah', '2026-08-03 05:50:45', '2026-08-03 05:50:45'),
(193, 357, 103, 1, 'Sekolah', '2026-08-03 05:50:45', '2026-08-03 06:03:27'),
(194, 358, 104, 1, 'Biara', '2026-08-03 05:50:45', '2026-08-03 06:03:27'),
(195, 356, 106, 1, 'Biara', '2026-08-03 05:50:45', '2026-08-03 05:50:45'),
(196, 226, 101, 1, 'Sekolah', '2026-08-03 05:57:24', '2026-08-03 05:57:24'),
(197, 231, 105, 1, 'Biara', '2026-08-03 05:57:24', '2026-08-03 05:57:24'),
(198, 226, 101, 1, 'Sekolah', '2026-08-03 06:03:27', '2026-08-03 06:03:27'),
(199, 231, 105, 1, 'Biara', '2026-08-03 06:03:27', '2026-08-03 06:03:27');

-- --------------------------------------------------------

--
-- Table structure for table `periods`
--

CREATE TABLE `periods` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `start_year` int NOT NULL,
  `end_year` int NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `periods`
--

INSERT INTO `periods` (`id`, `name`, `start_year`, `end_year`, `is_active`, `created_at`, `updated_at`) VALUES
(1, '2023-2026', 2023, 2026, 0, '2026-08-01 15:51:29', '2026-08-01 15:51:29'),
(2, '2026-2029', 2026, 2029, 1, '2026-08-01 15:51:29', '2026-08-01 15:51:29');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `role_level` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `description`, `role_level`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'Highest authority', 1, NULL, NULL),
(2, 'moderator', 'for komsos', 2, NULL, NULL),
(3, 'contributor', 'for sektretariat, ketua organisasi e.g. wilayah, lingkungan', 3, NULL, NULL),
(4, 'sekretariat', 'for sektretariat', 3, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `statuses`
--

CREATE TABLE `statuses` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `statuses`
--

INSERT INTO `statuses` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'archived', NULL, NULL),
(2, 'on-review', NULL, NULL),
(3, 'published', NULL, NULL),
(4, 'rejected', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` bigint UNSIGNED DEFAULT NULL,
  `status_id` bigint UNSIGNED DEFAULT '3',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `profile_picture`, `username`, `name`, `email`, `password`, `role_id`, `status_id`, `email_verified_at`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, '2025-06-17-15x26x38-VAJ.jpg', 'admin', 'Administrator', 'admin@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 1, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(2, 'users/2026/dph/RmStephanusRoykeDjakaryaPr.webp', 'romo.royke', 'Romo Stephanus Royke Djakarya, Pr.', 'dph.ketua.umum@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 2, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(3, 'users/2026/dph/RmBenediktusAriDarmawanPr.webp', 'romo.ari', 'Romo Benediktus Ari Darmawan, Pr.', 'dph.ketua.1@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 2, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(4, 'users/2026/dph/HubertusHartonoSondakh.webp', 'hubertus.hartono', 'Hubertus Hartono Sondakh', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 2, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(5, 'users/2026/dph/ThomasLimKianHeng.webp', 'thomas.lim', 'Thomas Lim Kian Heng', 'dph.wakil.ketua.1@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 2, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(6, 'users/2026/dph/IvonSriDamayanti.webp', 'ivon.sri', 'Ivon Sri Darmayanti', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 2, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(7, 'users/2026/dph/AndreasHenryMixsonLumbanBatu.webp', 'andreas.henry', 'Andreas Henry Mixson Lumban Batu', 'dph.sekretaris.1@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 2, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(8, 'users/2026/dph/MariaOdiliaDamayanti.webp', 'maria.odilia', 'Maria Odilia Damayanti', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 2, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(9, 'users/2026/dph/CaeciliaSupojoNiniekDhamayanti.webp', 'caecilia.supojo', 'Caecilia Supojo Niniek Dhamayanti', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 2, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(10, 'users/2026/dph/MarcelinaFeliciaLindaWiryadi.webp', 'marcelina.felicia', 'Marcelina Felicia Linda Wiryadi', 'dph.bendahara.1@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 2, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(11, 'users/2026/dph/CarolusBoromeusDedi.webp', 'carolus.boromeus', 'Carolus Boromeus Dedi', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 2, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(12, 'users/2026/dph/StephanusPudjiLudianto.webp', 'stephanus.pudji', 'Stephanus Pudji Ludianto', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 2, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(13, 'users/2026/dph/FransiskusXaveriusYanuarEkaputra.webp', 'fransiskus.yanuar', 'Fransiskus Xaverius Yanuar Ekaputra', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 2, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(14, 'users/2026/dph/MariaMiliFonge.webp', 'maria.mili', 'Maria Mili Fonge', 'bidang-persekutuan@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 2, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(15, 'users/2026/dph/MartinusRobertPolana.webp', 'martinus.robert', 'Martinus Robert Polana', 'bidang-pewartaan@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 2, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(16, 'users/2026/dph/FerryOlinBinsar.webp', 'ferry.olin', 'Ferry Olin Binsar', 'bidang-kesaksian@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 2, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(17, 'users/2026/dph/TheresiaFerrania.webp', 'theresia.ferrania', 'Theresia Ferrania', 'bidang-pelayanan@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 2, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(18, 'users/2026/dph/AgnesAmeliaYowanda.webp', 'agnes.amelia', 'Agnes Amelia Yowanda', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 2, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(19, 'users/2026/dph/FXAdviadiNugroho.webp', 'fransiskus.adviadi', 'Fransiskus Xaverius Adviadi Nugroho', 'bidang-pelatihan@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 2, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(20, 'users/2026/dph/MarianusAriWinarto.webp', 'marianus.ari', 'Marianus Ari Winarto', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 2, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(21, 'users/2026/dph/YohanesBambangKristianto.webp', 'yohanes.bambang', 'Yohanes Bambang Kristianto', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 2, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(22, 'users/2026/dph/BernardusWibisanto.webp', 'bernardus.wibisanto', 'Bernardus Wibisanto', 'bidang-perencanaan@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 2, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(23, 'users/2026/dph/FredericusSugiarsoBudihardjo.webp', 'fredericus.sugiarso', 'Fredericus Sugiarso Budihardjo', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 2, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(25, 'users/2026/dpp/FransiskusMichaelSetuso.webp', 'fransiskus.setuso', 'Bp. Fransiskus Michael Setuso', 'bidang-peribadatan@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(26, 'users/2026/dpp/IgnSetyantoJokoMaryuwono.webp', 'ign.setyanto', 'Bp. Ign. Setyanto Joko Maryuwono', 'seksi-katekese@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(27, 'users/2026/dpp/PhilipusVembrey.webp', 'philipus.vembrey', 'Bp. Philipus Vembrey', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(28, 'users/2026/dpp/BenedictToarPratasis.webp', 'benedict.toar', 'Bp. Benedict Toar Pratasis', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(29, 'users/2026/dpp/VincentiusAnggoroCahyoLegowo.webp', 'vincentius.anggoro', 'Bp. Vincentius Anggoro Cahyo Legowo', 'bagian-pemeliharaan@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(30, 'users/2026/dpp/StephanieWidjaja.webp', 'stephanie.widjaja', 'Sdri. Stephanie Widjaja', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(31, 'users/2026/dpp/ReniusSimamora.webp', 'renius.simamora', 'Bp. Renius Simamora', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(32, 'users/2026/dpp/AlexanderTeme.webp', 'alexander.teme', 'Bp. Alexander Teme', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(33, 'users/2026/dpp/FransiscaMimieSumiyati.webp', 'fransisca.mimie', 'Ibu Fransisca Mimie Sumiyati', 'komunitas-gim@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(34, 'users/2026/dpp/ErnestAbrahamSurjadipradja.webp', 'ernest.abraham', 'Bp. Ernest Abraham Surjadipradja', 'komunitas-pdkk@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(35, 'users/2026/dpp/CaeciliaSriMinsuriany.webp', 'caecilia.sri', 'Ibu Caecilia Sri Minsuriany', 'komunitas-kkit@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(36, 'users/2026/dpp/ChristinaAmbarwati.webp', 'christina.ambarwati', 'Ibu Christina Ambarwati', 'komunitas-meditasi@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(37, 'users/2026/dpp/IshidorusRezaPrimahendraBernadethRenitaMulyaningtyas.webp', 'ishidorus.reza', 'Bp. Ishidorus Reza Primahendra', 'komunitas-marriage@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(38, 'users/2026/dpp/FlorentinaPatriciaKustyorini.webp', 'florentina.patricia', 'Ibu Florentina Patricia Kustyorini', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(39, 'users/2026/dpp/ElizabethPoedyasmara.webp', 'elizabeth.poedyasmara', 'Ibu Elizabeth Poedyasmara', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(40, 'users/2026/dpp/FransiskaRemaSakeng.webp', 'fransiska.rema', 'Ibu Fransiska Rema Sakeng', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(41, 'users/2026/dpp/MariaReginaHartoyo.webp', 'maria.regina', 'Ibu Maria Regina Hartoyo', 'seksi-sosial-ekonomi@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(42, 'users/2026/dpp/YehezkielVegaAdjibusono.webp', 'yehezkiel.vega', 'Bp. Yehezkiel Vega Adjibusono', 'seksi-pendidikan@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(43, 'users/2026/dpp/HelenaFanidahTanuhendrata.webp', 'helena.fanidah', 'Ibu Helena Fanidah Tanuhendrata', 'seksi-kesehatan@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(44, 'users/2026/dpp/AlbertusDominicSuryaDharma.webp', 'albertus.dominic', 'Bp. Albertus Dominic Surya Dharma', 'lingkungan-santa-teresa@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(45, 'users/2026/dpp/AntoniusSetyoMulyanto.webp', 'antonius.setyo', 'Bp. Antonius Setyo Mulyanto', 'tim-cu@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(46, 'users/2026/dpp/MariaDemseriaSilalahi.webp', 'maria.demseria', 'Ibu Maria Demseria Silalahi', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(47, 'users/2026/dpp/RonlybertTogatorop.webp', 'ronlybert.togatorop', 'Bp. Ronlybert Togatorop', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(48, 'users/2026/dpp/GeorgeRobertGunawan.webp', 'george.robert', 'Bp. George Robert Gunawan', 'bagian-keamanan@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(49, 'users/2026/dpp/StefanusPrasitoAdi.webp', 'stefanus.prasito', 'Bp. Stefanus Prasito Adi', 'seksi-lingkungan@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(50, 'users/2026/dpp/ChristopherHarisPratama.webp', 'christopher.haris', 'Bp. Christopher Haris Pratama', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(51, 'users/2026/dpp/ChristinaIrmaWirawaty.webp', 'christina.irma', 'Ibu Christina Irma Wirawaty', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(52, 'users/2026/dpp/YosephLiantoro.webp', 'yoseph.liantoro', 'Bp. Yoseph Liantoro', 'seksi-perencanaan@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(53, 'users/2026/dpp/BonaventuraEddy.webp', 'bonaventura.eddy', 'Bp. Bonaventura Eddy', 'seksi-panggilan@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(54, 'users/2026/dpp/YustinaSriAndarini.webp', 'yustina.sri', 'Ibu Yustina Sri Andarini', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(55, 'users/2026/dpp/AntoniusAnangBudiArso.webp', 'antonius.anang', 'Bp. Antonius Anang Budi Arso', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(119, 'users/2026/dpp/TantySyahlinaTarigan.webp', 'tanty.syahlina', 'Tanty Syahlina Tarigan', 'dph.wakil.ketua.2@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 2, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(121, NULL, 'bernadette.priwahyuni', 'Bernadette Priwahyuni', 'dph.sekretaris.2@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 2, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(122, NULL, 'irene.feciany', 'Irene Feciany', 'dph.sekretaris.3@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 2, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(124, 'users/2026/dpp/HeleneKamLenNio.webp', 'helene.kam', 'Helene Kam Len Nio', 'dph.bendahara.2@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 2, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(125, NULL, 'ronald.yohannes', 'Ronald Yohannes', 'dph.bendahara.3@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 2, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(134, NULL, 'yulius.suyatijo', 'Yulius Suyatijo', 'seksi-liturgi@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(136, NULL, 'sylvia.veronica', 'Sylvia Veronica Makaminang', 'seksi-kitab-suci@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(137, NULL, 'candra.wijaya', 'Candra Wijaya', 'seksi-komunikasi@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(138, NULL, 'antonius.trio', 'Antonius Trio Limas', 'seksi-keluarga@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(139, NULL, 'erawati.maria', 'Erawati Maria Simanjorang', 'seksi-kepemudaan@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(141, NULL, 'fransiska.remila', 'Fransiska Remila', 'komunitas-legio-mariae@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(147, NULL, 'caecilia.juniati', 'Caecilia Juniati', 'komunitas-pwk@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(148, NULL, 'ien.siswi', 'Ien Siswi Astuti', 'komunitas-simeon@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(149, NULL, 'blasius.dodu', 'Blasius Dodu', 'komunitas-adorasi@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(150, NULL, 'maria.tri.adhara', 'Maria Tri Adhara Librawanti', 'komunitas-wkri@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(154, NULL, 'claudia.anne', 'Claudia Anne', 'tim-asak@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(156, NULL, 'juventus.deka', 'Juventus Deka Aditama', 'tim-app@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(157, NULL, 'avenanda.patria', 'Avenanda Patria Guntur', 'seksi-keadilan@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(158, NULL, 'setiadji.karuniawan', 'Setiadji Karuniawan Seputra', 'seksi-antar-agama@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(160, NULL, 'alfonsus.sonny', 'Alfonsus Sonny Kusuma Wijaya', 'seksi-penelitian@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(161, NULL, 'anastasia.wilsa', 'Anastasia Wilsa Theodore', 'seksi-kaderisasi@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(163, NULL, 'maria.goretti', 'Maria Goretti Triyanti Ratnasari', 'bagian-pemeliharaan@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(164, NULL, 'irene.damar', 'Irene Damar Widiastuti', 'bagian-rumah-tangga@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(166, NULL, 'imelda.tarigan', 'Imelda Tarigan', 'bagian-karyawan@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(167, 'users/2026/dpp/FelixYosafat.webp', 'felix.yosafat', 'Felix Yosafat', 'wilayah-i@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(168, 'users/2026/dpp/AgnesFebritaKusumawati.webp', 'agnes.febrita', 'Agnes Febrita Kusumawati', 'wilayah-ii@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(169, 'users/2026/dpp/FransiskaMardiana.webp', 'fransiska.mardiana', 'Fransiska Mardiana', 'wilayah-iii@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(170, NULL, 'alfonsus.adi', 'Alfonsus Adi Wicaksono', 'wilayah-iv@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(171, NULL, 'luciana.novica', 'Luciana Novica Helmi Panjaitan', 'wilayah-v@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(172, 'users/2026/dpp/VeronikaTanner.webp', 'veronika.tanner', 'Veronika Tanner', 'wilayah-vi@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(173, 'users/2026/dpp/GratianaCrecentiaRamahwatiKaryadi.webp', 'gratiana.crecentia', 'Gratiana Crecentia Ramahwati Karyadi', 'wilayah-vii@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(174, 'users/2026/dpp/YohanaAriWarigalit.webp', 'yohana.ari', 'Yohana Ari Warigalit', 'wilayah-viii@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(175, NULL, 'haposan.david', 'Haposan David Napitupulu', 'wilayah-ix@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(176, NULL, 'louis.irwansson', 'Louis Irwansson Lubis', 'wilayah-x@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(177, 'users/2026/dpp/MarcellusKisyantoHalim.webp', 'marcellus.kisyanto', 'Marcellus Kisyanto Halim', 'wilayah-xi@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(178, 'users/2026/dpp/ChristopherSutantoAdiYongky.webp', 'christopher.sutanto', 'Christopher Sutanto Adi Yongky', 'lingkungan-santa-anna@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(179, 'users/2026/dpp/VeronicaRennySuryana.webp', 'renny.suryana', 'Renny Suryana', 'lingkungan-santo-antonius@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(180, NULL, 'stephanus.marko', 'Stephanus Marko Erawan Halim', 'lingkungan-santo-yoakim@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(181, NULL, 'debby.elysabeth', 'Debby Elysabeth Thioritz', 'lingkungan-santo-carolus@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(182, NULL, 'mikaela.mellyn', 'Mikaela Mellyn Soetiono', 'lingkungan-santa-agnes@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(183, 'users/2026/dpp/AgnesVennyWunas.webp', 'agnes.venny', 'Agnes Venny Wunas', 'lingkungan-santa-angela@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(184, 'users/2026/dpp/FransiskaEviLusiana.webp', 'fransiska.evi', 'Fransiska Evi Lusiana', 'lingkungan-santa-sesilia@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(185, NULL, 'maria.grace', 'Maria Grace Massing', 'lingkungan-santo-andreas@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(186, 'users/2026/dpp/YohanesViolisonMartheo.webp', 'yohanes.violison', 'Yohanes Violison Martheo', 'lingkungan-santo-mikael@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(187, 'users/2026/dpp/MargarethaDwiAstuti.webp', 'margaretha.dwi', 'Margaretha DWI Astuti', 'lingkungan-santo-stefanus@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(188, NULL, 'bertha.loi', 'Bertha Loi', 'lingkungan-santa-monika@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(189, 'users/2026/dpp/RosaliaPrasetyaningsih.webp', 'rosalia.prasetyaningsih', 'Rosalia Prasetyaningsih', 'lingkungan-santo-tarsisius@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(190, NULL, 'eviani.sakeng', 'Eviani Sakeng', 'lingkungan-santa-elisabeth@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(191, 'users/2026/dpp/ChristinaEndahPurnomoWulandari.webp', 'christina.endah', 'Christina Endah Purnomo Wulandari', 'lingkungan-santo-lukas@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(192, NULL, 'agatha.mirna', 'Agatha Mirna Indraswari', 'lingkungan-santo-matius@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(193, 'users/2026/dpp/VincentiusTaufikManfaluti.webp', 'vincentius.taufik', 'Vincentius Taufik Manfaluti', 'lingkungan-santo-blasius@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(194, 'users/2026/dpp/GervasiusDriIstiyaYudana.webp', 'gervasius.dri', 'Gervasius Dri Istiya Yudana', 'lingkungan-santo-thomas@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(195, 'users/2026/dpp/AgustinusYudhoWirajati.webp', 'agustinus.yudho', 'Agustinus Yudho Wirajati', 'lingkungan-santo-benediktus@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(196, NULL, 'monang.parhusip', 'Monang Parhusip Nainggolan', 'lingkungan-santa-maria@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(197, 'users/2026/dpp/AlferniaUliAritonang.webp', 'alfernia.uli', 'Alfernia Uli Aritonang', 'lingkungan-santo-yusuf@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(198, 'users/2026/dpp/TheresiaRiniSupriati.webp', 'theresia.rini', 'Theresia Rini Supriati', 'lingkungan-santa-magdalena@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(199, NULL, 'andreas.cahyo', 'Andreas Cahyo Adi Kuncoro', 'lingkungan-santo-markus@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(200, NULL, 'fx.chrisye', 'F.X. Chrisye', 'lingkungan-santo-valentinus@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(201, 'users/2026/dpp/TheresiaMustikaDewi.webp', 'theresia.mustika', 'Theresia Mustika Dewi', 'lingkungan-santa-katarina@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(202, 'users/2026/dpp/DionisiusBambangHermawan.webp', 'dionisius.bambang', 'Dionisius Bambang Hermawan', 'lingkungan-santa-klara@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(203, NULL, 'stanislaus.kotska', 'Stanislaus Kotska Sandy Qlintang', 'lingkungan-santo-petrus@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(204, 'users/2026/dpp/GraceIndriani.webp', 'gracia.grace', 'Gracia Grace Indriani', 'lingkungan-santa-lidwina@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(205, NULL, 'oktavianus.michael', 'Oktavianus Michael Sentot', 'lingkungan-santo-paulus@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(206, 'users/2026/dpp/JaneAgnesTampatty.webp', 'jane.agnes', 'Jane Agnes Tampatty', 'lingkungan-santa-bernadette@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(207, 'users/2026/dpp/ImeldaMeiske.webp', 'imelda.meiske', 'Imelda Meiske', 'lingkungan-santa-margaretha@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(209, 'users/2026/dpp/NatalieRiniKustiniAmelia.webp', 'natalie.rini', 'Natalie Rini Kustini Amelia', 'lingkungan-santa-kristina@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(210, NULL, 'elke.emiliana', 'Elke Emiliana Herlin Januar', 'lingkungan-santo-damianus@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(211, 'users/2026/dpp/AnnaMariaBabyAgustineSutiono.webp', 'anna.maria.baby', 'Anna Maria Baby Agustine Sutiono', 'lingkungan-santo-fransiskus@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(212, NULL, 'eric.prabowo', 'Eric Prabowo Somanto', 'lingkungan-santo-eduardus@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(213, NULL, 'yohana.asti', 'Yohana Asti Ratnasari', 'lingkungan-santo-yohanes-pemandi@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(214, NULL, 'maria.roseni', 'Maria Roseni Yosephine', 'lingkungan-santa-anastasia@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(215, NULL, 'friska.maria', 'Friska Maria Hutabara', 'lingkungan-santo-theofilus@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(216, NULL, 'pardamean.hutapea', 'Pardamean G. Hutapea', 'lingkungan-santo-yustinus@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(217, NULL, 'sebastianus.maryadi', 'Sebastianus F. Maryadi', 'lingkungan-santo-albertus@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(218, 'users/2026/dpp/LaurentiusMolo.webp', 'laurentius.molo', 'Laurentius Molo', 'lingkungan-santo-agustinus@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(219, NULL, 'ray.aditya', 'Ray Aditya Iswara', 'lingkungan-santo-ignatius@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(220, 'users/2026/dpp/IreneLydiaNWelan.webp', 'irene.lydia', 'Irene Lydia N. Welan', 'lingkungan-santa-ursula@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(221, 'users/2026/dpp/TheresiaDewiAnggraini.webp', 'theresia.dewi', 'Theresia Dewi Anggraini', 'lingkungan-santo-yulius@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(222, 'users/2026/dpp/NicholasAriefSubroto.webp', 'nicholas.ariel', 'Nicholas Ariel Subroto', 'lingkungan-santa-agatha@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(224, 'users/2026/dpp/BernadetTriAstutiNurEndah.webp', 'bernadet.tri', 'Bernadet Tri Astuti Nur Endah', 'lingkungan-santo-laurensius@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(225, NULL, 'maria.mariana', 'Maria Mariana Mira Riyani', 'lingkungan-santa-yustina@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(226, NULL, 'sekolah.tk-smp', 'Sr. Hedwigis, FSGM', 'sekolah-tk-smp@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(227, NULL, 'sekolah.sma-smk', 'Bp. Yohanes Halek', 'sekolah-sma-smk@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(228, NULL, 'sekolah.don-bosco', 'Bp. F.X. Sulistiyono', 'sekolah-don-bosco@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(229, NULL, 'biara.susteran', 'Sr. M. Karitas, FSGM', 'susteran-fsgm@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(231, NULL, 'biara.sj-pulo-nangka', 'Pastor Guido Chrisna Hidayat, SJ', 'komunitas-sj-pulo-nangka@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(232, NULL, 'biara.sj-kp-ambon', 'Pastor Thomas Hidya Tjaya, SJ', 'komunitas-sj-kp-ambon@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(301, NULL, 'peter.lino', 'Peter Lino', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(302, 'users/2026/dpp/VeronicaKatarinaErlinOctavia.webp', 'veronica.katarina', 'Veronica Katarina Erlin Octavia', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(303, 'users/2026/dpp/AdrianusLioe.webp', 'adrianus.lioe', 'Adrianus Lioe', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(304, 'users/2026/dpp/ChristopherErwinBudianto.webp', 'christopher.erwin', 'Christopher Erwin Budianto', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(310, 'users/2026/dpp/PensiKristianaSiahaan.webp', 'pensi.kristiana', 'Pensi Kristiana Siahaan', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(313, 'users/2026/dpp/MariaGoretiRianGaryati.webp', 'maria.goreti.rian', 'Maria Goreti Rian Garyati', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(317, 'users/2026/dpp/FerdinandusMustarHasibuan.webp', 'ferdinandus.mustar', 'Ferdinandus Mustar Hasibuan', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(320, 'users/2026/dpp/YohanesAdiosFalentinoRirihena.webp', 'yohanes.adios', 'Yohanes Adios Falentino Ririhena', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(321, 'users/2026/dpp/LeonardusTeddyBramantya.webp', 'leonardus.teddy', 'Leonardus Teddy Bramantya', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(324, 'users/2026/dpp/YohanesWidjajaGomulya.webp', 'yohanes.widjaja', 'Yohanes Widjaja Gomulya', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(326, 'users/2026/dpp/MariaImmaculataSriMarsanti.webp', 'maria.immaculata', 'Maria Immaculata Sri Marsanti', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(331, 'users/2026/dpp/MariaClaraKaefitriTaman.webp', 'maria.clara', 'Maria Clara Kaefitri Taman', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(333, 'users/2026/dpp/AnnaNatalia.webp', 'anna.natalia', 'Anna Natalia', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(334, 'users/2026/dpp/PiusChandraWidjayanto.webp', 'pius.chandra', 'Pius Chandra Widjayanto', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(335, 'users/2026/dpp/PaulineTriJuliartiMiliTimu.webp', 'pauline.tri', 'Pauline Tri Juliarti Mili Timu', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(336, 'users/2026/dpp/JamesMadisonSitanggang.webp', 'james.madison', 'James Madison Sitanggang', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(337, 'users/2026/dpp/MariaMawarniSimamora.webp', 'maria.mawarni', 'Maria Mawarni Simamora', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(338, 'users/2026/dpp/MaximaHenieKunWidisusanti.webp', 'maxima.henie', 'Maxima Henie Kun Widisusanti', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(340, 'users/2026/dpp/AnastasiaMartini.webp', 'anastasia.martini', 'Anastasia Martini', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(341, 'users/2026/dpp/YohanesRickyIriawan.webp', 'yohanes.ricky', 'Yohanes Ricky Iriawan', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(346, 'users/2026/dpp/PricillaJaneHalim.webp', 'pricilla.jane', 'Pricilla Jane Halim', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 15:51:30', NULL, '2026-08-01 15:51:30', '2026-08-01 15:51:30'),
(347, NULL, 'agustinus.bambang.tridoyo', 'Agustinus Bambang Tridoyo', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 2, 3, '2026-08-01 08:51:30', NULL, '2026-08-03 05:13:54', '2026-08-03 05:13:54'),
(349, NULL, 'pastor.yoseph.agut', 'Pastor Yoseph Agut, OFM', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, '2026-08-01 01:51:30', NULL, '2026-08-02 22:14:12', '2026-08-02 22:14:12'),
(350, NULL, 'yoakim.nugroho', 'Yoakim Nugroho Ekomursanto', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, NULL, NULL, '2026-08-03 05:50:45', '2026-08-03 05:50:45'),
(351, NULL, 'yohanes.edy', 'Yohanes Edy Susanto', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, NULL, NULL, '2026-08-03 05:50:45', '2026-08-03 05:50:45'),
(352, NULL, 'bernadette.melissa', 'Bernadette Melissa Budiman', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, NULL, NULL, '2026-08-03 05:50:45', '2026-08-03 05:50:45'),
(353, NULL, 'agustinus.indarto', 'Agustinus Indarto', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, NULL, NULL, '2026-08-03 05:50:45', '2026-08-03 05:50:45'),
(354, NULL, 'nicolaus.suparno', 'Nicolaus Suparno', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, NULL, NULL, '2026-08-03 05:50:45', '2026-08-03 05:50:45'),
(355, NULL, 'marcella.erlin', 'Marcella Erlin Biantini', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, NULL, NULL, '2026-08-03 05:50:45', '2026-08-03 05:50:45'),
(356, NULL, 'yohanes.rachmat', 'Br. Yohanes Rachmat Simamora, OFM', NULL, '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, NULL, NULL, '2026-08-03 05:50:45', '2026-08-03 05:50:45'),
(357, NULL, 'sekolah.don-bosco', 'Ibu Anna Maria Djokosetio', 'sekolah-don-bosco@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, NULL, NULL, '2026-08-03 05:57:24', '2026-08-03 05:57:24'),
(358, NULL, 'biara.susteran', 'Sr. M. Julita, FSGM', 'susteran-fsgm@stbonaventura.org', '$2y$12$e/a.8b4/g00yS4.vFvJj3e7.A/k3y1QzKkS3G01/g.sO5/mYq6G7G', 3, 3, NULL, NULL, '2026-08-03 05:57:24', '2026-08-03 05:57:24');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_articles_publisher` (`publisher_id`),
  ADD KEY `fk_articles_user` (`user_id`),
  ADD KEY `fk_articles_status` (`status_id`),
  ADD KEY `fk_articles_type` (`article_type_id`);

--
-- Indexes for table `article_types`
--
ALTER TABLE `article_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `audit_logs`
--
ALTER TABLE `audit_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_audit_logs_user_idx` (`user_id`),
  ADD KEY `idx_auditable` (`auditable_type`,`auditable_id`);

--
-- Indexes for table `councils`
--
ALTER TABLE `councils`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_councils_user` (`user_id`);

--
-- Indexes for table `council_user`
--
ALTER TABLE `council_user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_council_user_user` (`user_id`),
  ADD KEY `fk_council_user_council` (`council_id`),
  ADD KEY `fk_council_user_period` (`period_id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_news_user` (`user_id`),
  ADD KEY `fk_news_status` (`status_id`);

--
-- Indexes for table `organizations`
--
ALTER TABLE `organizations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_organizations_organization_type` (`organization_type_id`),
  ADD KEY `fk_organizations_status` (`status_id`),
  ADD KEY `fk_organizations_head` (`head_id`),
  ADD KEY `fk_organizations_parent` (`parent_id`);

--
-- Indexes for table `organization_types`
--
ALTER TABLE `organization_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `organization_user`
--
ALTER TABLE `organization_user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_organization_user_user` (`user_id`),
  ADD KEY `fk_organization_user_organization` (`organization_id`),
  ADD KEY `fk_organization_user_period` (`period_id`);

--
-- Indexes for table `periods`
--
ALTER TABLE `periods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `statuses`
--
ALTER TABLE `statuses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `article_types`
--
ALTER TABLE `article_types`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `audit_logs`
--
ALTER TABLE `audit_logs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `councils`
--
ALTER TABLE `councils`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `council_user`
--
ALTER TABLE `council_user`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `organizations`
--
ALTER TABLE `organizations`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT for table `organization_types`
--
ALTER TABLE `organization_types`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `organization_user`
--
ALTER TABLE `organization_user`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=200;

--
-- AUTO_INCREMENT for table `periods`
--
ALTER TABLE `periods`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `statuses`
--
ALTER TABLE `statuses`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `articles`
--
ALTER TABLE `articles`
  ADD CONSTRAINT `fk_articles_publisher` FOREIGN KEY (`publisher_id`) REFERENCES `organizations` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_articles_status` FOREIGN KEY (`status_id`) REFERENCES `statuses` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_articles_type` FOREIGN KEY (`article_type_id`) REFERENCES `article_types` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_articles_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `audit_logs`
--
ALTER TABLE `audit_logs`
  ADD CONSTRAINT `fk_audit_logs_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `councils`
--
ALTER TABLE `councils`
  ADD CONSTRAINT `fk_councils_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `council_user`
--
ALTER TABLE `council_user`
  ADD CONSTRAINT `fk_council_user_council` FOREIGN KEY (`council_id`) REFERENCES `councils` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_council_user_period` FOREIGN KEY (`period_id`) REFERENCES `periods` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_council_user_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `news`
--
ALTER TABLE `news`
  ADD CONSTRAINT `fk_news_status` FOREIGN KEY (`status_id`) REFERENCES `statuses` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_news_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `organizations`
--
ALTER TABLE `organizations`
  ADD CONSTRAINT `fk_organizations_head` FOREIGN KEY (`head_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_organizations_organization_type` FOREIGN KEY (`organization_type_id`) REFERENCES `organization_types` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_organizations_parent` FOREIGN KEY (`parent_id`) REFERENCES `organizations` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_organizations_status` FOREIGN KEY (`status_id`) REFERENCES `statuses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `organization_user`
--
ALTER TABLE `organization_user`
  ADD CONSTRAINT `fk_organization_user_organization` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_organization_user_period` FOREIGN KEY (`period_id`) REFERENCES `periods` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_organization_user_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
