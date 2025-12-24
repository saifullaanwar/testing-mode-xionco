-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 04, 2025 at 10:52 AM
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
-- Database: `xioncocom_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `database_beli`
--

CREATE TABLE `database_beli` (
  `id` int(11) NOT NULL,
  `id_transaksi` text NOT NULL,
  `id_trans_sementara` text NOT NULL,
  `userid` int(11) NOT NULL,
  `tglmili_beli` text NOT NULL,
  `produkid` text NOT NULL,
  `qty_beli` int(11) NOT NULL,
  `expedisi` text NOT NULL,
  `kota` text NOT NULL,
  `address` text NOT NULL,
  `diluarkota` text NOT NULL,
  `proteksi` text NOT NULL,
  `hargaproteksi` int(11) NOT NULL,
  `hargaproduk` int(11) NOT NULL,
  `hargaadmin` int(11) NOT NULL,
  `hargadelivery` int(11) NOT NULL,
  `totalcashback` int(11) NOT NULL,
  `totaldiskon` int(11) NOT NULL,
  `totalflashsale` int(11) NOT NULL,
  `totalbayar` int(11) NOT NULL,
  `listdiskon` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '[]',
  `datajson_produk` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '[]',
  `tokenbeli` text NOT NULL,
  `status` text NOT NULL,
  `notes` text NOT NULL,
  `totalxpointuses` int(11) NOT NULL,
  `utmname` text NOT NULL,
  `id_browser` text NOT NULL,
  `bca` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `database_beli`
--

INSERT INTO `database_beli` (`id`, `id_transaksi`, `id_trans_sementara`, `userid`, `tglmili_beli`, `produkid`, `qty_beli`, `expedisi`, `kota`, `address`, `diluarkota`, `proteksi`, `hargaproteksi`, `hargaproduk`, `hargaadmin`, `hargadelivery`, `totalcashback`, `totaldiskon`, `totalflashsale`, `totalbayar`, `listdiskon`, `datajson_produk`, `tokenbeli`, `status`, `notes`, `totalxpointuses`, `utmname`, `id_browser`, `bca`) VALUES
(693, '', 'J-6289654786299-1761530045874', 1006, '1761530045874', '24', 1, 'In-House', 'KOTA TANGERANG SELATAN', 'Jl Bayam, PONDOK CABE ILIR, PAMULANG, KOTA TANGERANG SELATAN, BANTEN, [Samping warung madura]', 'no', 'false', 0, 1850000, 2000, 50000, 185000, 22000, 0, 1880000, '[{\"id\":1063,\"name\":\"voucheradmin\",\"type\":\"ADMIN\",\"discount\":2000},{\"id\":1060,\"name\":\"testdelivery\",\"type\":\"DELIVERY\",\"discount\":20000},{\"id\":1057,\"name\":\"cashback10%\",\"type\":\"CASHBACK\",\"discount\":185000}]', '{\"name\":\"ASTRAL - Sofa Minimalis Single Seat - Satu Dudukan\",\"image\":\"http://192.168.1.13:3000/assets/pridukimage/img-1-1756363451392.png\",\"variant\":\"\",\"subvariant\":\"\",\"price\":1850000}', '4fd1d0b3-344f-4d57-b752-f2e4c59d75a0', '', '', 0, '', 'xi-1761373070238-2zubcd', ''),
(694, '', 'J-6289654786299-1761538974959', 1006, '1761538974959', '22', 1, 'In-House', 'KOTA TANGERANG SELATAN', 'Jl Bayam, PONDOK CABE ILIR, PAMULANG, KOTA TANGERANG SELATAN, BANTEN, [Samping warung madura]', 'no', 'false', 0, 3151575, 2000, 75000, 315158, 2000, 0, 3226575, '[{\"id\":1057,\"name\":\"cashback10%\",\"type\":\"CASHBACK\",\"discount\":315158},{\"id\":1063,\"name\":\"voucheradmin\",\"type\":\"ADMIN\",\"discount\":2000}]', '{\"name\":\"ASTRAL -  Sofa Minimalis Three Seat - Tiga Dudukan\",\"image\":\"http://192.168.1.13:3000/assets/pridukimage/img-1-1756363283823.png\",\"variant\":\"\",\"subvariant\":\"\",\"price\":3151575}', '53427e99-6c58-42bc-a25b-c49847a6e494', '', '', 0, 'testingxionco', 'xi-1761373070238-2zubcd', ''),
(695, 'J296a-2025', 'J-6289654786299-1761557302682', 1006, '1761557302682', '22', 1, 'In-House', 'KOTA TANGERANG SELATAN', 'Jl Bayam, PONDOK CABE ILIR, PAMULANG, KOTA TANGERANG SELATAN, BANTEN, [Samping warung madura]', 'no', 'false', 0, 3151575, 2000, 225000, 500000, 22000, 0, 21566575, '[{\"id\":1057,\"name\":\"cashback10%\",\"type\":\"CASHBACK\",\"discount\":500000},{\"id\":1060,\"name\":\"testdelivery\",\"type\":\"DELIVERY\",\"discount\":20000},{\"id\":1063,\"name\":\"voucheradmin\",\"type\":\"ADMIN\",\"discount\":2000}]', '{\"name\":\"ASTRAL -  Sofa Minimalis Three Seat - Tiga Dudukan\",\"image\":\"http://192.168.1.13:3000/assets/pridukimage/img-1-1756363283823.png\",\"variant\":\"\",\"subvariant\":\"\",\"price\":3151575}', 'b8cd28ef-27a5-462b-9898-f96b922ea54d', 'settlement', '', 0, '', 'xi-1761556870165-u4hldt', ''),
(696, 'J296b-2025', 'J-6289654786299-1761557302682', 1006, '1761557302682', '42', 2, 'In-House', 'KOTA TANGERANG SELATAN', 'Jl Bayam, PONDOK CABE ILIR, PAMULANG, KOTA TANGERANG SELATAN, BANTEN, [Samping warung madura]', 'no', 'false', 0, 550000, 2000, 225000, 500000, 0, 0, 21566575, '[{\"id\":1057,\"name\":\"cashback10%\",\"type\":\"CASHBACK\",\"discount\":500000},{\"id\":1060,\"name\":\"testdelivery\",\"type\":\"DELIVERY\",\"discount\":20000},{\"id\":1063,\"name\":\"voucheradmin\",\"type\":\"ADMIN\",\"discount\":2000}]', '{\"name\":\"URUZ II Steel - Towel Rack / Gantungan Handuk\",\"image\":\"http://192.168.1.13:3000/assets/pridukimage/img-1-1756364473862.png\",\"variant\":\"\",\"subvariant\":\"\",\"price\":550000}', 'b8cd28ef-27a5-462b-9898-f96b922ea54d', 'settlement', '', 0, '', 'xi-1761556870165-u4hldt', ''),
(697, 'J296c-2025', 'J-6289654786299-1761557302682', 1006, '1761557302682', '39', 1, 'In-House', 'KOTA TANGERANG SELATAN', 'Jl Bayam, PONDOK CABE ILIR, PAMULANG, KOTA TANGERANG SELATAN, BANTEN, [Samping warung madura]', 'no', 'false', 0, 16000000, 2000, 225000, 500000, 0, 0, 21566575, '[{\"id\":1057,\"name\":\"cashback10%\",\"type\":\"CASHBACK\",\"discount\":500000},{\"id\":1060,\"name\":\"testdelivery\",\"type\":\"DELIVERY\",\"discount\":20000},{\"id\":1063,\"name\":\"voucheradmin\",\"type\":\"ADMIN\",\"discount\":2000}]', '{\"name\":\"EORDE | SOFA SECTIONAL SERIES | Seating Collection | Modern Minimalist Leather Sofa - 5 Seater Tanpa Mesin\",\"image\":\"http://192.168.1.13:3000/assets/pridukimage/img-6-1754635086826.png\",\"variant\":\"5 Seater Tanpa Mesin\",\"subvariant\":\"\",\"price\":16000000}', 'b8cd28ef-27a5-462b-9898-f96b922ea54d', 'settlement', '', 0, '', 'xi-1761556870165-u4hldt', ''),
(698, 'J296d-2025', 'J-6289654786299-1761557302682', 1006, '1761557302682', '30', 1, 'In-House', 'KOTA TANGERANG SELATAN', 'Jl Bayam, PONDOK CABE ILIR, PAMULANG, KOTA TANGERANG SELATAN, BANTEN, [Samping warung madura]', 'no', 'false', 0, 1110000, 2000, 225000, 500000, 0, 0, 21566575, '[{\"id\":1057,\"name\":\"cashback10%\",\"type\":\"CASHBACK\",\"discount\":500000},{\"id\":1060,\"name\":\"testdelivery\",\"type\":\"DELIVERY\",\"discount\":20000},{\"id\":1063,\"name\":\"voucheradmin\",\"type\":\"ADMIN\",\"discount\":2000}]', '{\"name\":\"L7 - Desk / Meja Belajar, Meja Kantor | XIONCO\",\"image\":\"http://192.168.1.13:3000/assets/pridukimage/img-1-1756363898279.png\",\"variant\":\"\",\"subvariant\":\"\",\"price\":1110000}', 'b8cd28ef-27a5-462b-9898-f96b922ea54d', 'settlement', '', 0, '', 'xi-1761556870165-u4hldt', '');

-- --------------------------------------------------------

--
-- Table structure for table `database_keranjang`
--

CREATE TABLE `database_keranjang` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `tglinputmili` text NOT NULL,
  `produkid` text NOT NULL,
  `varsubname` text NOT NULL,
  `qty_cart` int(11) NOT NULL,
  `datajson_produk` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`datajson_produk`)),
  `checkout` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `database_keranjang`
--

INSERT INTO `database_keranjang` (`id`, `userid`, `tglinputmili`, `produkid`, `varsubname`, `qty_cart`, `datajson_produk`, `checkout`) VALUES
(511, 1006, '1761535542536', '22', '', 1, '{\"id\":22,\"name\":\"ASTRAL -  Sofa Minimalis Three Seat - Tiga Dudukan\",\"price\":3151575,\"price_coret\":3781890,\"discountFlashsale\":0,\"image\":\"http://192.168.1.13:3000/assets/pridukimage/img-1-1756363283823.png\",\"originalProduct\":{\"id\":22,\"katagori\":[\"Sofa\"],\"namaproduk\":\"ASTRAL -  Sofa Minimalis Three Seat - Tiga Dudukan\",\"main_produk\":\"\",\"main_price\":3151575,\"price_coret\":3781890,\"totalterjual\":825,\"kodesml\":\"large\",\"diskripsi\":\"<p><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">ASTRAL - 3 Seater Sofa Minimalis</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">Termasuk di dalam:</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">1 x Sofa 3 Dudukan</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">===</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">*Silakan hubungi admin atau chat untuk detail ongkir.</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">===</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">IMPORTANT - TERMS &amp; CONDITIONS</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">Customer diwajibkan untuk membaca seluruh Syarat &amp; Ketentuan termasuk ketentuan pengiriman, panduan warna, returning policy, garansi dan ketentuan lainnya sebelum melakukan pemesanan. Syarat dan Ketentuan dapat ditemukan pada tab \\\"Info Penting\\\" pada setiap halaman produk atau pada \\\"Info Toko\\\" di halaman beranda Xionco. Customer dianggap telah membaca Syarat &amp; Ketentuan apabila melakukan pemesanan di XIONCO Official.</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">===</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">IMPORTANT - FABRIC COLOR TOLERANCE</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">Warna bahan kain atau kulit yang ditampilkan pada halaman produk ini tidak secara akurat merepresentasikan warna aslinya dan sangat memungkinkan adanya perbedaan, disebabkan oleh pencahayaan, hasil editing, filter hingga batch produksi dari pabrik bahan. Dengan melakukan pembelian, Customer dianggap telah membaca dan mengetahu toleransi perbedaan warna ini.</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">===</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">SPESIFIKASI PRODUK</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">Dimensi</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Overall Dimension : P 187cm x L 80cm x T 70cm</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Ketebalan Dudukan : 12cm</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Kedalaman Dudukan : 55cm</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Ketinggian Dudukan : 38cm</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Ketinggian Kaki : 5cm</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">Bahan Material</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Upholstery : Vienna Linen 54% polyester, 26% cotton, 20% linen</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Lis : Synthetic Leather Cherokee Snow White</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Busa : Yellow + HQ Rebounded</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Kaki : Solid Acacia Wood</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Rangka : Certified Solid Meranti, Plywood</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Finishing : Melamine</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">*Process : Handcrafted</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">*Style : Industrial Minimalist</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">===</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">Care Instructions :</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Jangan terkena air berwarna, bara api, asam/bahan kimia, benda tajam</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Bersihkan menggunakan kain microfiber dan cuci kering</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Lap dengan kain lembab ikuti arah alur kayu</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">===</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">ASTRAL SERIES - DARK FUTURISTIC MODERN, Terinspirasi dari rekata bintang; lace contrast pada pinggiran sofa, menggabungkan setiap Vertexes untuk membentuk sebuah silhoutte cahaya selaras. Memberikan kesan sebuah garis yang indah di dalam rangkulan semesta. Hitam Putih, harmonisasi warna serasi.</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">===</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">PRODUCT FEATURE</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Design Modern seraya Futuristik namun tetap mendapatkan sentuhan Retro Modis, yang tidak dapat dijumpai dalam sofa-sofa pada umumnya.</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Mendapatkan perhatian khusus pada kesempurnaan setiap ukuran dan human factor.</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Bahan material terbaik sehingga membuat ASTRAL menjadi salah satu Sofa dengan predikat terbaik dan mampu bertahan untuk digunakan dalam jangka waktu lama.</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">2024 XIONCO</span></p>\",\"colorhig\":\"FABRIC VIENNA BLACK | UPHOLSTERY\",\"higprodukID\":\"13\",\"imageurl\":[\"/assets/pridukimage/img-1-1756363283823.png\",\"/assets/pridukimage/img-2-1757489304013.png\",\"/assets/pridukimage/img-3-1754623254002.png\",\"/assets/pridukimage/img-4-1754623273700.png\",\"/assets/pridukimage/img-5-1754623279696.png\"],\"tipevariant\":\"\",\"listvariant\":[],\"eventpage_show\":\"\",\"eventpage_prior\":0,\"main_img\":[\"http://192.168.1.13:3000/assets/pridukimage/img-1-1756363283823.png\",\"http://192.168.1.13:3000/assets/pridukimage/img-2-1757489304013.png\",\"http://192.168.1.13:3000/assets/pridukimage/img-3-1754623254002.png\",\"http://192.168.1.13:3000/assets/pridukimage/img-4-1754623273700.png\",\"http://192.168.1.13:3000/assets/pridukimage/img-5-1754623279696.png\"],\"main_img_display\":\"http://192.168.1.13:3000/assets/pridukimage/img-1-1756363283823.png\",\"category_img_display\":\"http://192.168.1.13:3000/assets/pridukimage/img-1-1756363283823.png\",\"isFlashSale\":null},\"selectedVariant\":null,\"selectedSubVariant\":null}', 'true'),
(522, 1006, '1761556911036', '39', '5 Seater Tanpa Mesin', 1, '{\"id\":39,\"name\":\"EORDE | SOFA SECTIONAL SERIES | Seating Collection | Modern Minimalist Leather Sofa - 5 Seater Tanpa Mesin\",\"price\":16000000,\"price_coret\":0,\"discountFlashsale\":0,\"image\":\"http://192.168.1.13:3000/assets/pridukimage/img-6-1754635086826.png\",\"originalProduct\":{\"id\":39,\"katagori\":[\"Sofa\"],\"namaproduk\":\"EORDE | SOFA SECTIONAL SERIES | Seating Collection | Modern Minimalist Leather Sofa\",\"main_produk\":\"\",\"main_price\":16000000,\"price_coret\":0,\"totalterjual\":766,\"kodesml\":\"\",\"diskripsi\":\"<p><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">EORDE - Sofa Sectional | 5 Seater | 2 Electrical | XIONCO</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">===</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">IMPORTANT - TERMS &amp; CONDITIONS</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">Customer diwajibkan untuk membaca seluruh Syarat &amp; Ketentuan termasuk ketentuan pengiriman, panduan warna, returning policy, garansi dan ketentuan lainnya sebelum melakukan pemesanan. Syarat dan Ketentuan dapat ditemukan pada tab \\\"Info Penting\\\" pada setiap halaman produk atau pada \\\"Info Toko\\\" di halaman beranda Xionco. Customer dianggap telah membaca Syarat &amp; Ketentuan apabila melakukan pemesanan di XIONCO Official Store</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">IMPORTANT - FABRIC COLOR TOLERANCE</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">Warna bahan kain atau kulit yang ditampilkan pada halaman produk ini tidak secara akurat merepresentasikan warna aslinya dan sangat memungkinkan adanya perbedaan, disebabkan oleh pencahayaan, hasil editing, filter hingga batch produksi dari pabrik bahan. Dengan melakukan pembelian, Customer dianggap telah membaca dan mengetahui toleransi perbedaan warna ini.</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">===</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><font color=\\\"#080808\\\" face=\\\"Open Sauce One, sans-serif\\\"><span style=\\\"font-size: 14px;\\\"><b>Silakan hubungi admin, untuk Pengiriman ke luar JABODETABEK menggunakan jasa ekspedisi cargo nantinya akan ditagihkan biaya ongkir dan packing</b></span></font><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">===</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">PENTING - Pembeli dianggap menyetujui Syarat dan Ketentuan yang tertulis di tab \\\"info penting\\\" pada halaman produk apabila melakukan pemesanan.</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">===</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">SPESIFIKASI PRODUK</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">Dimension</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Overall Dimension :</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">• 1 Seater Tanpa tanganan : P 77 x 100 x 80 cm</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">• 1 Seater dengan tanganan : P 96 x 100 x 80 cm</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">• Sudut : P 120 x 100 x 80 cm</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Tinggi Dudukan : 44 cm</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">Bahan Material</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Upholstery : MBTECH PREMIUM CARRERA</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Cushion : Density 37</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Frame : Solid Acacia Wood</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Kaki : karet 3 cm</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Finishing : Matte, Doff</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Process : Handmade</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Style : Minimalis</span></p>\",\"colorhig\":\"\",\"higprodukID\":\"\",\"imageurl\":[\"/assets/pridukimage/img-1-1756364248874.png\",\"/assets/pridukimage/img-2-1754628452450.png\",\"/assets/pridukimage/img-3-1754628465599.png\",\"/assets/pridukimage/img-4-1754628514390.png\",\"/assets/pridukimage/img-5-1754628538342.png\",\"/assets/pridukimage/img-6-1754635086826.png\",\"/assets/pridukimage/img-7-1754635094917.png\",\"/assets/pridukimage/img-8-1754635104246.png\",\"/assets/pridukimage/img-9-1754635113604.png\",\"/assets/pridukimage/img-10-1754635118373.png\",\"/assets/pridukimage/img-11-1754635123080.png\",\"/assets/pridukimage/img-12-1754635131110.png\",\"/assets/pridukimage/img-13-1754635138766.png\",\"/assets/pridukimage/img-14-1754635144882.png\",\"/assets/pridukimage/img-15-1754635152239.png\",\"/assets/pridukimage/img-16-1754635157874.png\",\"/assets/pridukimage/img-17-1754635163137.png\",\"/assets/pridukimage/img-18-1754635191234.png\",\"/assets/pridukimage/img-19-1754635198415.png\",\"/assets/pridukimage/img-20-1754635206288.png\",\"/assets/pridukimage/img-21-1754635214805.png\",\"/assets/pridukimage/img-22-1754635225307.png\",\"/assets/pridukimage/img-23-1754635233083.png\",\"/assets/pridukimage/img-24-1754635244910.png\",\"/assets/pridukimage/img-25-1754635249948.png\",\"/assets/pridukimage/img-26-1754635254678.png\",\"/assets/pridukimage/img-27-1754635265640.png\",\"/assets/pridukimage/img-28-1754635271635.png\",\"/assets/pridukimage/img-29-1754635278867.png\"],\"tipevariant\":\"\",\"listvariant\":[{\"variant\":\"5 Seater Tanpa Mesin\",\"subvariant\":[],\"colorhig\":\"\",\"price_coret\":\"0\",\"price\":\"16000000\",\"kodesml\":\"large\",\"hexcode\":\"-\",\"imageurl\":\"http://192.168.1.13:3000/assets/pridukimage/img-6-1754635086826.png\",\"higprodukID\":707},{\"variant\":\"5 Seater 1 Mesin\",\"subvariant\":[],\"colorhig\":\"\",\"price_coret\":\"0\",\"price\":\"18500000\",\"kodesml\":\"large\",\"hexcode\":\"-\",\"imageurl\":\"http://192.168.1.13:3000/assets/pridukimage/img-7-1754635094917.png\",\"higprodukID\":708},{\"variant\":\"5 Seater 2 Mesin\",\"subvariant\":[],\"colorhig\":\"\",\"price_coret\":\"0\",\"price\":\"21000000\",\"kodesml\":\"large\",\"hexcode\":\"-\",\"imageurl\":\"http://192.168.1.13:3000/assets/pridukimage/img-8-1754635104246.png\",\"higprodukID\":709},{\"variant\":\"6 Seater Tanpa Mesin\",\"subvariant\":[],\"colorhig\":\"\",\"price_coret\":\"0\",\"price\":\"20500000\",\"kodesml\":\"large\",\"hexcode\":\"-\",\"imageurl\":\"http://192.168.1.13:3000/assets/pridukimage/img-9-1754635113604.png\",\"higprodukID\":710},{\"variant\":\"6 Seater 1 Mesin\",\"subvariant\":[],\"colorhig\":\"\",\"price_coret\":\"0\",\"price\":\"23000000\",\"kodesml\":\"large\",\"hexcode\":\"-\",\"imageurl\":\"http://192.168.1.13:3000/assets/pridukimage/img-10-1754635118373.png\",\"higprodukID\":711},{\"variant\":\"6 Seater 2 Mesin\",\"subvariant\":[],\"colorhig\":\"\",\"price_coret\":\"0\",\"price\":\"25500000\",\"kodesml\":\"large\",\"hexcode\":\"-\",\"imageurl\":\"http://192.168.1.13:3000/assets/pridukimage/img-11-1754635123080.png\",\"higprodukID\":712},{\"variant\":\"7 Seater Type A Tanpa Mesin\",\"subvariant\":[],\"colorhig\":\"\",\"price_coret\":\"0\",\"price\":\"22000000\",\"kodesml\":\"large\",\"hexcode\":\"-\",\"imageurl\":\"http://192.168.1.13:3000/assets/pridukimage/img-12-1754635131110.png\",\"higprodukID\":713},{\"variant\":\"7 Seater Type A 1 Mesin\",\"subvariant\":[],\"colorhig\":\"\",\"price_coret\":\"0\",\"price\":\"24500000\",\"kodesml\":\"large\",\"hexcode\":\"-\",\"imageurl\":\"http://192.168.1.13:3000/assets/pridukimage/img-13-1754635138766.png\",\"higprodukID\":714},{\"variant\":\"7 Seater Type A 2 Mesin\",\"subvariant\":[],\"colorhig\":\"\",\"price_coret\":\"0\",\"price\":\"27000000\",\"kodesml\":\"large\",\"hexcode\":\"-\",\"imageurl\":\"http://192.168.1.13:3000/assets/pridukimage/img-14-1754635144882.png\",\"higprodukID\":715},{\"variant\":\"7 Seater Type B Tanpa Mesin\",\"subvariant\":[],\"colorhig\":\"\",\"price_coret\":\"0\",\"price\":\"23500000\",\"kodesml\":\"large\",\"hexcode\":\"-\",\"imageurl\":\"http://192.168.1.13:3000/assets/pridukimage/img-15-1754635152239.png\",\"higprodukID\":716},{\"variant\":\"7 Seater Type B 1 Mesin\",\"subvariant\":[],\"colorhig\":\"\",\"price_coret\":\"0\",\"price\":\"26000000\",\"kodesml\":\"large\",\"hexcode\":\"-\",\"imageurl\":\"http://192.168.1.13:3000/assets/pridukimage/img-16-1754635157874.png\",\"higprodukID\":717},{\"variant\":\"7 Seater Type B 2 Mesin\",\"subvariant\":[],\"colorhig\":\"\",\"price_coret\":\"0\",\"price\":\"28500000\",\"kodesml\":\"large\",\"hexcode\":\"-\",\"imageurl\":\"http://192.168.1.13:3000/assets/pridukimage/img-17-1754635163137.png\",\"higprodukID\":718},{\"variant\":\"7 Seater Type C Tanpa Mesin\",\"subvariant\":[],\"colorhig\":\"\",\"price_coret\":\"0\",\"price\":\"23500000\",\"kodesml\":\"large\",\"hexcode\":\"-\",\"imageurl\":\"http://192.168.1.13:3000/assets/pridukimage/img-18-1754635191234.png\",\"higprodukID\":719},{\"variant\":\"7 Seater Type C 1 Mesin\",\"subvariant\":[],\"colorhig\":\"\",\"price_coret\":\"0\",\"price\":\"26000000\",\"kodesml\":\"large\",\"hexcode\":\"-\",\"imageurl\":\"http://192.168.1.13:3000/assets/pridukimage/img-19-1754635198415.png\",\"higprodukID\":720},{\"variant\":\"7 Seater Type C 2 Mesin\",\"subvariant\":[],\"colorhig\":\"\",\"price_coret\":\"0\",\"price\":\"28500000\",\"kodesml\":\"large\",\"hexcode\":\"-\",\"imageurl\":\"http://192.168.1.13:3000/assets/pridukimage/img-20-1754635206288.png\",\"higprodukID\":721},{\"variant\":\"7 Seater Type D Tanpa Mesin\",\"subvariant\":[],\"colorhig\":\"\",\"price_coret\":\"0\",\"price\":\"25000000\",\"kodesml\":\"large\",\"hexcode\":\"-\",\"imageurl\":\"http://192.168.1.13:3000/assets/pridukimage/img-21-1754635214805.png\",\"higprodukID\":722},{\"variant\":\"7 Seater Type D 1 Mesin\",\"subvariant\":[],\"colorhig\":\"\",\"price_coret\":\"0\",\"price\":\"27500000\",\"kodesml\":\"large\",\"hexcode\":\"-\",\"imageurl\":\"http://192.168.1.13:3000/assets/pridukimage/img-22-1754635225307.png\",\"higprodukID\":723},{\"variant\":\"7 Seater Type D 2 Mesin\",\"subvariant\":[],\"colorhig\":\"\",\"price_coret\":\"0\",\"price\":\"30000000\",\"kodesml\":\"large\",\"hexcode\":\"-\",\"imageurl\":\"http://192.168.1.13:3000/assets/pridukimage/img-23-1754635233083.png\",\"higprodukID\":724},{\"variant\":\"8 Seater Tanpa Mesin\",\"subvariant\":[],\"colorhig\":\"\",\"price_coret\":\"0\",\"price\":\"26000000\",\"kodesml\":\"large\",\"hexcode\":\"-\",\"imageurl\":\"http://192.168.1.13:3000/assets/pridukimage/img-24-1754635244910.png\",\"higprodukID\":725},{\"variant\":\"8 Seater 1 Mesin\",\"subvariant\":[],\"colorhig\":\"\",\"price_coret\":\"0\",\"price\":\"28500000\",\"kodesml\":\"large\",\"hexcode\":\"-\",\"imageurl\":\"http://192.168.1.13:3000/assets/pridukimage/img-25-1754635249948.png\",\"higprodukID\":726},{\"variant\":\"8 Seater 2 Mesin\",\"subvariant\":[],\"colorhig\":\"\",\"price_coret\":\"0\",\"price\":\"31000000\",\"kodesml\":\"large\",\"hexcode\":\"-\",\"imageurl\":\"http://192.168.1.13:3000/assets/pridukimage/img-26-1754635254678.png\",\"higprodukID\":727},{\"variant\":\"9 Seater Tanpa Mesin\",\"subvariant\":[],\"colorhig\":\"\",\"price_coret\":\"0\",\"price\":\"29000000\",\"kodesml\":\"large\",\"hexcode\":\"-\",\"imageurl\":\"http://192.168.1.13:3000/assets/pridukimage/img-27-1754635265640.png\",\"higprodukID\":728},{\"variant\":\"9 Seater 1 Mesin\",\"subvariant\":[],\"colorhig\":\"\",\"price_coret\":\"0\",\"price\":\"31500000\",\"kodesml\":\"large\",\"hexcode\":\"-\",\"imageurl\":\"http://192.168.1.13:3000/assets/pridukimage/img-28-1754635271635.png\",\"higprodukID\":729},{\"variant\":\"9 Seater 2 Mesin\",\"subvariant\":[],\"colorhig\":\"\",\"price_coret\":\"0\",\"price\":\"34000000\",\"kodesml\":\"large\",\"hexcode\":\"-\",\"imageurl\":\"http://192.168.1.13:3000/assets/pridukimage/img-29-1754635278867.png\",\"higprodukID\":730}],\"eventpage_show\":\"true\",\"eventpage_prior\":6,\"main_img\":[\"http://192.168.1.13:3000/assets/pridukimage/img-1-1756364248874.png\",\"http://192.168.1.13:3000/assets/pridukimage/img-2-1754628452450.png\",\"http://192.168.1.13:3000/assets/pridukimage/img-3-1754628465599.png\",\"http://192.168.1.13:3000/assets/pridukimage/img-4-1754628514390.png\",\"http://192.168.1.13:3000/assets/pridukimage/img-5-1754628538342.png\",\"http://192.168.1.13:3000/assets/pridukimage/img-6-1754635086826.png\",\"http://192.168.1.13:3000/assets/pridukimage/img-7-1754635094917.png\",\"http://192.168.1.13:3000/assets/pridukimage/img-8-1754635104246.png\",\"http://192.168.1.13:3000/assets/pridukimage/img-9-1754635113604.png\",\"http://192.168.1.13:3000/assets/pridukimage/img-10-1754635118373.png\",\"http://192.168.1.13:3000/assets/pridukimage/img-11-1754635123080.png\",\"http://192.168.1.13:3000/assets/pridukimage/img-12-1754635131110.png\",\"http://192.168.1.13:3000/assets/pridukimage/img-13-1754635138766.png\",\"http://192.168.1.13:3000/assets/pridukimage/img-14-1754635144882.png\",\"http://192.168.1.13:3000/assets/pridukimage/img-15-1754635152239.png\",\"http://192.168.1.13:3000/assets/pridukimage/img-16-1754635157874.png\",\"http://192.168.1.13:3000/assets/pridukimage/img-17-1754635163137.png\",\"http://192.168.1.13:3000/assets/pridukimage/img-18-1754635191234.png\",\"http://192.168.1.13:3000/assets/pridukimage/img-19-1754635198415.png\",\"http://192.168.1.13:3000/assets/pridukimage/img-20-1754635206288.png\",\"http://192.168.1.13:3000/assets/pridukimage/img-21-1754635214805.png\",\"http://192.168.1.13:3000/assets/pridukimage/img-22-1754635225307.png\",\"http://192.168.1.13:3000/assets/pridukimage/img-23-1754635233083.png\",\"http://192.168.1.13:3000/assets/pridukimage/img-24-1754635244910.png\",\"http://192.168.1.13:3000/assets/pridukimage/img-25-1754635249948.png\",\"http://192.168.1.13:3000/assets/pridukimage/img-26-1754635254678.png\",\"http://192.168.1.13:3000/assets/pridukimage/img-27-1754635265640.png\",\"http://192.168.1.13:3000/assets/pridukimage/img-28-1754635271635.png\",\"http://192.168.1.13:3000/assets/pridukimage/img-29-1754635278867.png\"],\"main_img_display\":\"http://192.168.1.13:3000/assets/pridukimage/img-1-1756364248874.png\",\"category_img_display\":\"http://192.168.1.13:3000/assets/pridukimage/img-1-1756364248874.png\",\"isFlashSale\":null},\"selectedVariant\":{\"variant\":\"5 Seater Tanpa Mesin\",\"subvariant\":[],\"colorhig\":\"\",\"price_coret\":\"0\",\"price\":\"16000000\",\"kodesml\":\"large\",\"hexcode\":\"-\",\"imageurl\":\"http://192.168.1.13:3000/assets/pridukimage/img-6-1754635086826.png\",\"higprodukID\":707},\"selectedSubVariant\":null}', 'true'),
(523, 1006, '1761556921374', '30', '', 1, '{\"id\":30,\"name\":\"L7 - Desk / Meja Belajar, Meja Kantor | XIONCO\",\"price\":1110000,\"price_coret\":0,\"discountFlashsale\":0,\"image\":\"http://192.168.1.13:3000/assets/pridukimage/img-1-1756363898279.png\",\"originalProduct\":{\"id\":30,\"katagori\":[\"Desk\",\"Table\"],\"namaproduk\":\"L7 - Desk / Meja Belajar, Meja Kantor | XIONCO\",\"main_produk\":\"\",\"main_price\":1110000,\"price_coret\":0,\"totalterjual\":156,\"kodesml\":\"medium\",\"diskripsi\":\"<p><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">L7 - Desk / Meja Belajar, Meja Kantor | XIONCO</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">Termasuk di dalam: 1 Buah Meja Belajar (tanpa laci)</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><font color=\\\"#080808\\\" face=\\\"Open Sauce One, sans-serif\\\"><span style=\\\"font-size: 14px;\\\">===</span></font><br><br><font color=\\\"#080808\\\" face=\\\"Open Sauce One, sans-serif\\\"><span style=\\\"font-size: 14px;\\\">Silakan hubungi admin untuk Pengiriman ke luar JABODETABEK menggunakan jasa ekspedisi cargo nantinya akan ditagihkan biaya ongkir dan packing<br><br></span></font><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">===</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">SPESIFIKASI PRODUK</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">Dimensi : P 110cm x L 57cm x T 90cm</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">Tinggi Daun Meja : 75cm</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">Bahan Material</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Frame Kaki : Solid Acacia Wood</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Daun Meja : High Pressed Blockboard</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Finishing : Melamine, Ducco Accent White</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Process : Handcrafted</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Style : Natural Modern Minimalist</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">===</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">Pemasangan meja dilakukan dengan cara difisher ke dinding</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">===</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">L7 - Leaning Seven Desk / Meja belajar kekinian yang berbeda dengan meja belajar pada umumnya. Ini adalah meja yang memberikan nuansa fresh dikarenakan konstruksi hanya menggunakan 2 kaki dan disandarkan ke dinding membuatnya seakan bergelantungan dari dinding. Menulis atau bekerja di meja L7 ini seakan dapat mengundang inspirasi baru.</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">2024 XIONCO</span><font color=\\\"#080808\\\" face=\\\"Open Sauce One, sans-serif\\\"><span style=\\\"font-size: 14px;\\\"></span></font></p>\",\"colorhig\":\"\",\"higprodukID\":\"85\",\"imageurl\":[\"/assets/pridukimage/img-1-1756363898279.png\",\"/assets/pridukimage/img-2-1754626939449.png\",\"/assets/pridukimage/img-3-1754626946605.png\",\"/assets/pridukimage/img-4-1754626950945.png\",\"/assets/pridukimage/img-5-1754626954695.png\"],\"tipevariant\":\"\",\"listvariant\":[],\"eventpage_show\":\"\",\"eventpage_prior\":0,\"main_img\":[\"http://192.168.1.13:3000/assets/pridukimage/img-1-1756363898279.png\",\"http://192.168.1.13:3000/assets/pridukimage/img-2-1754626939449.png\",\"http://192.168.1.13:3000/assets/pridukimage/img-3-1754626946605.png\",\"http://192.168.1.13:3000/assets/pridukimage/img-4-1754626950945.png\",\"http://192.168.1.13:3000/assets/pridukimage/img-5-1754626954695.png\"],\"main_img_display\":\"http://192.168.1.13:3000/assets/pridukimage/img-1-1756363898279.png\",\"category_img_display\":\"http://192.168.1.13:3000/assets/pridukimage/img-1-1756363898279.png\",\"isFlashSale\":null},\"selectedVariant\":null,\"selectedSubVariant\":null}', 'true');
INSERT INTO `database_keranjang` (`id`, `userid`, `tglinputmili`, `produkid`, `varsubname`, `qty_cart`, `datajson_produk`, `checkout`) VALUES
(524, 1006, '1761557061419', '42', '', 2, '{\"id\":42,\"name\":\"URUZ II Steel - Towel Rack / Gantungan Handuk\",\"price\":550000,\"price_coret\":0,\"discountFlashsale\":0,\"image\":\"http://192.168.1.13:3000/assets/pridukimage/img-1-1756364473862.png\",\"originalProduct\":{\"id\":42,\"katagori\":[\"Lifestyle\"],\"namaproduk\":\"URUZ II Steel - Towel Rack / Gantungan Handuk\",\"main_produk\":\"\",\"main_price\":550000,\"price_coret\":0,\"totalterjual\":490,\"kodesml\":\"small\",\"diskripsi\":\"<p><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">URUZ II - Gantungan Handuk</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">Termasuk di dalam:</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">1 Gantungan Handuk</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><font color=\\\"#080808\\\" face=\\\"Open Sauce One, sans-serif\\\"><span style=\\\"font-size: 14px;\\\">===</span></font><br><br><font color=\\\"#080808\\\" face=\\\"Open Sauce One, sans-serif\\\"><span style=\\\"font-size: 14px;\\\">Silakan hubungi admin untuk Pengiriman ke luar JABODETABEK menggunakan jasa ekspedisi cargo nantinya akan ditagihkan biaya ongkir dan packing<br><br></span></font><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">===</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">SPESIFIKASI PRODUK</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">Dimension</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Overall Dimension : P 60cm x L 20cm x T 85cm</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Tinggi Baris Depan : 75cm</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Tinggi Baris Belakang : 85cm</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Tebal Rangka : 2cm</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">Bahan Material</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Rangka : Besi Hollow 2*2</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Finishing : Duco Doff</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">*Process : Handcrafted</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">*Style : Minimalist Modern</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">===</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">URUZ - Towel Rack adalah sebuah perpaduan antara fungsionalitas dan estetika. Dengan beratnya yang ringan dan desain tiga baris, URUZ tidak akan membuat tempat Anda penuh dan sangatlah mobile karena dapat dipindah dengan mudah. Desain uniknya yang menggabungkan nuansa tropical dengan minimalis akan memberikan kesan baru di rumah Anda. Selain sebagai gantungan handuk, URUZ juga bisa digunakan sebagai gantungan baju dalam kamar.</span><font color=\\\"#080808\\\" face=\\\"Open Sauce One, sans-serif\\\"><span style=\\\"font-size: 14px;\\\"></span></font></p>\",\"colorhig\":\"\",\"higprodukID\":\"696\",\"imageurl\":[\"/assets/pridukimage/img-1-1756364473862.png\",\"/assets/pridukimage/img-2-1754636434273.png\",\"/assets/pridukimage/img-3-1754636437239.png\",\"/assets/pridukimage/img-4-1754636444778.png\",\"/assets/pridukimage/img-5-1754636457975.png\"],\"tipevariant\":\"\",\"listvariant\":[],\"eventpage_show\":\"\",\"eventpage_prior\":0,\"main_img\":[\"http://192.168.1.13:3000/assets/pridukimage/img-1-1756364473862.png\",\"http://192.168.1.13:3000/assets/pridukimage/img-2-1754636434273.png\",\"http://192.168.1.13:3000/assets/pridukimage/img-3-1754636437239.png\",\"http://192.168.1.13:3000/assets/pridukimage/img-4-1754636444778.png\",\"http://192.168.1.13:3000/assets/pridukimage/img-5-1754636457975.png\"],\"main_img_display\":\"http://192.168.1.13:3000/assets/pridukimage/img-1-1756364473862.png\",\"category_img_display\":\"http://192.168.1.13:3000/assets/pridukimage/img-1-1756364473862.png\",\"isFlashSale\":null},\"selectedVariant\":null,\"selectedSubVariant\":null}', 'true'),
(525, 1006, '1761557276149', '22', '', 1, '{\"id\":22,\"name\":\"ASTRAL -  Sofa Minimalis Three Seat - Tiga Dudukan\",\"price\":3151575,\"price_coret\":3781890,\"discountFlashsale\":0,\"image\":\"http://192.168.1.13:3000/assets/pridukimage/img-1-1756363283823.png\",\"originalProduct\":{\"id\":22,\"katagori\":[\"Sofa\"],\"namaproduk\":\"ASTRAL -  Sofa Minimalis Three Seat - Tiga Dudukan\",\"main_produk\":\"\",\"main_price\":3151575,\"price_coret\":3781890,\"totalterjual\":825,\"kodesml\":\"large\",\"diskripsi\":\"<p><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">ASTRAL - 3 Seater Sofa Minimalis</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">Termasuk di dalam:</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">1 x Sofa 3 Dudukan</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">===</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">*Silakan hubungi admin atau chat untuk detail ongkir.</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">===</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">IMPORTANT - TERMS &amp; CONDITIONS</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">Customer diwajibkan untuk membaca seluruh Syarat &amp; Ketentuan termasuk ketentuan pengiriman, panduan warna, returning policy, garansi dan ketentuan lainnya sebelum melakukan pemesanan. Syarat dan Ketentuan dapat ditemukan pada tab \\\"Info Penting\\\" pada setiap halaman produk atau pada \\\"Info Toko\\\" di halaman beranda Xionco. Customer dianggap telah membaca Syarat &amp; Ketentuan apabila melakukan pemesanan di XIONCO Official.</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">===</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">IMPORTANT - FABRIC COLOR TOLERANCE</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">Warna bahan kain atau kulit yang ditampilkan pada halaman produk ini tidak secara akurat merepresentasikan warna aslinya dan sangat memungkinkan adanya perbedaan, disebabkan oleh pencahayaan, hasil editing, filter hingga batch produksi dari pabrik bahan. Dengan melakukan pembelian, Customer dianggap telah membaca dan mengetahu toleransi perbedaan warna ini.</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">===</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">SPESIFIKASI PRODUK</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">Dimensi</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Overall Dimension : P 187cm x L 80cm x T 70cm</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Ketebalan Dudukan : 12cm</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Kedalaman Dudukan : 55cm</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Ketinggian Dudukan : 38cm</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Ketinggian Kaki : 5cm</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">Bahan Material</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Upholstery : Vienna Linen 54% polyester, 26% cotton, 20% linen</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Lis : Synthetic Leather Cherokee Snow White</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Busa : Yellow + HQ Rebounded</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Kaki : Solid Acacia Wood</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Rangka : Certified Solid Meranti, Plywood</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Finishing : Melamine</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">*Process : Handcrafted</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">*Style : Industrial Minimalist</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">===</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">Care Instructions :</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Jangan terkena air berwarna, bara api, asam/bahan kimia, benda tajam</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Bersihkan menggunakan kain microfiber dan cuci kering</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Lap dengan kain lembab ikuti arah alur kayu</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">===</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">ASTRAL SERIES - DARK FUTURISTIC MODERN, Terinspirasi dari rekata bintang; lace contrast pada pinggiran sofa, menggabungkan setiap Vertexes untuk membentuk sebuah silhoutte cahaya selaras. Memberikan kesan sebuah garis yang indah di dalam rangkulan semesta. Hitam Putih, harmonisasi warna serasi.</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">===</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">PRODUCT FEATURE</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Design Modern seraya Futuristik namun tetap mendapatkan sentuhan Retro Modis, yang tidak dapat dijumpai dalam sofa-sofa pada umumnya.</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Mendapatkan perhatian khusus pada kesempurnaan setiap ukuran dan human factor.</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">* Bahan material terbaik sehingga membuat ASTRAL menjadi salah satu Sofa dengan predikat terbaik dan mampu bertahan untuk digunakan dalam jangka waktu lama.</span><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><br style=\\\"box-sizing: inherit; color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\"><span style=\\\"color: rgb(8, 8, 8); font-family: &quot;Open Sauce One&quot;, sans-serif; font-size: 14px;\\\">2024 XIONCO</span></p>\",\"colorhig\":\"FABRIC VIENNA BLACK | UPHOLSTERY\",\"higprodukID\":\"13\",\"imageurl\":[\"/assets/pridukimage/img-1-1756363283823.png\",\"/assets/pridukimage/img-2-1757489304013.png\",\"/assets/pridukimage/img-3-1754623254002.png\",\"/assets/pridukimage/img-4-1754623273700.png\",\"/assets/pridukimage/img-5-1754623279696.png\"],\"tipevariant\":\"\",\"listvariant\":[],\"eventpage_show\":\"\",\"eventpage_prior\":0,\"main_img\":[\"http://192.168.1.13:3000/assets/pridukimage/img-1-1756363283823.png\",\"http://192.168.1.13:3000/assets/pridukimage/img-2-1757489304013.png\",\"http://192.168.1.13:3000/assets/pridukimage/img-3-1754623254002.png\",\"http://192.168.1.13:3000/assets/pridukimage/img-4-1754623273700.png\",\"http://192.168.1.13:3000/assets/pridukimage/img-5-1754623279696.png\"],\"main_img_display\":\"http://192.168.1.13:3000/assets/pridukimage/img-1-1756363283823.png\",\"category_img_display\":\"http://192.168.1.13:3000/assets/pridukimage/img-1-1756363283823.png\",\"isFlashSale\":null},\"selectedVariant\":null,\"selectedSubVariant\":null}', 'true');

-- --------------------------------------------------------

--
-- Table structure for table `database_review`
--

CREATE TABLE `database_review` (
  `id` int(11) NOT NULL,
  `tglinputmili` text NOT NULL,
  `userid` int(11) NOT NULL,
  `star` int(11) NOT NULL,
  `review` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dataslogin`
