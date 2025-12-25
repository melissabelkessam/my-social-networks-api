
## 👨‍💻 Auteur

Melissa Belkessam - Master Data Engineering  EFREI 
```# My Social Networks API

API REST pour un réseau social avec gestion d'événements, groupes, discussions, albums photo, sondages et billetterie.

## 🚀 Installation

1. Cloner le projet
```bash
git clone <url-du-repo>
cd my-social-networks-api
```

2. Installer les dépendances
```bash
npm install
```

3. Configurer la base de données
- Créer une base de données MySQL nommée `social_networks_db`
- Importer le fichier SQL (si fourni) ou utiliser les migrations

4. Configurer les variables d'environnement
- Copier `.env.example` en `.env`
- Modifier les valeurs selon votre configuration

5. Lancer le serveur
```bash
node src/server.js
```

Le serveur démarre sur `http://localhost:3000`

## 📚 Documentation

Consulter le fichier `API_DOCUMENTATION.md` pour la liste complète des endpoints.

## 🛠️ Technologies utilisées

- Node.js
- Express.js
- MySQL
- express-validator (validation des données)
- dotenv
- cors
## 🔒 Validation des données

L'API utilise **express-validator** pour sécuriser les schémas d'entrée des données.

Toutes les requêtes sont validées avant traitement :
- ✅ Champs obligatoires
- ✅ Formats (email, URL, dates)
- ✅ Types de données
- ✅ Longueurs maximales
- ✅ Contraintes métier

Les validators se trouvent dans `src/validators/`

## 📦 Structure du projet
```
my-social-networks-api/
├── src/
│   ├── config/
│   │   └── database.js          # Configuration MySQL
│   ├── controllers/             # Logique métier (9 controllers)
│   ├── routes/                  # Définition des endpoints (9 routes)
│   ├── validators/              # Validation des données (9 validators)
│   └── server.js
├── social_networks_db.sql       # Export de la base avec données de test
├── .env                         # Variables d'environnement
├── .env.example                 # Exemple de configuration
├── .gitignore
├── package.json
├── API_DOCUMENTATION.md         # Documentation complète de l'API
├── INSTALLATION.md              # Instructions d'installation détaillées
└── README.md
```

## ✨ Fonctionnalités

- ✅ Gestion des utilisateurs
- ✅ Gestion des groupes (public, privé, secret)
- ✅ Gestion des événements
- ✅ Fils de discussion (groupes et événements)
- ✅ Albums photo avec commentaires
- ✅ Sondages
- ✅ Billetterie
- ✅ Shopping list (BONUS)
- ✅ Covoiturage (BONUS)


