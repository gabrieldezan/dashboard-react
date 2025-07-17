-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 17, 2025 at 10:05 PM
-- Server version: 8.0.38
-- PHP Version: 8.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dashboard_react`
--

-- --------------------------------------------------------

--
-- Table structure for table `banners`
--

CREATE TABLE `banners` (
  `id` int NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `descricao` longtext NOT NULL,
  `link` longtext NOT NULL,
  `texto_botao` varchar(100) NOT NULL,
  `imagem` longtext NOT NULL,
  `imagem_webp` longtext NOT NULL,
  `imagem_largura` int NOT NULL,
  `imagem_altura` int NOT NULL,
  `thumb` longtext,
  `thumb_largura` int DEFAULT NULL,
  `thumb_altura` int DEFAULT NULL,
  `abrir_nova_guia` tinyint(1) NOT NULL DEFAULT '0',
  `posicao` int NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `banners`
--

INSERT INTO `banners` (`id`, `titulo`, `descricao`, `link`, `texto_botao`, `imagem`, `imagem_webp`, `imagem_largura`, `imagem_altura`, `thumb`, `thumb_largura`, `thumb_altura`, `abrir_nova_guia`, `posicao`, `status`) VALUES
(18, 'Entre em contato', '', '', '', 'img-entre-em-contato-20250712165332.jpeg', 'img-entre-em-contato-20250712165332.webp', 1920, 1080, '', NULL, NULL, 0, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `banners_mobile`
--

CREATE TABLE `banners_mobile` (
  `id` int NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `descricao` longtext NOT NULL,
  `link` longtext NOT NULL,
  `texto_botao` varchar(100) NOT NULL,
  `imagem` longtext NOT NULL,
  `imagem_webp` longtext NOT NULL,
  `imagem_largura` int NOT NULL,
  `imagem_altura` int NOT NULL,
  `thumb` longtext,
  `thumb_largura` int DEFAULT NULL,
  `thumb_altura` int DEFAULT NULL,
  `abrir_nova_guia` tinyint(1) NOT NULL DEFAULT '0',
  `posicao` int NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `banners_mobile`
--

INSERT INTO `banners_mobile` (`id`, `titulo`, `descricao`, `link`, `texto_botao`, `imagem`, `imagem_webp`, `imagem_largura`, `imagem_altura`, `thumb`, `thumb_largura`, `thumb_altura`, `abrir_nova_guia`, `posicao`, `status`) VALUES
(6, 'Primeiro banner mobile', '', '', '', 'img-primeiro-banner-mobile-20250614204110.png', 'img-primeiro-banner-mobile-20250614204110.webp', 400, 600, '', NULL, NULL, 0, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `blog_autores`
--

CREATE TABLE `blog_autores` (
  `id` int NOT NULL,
  `nome` varchar(255) NOT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `imagem` longtext,
  `imagem_webp` longtext,
  `imagem_largura` int DEFAULT NULL,
  `imagem_altura` int DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `blog_categorias`
--

CREATE TABLE `blog_categorias` (
  `id` int NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `posicao` int NOT NULL,
  `url_amigavel` longtext NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `blog_posts`
--

CREATE TABLE `blog_posts` (
  `id` int NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `texto` longtext NOT NULL,
  `imagem` longtext NOT NULL,
  `imagem_webp` longtext NOT NULL,
  `imagem_largura` int NOT NULL,
  `imagem_altura` int NOT NULL,
  `thumb` longtext,
  `thumb_largura` int DEFAULT NULL,
  `thumb_altura` int DEFAULT NULL,
  `data_criacao` varchar(45) NOT NULL,
  `data_publicacao` varchar(45) NOT NULL,
  `video` longtext,
  `url_amigavel` longtext NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `blog_categorias_id` int NOT NULL,
  `blog_autores_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `configuracoes`
--