--

CREATE TABLE `dataslogin` (
  `id` int(11) NOT NULL,
  `tglmili_join` text NOT NULL,
  `type` text NOT NULL,
  `username` text NOT NULL,
  `namalengkap` text NOT NULL,
  `tanggal_lahir` text NOT NULL,
  `gender` text NOT NULL,
  `password` text NOT NULL,
  `nohandphone` text NOT NULL,
  `email` text NOT NULL,
  `kota` text NOT NULL,
  `address` text NOT NULL,
  `another_address` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '[]' CHECK (json_valid(`another_address`)),
  `xp` int(11) NOT NULL DEFAULT 0,
  `point` int(11) NOT NULL,
  `lastlogin` text NOT NULL,
  `lastlogin_mili` text NOT NULL,
  `exptotalpoint` text NOT NULL,
  `totalbelanja` int(11) NOT NULL,
  `utm_first` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '{}' CHECK (json_valid(`utm_first`)),
  `utm_last` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '[]' CHECK (json_valid(`utm_last`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dataslogin`
--

INSERT INTO `dataslogin` (`id`, `tglmili_join`, `type`, `username`, `namalengkap`, `tanggal_lahir`, `gender`, `password`, `nohandphone`, `email`, `kota`, `address`, `another_address`, `xp`, `point`, `lastlogin`, `lastlogin_mili`, `exptotalpoint`, `totalbelanja`, `utm_first`, `utm_last`) VALUES
(1004, '1754296006446', '', '628123456789', 'Oktajianto', '1753549200000', 'Laki-Laki', '123123', '628123456789', 'Oktajianto@gmail.com', 'KABUPATEN KEBUMEN', 'C10, SELOTUMPENG, MIRIT, KABUPATEN KEBUMEN, JAWA TENGAH', '[]', 0, 0, '5 Agustus 2025 15:02 WIB', '1754380979956', '1785834090608', 0, '{}', '[]'),
(1005, '1754450473293', '', '6285876249492', 'Hammam O', '1759597200000', 'Laki-Laki', '1234567890', '6285876249492', 'tes@gmail.com', 'KOTA TANGERANG SELATAN', 'Jl Rempoa 1, REMPOA, CIPUTAT TIMUR, KOTA TANGERANG SELATAN, BANTEN', '[]', 0, 16, '8 Oktober 2025 16:14 WIB', '1759914881596', '1790138070423', 17581000, '{}', '[]'),
(1006, '1754463245278', '', '6289654786299', 'zidane abbas', '966643200000', 'Laki-Laki', '123456', '6289654786299', 'zidan.abbas28@gmail.com', 'KOTA TANGERANG SELATAN', 'Jl Bayam, PONDOK CABE ILIR, PAMULANG, KOTA TANGERANG SELATAN, BANTEN, []', '[{\"kota\":\"KOTA JAKARTA SELATAN\",\"address\":\"Classy, PONDOK PINANG, KEBAYORAN LAMA, KOTA JAKARTA SELATAN, DKI JAKARTA, [Samping Indomart]\",\"main\":true}]', 500000, 1000028, '4 November 2025 14:04 WIB', '1762239854305', '1793093435187', 260562485, '{\"tglinputmili\":1760523916369,\"utmname\":\"testing\",\"nominal\":0,\"id_trans_web\":\"\"}', '[{\"tglinputmili\":1760942304961,\"utmname\":\"qwerty\",\"nominal\":3228575,\"id_trans_web\":\"J-6289654786299-1760942292361\"},{\"tglinputmili\":1761016236799,\"utmname\":\"testingxionco\",\"nominal\":3152,\"id_trans_web\":\"J-6289654786299-1761011812216\"},{\"tglinputmili\":1761016248778,\"utmname\":\"qwerty\",\"nominal\":3228575,\"id_trans_web\":\"J-6289654786299-1760943288517\"},{\"tglinputmili\":1761032145204,\"utmname\":\"testingxionco\",\"nominal\":30800,\"id_trans_web\":\"J-6289654786299-1761032045428\"}]'),
(1007, '1754558333722', '', '62895358976565', 'Cal cahyadi Ahmadani', '-59184000000', 'Laki-Laki', 'Sadang!12', '62895358976565', 'zalsujana07@gmail.com', 'KOTA TANGERANG SELATAN', 'Rempoaa, REMPOA, CIPUTAT TIMUR, KOTA TANGERANG SELATAN, BANTEN', '[{\"kota\":\"KABUPATEN MUSI BANYUASIN\",\"address\":\"Rempoa, LOKA JAYA, KELUANG, KABUPATEN MUSI BANYUASIN, SUMATERA SELATAN\",\"main\":false},{\"kota\":\"KOTA TANGERANG SELATAN\",\"address\":\"remopa 2, REMPOA, CIPUTAT TIMUR, KOTA TANGERANG SELATAN, BANTEN\",\"main\":false}]', 0, 97, '4 November 2025 16:51 WIB', '1762249891845', '1792906805907', 28761201, '{\"tglinputmili\":1758946587390,\"utmname\":\"meta-ohd-kyrios-3-\",\"nominal\":4347850,\"id_trans_web\":\"I-62895358976565-1758946598833\"}', '[{\"tglinputmili\":1758947045889,\"utmname\":\"meta-ohd-kyrios-3-\",\"nominal\":114000,\"id_trans_web\":\"I-62895358976565-1758947026741\"},{\"tglinputmili\":1761370527105,\"utmname\":\"meta-ohd-kyrios-3-\",\"nominal\":4587850,\"id_trans_web\":\"J-62895358976565-1761370505569\"},{\"tglinputmili\":1761370659962,\"utmname\":\"meta-ohd-kyrios-3-\",\"nominal\":5193850,\"id_trans_web\":\"J-62895358976565-1761370643648\"},{\"tglinputmili\":1761370805914,\"utmname\":\"meta-ohd-kyrios-3-\",\"nominal\":4505750,\"id_trans_web\":\"J-62895358976565-1761370788551\"}]'),
(1008, '1754723429963', '', '62895358976566', 'Ical Akun', '999734400000', 'Laki-Laki', '123456', '62895358976566', 'zalsujana07@gmail.com', 'KABUPATEN MANDAILING NATAL', 'jajja, SINUNUKAN I CENTRAL, SINUNUKAN, KABUPATEN MANDAILING NATAL, SUMATERA UTARA, [2345678]', '[{\"kota\":\"KABUPATEN KEPAHIANG\",\"address\":\"Jalan Sadang, WESKUST, KEPAHIANG, KABUPATEN KEPAHIANG, BENGKULU, jakaria\",\"main\":false},{\"kota\":\"KABUPATEN TULANGBAWANG\",\"address\":\"345345, BUMI DIPASENA MAKMUR, RAWAJITU TIMUR, KABUPATEN TULANGBAWANG, LAMPUNG, [334534534545678]\",\"main\":false}]', 0, 43, '11 Oktober 2025 08:30 WIB', '1760146228529', '1791690154578', 62210869, '{}', '[]'),
(1009, '1755138811496', '', '6285883239633', 'Dhani', '965667600000', 'Laki-Laki', 'kancild77all', '6285883239633', 'ramadhanibangga14@gmail.com', 'KOTA JAKARTA SELATAN', 'JL. Deltasari 1 No 14.A RT.05/RW.013, GANDARIA UTARA, KEBAYORAN BARU, KOTA JAKARTA SELATAN, DKI JAKARTA', '[]', 0, 0, '', '', '', 0, '{}', '[]'),
(1039, '1760925789398', '', '6286952144365', 'Jini', '1760745600000', 'Laki-Laki', '@Jini123', '6286952144365', 'Jini@yahoo.com', 'KOTA JAKARTA SELATAN', 'Rempoa, CIPETE UTARA, KEBAYORAN BARU, KOTA JAKARTA SELATAN, DKI JAKARTA', '[{\"kota\":\"KOTA TANGERANG SELATAN\",\"address\":\"Rempoa2, REMPOA, CIPUTAT TIMUR, KOTA TANGERANG SELATAN, BANTEN, [AZKO]\",\"main\":true}]', 0, 0, '20 Oktober 2025 09:03 WIB', '1760925790050', '1792551696569', 30800, '{\"tglinputmili\":1760925789398,\"utmname\":\"testingxionco\",\"nominal\":0,\"id_trans_web\":\"\"}', '[{\"tglinputmili\":1761015696573,\"utmname\":\"testingxionco\",\"nominal\":30800,\"id_trans_web\":\"J-6286952144365-1760926210706\"}]'),
(1040, '1760933144724', '', '6285156557546', 'Joko Anwar', '1760832000000', 'Laki-Laki', '@Jono123', '6285156557546', 'Jono@gmail.com', 'KOTA TANGERANG SELATAN', 'Rempoa, REMPOA, CIPUTAT TIMUR, KOTA TANGERANG SELATAN, BANTEN', '[]', 0, 0, '28 Oktober 2025 17:06 WIB', '1761645966898', '', 0, '{\"tglinputmili\":1760933144724,\"utmname\":\"qwerty\",\"nominal\":0,\"id_trans_web\":\"\"}', '[]'),
(1041, '1760933447303', '', '626545645123121564', 'kiwkiw', '1760832000000', 'Laki-Laki', '@kiwKiw123', '626545645123121564', 'kiwkiw@yahoo.com', 'KABUPATEN WAY KANAN', 'Rempoa3, TANJUNG REJO, NEGERI AGUNG, KABUPATEN WAY KANAN, LAMPUNG', '[]', 0, 0, '20 Oktober 2025 11:10 WIB', '1760933447949', '', 0, '{\"tglinputmili\":1760933447303,\"utmname\":\"testingxionco\",\"nominal\":0,\"id_trans_web\":\"\"}', '[]'),
(1042, '1760933573052', '', '6223135456', 'kodok123', '1760313600000', 'Laki-Laki', '314564891531@dD', '6223135456', 'anametal223@yahoo.com', 'KOTA JAKARTA SELATAN', 'Rempoa4, BANGKA, MAMPANG PRAPATAN, KOTA JAKARTA SELATAN, DKI JAKARTA', '[]', 0, 0, '20 Oktober 2025 11:12 WIB', '1760933573709', '', 0, '{\"tglinputmili\":1760933573052,\"utmname\":\"testingutmkocak\",\"nominal\":0,\"id_trans_web\":\"\"}', '[]'),
(1043, '1760933971030', '', '624455746345614', 'Joko Tingkir', '1760832000000', 'Laki-Laki', '@Zasdasd3', '624455746345614', 'Jono2@gmail.com', 'KABUPATEN KARANGANYAR', 'Rempoa5, SURUHKALANG, JATEN, KABUPATEN KARANGANYAR, JAWA TENGAH', '[]', 0, 0, '20 Oktober 2025 11:19 WIB', '1760933971689', '', 0, '{\"tglinputmili\":1760933971030,\"utmname\":\"testingxionco\",\"nominal\":0,\"id_trans_web\":\"\"}', '[]'),
(1044, '1760934196466', '', '623242342', 'sadasd', '1760227200000', 'Laki-Laki', '@Wwqesadas4', '623242342', 'asda@yahoo.com', 'KOTA JAKARTA SELATAN', 'Rempoa6, PELA MAMPANG, MAMPANG PRAPATAN, KOTA JAKARTA SELATAN, DKI JAKARTA', '[]', 0, 0, '20 Oktober 2025 11:23 WIB', '1760934197111', '', 0, '{\"tglinputmili\":1760934196466,\"utmname\":\"testingxionco\",\"nominal\":0,\"id_trans_web\":\"\"}', '[]'),
(1045, '1760934743318', '', '6245643154', 'bijikurma', '1760832000000', 'Laki-Laki', '@Bijiasd12', '6245643154', 'tuabangka12331@yahoo.com', 'KABUPATEN BANTUL', 'Rempoa6, BANGUNTAPAN, BANGUNTAPAN, KABUPATEN BANTUL, DI YOGYAKARTA', '[]', 0, 0, '20 Oktober 2025 11:32 WIB', '1760934743975', '', 0, '{\"tglinputmili\":1760934743318,\"utmname\":\"testingxionco\",\"nominal\":0,\"id_trans_web\":\"\"}', '[]'),
(1046, '1760934940358', '', '6231234124', 'asdasd', '1759104000000', 'Perempuan', '@adfas44E', '6231234124', 'awerawe@yahoo.com', 'KABUPATEN KARANGANYAR', 'testing34, TOHUDAN, COLOMADU, KABUPATEN KARANGANYAR, JAWA TENGAH', '[]', 0, 0, '20 Oktober 2025 11:35 WIB', '1760934941004', '1792548035863', 5800, '{\"tglinputmili\":1760934940358,\"utmname\":\"testingxionco\",\"nominal\":0,\"id_trans_web\":\"\"}', '[{\"tglinputmili\":1761012035865,\"utmname\":\"testingxionco\",\"nominal\":5800,\"id_trans_web\":\"J-6231234124-1760934974433\"}]'),
(1047, '1760935551748', '', '6253456431231356', 'asndklnasnd', '1760832000000', 'Laki-Laki', 'asdas@421D', '6253456431231356', 'sadbnasjn@yahoo.com', 'KABUPATEN WONOGIRI', 'Rempoa6, GUNUNGAN, MANYARAN, KABUPATEN WONOGIRI, JAWA TENGAH', '[]', 0, 0, '20 Oktober 2025 11:45 WIB', '1760935552407', '', 0, '{\"tglinputmili\":1760935551748,\"utmname\":\"testingutmkocak\",\"nominal\":0,\"id_trans_web\":\"\"}', '[]'),
(1048, '1760935669963', '', '628569544', 'hghgvghasdvv', '1761004800000', 'Laki-Laki', '@Zidansdb 4', '628569544', 'anakmetal232@yahoo.com', 'KABUPATEN KULON PROGO', 'rempoa 8, HARGOREJO, KOKAP, KABUPATEN KULON PROGO, DI YOGYAKARTA', '[]', 0, 0, '20 Oktober 2025 11:47 WIB', '1760935670641', '', 0, '{\"tglinputmili\":1760935669963,\"utmname\":\"testingutmkocak\",\"nominal\":0,\"id_trans_web\":\"\"}', '[]'),
(1049, '1760936228358', '', '6223165432121', 'asdasdasdq24', '1760832000000', 'Laki-Laki', '@asdasb4S', '6223165432121', 'anakmetal29@yahoo.com', 'KABUPATEN KARANGANYAR', 'Rempoa24, GAUM, TASIKMADU, KABUPATEN KARANGANYAR, JAWA TENGAH, [samping warung bang ucup]', '[]', 0, 0, '20 Oktober 2025 11:57 WIB', '1760936229036', '', 0, '{\"tglinputmili\":1760936228358,\"utmname\":\"qwerty\",\"nominal\":0,\"id_trans_web\":\"\"}', '[]'),
(1050, '1760940495804', '', '6289631218212', 'JagoanNeon', '1760745600000', 'Laki-Laki', '@Jagoan123', '6289631218212', 'jagoanneon@yahoo.com', 'KABUPATEN KULON PROGO', 'Rempoa, Samping warung madura, DONOMULYO, NANGGULAN, KABUPATEN KULON PROGO, DI YOGYAKARTA', '[]', 0, 0, '20 Oktober 2025 13:08 WIB', '1760940496462', '', 0, '{\"tglinputmili\":1760940495804,\"utmname\":\"qwerty\",\"nominal\":0,\"id_trans_web\":\"\"}', '[]'),
(1051, '1760940991855', '', '628965112132132', 'asdasda', '1760832000000', 'Laki-Laki', '@Zsndaklsdn123', '628965112132132', 'Jonos@gmail.com', 'KABUPATEN KULON PROGO', 'Rempoa8, DONOMULYO, NANGGULAN, KABUPATEN KULON PROGO, DI YOGYAKARTA, Samping warung madura', '[]', 125000, 1, '20 Oktober 2025 13:16 WIB', '1760940992539', '1792477524011', 1252000, '{\"tglinputmili\":1760940991855,\"utmname\":\"qwerty\",\"nominal\":0,\"id_trans_web\":\"\"}', '[{\"tglinputmili\":1760941524013,\"utmname\":\"testingutmkocak\",\"nominal\":1252000,\"id_trans_web\":\"J-628965112132132-1760941509432\"}]'),
(1052, '1760955782091', '', '62851565575463', 'sdasdasdqe2', '1761091200000', 'Laki-Laki', 'asdas@asdasdA2', '62851565575463', 'awerawse@yahoo.com', 'KABUPATEN SIJUNJUNG', 'Jln Bayam Pondok Cabe Ilir, PEMATANG PANJANG, SIJUNJUNG, KABUPATEN SIJUNJUNG, SUMATERA BARAT', '[]', 0, 0, '', '', '', 0, '{\"tglinputmili\":1760955782091,\"utmname\":\"testingxionco\",\"nominal\":0,\"id_trans_web\":\"\"}', '[]'),
(1053, '1761015901343', '', '625378686863', 'asdasdsa', '1760918400000', 'Laki-Laki', '@sadasdnj23A', '625378686863', 'awerawes@yahoo.com', 'KABUPATEN SAROLANGUN', 'Rempoa8, TELUK RENDAH, CERMIN NAN GEDANG, KABUPATEN SAROLANGUN, JAMBI', '[]', 0, 0, '', '', '', 0, '{\"tglinputmili\":1761015901343,\"utmname\":\"testingxionco\",\"nominal\":0,\"id_trans_web\":\"\"}', '[]'),
(1054, '1761016021321', '', '6289632587411', 'Jimmy Newton', '1760918400000', 'Laki-Laki', '@Jimmy12', '6289632587411', 'Jimmy@yahoo.com', 'KOTA JAKARTA SELATAN', 'Rempoa6, TEGAL PARANG, MAMPANG PRAPATAN, KOTA JAKARTA SELATAN, DKI JAKARTA', '[]', 0, 0, '21 Oktober 2025 10:07 WIB', '1761016032903', '', 0, '{\"tglinputmili\":1761016021321,\"utmname\":\"testingxionco\",\"nominal\":0,\"id_trans_web\":\"\"}', '[]'),
(1055, '1762133864136', '', '62456786786786', 'test regex', '1659484800000', 'Laki-Laki', 'zidaneabbas19', '62456786786786', 'testregex@yahoo.com', 'KOTA JAKARTA SELATAN', 'Mauk, KEBAGUSAN, PASAR MINGGU, KOTA JAKARTA SELATAN, DKI JAKARTA', '[]', 0, 0, '', '', '', 0, '{}', '[]');

-- --------------------------------------------------------

--
-- Table structure for table `data_aturan`
--

CREATE TABLE `data_aturan` (
  `id` int(11) NOT NULL,
  `namarule` text NOT NULL,
  `value` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `data_aturan`
--

INSERT INTO `data_aturan` (`id`, `namarule`, `value`) VALUES
(1, 'pembagitotalbelanja', 1000000);

-- --------------------------------------------------------

--
-- Table structure for table `data_biayalain`
--

CREATE TABLE `data_biayalain` (
  `id` int(11) NOT NULL,
  `proteksi` int(11) NOT NULL,
  `admin` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `data_biayalain`
--

INSERT INTO `data_biayalain` (`id`, `proteksi`, `admin`) VALUES
(1, 20000, 2000);

-- --------------------------------------------------------

--
-- Table structure for table `data_deliverycharge`
--

CREATE TABLE `data_deliverycharge` (
  `id` int(11) NOT NULL,
  `lokasi` text NOT NULL,
  `value` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '{}' CHECK (json_valid(`value`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `data_deliverycharge`
--

INSERT INTO `data_deliverycharge` (`id`, `lokasi`, `value`) VALUES
(1, 'KOTA JAKARTA BARAT', '{\"small\":\"25000\",\"medium\":\"50000\",\"large\":\"75000\",\"maxcharge\":\"225000\"}'),
(2, 'KOTA JAKARTA SELATAN', '{\"small\":\"25000\",\"medium\":\"50000\",\"large\":\"75000\",\"maxcharge\":\"225000\"}'),
(3, 'KOTA TANGERANG SELATAN', '{\"small\":\"25000\",\"medium\":\"50000\",\"large\":\"75000\",\"maxcharge\":\"225000\"}'),
(4, 'KOTA JAKARTA PUSAT', '{\"small\":\"50000\",\"medium\":\"75000\",\"large\":\"100000\",\"maxcharge\":\"275000\"}'),
(5, 'KOTA JAKARTA TIMUR', '{\"small\":\"50000\",\"medium\":\"75000\",\"large\":\"100000\",\"maxcharge\":\"275000\"}'),
(6, 'KOTA JAKARTA UTARA', '{\"small\":\"50000\",\"medium\":\"75000\",\"large\":\"100000\",\"maxcharge\":\"275000\"}'),
(7, 'KOTA DEPOK', '{\"small\":\"75000\",\"medium\":\"100000\",\"large\":\"150000\",\"maxcharge\":\"375000\"}'),
(8, 'KOTA BOGOR', '{\"small\":\"75000\",\"medium\":\"100000\",\"large\":\"150000\",\"maxcharge\":\"375000\"}'),
(9, 'KOTA TANGERANG', '{\"small\":\"75000\",\"medium\":\"100000\",\"large\":\"150000\",\"maxcharge\":\"375000\"}'),
(10, 'KOTA BEKASI', '{\"small\":\"75000\",\"medium\":\"100000\",\"large\":\"150000\",\"maxcharge\":\"375000\"}'),
(11, 'KABUPATEN BEKASI', '{\"small\":\"75000\",\"medium\":\"100000\",\"large\":\"150000\",\"maxcharge\":\"375000\"}'),
(12, 'KABUPATEN BOGOR', '{\"small\":\"75000\",\"medium\":\"100000\",\"large\":\"150000\",\"maxcharge\":\"375000\"}'),
(13, 'KABUPATEN TANGERANG', '{\"small\":\"75000\",\"medium\":\"100000\",\"large\":\"150000\",\"maxcharge\":\"375000\"}');

-- --------------------------------------------------------

--
-- Table structure for table `data_eventpage`
--

CREATE TABLE `data_eventpage` (
  `id` int(11) NOT NULL,
  `eventlogo` text NOT NULL,
  `eventbackground` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `data_eventpage`
--

INSERT INTO `data_eventpage` (`id`, `eventlogo`, `eventbackground`) VALUES
(1, '/assets/eventpage/eventlogo.png', '/assets/eventpage/backgroundimage.png');

-- --------------------------------------------------------

--
-- Table structure for table `data_exchangepoint`
--

CREATE TABLE `data_exchangepoint` (
  `id` int(11) NOT NULL,
  `tglinputmili` text NOT NULL,
  `namaitem` text NOT NULL,
  `minpoint` int(11) NOT NULL,
  `image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `data_exchangepoint`
--

INSERT INTO `data_exchangepoint` (`id`, `tglinputmili`, `namaitem`, `minpoint`, `image`) VALUES
(1, '1754987451172', 'Gelas', 5, '/assets/exchangeimage/gelas.png'),
(2, '1754988323525', 'Pillow', 5, '/assets/exchangeimage/pillow.png'),
(3, '1754988356461', 'Water Bottle', 5, '/assets/exchangeimage/water-bottle.png'),
(4, '1754988383539', 'Hanger', 5, '/assets/exchangeimage/hanger.png'),
(5, '1754988539444', 'Dessert Bowl', 5, '/assets/exchangeimage/dessert-bowl.png'),
(6, '1754988561086', 'Trash Bin2', 5, '/assets/exchangeimage/trash-bin2.png'),
(7, '1754988621277', 'Vazra Baterai AAA', 11, '/assets/exchangeimage/vazra-baterai-aaa.png');

-- --------------------------------------------------------

--
-- Table structure for table `data_flashsale`
--

CREATE TABLE `data_flashsale` (
  `id` int(11) NOT NULL,
  `produkid` text NOT NULL,
  `variantindex` text NOT NULL,
  `subvariantindex` text NOT NULL,
  `persen` decimal(10,0) NOT NULL,
  `tglmili_start` text NOT NULL,
  `tglmili_end` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `data_flashsale`
--

INSERT INTO `data_flashsale` (`id`, `produkid`, `variantindex`, `subvariantindex`, `persen`, `tglmili_start`, `tglmili_end`) VALUES
(26, '17', '', '', 15, '1756203420000', '1756635420000'),
(27, '17', '', '', 10, '1756965600000', '1756969200000'),
(28, '17', '', '', 10, '1756976400000', '1756980000000'),
(29, '17', '', '', 10, '1756987200000', '1756990800000'),
(30, '17', '', '', 10, '1757052000000', '1757055600000'),
(31, '17', '', '', 10, '1757062800000', '1757066400000'),
(32, '17', '', '', 10, '1757073600000', '1757077200000'),
(33, '17', '', '', 10, '1757138400000', '1757142000000'),
(34, '17', '', '', 10, '1757149200000', '1757152800000'),
(35, '17', '', '', 10, '1757160000000', '1757163600000'),
(36, '17', '', '', 10, '1757224800000', '1757228400000'),
(37, '17', '', '', 10, '1757235600000', '1757239200000'),
(38, '17', '', '', 10, '1757246400000', '1757250000000'),
(41, '136', '', '', 10, '1756369860000', '1756470660000'),
(43, '17', '', '', 10, '1759829400000', '1759833000000'),
(45, '17', '', '', 10, '1759480200000', '1759487400000'),
(46, '27', '0', '', 10, '1759480080000', '1759487160000'),
(47, '32', '0', '', 10, '1759542180000', '1759542600000'),
(53, '30', '', '', 3, '1759895100000', '1759981500000'),
(55, '17', '0', '', 10, '1759917480000', '1759917720000'),
(56, '25', '2', '', 2, '1759985460000', '1759986000000'),
(57, '17', '0', '', 10, '1759989660000', '1759990500000'),
(58, '17', '0', '', 10, '1759995540000', '1760081940000'),
(59, '146', '', '', 27, '1759996260000', '1760082660000'),
(60, '146', '', '', 27, '1760087580000', '1760098620000'),
(62, '26', '1', '', 10, '1760515020000', '1760774220000'),
(63, '22', '', '', 10, '1761292800000', '1761303300000'),
(64, '24', '', '', 10, '1761293940000', '1761299700000'),
(65, '24', '', '', 10, '1761293040000', '1761296520000'),
(66, '78', '', '', 10, '1761370560000', '1761381360000'),
(69, '27', '1', '', 20, '1762145640000', '1762160040000');

-- --------------------------------------------------------

--
-- Table structure for table `data_game`
--

CREATE TABLE `data_game` (
  `id` int(11) NOT NULL,
  `namagame` text NOT NULL,
  `pointsetting` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `data_game`
--

INSERT INTO `data_game` (`id`, `namagame`, `pointsetting`) VALUES
(1, 'fortune wheel', 5);

-- --------------------------------------------------------

--
-- Table structure for table `data_label`
--

CREATE TABLE `data_label` (
  `id` int(11) NOT NULL,
  `labelname` text NOT NULL,
  `label_color` varchar(10) NOT NULL,
  `list_idproduct` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '[]',
  `tglmili_start` text NOT NULL,
  `tglmili_end` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `data_label`
--

INSERT INTO `data_label` (`id`, `labelname`, `label_color`, `list_idproduct`, `tglmili_start`, `tglmili_end`) VALUES
(12, 'xionco label warna', '#B5AFAB', '[22]', '1761984900000', '1761985140000'),
(13, 'test label warna', '#000000', '[25]', '1761986940000', '1764406140000'),
(14, 'test label warna produk', '#FFD900', '[26,88]', '1761989220000', '1764408420000'),
(15, 'label warna lagi', '#BD2600', '[73]', '1761990240000', '1764063840000'),
(17, 'TESTING LABEL XIONCO LAGI TAPI SEKARANG LABEL PANJANG', '#303030', '[55]', '1762135860000', '1762146120000'),
(18, 'test label product lagi', '#0007E0', '[28]', '1762143300000', '1762164900000');

-- --------------------------------------------------------

--
-- Table structure for table `data_probability_wheel`
--

CREATE TABLE `data_probability_wheel` (
  `id` int(11) NOT NULL,
  `item` text NOT NULL,
  `value` decimal(30,16) NOT NULL,
  `image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `data_probability_wheel`
--

INSERT INTO `data_probability_wheel` (`id`, `item`, `value`, `image`) VALUES
(1, 'Hanger', 0.3000000000000000, '');

-- --------------------------------------------------------

--
-- Table structure for table `data_promo_link`
--

CREATE TABLE `data_promo_link` (
  `id` int(11) NOT NULL,
  `promoname` text NOT NULL,
  `link_img` text NOT NULL,
  `expired_mili` text NOT NULL,
  `link_click` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `data_promo_link`
--

INSERT INTO `data_promo_link` (`id`, `promoname`, `link_img`, `expired_mili`, `link_click`) VALUES
(1, 'promokiri', '/assets/imagepromo/bigbanner.png', '1765472400000', 'http://localhost:3000/promo'),
(2, 'promokanan', '/assets/imagepromo/smallbanner.png', '1765472400000', '/spin-wheel');

-- --------------------------------------------------------

--
-- Table structure for table `data_simpanxpuses`
--

CREATE TABLE `data_simpanxpuses` (
  `id` int(11) NOT NULL,
  `tglinputmili` text NOT NULL,
  `id_trans_sementara` text NOT NULL,
  `userid` int(11) NOT NULL,
  `xp_uses` int(11) NOT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `data_simpanxpuses`
--

INSERT INTO `data_simpanxpuses` (`id`, `tglinputmili`, `id_trans_sementara`, `userid`, `xp_uses`, `status`) VALUES
(1, '1755915967156', 'H-62895358976565-1755915966455', 1007, 150000, 'settlement'),
(2, '1755916092855', 'H-62895358976565-1755916092145', 1007, 0, ''),
(3, '1755916192281', 'H-62895358976565-1755916191595', 1007, 0, ''),
(4, '1755916523166', 'H-62895358976565-1755916522486', 1007, 500000, 'expire'),
(5, '1755918610546', 'H-62895358976565-1755918609705', 1007, 500000, 'settlement'),
(6, '1755918709035', 'H-62895358976565-1755918708223', 1007, 50000, 'settlement'),
(7, '1755934562716', 'H-62895358976565-1755934561594', 1007, 1100000, 'settlement'),
(8, '1755935092417', 'H-62895358976565-1755935091187', 1007, 1000000, 'expire'),
(9, '1755935696616', 'H-62895358976565-1755935695359', 1007, 50000, 'expire'),
(10, '1755938637174', 'H-62895358976565-1755938636014', 1007, 1001000, ''),
(11, '1755938918433', 'H-62895358976565-1755938917103', 1007, 99000, ''),
(12, '1755939549662', 'H-62895358976565-1755939548239', 1007, 50000, ''),
(13, '1755940437028', 'H-62895358976565-1755940435595', 1007, 955300, ''),
(14, '1756185016787', 'H-6289654786299-1756185015698', 1006, 100000, ''),
(15, '1756275964979', 'H-62895358976565-1756275963952', 1007, 114000, ''),
(16, '1756276036808', 'H-62895358976565-1756276035724', 1007, 114000, ''),
(17, '1756276161372', 'H-62895358976565-1756276160329', 1007, 114000, ''),
(18, '1756276181733', 'H-62895358976565-1756276180659', 1007, 114000, ''),
(19, '1756276228549', 'H-62895358976565-1756276227472', 1007, 114000, ''),
(20, '1756276354726', 'H-62895358976565-1756276353442', 1007, 1830000, ''),
(21, '1758171581055', 'I-6289654786299-1758171581093', 1006, 1243300, 'settlement'),
(22, '1759976533364', 'J-62895358976566-1759976530553', 1008, 1, ''),
(23, '1759977023901', 'J-62895358976566-1759977023282', 1008, 438701, ''),
(24, '1759977085892', 'J-62895358976566-1759977084833', 1008, 438701, ''),
(25, '1759984358039', 'J-6289654786299-1759984357490', 1006, 300000, 'settlement'),
(26, '1760005681288', 'J-62895358976566-1760005679286', 1008, 789662, 'settlement'),
(27, '1760005976251', 'J-62895358976566-1760005974263', 1008, 500000, 'settlement'),
(28, '1760760528046', 'J-6289654786299-1760760525056', 1006, 394832, ''),
(29, '1760941558798', 'J-62895358976565-1760941558041', 1007, 11900, ''),
(30, '1761370792495', 'J-62895358976565-1761370788551', 1007, 988100, 'settlement');

-- --------------------------------------------------------

--
-- Table structure for table `data_voucher`
--

CREATE TABLE `data_voucher` (
  `id` int(11) NOT NULL,
  `tglinputmili` text NOT NULL,
  `img_voucher` text NOT NULL,
  `name` text NOT NULL,
  `type` text NOT NULL,
  `mainorsub` text NOT NULL,
  `min_trans` int(11) NOT NULL,
  `max_payout` int(11) NOT NULL,
  `diskon_type` text NOT NULL,
  `disc` decimal(10,2) NOT NULL,
  `expired` text NOT NULL,
  `statusvoucher` text NOT NULL,
  `listproduct` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`listproduct`)),
  `kodevoucher` text NOT NULL,
  `statusdisplay` text NOT NULL,
  `item_kecuali` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '[]'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `data_voucher`
--

INSERT INTO `data_voucher` (`id`, `tglinputmili`, `img_voucher`, `name`, `type`, `mainorsub`, `min_trans`, `max_payout`, `diskon_type`, `disc`, `expired`, `statusvoucher`, `listproduct`, `kodevoucher`, `statusdisplay`, `item_kecuali`) VALUES
(1005, '1755911703605', '/assets/imagevoucher/cashbacktest.png?v=1755911703605', 'cashbacktest', 'CASHBACK', 'main', 100000, 100000, 'Rupiah', 50000.00, '1755993600000', 'ACTIVE', '[]', 'cashbacktest', '', '[]'),
(1006, '1755914155462', '/assets/imagevoucher/vocer.png?v=1755914155462', 'vocer', 'VOUCHER', 'main', 100, 100000, 'Persen', 15.00, '1755993600000', 'ACTIVE', '[]', 'testvocer', 'HIDE', '[]'),
(1007, '1755914253861', '/assets/imagevoucher/diskon.png?v=1755914253861', 'diskon', 'DISCOUNT', 'main', 100, 100000, 'Rupiah', 15000.00, '1755993600000', 'ACTIVE', '[]', 'diskon', '', '[]'),
(1008, '1755920622437', '/assets/imagevoucher/esfsedf.png?v=1755920622437', 'esfsedf', 'ADMIN', 'sub', 10000, 10000000, 'Rupiah', 10000000.00, '1756512000000', 'INACTIVE', '[]', 'dsfdsfsdf', '', '[]'),
(1009, '1755920796519', '/assets/imagevoucher/voceradmin.png?v=1755920796519', 'VOCERADMIN', 'ADMIN', 'sub', 100000, 300000, 'Persen', 10.00, '1756512000000', 'ACTIVE', '[]', 'VOCERADMIN', '', '[]'),
(1010, '1755924345406', '/assets/imagevoucher/cashback-enak.png?v=1755924345406', 'cashback enak', 'CASHBACK', 'main', 1000, 1200000, 'Persen', 30.00, '1756512000000', 'ACTIVE', '[]', 'enakcashback', '', '[]'),
(1011, '1755924389573', '/assets/imagevoucher/cashback-jumbo.png?v=1755924389573', 'cashback jumbo', 'CASHBACK', 'main', 0, 100000, 'Rupiah', 100000.00, '1755993600000', 'ACTIVE', '[]', 'cashbackjumbo', '', '[]'),
(1012, '1755932075837', '/assets/imagevoucher/testcash.png?v=1755932075837', 'testcash', 'CASHBACK', 'main', 0, 100000, 'Rupiah', 1000000.00, '1755993600000', 'ACTIVE', '[]', 'testcash', '', '[]'),
(1013, '1755937151607', '/assets/imagevoucher/testrupiah.png?v=1755937151607', 'testrupiah', 'VOUCHER', 'main', 0, 100000, 'Rupiah', 500000.00, '1756512000000', 'ACTIVE', '[]', 'testrupiah', '', '[]'),
(1015, '1756092843853', '/assets/imagevoucher/kecuali.png?v=1756092843853', 'kecuali', 'CASHBACK', 'main', 100000, 100000, 'Rupiah', 100000.00, '1756166400000', 'ACTIVE', '[]', '1234', '', '[{\"idproduk\":17,\"namaproduk\":\"GUISE SERIES | Kyrios • Sofa Minimalis 3 dudukan\"}]'),
(1016, '1756093292200', '/assets/imagevoucher/testaku.png?v=1756093292200', 'testaku', 'VOUCHER', 'main', 0, 100000, 'Rupiah', 60000.00, '1756166400000', 'ACTIVE', '[]', 'testaku', '', '[{\"idproduk\":17,\"namaproduk\":\"GUISE SERIES | Kyrios • Sofa Minimalis 3 dudukan\"}]'),
(1019, '1756104447900', '/assets/imagevoucher/kecuali111.png?v=1756104447900', 'kecuali111', 'CASHBACK', 'main', 1111, 1111, 'Persen', 1.00, '1756080000000', 'ACTIVE', '[]', '111', 'HIDE', '[]'),
(1021, '1756180409468', '/assets/imagevoucher/refhammam.png?v=1756180409468', 'ref_hammam', 'REFERAL', 'main', 0, 0, 'Rupiah', 0.00, '1756512000000', 'ACTIVE', '[]', 'ham1234', 'UNHIDE', '[]'),
(1022, '1756192665802', '/assets/imagevoucher/222.png?v=1756192665802', '222', 'VOUCHER', 'main', 1, 10000, 'Rupiah', 1000.00, '1756339200000', 'ACTIVE', '[]', '222', 'HIDE', '[]'),
(1023, '1756193038093', '/assets/imagevoucher/333.png?v=1756193038093', '333', 'DISCOUNT', 'main', 1, 1000, 'Persen', 30.00, '1756425600000', 'ACTIVE', '[]', '333', 'HIDE', '[]'),
(1024, '1756193074726', '/assets/imagevoucher/444.png?v=1756193074726', '444', 'DELIVERY', 'sub', 1, 30000, 'Persen', 1.00, '1756339200000', 'ACTIVE', '[]', '444', 'HIDE', '[]'),
(1042, '1759906988213', '/assets/imagevoucher/cashback.png?v=1759906988213', 'cashback', 'CASHBACK', 'main', 1, 1000000, 'Persen', 12.00, '1760659200000', 'ACTIVE', '[]', 'cashback', '', '[]'),
(1043, '1759907054355', '/assets/imagevoucher/discount.png?v=1759907054355', 'discount', 'DISCOUNT', 'main', 1, 1000000, 'Rupiah', 1000000.00, '1760659200000', 'ACTIVE', '[]', 'discount', '', '[]'),
(1045, '1759907126128', '/assets/imagevoucher/voucher.png?v=1759907126128', 'voucher', 'VOUCHER', 'main', 1, 1000000, 'Rupiah', 1000.00, '1760659200000', 'ACTIVE', '[]', 'voucher', '', '[]'),
(1047, '1759907213156', '/assets/imagevoucher/admin.png?v=1759907213156', 'admin', 'ADMIN', 'sub', 1, 100000, 'Rupiah', 10000.00, '1760659200000', 'ACTIVE', '[]', 'admin', '', '[]'),
(1048, '1759907510120', '/assets/imagevoucher/admin1.png?v=1759907510120', 'admin1', 'ADMIN', 'sub', 1, 1000, 'Rupiah', 10000.00, '1760659200000', 'ACTIVE', '[]', 'admin1', '', '[]'),
(1049, '1759907572172', '/assets/imagevoucher/delivery.png?v=1759907572172', 'delivery', 'DELIVERY', 'sub', 1, 1000000, 'Persen', 20.00, '1760659200000', 'ACTIVE', '[]', 'delivery', '', '[]'),
(1050, '1759907626139', '/assets/imagevoucher/delivery1.png?v=1759907626139', 'delivery1', 'DELIVERY', 'sub', 1, 100000, 'Persen', 12.00, '1760659200000', 'ACTIVE', '[]', 'delivery1', '', '[]'),
(1051, '1760085481649', '/assets/imagevoucher/testadmin.png?v=1760085481649', 'testadmin', 'ADMIN', 'sub', 1, 2000, 'Rupiah', 2000.00, '1761264000000', 'ACTIVE', '[]', 'testadmin', '', '[]'),
(1053, '1760085661916', '/assets/imagevoucher/testanjay.png?v=1760085661916', 'testanjay', 'VOUCHER', 'main', 1, 100000000, 'Persen', 99.90, '1761264000000', 'ACTIVE', '[]', 'testanjay', '', '[]'),
(1055, '1760154401111', '/assets/imagevoucher/testvoucher123.png?v=1760154401111', 'testvoucher123', 'CASHBACK', 'main', 2000, 20000, 'Persen', 10.00, '1760227200000', 'ACTIVE', '[]', 'test1234%', 'HIDE', '[]'),
(1056, '1760176164129', '/assets/imagevoucher/12345.png?v=1760176164129', '12345', 'CASHBACK', 'main', 1, 300000, 'Persen', 300000.00, '1761350400000', 'ACTIVE', '[]', '12345', '', '[]'),
(1057, '1760319091032', '/assets/imagevoucher/cashback10.png?v=1760319091032', 'cashback10%', 'CASHBACK', 'main', 20000, 500000, 'Persen', 10.00, '1761868800000', 'ACTIVE', '[]', 'cashback10', 'UNHIDE', '[]'),
(1058, '1760585089988', '/assets/imagevoucher/test-123.png?v=1760585089988', 'test 123', 'DISCOUNT', 'main', 0, 300000, 'Rupiah', 150000.00, '1760572800000', 'ACTIVE', '[]', 'awawaa', '', '[]'),
(1060, '1760951231956', '/assets/imagevoucher/testdelivery.png?v=1760951231956', 'testdelivery', 'DELIVERY', 'sub', 2000, 20000, 'Persen', 10.00, '1761868800000', 'ACTIVE', '[]', 'delivery123', 'UNHIDE', '[]'),
(1061, '1761370462434', '/assets/imagevoucher/baba.png?v=1761370462434', 'baba', 'DISCOUNT', 'main', 1, 300000, 'Persen', 40.00, '1761523200000', 'ACTIVE', '[]', 'baba', '', '[]'),
(1062, '1761374953322', '/assets/imagevoucher/admintest.png?v=1761374953322', 'admintest', 'ADMIN', 'sub', 2000, 1000, 'Persen', 10.00, '1761523200000', 'ACTIVE', '[]', 'admintest', '', '[]'),
(1063, '1761529943240', '/assets/imagevoucher/voucheradmin.png?v=1761529943240', 'voucheradmin', 'ADMIN', 'sub', 2000, 2000, 'Persen', 5.00, '1762560000000', 'ACTIVE', '[]', 'voucheradmin', 'UNHIDE', '[]'),
(1064, '1761643546803', '/assets/imagevoucher/adminutm.png?v=1761643546803', 'adminutm', 'ADMIN', 'sub', 2000, 15000, 'Persen', 10.00, '1761868800000', 'ACTIVE', '[]', 'adminutm', '', '[]');

-- --------------------------------------------------------

--
-- Table structure for table `reward_exchangepoint`
--

CREATE TABLE `reward_exchangepoint` (
  `id` int(11) NOT NULL,
  `tglinputmili` text NOT NULL,
  `userid` text NOT NULL,
  `hadiah` text NOT NULL,
  `tglkirimmili` text NOT NULL,
  `dikirim` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reward_exchangepoint`
--

INSERT INTO `reward_exchangepoint` (`id`, `tglinputmili`, `userid`, `hadiah`, `tglkirimmili`, `dikirim`) VALUES
(1, '1755077904587', '1008', 'Gelas', '', ''),
(2, '1755077940170', '1008', 'Pillow', '', ''),
(3, '1755146830761', '1008', 'Water Bottle', '', ''),
(4, '1755147021283', '1008', 'Trash Bin2', '', ''),
(5, '1755165756534', '1007', 'Vazra Baterai AAA', '1755242027315', 'Terkirim'),
(6, '1755227989023', '1008', 'Pillow', '1755241815300', 'Terkirim'),
(7, '1755502963675', '1008', 'Gelas', '', ''),
(8, '1755850063309', '1008', 'Water Bottle', '1755940948780', 'Terkirim'),
(9, '1756715138292', '1007', 'Vazra Baterai AAA', '1759390684822', 'Terkirim'),
(10, '1756715149611', '1007', 'Gelas', '1759130673065', 'Terkirim');

-- --------------------------------------------------------

--
-- Table structure for table `riwayat_edit`
--

CREATE TABLE `riwayat_edit` (
  `id` int(11) NOT NULL,
  `tglinputmili` text NOT NULL,
  `userHIG` text NOT NULL,
  `namalengkap` text NOT NULL,
  `tindakan` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `riwayat_tukarpoint`
--

CREATE TABLE `riwayat_tukarpoint` (
  `id` int(11) NOT NULL,
  `tglinputmili` text NOT NULL,
  `userid` text NOT NULL,
  `pointused` int(11) NOT NULL,
  `keterangan` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `riwayat_tukarpoint`
--

INSERT INTO `riwayat_tukarpoint` (`id`, `tglinputmili`, `userid`, `pointused`, `keterangan`) VALUES
(73, '1755579028420', '1007', 10, 'Reward point dari pembelian '),
(74, '1755579153587', '1007', 5, 'putar wheel fortune'),
(75, '1755579204017', '1007', 0, 'Reward point dari pembelian '),
(76, '1755579677391', '1007', 7, 'Reward point dari pembelian '),
(77, '1755590509788', '1006', 1, 'Reward point dari pembelian '),
(78, '1755749346589', '1006', 1, 'Reward point dari pembelian '),
(79, '1755761064089', '1007', 1, 'Reward point dari pembelian '),
(80, '1755762720627', '1007', 5, 'putar wheel fortune'),
(81, '1755768456384', '1007', 1, 'Reward point dari pembelian '),
(82, '1755849978857', '1008', 5, 'putar wheel fortune'),
(83, '1755850063314', '1008', 5, 'exchange item Water Bottle'),
(84, '1755912020561', '1007', 1, 'Reward point dari pembelian Order ID H-62895358976565-1755911989112'),
(85, '1755912293099', '1007', 4, 'Reward point dari pembelian Order ID H-62895358976565-1755912168851'),
(86, '1755912506216', '1007', 2, 'Reward point dari pembelian Order ID H-62895358976565-1755912491203'),
(87, '1755912684553', '1007', 5, 'Reward point dari pembelian Order ID H-62895358976565-1755912673121'),
(88, '1755912782754', '1007', 5, 'Reward point dari pembelian Order ID H-62895358976565-1755912772370'),
(89, '1755912826640', '1007', 1, 'Reward point dari pembelian Order ID H-62895358976565-1755912818669'),
(90, '1755912887996', '1007', 3, 'Reward point dari pembelian Order ID H-62895358976565-1755912877973'),
(91, '1755915976792', '1007', 1, 'Reward point dari pembelian Order ID H-62895358976565-1755915966455'),
(92, '1755916032859', '1007', 1, 'Reward point dari pembelian Order ID H-62895358976565-1755916023340'),
(93, '1755918626616', '1007', 2, 'Reward point dari pembelian Order ID H-62895358976565-1755918609705'),
(94, '1755934481515', '1007', 1, 'Reward point dari pembelian Order ID H-62895358976565-1755934458534'),
(95, '1755934573411', '1007', 6, 'Reward point dari pembelian Order ID H-62895358976565-1755934561594'),
(96, '1755935629326', '1007', 1, 'Reward point dari pembelian Order ID H-62895358976565-1755935608123'),
(97, '1755936272488', '1007', 1, 'Reward point dari pembelian Order ID H-62895358976565-1755936260172'),
(98, '1755939383393', '1007', 3, 'Reward point dari pembelian Order ID H-62895358976565-1755939365106'),
(99, '1755939913006', '1007', 2, 'Reward point dari pembelian Order ID H-62895358976565-1755939896767'),
(100, '1756105182861', '1008', 123, 'putar wheel fortune'),
(101, '1756112338386', '1008', 118, 'Reward point dari pembelian Order ID H-62895358976566-1756112312113'),
(102, '1756183175270', '1006', 5, 'putar wheel fortune'),
(103, '1756183684718', '1006', 5, 'putar wheel fortune'),
(104, '1756185230000', '1006', 5, 'putar wheel fortune'),
(105, '1756264787496', '1007', 9, 'Reward point dari pembelian Order ID H-62895358976565-1756264751960'),
(106, '1756265393475', '1007', 44, 'Reward point dari pembelian Order ID H-62895358976565-1756265382522'),
(107, '1756277593318', '1007', 5, 'putar wheel fortune'),
(108, '1756450986334', '1006', 5, 'putar wheel fortune'),
(109, '1756450991193', '1006', 5, 'putar wheel fortune'),
(110, '1756450998597', '1006', 5, 'putar wheel fortune'),
(111, '1756451004914', '1006', 5, 'putar wheel fortune'),
(112, '1756451012037', '1006', 5, 'putar wheel fortune'),
(113, '1756451020030', '1006', 5, 'putar wheel fortune'),
(114, '1756451026193', '1006', 5, 'putar wheel fortune'),
(115, '1756451032228', '1006', 5, 'putar wheel fortune'),
(116, '1756451039965', '1006', 5, 'putar wheel fortune'),
(117, '1756451046405', '1006', 5, 'putar wheel fortune'),
(118, '1756451052644', '1006', 5, 'putar wheel fortune'),
(119, '1756451058920', '1006', 5, 'putar wheel fortune'),
(120, '1756451065279', '1006', 5, 'putar wheel fortune'),
(121, '1756451071140', '1006', 5, 'putar wheel fortune'),
(122, '1756451077526', '1006', 5, 'putar wheel fortune'),
(123, '1756451084085', '1006', 5, 'putar wheel fortune'),
(124, '1756451090279', '1006', 5, 'putar wheel fortune'),
(125, '1756451096264', '1006', 5, 'putar wheel fortune'),
(126, '1756451104177', '1006', 5, 'putar wheel fortune'),
(127, '1756451110210', '1006', 5, 'putar wheel fortune'),
(128, '1756689982372', '1007', 5, 'putar wheel fortune'),
(129, '1756715138295', '1007', 10, 'exchange item Vazra Baterai AAA'),
(130, '1756715149615', '1007', 5, 'exchange item Gelas'),
(131, '1757302505480', '1006', 1, 'Reward point dari pembelian Order ID I-6289654786299-1757302480814'),
(132, '1757561826493', '1006', 2, 'Reward point dari pembelian Order ID I-6289654786299-1757561781793'),
(133, '1757561947014', '1006', 1, 'Reward point dari pembelian Order ID I-6289654786299-1757561889183'),
(134, '1757736217271', '1006', 2, 'Reward point dari pembelian Order ID I-6289654786299-1757736205882'),
(135, '1757736401600', '1006', 3, 'Reward point dari pembelian Order ID I-6289654786299-1757735965655'),
(136, '1757736791918', '1006', 1, 'Reward point dari pembelian Order ID I-6289654786299-1757736779379'),
(137, '1757745214306', '1006', 1, 'Reward point dari pembelian Order ID I-6289654786299-1757745192675'),
(138, '1757745556558', '1006', 3, 'Reward point dari pembelian Order ID I-6289654786299-1757745528388'),
(139, '1758179336069', '1006', 2, 'Reward point dari pembelian Order ID I-6289654786299-1758179305943'),
(140, '1758248562456', '1006', 1, 'Reward point dari pembelian Order ID I-6289654786299-1758244938245'),
(141, '1758249035976', '1006', 7, 'Reward point dari pembelian Order ID I-6289654786299-1758245413962'),
(142, '1758251454031', '1006', 1, 'Reward point dari pembelian Order ID I-6289654786299-1758247829836'),
(143, '1758255194708', '1006', 3, 'Reward point dari pembelian Order ID I-6289654786299-1758251574831'),
(144, '1758255255497', '1006', 3, 'Reward point dari pembelian Order ID I-6289654786299-1758251634278'),
(145, '1758255314452', '1006', 1, 'Reward point dari pembelian Order ID I-6289654786299-1758251696521'),
(146, '1758510480285', '1006', 4, 'Reward point dari pembelian Order ID I-6289654786299-1758510467414'),
(147, '1758521043950', '1006', 4, 'Reward point dari pembelian Order ID I-6289654786299-1758521023785'),
(148, '1758521118229', '1006', 5, 'putar wheel fortune'),
(149, '1758521153392', '1006', 1, 'Reward point dari pembelian Order ID I-6289654786299-1758521136518'),
(150, '1758521231458', '1006', 2, 'Reward point dari pembelian Order ID I-6289654786299-1758521214846'),
(151, '1758602070429', '1005', 1, 'Reward point dari pembelian Order ID I-6285876249492-1758601685228'),
(152, '1758946924153', '1007', 4, 'Reward point dari pembelian Order ID I-62895358976565-1758946598833'),
(153, '1759390026636', '1006', 1, 'Reward point dari pembelian Order ID I-6289654786299-1758171581093'),
(154, '1759390039268', '1006', 1, 'Reward point dari pembelian Order ID I-6289654786299-1757925400742'),
(155, '1759543770813', '1006', 5, 'putar wheel fortune'),
(156, '1759543778660', '1006', 5, 'putar wheel fortune'),
(157, '1759543808235', '1006', 5, 'putar wheel fortune'),
(158, '1759543837880', '1006', 5, 'putar wheel fortune'),
(159, '1759543861640', '1006', 5, 'putar wheel fortune'),
(160, '1759543942366', '1006', 5, 'putar wheel fortune'),
(161, '1759543948635', '1006', 5, 'putar wheel fortune'),
(162, '1759544023877', '1006', 5, 'putar wheel fortune'),
(163, '1759544034970', '1006', 5, 'putar wheel fortune'),
(164, '1759544244663', '1006', 5, 'putar wheel fortune'),
(165, '1759544251839', '1006', 5, 'putar wheel fortune'),
(166, '1759544537339', '1006', 5, 'putar wheel fortune'),
(167, '1759544545002', '1006', 5, 'putar wheel fortune'),
(168, '1759544685805', '1006', 5, 'putar wheel fortune'),
(169, '1759544694648', '1006', 5, 'putar wheel fortune'),
(170, '1759714432630', '1006', 44, 'Reward point dari pembelian Order ID J-6289654786299-1759714326873'),
(171, '1759726315782', '1006', 3, 'Reward point dari pembelian Order ID J-6289654786299-1759725916591'),
(172, '1759736862412', '1006', 1, 'Reward point dari pembelian Order ID J-6289654786299-1759736850679'),
(173, '1759739213786', '1006', 6, 'Reward point dari pembelian Order ID J-6289654786299-1759739199043'),
(174, '1759913559843', '1008', 1, 'Reward point dari pembelian Order ID J-62895358976566-1759913512009'),
(175, '1759914092478', '1008', 1, 'Reward point dari pembelian Order ID J-62895358976566-1759914028904'),
(176, '1759915072620', '1008', 3, 'Reward point dari pembelian Order ID J-62895358976566-1759915025891'),
(177, '1759984441589', '1006', 2, 'Reward point dari pembelian Order ID J-6289654786299-1759984357490'),
(178, '1759989879886', '1006', 5, 'putar wheel fortune'),
(179, '1759989887165', '1006', 5, 'putar wheel fortune'),
(180, '1759989891993', '1006', 5, 'putar wheel fortune'),
(181, '1759990003493', '1006', 5, 'putar wheel fortune'),
(182, '1759990021081', '1006', 5, 'putar wheel fortune'),
(183, '1759990393841', '1006', 3, 'Reward point dari pembelian Order ID J-6289654786299-1759990377510'),
(184, '1760003673118', '1008', 3, 'Reward point dari pembelian Order ID J-62895358976566-1760003608561'),
(185, '1760003792506', '1008', 3, 'Reward point dari pembelian Order ID J-62895358976566-1760003773794'),
(186, '1760004135846', '1008', 2, 'Reward point dari pembelian Order ID J-62895358976566-1760004121120'),
(187, '1760004225967', '1008', 5, 'Reward point dari pembelian Order ID J-62895358976566-1760004202785'),
(188, '1760004600184', '1008', 5, 'Reward point dari pembelian Order ID J-62895358976566-1760004578012'),
(189, '1760005696472', '1008', 5, 'Reward point dari pembelian Order ID J-62895358976566-1760005679286'),
(190, '1760005990492', '1008', 5, 'Reward point dari pembelian Order ID J-62895358976566-1760005974263'),
(191, '1760085730633', '1006', 3, 'Reward point dari pembelian Order ID J-6289654786299-1760085712970'),
(192, '1760151239892', '1008', 5, 'Reward point dari pembelian Order ID J-62895358976566-1760151217725'),
(193, '1760153058211', '1008', 1, 'Reward point dari pembelian Order ID J-62895358976566-1760153028437'),
(194, '1760154154587', '1008', 4, 'Reward point dari pembelian Order ID J-62895358976566-1760154135083'),
(195, '1760169949187', '1006', 14, 'Reward point dari pembelian Order ID J-6289654786299-1760167564167'),
(196, '1760340839739', '1006', 5, 'putar wheel fortune'),
(197, '1760340846626', '1006', 5, 'putar wheel fortune'),
(198, '1760340853349', '1006', 5, 'putar wheel fortune'),
(199, '1760348396731', '1006', 5, 'putar wheel fortune'),
(200, '1760941524016', '1051', 1, 'Reward point dari pembelian Order ID J-628965112132132-1760941509432'),
(201, '1760942304963', '1006', 3, 'Reward point dari pembelian Order ID J-6289654786299-1760942292361'),
(202, '1761016248780', '1006', 3, 'Reward point dari pembelian Order ID J-6289654786299-1760943288517'),
(203, '1761308486277', '1006', 3, 'Reward point dari pembelian Order ID J-6289654786299-1761308246347'),
(204, '1761308498742', '1006', 1, 'Reward point dari pembelian Order ID J-6289654786299-1761308472629'),
(205, '1761370527110', '1007', 4, 'Reward point dari pembelian Order ID J-62895358976565-1761370505569'),
(206, '1761370659969', '1007', 5, 'Reward point dari pembelian Order ID J-62895358976565-1761370643648'),
(207, '1761370805917', '1007', 4, 'Reward point dari pembelian Order ID J-62895358976565-1761370788551'),
(208, '1761393599884', '1006', 8, 'Reward point dari pembelian Order ID J-6289654786299-1761393582179'),
(209, '1761398184237', '1006', 3, 'Reward point dari pembelian Order ID J-6289654786299-1761398168685'),
(210, '1761557435199', '1006', 21, 'Reward point dari pembelian Order ID J-6289654786299-1761557302682'),
(211, '1761646527605', '1006', 5, 'putar wheel fortune'),
(212, '1761646532598', '1006', 5, 'putar wheel fortune');

-- --------------------------------------------------------

--
-- Table structure for table `riwayat_xpoint`
--

CREATE TABLE `riwayat_xpoint` (
  `id` int(11) NOT NULL,
  `tglinputmili` text NOT NULL,
  `userid` text NOT NULL,
  `xp` int(11) NOT NULL,
  `keterangan` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wheelreward`
--

CREATE TABLE `wheelreward` (
  `id` int(11) NOT NULL,
  `tglinputmili` text NOT NULL,
  `userid` text NOT NULL,
  `hadiah` text NOT NULL,
  `tglkirimmili` text NOT NULL,
  `dikirim` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wheelreward`
--

INSERT INTO `wheelreward` (`id`, `tglinputmili`, `userid`, `hadiah`, `tglkirimmili`, `dikirim`) VALUES
(1, '1754979491829', '1008', 'Desert Bowl', '1759558170532', 'Terkirim'),
(2, '1755049500762', '1008', 'Vazra Baterai', '1759562903678', 'Terkirim'),
(3, '1755049967606', '1006', 'Hanger', '', ''),
(4, '1755050029076', '1006', 'Desert Bowl', '', ''),
(5, '1755057403017', '1006', 'Hanger', '', ''),
(6, '1755057608744', '1006', 'Hanger', '', ''),
(7, '1755057617134', '1006', 'Hanger', '', ''),
(8, '1755057626869', '1006', 'Desert Bowl', '', ''),
(9, '1755057637078', '1006', 'Voucher 50,000', '', ''),
(10, '1755057644261', '1006', 'Gelas', '', ''),
(11, '1755060183952', '1008', 'Hanger', '', ''),
(12, '1755066072210', '1007', 'Hanger', '', ''),
(15, '1755066397073', '1007', 'Botol Minum', '', ''),
(16, '1755145177462', '1006', 'Gelas', '', ''),
(17, '1755145190063', '1006', 'Hanger', '', ''),
(18, '1755165015114', '1007', 'Gelas', '', ''),
(19, '1755165270687', '1007', 'Hanger', '', ''),
(20, '1755165524087', '1007', 'Desert Bowl', '', ''),
(21, '1755165625255', '1007', 'Voucher 50,000', '', ''),
(22, '1755165913568', '1007', 'Hanger', '', ''),
(23, '1755165926498', '1007', 'Desert Bowl', '', ''),
(24, '1755166000054', '1007', 'Hanger', '', ''),
(25, '1755166050869', '1007', 'Bantal Each', '', ''),
(26, '1755166125645', '1007', 'Desert Bowl', '', ''),
(27, '1755166184237', '1007', 'Trash Bin', '', ''),
(28, '1755166313433', '1007', 'Gelas', '', ''),
(29, '1755166512775', '1007', 'Hanger', '', ''),
(30, '1755166581316', '1006', 'Gelas', '', ''),
(31, '1755166642912', '1007', 'Desert Bowl', '', ''),
(32, '1755166747583', '1007', 'Desert Bowl', '', ''),
(33, '1755166747611', '1006', 'Desert Bowl', '', ''),
(34, '1755166844954', '1007', 'Gelas', '', ''),
(35, '1755166846894', '1006', 'Hanger', '', ''),
(36, '1755167117177', '1006', 'Hanger', '', ''),
(37, '1755167123053', '1006', 'Hanger', '', ''),
(38, '1755167131293', '1006', 'Gelas', '', ''),
(39, '1755167141683', '1006', 'Hanger', '', ''),
(40, '1755167152813', '1006', 'Gelas', '', ''),
(41, '1755167276112', '1007', 'Hanger', '', ''),
(42, '1755167292364', '1006', 'Hanger', '', ''),
(43, '1755167307473', '1007', 'Trash Bin', '', ''),
(44, '1755167410656', '1007', 'Gelas', '', ''),
(45, '1755167454085', '1006', 'Gelas', '', ''),
(46, '1755167457232', '1007', 'Gelas', '', ''),
(47, '1755167490632', '1007', 'Voucher 50,000', '', ''),
(48, '1755167518129', '1007', 'Desert Bowl', '', ''),
(49, '1755167568224', '1007', 'Desert Bowl', '', ''),
(50, '1755167588587', '1007', 'Trash Bin', '', ''),
(51, '1755167627850', '1007', 'Voucher 50,000', '', ''),
(52, '1755167740310', '1006', 'Trash Bin', '', ''),
(53, '1755167769169', '1006', 'Trash Bin', '', ''),
(54, '1755167776122', '1006', 'Trash Bin', '', ''),
(55, '1755167785471', '1006', 'Desert Bowl', '', ''),
(56, '1755221372939', '1008', 'Vazra Baterai', '', ''),
(57, '1755238473609', '1008', 'Voucher 50,000', '1755244328403', 'Terkirim'),
(58, '1755249058241', '1007', 'Gelas', '', ''),
(59, '1755502956655', '1008', 'Gelas', '', ''),
(60, '1755579158555', '1007', 'Voucher 100,000', '', ''),
(61, '1755762725821', '1007', 'Voucher 50,000', '', ''),
(62, '1755849983855', '1008', 'Hanger', '', ''),
(63, '1756105187826', '1008', 'Desert Bowl', '', ''),
(64, '1756105366456', '1008', 'Vazra Baterai', '', ''),
(65, '1756182834087', '1006', 'Voucher 50,000', '', ''),
(66, '1756182967462', '1006', 'Desert Bowl', '', ''),
(67, '1756183007604', '1006', 'Desert Bowl', '', ''),
(68, '1756183020901', '1006', 'Trash Bin', '', ''),
(69, '1756183046576', '1006', 'Hanger', '', ''),
(70, '1756183180265', '1006', 'Hanger', '', ''),
(71, '1756183689692', '1006', 'Gelas', '', ''),
(72, '1756185235002', '1006', 'Trash Bin', '', ''),
(73, '1756277598218', '1007', 'Voucher 50,000', '', ''),
(74, '1756450991401', '1006', 'Hanger', '', ''),
(75, '1756450996493', '1006', 'Voucher 50,000', '', ''),
(76, '1756451003662', '1006', 'Desert Bowl', '', ''),
(77, '1756451010003', '1006', 'Hanger', '', ''),
(78, '1756451017117', '1006', 'Gelas', '', ''),
(79, '1756451025037', '1006', 'Hanger', '', ''),
(80, '1756451031142', '1006', 'Trash Bin', '', ''),
(81, '1756451037233', '1006', 'Gelas', '', ''),
(82, '1756451044976', '1006', 'Voucher 50,000', '', ''),
(83, '1756451051415', '1006', 'Gelas', '', ''),
(84, '1756451057663', '1006', 'Voucher 100,000', '', ''),
(85, '1756451063989', '1006', 'Hanger', '', ''),
(86, '1756451070279', '1006', 'Voucher 50,000', '', ''),
(87, '1756451076159', '1006', 'Gelas', '', ''),
(88, '1756451082529', '1006', 'Voucher 50,000', '', ''),
(89, '1756451089054', '1006', 'Gelas', '', ''),
(90, '1756451095342', '1006', 'Desert Bowl', '', ''),
(91, '1756451101281', '1006', 'Voucher 50,000', '', ''),
(92, '1756451109131', '1006', 'Voucher 50,000', '', ''),
(93, '1756451115226', '1006', 'Hanger', '1759550591640', 'Terkirim'),
(94, '1756689987395', '1007', 'Hanger', '1759390450035', 'Terkirim'),
(95, '1758521123294', '1006', 'Gelas', '1759390361014', 'Terkirim'),
(108, '1759544542378', '1006', 'Sepeda Listrik Selis', '1759549353583', 'Terkirim'),
(109, '1759544550015', '1006', 'Sepeda Listrik Selis', '', ''),
(110, '1759544690896', '1006', 'Gelas', '', ''),
(111, '1759544703770', '1006', 'Bantal Each', '', ''),
(112, '1759989884929', '1006', 'Bantal Each', '', ''),
(113, '1759989892222', '1006', 'Hanger', '', ''),
(114, '1759990008416', '1006', 'Trash Bin', '', ''),
(115, '1759990026109', '1006', 'Voucher 50,000', '', ''),
(116, '1760340844771', '1006', 'Hanger', '', ''),
(117, '1760340851688', '1006', 'Trash Bin', '', ''),
(118, '1760340858376', '1006', 'Voucher 100,000', '', ''),
(119, '1760348401749', '1006', 'Voucher 50,000', '', ''),
(120, '1761646532742', '1006', 'Hanger', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `database_beli`
--
ALTER TABLE `database_beli`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `database_keranjang`
--
ALTER TABLE `database_keranjang`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dataslogin`
--
ALTER TABLE `dataslogin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `data_aturan`
--
ALTER TABLE `data_aturan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `data_biayalain`
--
ALTER TABLE `data_biayalain`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `data_deliverycharge`
--
ALTER TABLE `data_deliverycharge`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `data_eventpage`
--
ALTER TABLE `data_eventpage`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `data_exchangepoint`
--
ALTER TABLE `data_exchangepoint`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `data_flashsale`
--
ALTER TABLE `data_flashsale`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `data_game`
--
ALTER TABLE `data_game`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `data_label`
--
ALTER TABLE `data_label`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `data_probability_wheel`
--
ALTER TABLE `data_probability_wheel`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `data_promo_link`
--
ALTER TABLE `data_promo_link`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `data_simpanxpuses`
--
ALTER TABLE `data_simpanxpuses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `data_voucher`
--
ALTER TABLE `data_voucher`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reward_exchangepoint`
--
ALTER TABLE `reward_exchangepoint`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `riwayat_edit`
--
ALTER TABLE `riwayat_edit`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `riwayat_tukarpoint`
--
ALTER TABLE `riwayat_tukarpoint`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `riwayat_xpoint`
--
ALTER TABLE `riwayat_xpoint`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wheelreward`
--
ALTER TABLE `wheelreward`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `database_beli`
--
ALTER TABLE `database_beli`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=699;

--
-- AUTO_INCREMENT for table `database_keranjang`
--
ALTER TABLE `database_keranjang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=541;

--
-- AUTO_INCREMENT for table `dataslogin`
--
ALTER TABLE `dataslogin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1056;

--
-- AUTO_INCREMENT for table `data_aturan`
--
ALTER TABLE `data_aturan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `data_biayalain`
--
ALTER TABLE `data_biayalain`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `data_deliverycharge`
--
ALTER TABLE `data_deliverycharge`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `data_eventpage`
--
ALTER TABLE `data_eventpage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `data_exchangepoint`
--
ALTER TABLE `data_exchangepoint`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `data_flashsale`
--
ALTER TABLE `data_flashsale`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `data_game`
--
ALTER TABLE `data_game`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `data_label`
--
ALTER TABLE `data_label`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `data_probability_wheel`
--
ALTER TABLE `data_probability_wheel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `data_promo_link`
--
ALTER TABLE `data_promo_link`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `data_simpanxpuses`
--
ALTER TABLE `data_simpanxpuses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `data_voucher`
--
ALTER TABLE `data_voucher`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1065;

--
-- AUTO_INCREMENT for table `reward_exchangepoint`
--
ALTER TABLE `reward_exchangepoint`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `riwayat_edit`
--
ALTER TABLE `riwayat_edit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `riwayat_tukarpoint`
--
ALTER TABLE `riwayat_tukarpoint`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=213;

--
-- AUTO_INCREMENT for table `riwayat_xpoint`
--
ALTER TABLE `riwayat_xpoint`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wheelreward`
--
ALTER TABLE `wheelreward`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=121;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
