const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route de test
app.get('/', (req, res) => {
    res.json({ message: 'Bienvenue sur l\'API My Social Networks!' });
});

// Routes
const usersRoutes = require('./routes/users.routes');
const groupsRoutes = require('./routes/groups.routes');
const eventsRoutes = require('./routes/events.routes');
const discussionsRoutes = require('./routes/discussions.routes');
const albumsRoutes = require('./routes/albums.routes');
const pollsRoutes = require('./routes/polls.routes');
const ticketsRoutes = require('./routes/tickets.routes');
const shoppingRoutes = require('./routes/shopping.routes');
const carpoolsRoutes = require('./routes/carpools.routes');

app.use('/api/users', usersRoutes);
app.use('/api/groups', groupsRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/discussions', discussionsRoutes);
app.use('/api/albums', albumsRoutes);
app.use('/api/polls', pollsRoutes);
app.use('/api/tickets', ticketsRoutes);
app.use('/api/shopping', shoppingRoutes);
app.use('/api/carpools', carpoolsRoutes);
// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});