CREATE TABLE `configuracoes` (
  `nome_empresa` varchar(255) NOT NULL,
  `url_site` varchar(255) NOT NULL,
  `url_local` varchar(255) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descricao` varchar(255) NOT NULL,
  `whatsapp` varchar(45) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `email_contato` varchar(255) DEFAULT NULL,
  `script_head` longtext,
  `script_body` longtext,
  `script_footer` longtext,
  `favicon` longtext NOT NULL,
  `logo_principal` longtext NOT NULL,
  `logo_secundaria` longtext,
  `politicas_privacidade` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contatos_recebidos`
--

CREATE TABLE `contatos_recebidos` (
  `id` int NOT NULL,
  `nome` varchar(255) NOT NULL,
  `telefone` varchar(45) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `assunto` varchar(255) DEFAULT NULL,
  `mensagem` longtext,
  `data_recebimento` datetime NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `enderecos`
--

CREATE TABLE `enderecos` (
  `id` int NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  `cidade` varchar(255) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `mapa` longtext,
  `link` longtext,
  `horario_atendimento` varchar(255) DEFAULT NULL,
  `telefone` varchar(45) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `enderecos`
--

INSERT INTO `enderecos` (`id`, `titulo`, `endereco`, `cidade`, `estado`, `mapa`, `link`, `horario_atendimento`, `telefone`, `status`) VALUES
(1, 'Matriz', 'Endereço', 'Cascavel', 'PR', 'mapa', 'link', 'horario', '45998469840', 1);

-- --------------------------------------------------------

--
-- Table structure for table `portfolio_grupos`
--

CREATE TABLE `portfolio_grupos` (
  `id` int NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `portfolio_itens`
--

CREATE TABLE `portfolio_itens` (
  `id` int NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descricao` longtext,
  `imagem` longtext NOT NULL,
  `imagem_webp` longtext NOT NULL,
  `imagem_largura` int NOT NULL,
  `imagem_altura` int NOT NULL,
  `thumb` longtext,
  `thum_largura` int DEFAULT NULL,
  `thumb_altura` int DEFAULT NULL,
  `link` longtext,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `portfolio_grupo_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `redes_sociais`
--

CREATE TABLE `redes_sociais` (
  `id` int NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `link` varchar(255) NOT NULL,
  `icone` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `redes_sociais`
--

INSERT INTO `redes_sociais` (`id`, `titulo`, `link`, `icone`, `status`) VALUES
(1, 'Facebook', 'https://www.facebook.com/', 'fab fa-facebook-square', 1),
(3, 'Instagram', 'https://www.instagram.com/', 'fab fa-instagram', 1),
(5, 'LinkedIn', 'https://www.linkedin.com/', 'fab fa-linkedin', 0);

-- --------------------------------------------------------

--
-- Table structure for table `sobre`
--

CREATE TABLE `sobre` (
  `titulo` varchar(255) NOT NULL,
  `resumo` longtext,
  `texto` longtext,
  `imagem` longtext,
  `imagem_webp` longtext,
  `imagem_largura` int DEFAULT NULL,
  `imagem_altura` int DEFAULT NULL,
  `thumb` longtext,
  `thumb_largura` int DEFAULT NULL,
  `thumb_altura` int DEFAULT NULL,
  `link` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `sobre`
--

INSERT INTO `sobre` (`titulo`, `resumo`, `texto`, `imagem`, `imagem_webp`, `imagem_largura`, `imagem_altura`, `thumb`, `thumb_largura`, `thumb_altura`, `link`) VALUES
('sobre', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', '<p><strong>Lorem</strong> Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and <em>scrambled</em> it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including <span style=\"text-decoration: underline;\">versions</span> of Lorem <s>Ipsum</s>.</p>\r\n<p><s><span style=\"text-decoration: underline;\"><em><strong>Gabriel</strong></em></span></s></p>', 'img-sobre-20250712184207.jpeg', 'img-sobre-20250712184207.webp', 500, 500, NULL, 0, 0, '/sobre');

-- --------------------------------------------------------

--
-- Table structure for table `tamanho_imagens`
--

CREATE TABLE `tamanho_imagens` (
  `id` int NOT NULL,
  `tabela` varchar(255) NOT NULL,
  `imagem_largura` int NOT NULL,
  `imagem_altura` int NOT NULL,
  `thumb_largura` int DEFAULT NULL,
  `thumb_altura` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tamanho_imagens`
--

INSERT INTO `tamanho_imagens` (`id`, `tabela`, `imagem_largura`, `imagem_altura`, `thumb_largura`, `thumb_altura`) VALUES
(1, 'banners', 1920, 1080, 0, 0),
(2, 'banners_mobile', 400, 600, 0, 0),
(3, 'sobre', 500, 500, 0, 0),
(4, 'portfolio_itens', 1000, 1000, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `email`, `senha`) VALUES
(1, 'Gabriel', 'gdezan94@gmail.com', '$2y$10$fjVMGUh0oDkbDwAM/vmSKOUjdsK/tcKQZPiNloSaHfnDyy9qgk58m'),
(2, 'Thaís', 'thais@webdezan.com.br', '$2y$10$KkjTGIuR2gJ2ASpeVLkSoOsYhXdClyM2zzCvGi6bVAyoCzmNi8vCG');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `banners`
--
ALTER TABLE `banners`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `banners_mobile`
--
ALTER TABLE `banners_mobile`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blog_autores`
--
ALTER TABLE `blog_autores`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blog_categorias`
--
ALTER TABLE `blog_categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blog_posts`
--
ALTER TABLE `blog_posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_blog_posts_blog_categorias1_idx` (`blog_categorias_id`),
  ADD KEY `fk_blog_posts_blog_autores1_idx` (`blog_autores_id`);

--
-- Indexes for table `contatos_recebidos`
--
ALTER TABLE `contatos_recebidos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `enderecos`
--
ALTER TABLE `enderecos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `portfolio_grupos`
--
ALTER TABLE `portfolio_grupos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `portfolio_itens`
--
ALTER TABLE `portfolio_itens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_portfolio_itens_portfolio_grupo1_idx` (`portfolio_grupo_id`);

--
-- Indexes for table `redes_sociais`
--
ALTER TABLE `redes_sociais`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tamanho_imagens`
--
ALTER TABLE `tamanho_imagens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `banners`
--
ALTER TABLE `banners`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `banners_mobile`
--
ALTER TABLE `banners_mobile`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `blog_autores`
--
ALTER TABLE `blog_autores`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `blog_categorias`
--
ALTER TABLE `blog_categorias`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `blog_posts`
--
ALTER TABLE `blog_posts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contatos_recebidos`
--
ALTER TABLE `contatos_recebidos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `enderecos`
--
ALTER TABLE `enderecos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `portfolio_grupos`
--
ALTER TABLE `portfolio_grupos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `portfolio_itens`
--
ALTER TABLE `portfolio_itens`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `redes_sociais`
--
ALTER TABLE `redes_sociais`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tamanho_imagens`
--
ALTER TABLE `tamanho_imagens`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blog_posts`
--
ALTER TABLE `blog_posts`
  ADD CONSTRAINT `fk_blog_posts_blog_autores1` FOREIGN KEY (`blog_autores_id`) REFERENCES `blog_autores` (`id`),
  ADD CONSTRAINT `fk_blog_posts_blog_categorias1` FOREIGN KEY (`blog_categorias_id`) REFERENCES `blog_categorias` (`id`);

--
-- Constraints for table `portfolio_itens`
--
ALTER TABLE `portfolio_itens`
  ADD CONSTRAINT `fk_portfolio_itens_portfolio_grupo1` FOREIGN KEY (`portfolio_grupo_id`) REFERENCES `portfolio_grupos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
