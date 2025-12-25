const db = require('../config/database');

// Créer un événement
exports.createEvent = (req, res) => {
    const { name, description, start_date, end_date, location, cover_photo, is_private, group_id } = req.body;
    
    const query = 'INSERT INTO events (name, description, start_date, end_date, location, cover_photo, is_private, group_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    
    db.query(query, [name, description, start_date, end_date, location, cover_photo, is_private, group_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ 
            message: 'Événement créé avec succès',
            eventId: result.insertId 
        });
    });
};

// Obtenir tous les événements
exports.getAllEvents = (req, res) => {
    const query = 'SELECT * FROM events';
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Obtenir un événement par ID
exports.getEventById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM events WHERE id = ?';
    
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Événement non trouvé' });
        }
        res.json(results[0]);
    });
};

// Mettre à jour un événement
exports.updateEvent = (req, res) => {
    const { id } = req.params;
    const { name, description, start_date, end_date, location, cover_photo, is_private } = req.body;
    
    const query = 'UPDATE events SET name = ?, description = ?, start_date = ?, end_date = ?, location = ?, cover_photo = ?, is_private = ? WHERE id = ?';
    
    db.query(query, [name, description, start_date, end_date, location, cover_photo, is_private, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Événement non trouvé' });
        }
        res.json({ message: 'Événement mis à jour avec succès' });
    });
};

// Supprimer un événement
exports.deleteEvent = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM events WHERE id = ?';
    
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Événement non trouvé' });
        }
        res.json({ message: 'Événement supprimé avec succès' });
    });
};

// Ajouter un organisateur
exports.addOrganizer = (req, res) => {
    const { id } = req.params;
    const { user_id } = req.body;
    
    const query = 'INSERT INTO event_organizers (event_id, user_id) VALUES (?, ?)';
    
    db.query(query, [id, user_id], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'Cet organisateur existe déjà' });
            }
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Organisateur ajouté avec succès' });
    });
};

// Retirer un organisateur
exports.removeOrganizer = (req, res) => {
    const { id, userId } = req.params;
    const query = 'DELETE FROM event_organizers WHERE event_id = ? AND user_id = ?';
    
    db.query(query, [id, userId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Organisateur non trouvé' });
        }
        res.json({ message: 'Organisateur retiré avec succès' });
    });
};

// Obtenir les organisateurs
exports.getEventOrganizers = (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT u.id, u.email, u.first_name, u.last_name
        FROM event_organizers eo
        JOIN users u ON eo.user_id = u.id
        WHERE eo.event_id = ?
    `;
    
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Ajouter un participant
exports.addParticipant = (req, res) => {
    const { id } = req.params;
    const { user_id } = req.body;
    
    const query = 'INSERT INTO event_participants (event_id, user_id) VALUES (?, ?)';
    
    db.query(query, [id, user_id], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'Ce participant existe déjà' });
            }
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Participant ajouté avec succès' });
    });
};

// Retirer un participant
exports.removeParticipant = (req, res) => {
    const { id, userId } = req.params;
    const query = 'DELETE FROM event_participants WHERE event_id = ? AND user_id = ?';
    
    db.query(query, [id, userId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Participant non trouvé' });
        }
        res.json({ message: 'Participant retiré avec succès' });
    });
};

// Obtenir les participants
exports.getEventParticipants = (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT u.id, u.email, u.first_name, u.last_name, ep.joined_at
        FROM event_participants ep
        JOIN users u ON ep.user_id = u.id
        WHERE ep.event_id = ?
    `;
    
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};