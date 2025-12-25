
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
- dotenv
- cors

## 📦 Structure du projet
```
my-social-networks-api/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── users.controller.js
│   │   ├── groups.controller.js
│   │   ├── events.controller.js
│   │   ├── discussions.controller.js
│   │   ├── albums.controller.js
│   │   ├── polls.controller.js
│   │   ├── tickets.controller.js
│   │   ├── shopping.controller.js
│   │   └── carpools.controller.js
│   ├── routes/
│   │   ├── users.routes.js
│   │   ├── groups.routes.js
│   │   ├── events.routes.js
│   │   ├── discussions.routes.js
│   │   ├── albums.routes.js
│   │   ├── polls.routes.js
│   │   ├── tickets.routes.js
│   │   ├── shopping.routes.js
│   │   └── carpools.routes.js
│   └── server.js
├── .env
├── .gitignore
├── package.json
├── API_DOCUMENTATION.md
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


