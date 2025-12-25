# Instructions d'installation

## Prérequis

- Node.js installé (v14 ou supérieur)
- MySQL installé (WAMP, XAMPP, ou MySQL standalone)
- Git installé
- Postman (pour tester l'API)

## Étapes d'installation

### 1. Cloner le projet
```bash
git clone <url-du-repo>
cd my-social-networks-api
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configurer la base de données

1. Démarrer WAMP/MySQL
2. Ouvrir phpMyAdmin
3. Créer une nouvelle base de données nommée `social_networks_db`
4. Importer le fichier `social_networks_db.sql`

### 4. Configurer les variables d'environnement

Copier `.env.example` en `.env`
```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=social_networks_db
```

### 5. Démarrer le serveur
```bash
node src/server.js
```

## Données de test

La base de données contient déjà :
- 5 utilisateurs
- 2 groupes avec membres
- 2 événements avec participants
- Messages, sondages, photos
- Billetterie, shopping list, covoiturage

## Validation des données

L'API utilise express-validator pour valider toutes les entrées.