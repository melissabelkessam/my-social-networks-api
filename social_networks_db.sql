-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 25 déc. 2025 à 14:20
-- Version du serveur : 9.1.0
-- Version de PHP : 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `social_networks_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `carpools`
--

DROP TABLE IF EXISTS `carpools`;
CREATE TABLE IF NOT EXISTS `carpools` (
  `id` int NOT NULL AUTO_INCREMENT,
  `event_id` int NOT NULL,
  `driver_id` int NOT NULL,
  `departure_location` varchar(255) NOT NULL,
  `departure_time` datetime NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `available_seats` int NOT NULL,
  `max_time_difference` int NOT NULL COMMENT 'En minutes',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `event_id` (`event_id`),
  KEY `driver_id` (`driver_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `carpools`
--

INSERT INTO `carpools` (`id`, `event_id`, `driver_id`, `departure_location`, `departure_time`, `price`, `available_seats`, `max_time_difference`, `created_at`) VALUES
(1, 1, 4, 'Gare de Lyon, Paris', '2025-12-31 18:30:00', 5.00, 3, 30, '2025-12-25 14:19:01');

-- --------------------------------------------------------

--
-- Structure de la table `discussion_threads`
--

DROP TABLE IF EXISTS `discussion_threads`;
CREATE TABLE IF NOT EXISTS `discussion_threads` (
  `id` int NOT NULL AUTO_INCREMENT,
  `group_id` int DEFAULT NULL,
  `event_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `group_id` (`group_id`),
  KEY `event_id` (`event_id`)
) ;

--
-- Déchargement des données de la table `discussion_threads`
--

INSERT INTO `discussion_threads` (`id`, `group_id`, `event_id`, `created_at`) VALUES
(1, NULL, 1, '2025-12-25 14:15:25');

-- --------------------------------------------------------

--
-- Structure de la table `events`
--

DROP TABLE IF EXISTS `events`;
CREATE TABLE IF NOT EXISTS `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `cover_photo` varchar(255) DEFAULT NULL,
  `is_private` tinyint(1) DEFAULT '0',
  `group_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `group_id` (`group_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `events`
--

INSERT INTO `events` (`id`, `name`, `description`, `start_date`, `end_date`, `location`, `cover_photo`, `is_private`, `group_id`, `created_at`, `updated_at`) VALUES
(1, 'Soirée de Noël', 'Grande soirée festive', '2025-12-31 20:00:00', '2025-12-31 23:59:00', 'Paris', NULL, 0, NULL, '2025-12-25 14:07:06', '2025-12-25 14:07:06'),
(2, 'Soirée de fin d\'année', 'Grande fête pour célébrer la fin de l\'année', '2025-12-31 20:00:00', '2026-01-01 02:00:00', 'Paris, 15ème arrondissement', NULL, 0, NULL, '2025-12-25 14:13:46', '2025-12-25 14:13:46'),
(3, 'Workshop Data Science', 'Atelier pratique sur l\'analyse de données', '2026-01-15 14:00:00', '2026-01-15 18:00:00', 'Université Paris', NULL, 1, 1, '2025-12-25 14:13:52', '2025-12-25 14:13:52');

-- --------------------------------------------------------

--
-- Structure de la table `event_organizers`
--

DROP TABLE IF EXISTS `event_organizers`;
CREATE TABLE IF NOT EXISTS `event_organizers` (
  `event_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`event_id`,`user_id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `event_organizers`
--

INSERT INTO `event_organizers` (`event_id`, `user_id`) VALUES
(1, 1),
(2, 3);

-- --------------------------------------------------------

--
-- Structure de la table `event_participants`
--

DROP TABLE IF EXISTS `event_participants`;
CREATE TABLE IF NOT EXISTS `event_participants` (
  `event_id` int NOT NULL,
  `user_id` int NOT NULL,
  `joined_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`event_id`,`user_id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `event_participants`
--

INSERT INTO `event_participants` (`event_id`, `user_id`, `joined_at`) VALUES
(1, 1, '2025-12-25 14:07:42'),
(1, 2, '2025-12-25 14:14:34'),
(1, 3, '2025-12-25 14:14:39'),
(1, 4, '2025-12-25 14:14:44');

-- --------------------------------------------------------

--
-- Structure de la table `groups_table`
--

DROP TABLE IF EXISTS `groups_table`;
CREATE TABLE IF NOT EXISTS `groups_table` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `icon` varchar(255) DEFAULT NULL,
  `cover_photo` varchar(255) DEFAULT NULL,
  `type` enum('public','private','secret') DEFAULT 'public',
  `allow_members_post` tinyint(1) DEFAULT '1',
  `allow_members_create_events` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `groups_table`
--

INSERT INTO `groups_table` (`id`, `name`, `description`, `icon`, `cover_photo`, `type`, `allow_members_post`, `allow_members_create_events`, `created_at`, `updated_at`) VALUES
(1, 'Groupe de test', 'Mon premier groupe', NULL, NULL, 'public', 1, 1, '2025-12-25 13:23:43', '2025-12-25 13:23:43'),
(2, 'Groupe Data Analytics', 'Étudiants en Master', NULL, NULL, 'private', 1, 1, '2025-12-25 14:07:19', '2025-12-25 14:07:19'),
(3, 'Groupe Master Data Analytics', 'Groupe des étudiants du Master', NULL, NULL, 'private', 1, 1, '2025-12-25 14:12:14', '2025-12-25 14:12:14'),
(4, 'Club Sport', 'Pour organiser des activités sportives', NULL, NULL, 'public', 1, 0, '2025-12-25 14:12:26', '2025-12-25 14:12:26');

-- --------------------------------------------------------

--
-- Structure de la table `group_admins`
--

DROP TABLE IF EXISTS `group_admins`;
CREATE TABLE IF NOT EXISTS `group_admins` (
  `group_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`group_id`,`user_id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `group_admins`
--

INSERT INTO `group_admins` (`group_id`, `user_id`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `group_members`
--

DROP TABLE IF EXISTS `group_members`;
CREATE TABLE IF NOT EXISTS `group_members` (
  `group_id` int NOT NULL,
  `user_id` int NOT NULL,
  `joined_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`group_id`,`user_id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `group_members`
--

INSERT INTO `group_members` (`group_id`, `user_id`, `joined_at`) VALUES
(1, 1, '2025-12-25 14:12:43'),
(1, 3, '2025-12-25 14:12:53'),
(1, 4, '2025-12-25 14:12:58');

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

DROP TABLE IF EXISTS `messages`;
CREATE TABLE IF NOT EXISTS `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `thread_id` int NOT NULL,
  `user_id` int NOT NULL,
  `content` text NOT NULL,
  `parent_message_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `thread_id` (`thread_id`),
  KEY `user_id` (`user_id`),
  KEY `parent_message_id` (`parent_message_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `messages`
--

INSERT INTO `messages` (`id`, `thread_id`, `user_id`, `content`, `parent_message_id`, `created_at`) VALUES
(1, 1, 1, 'Super, j\'ai hâte d\'être à cette soirée !', NULL, '2025-12-25 14:15:41'),
(2, 1, 3, 'Qui apporte la musique ?', NULL, '2025-12-25 14:15:46');

-- --------------------------------------------------------

--
-- Structure de la table `photos`
--

DROP TABLE IF EXISTS `photos`;
CREATE TABLE IF NOT EXISTS `photos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `album_id` int NOT NULL,
  `user_id` int NOT NULL,
  `photo_url` varchar(255) NOT NULL,
  `caption` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `album_id` (`album_id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `photos`
--

INSERT INTO `photos` (`id`, `album_id`, `user_id`, `photo_url`, `caption`, `created_at`) VALUES
(1, 1, 2, 'https://example.com/photo1.jpg', 'Belle ambiance !', '2025-12-25 14:17:31');

-- --------------------------------------------------------

--
-- Structure de la table `photo_albums`
--

DROP TABLE IF EXISTS `photo_albums`;
CREATE TABLE IF NOT EXISTS `photo_albums` (
  `id` int NOT NULL AUTO_INCREMENT,
  `event_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `event_id` (`event_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `photo_comments`
--

DROP TABLE IF EXISTS `photo_comments`;
CREATE TABLE IF NOT EXISTS `photo_comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `photo_id` int NOT NULL,
  `user_id` int NOT NULL,
  `comment` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `photo_id` (`photo_id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `polls`
--

DROP TABLE IF EXISTS `polls`;
CREATE TABLE IF NOT EXISTS `polls` (
  `id` int NOT NULL AUTO_INCREMENT,
  `event_id` int NOT NULL,
  `organizer_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `event_id` (`event_id`),
  KEY `organizer_id` (`organizer_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `polls`
--

INSERT INTO `polls` (`id`, `event_id`, `organizer_id`, `title`, `created_at`) VALUES
(1, 1, 1, 'Préférences pour le repas', '2025-12-25 14:16:02');

-- --------------------------------------------------------

--
-- Structure de la table `poll_options`
--

DROP TABLE IF EXISTS `poll_options`;
CREATE TABLE IF NOT EXISTS `poll_options` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question_id` int NOT NULL,
  `option_text` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `question_id` (`question_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `poll_options`
--

INSERT INTO `poll_options` (`id`, `question_id`, `option_text`) VALUES
(1, 1, 'Cuisine italienne'),
(2, 1, 'Cuisine asiatique'),
(3, 1, 'Cuisine française');

-- --------------------------------------------------------

--
-- Structure de la table `poll_questions`
--

DROP TABLE IF EXISTS `poll_questions`;
CREATE TABLE IF NOT EXISTS `poll_questions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `poll_id` int NOT NULL,
  `question_text` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `poll_id` (`poll_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `poll_questions`
--

INSERT INTO `poll_questions` (`id`, `poll_id`, `question_text`) VALUES
(1, 1, 'Quel type de cuisine préférez-vous ?');

-- --------------------------------------------------------

--
-- Structure de la table `poll_responses`
--

DROP TABLE IF EXISTS `poll_responses`;
CREATE TABLE IF NOT EXISTS `poll_responses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question_id` int NOT NULL,
  `user_id` int NOT NULL,
  `option_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_response` (`question_id`,`user_id`),
  KEY `user_id` (`user_id`),
  KEY `option_id` (`option_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `poll_responses`
--

INSERT INTO `poll_responses` (`id`, `question_id`, `user_id`, `option_id`, `created_at`) VALUES
(1, 1, 2, 1, '2025-12-25 14:17:08');

-- --------------------------------------------------------

--
-- Structure de la table `purchased_tickets`
--

DROP TABLE IF EXISTS `purchased_tickets`;
CREATE TABLE IF NOT EXISTS `purchased_tickets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ticket_type_id` int NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `purchase_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `ticket_type_id` (`ticket_type_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `purchased_tickets`
--

INSERT INTO `purchased_tickets` (`id`, `ticket_type_id`, `first_name`, `last_name`, `address`, `purchase_date`) VALUES
(1, 1, 'Marie', 'Dubois', '123 Rue de la Paix, 75001 Paris', '2025-12-25 14:18:30');

-- --------------------------------------------------------

--
-- Structure de la table `shopping_items`
--

DROP TABLE IF EXISTS `shopping_items`;
CREATE TABLE IF NOT EXISTS `shopping_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `event_id` int NOT NULL,
  `user_id` int NOT NULL,
  `item_name` varchar(191) NOT NULL,
  `quantity` int NOT NULL,
  `arrival_time` time NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_item` (`event_id`,`item_name`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `shopping_items`
--

INSERT INTO `shopping_items` (`id`, `event_id`, `user_id`, `item_name`, `quantity`, `arrival_time`, `created_at`) VALUES
(1, 1, 2, 'Chips', 3, '20:00:00', '2025-12-25 14:18:43'),
(2, 1, 3, 'Boissons', 10, '19:30:00', '2025-12-25 14:18:49');

-- --------------------------------------------------------

--
-- Structure de la table `ticket_types`
--

DROP TABLE IF EXISTS `ticket_types`;
CREATE TABLE IF NOT EXISTS `ticket_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `event_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int NOT NULL,
  `available_quantity` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `event_id` (`event_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `ticket_types`
--

INSERT INTO `ticket_types` (`id`, `event_id`, `name`, `price`, `quantity`, `available_quantity`, `created_at`) VALUES
(1, 1, 'Billet VIP', 50.00, 20, 19, '2025-12-25 14:18:12'),
(2, 1, 'Billet Standard', 25.00, 100, 100, '2025-12-25 14:18:17');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(191) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `first_name`, `last_name`, `phone`, `avatar`, `created_at`, `updated_at`) VALUES
(1, 'melissa@test.com', 'password123', 'Melissa', 'Test', '0123456789', 'https://example.com/avatar.jpg', '2025-12-25 12:03:28', '2025-12-25 12:03:28'),
(2, 'test@example.com', 'password123', 'John', 'Doe', '0123456789', NULL, '2025-12-25 14:05:46', '2025-12-25 14:05:46'),
(3, 'alice@test.com', 'password123', 'Alice', 'Martin', '0612345678', NULL, '2025-12-25 14:11:20', '2025-12-25 14:11:20'),
(4, 'bob@test.com', 'password123', 'Bob', 'Dupont', '0623456789', NULL, '2025-12-25 14:11:27', '2025-12-25 14:11:27'),
(5, 'charlie@test.com', 'password123', 'Charlie', 'Bernard', '0634567890', NULL, '2025-12-25 14:11:33', '2025-12-25 14:11:33');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
