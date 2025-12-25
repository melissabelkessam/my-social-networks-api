const db = require('../config/database');

// Créer un fil de discussion
exports.createThread = (req, res) => {
    const { group_id, event_id } = req.body;
    
    // Vérifier qu'on a soit group_id soit event_id, mais pas les deux
    if ((group_id && event_id) || (!group_id && !event_id)) {
        return res.status(400).json({ error: 'Il faut fournir soit group_id soit event_id, mais pas les deux' });
    }
    
    const query = 'INSERT INTO discussion_threads (group_id, event_id) VALUES (?, ?)';
    
    db.query(query, [group_id || null, event_id || null], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ 
            message: 'Fil de discussion créé avec succès',
            threadId: result.insertId 
        });
    });
};

// Obtenir le fil de discussion d'un groupe
exports.getThreadByGroup = (req, res) => {
    const { groupId } = req.params;
    const query = 'SELECT * FROM discussion_threads WHERE group_id = ?';
    
    db.query(query, [groupId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Fil de discussion non trouvé' });
        }
        res.json(results[0]);
    });
};

// Obtenir le fil de discussion d'un événement
exports.getThreadByEvent = (req, res) => {
    const { eventId } = req.params;
    const query = 'SELECT * FROM discussion_threads WHERE event_id = ?';
    
    db.query(query, [eventId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Fil de discussion non trouvé' });
        }
        res.json(results[0]);
    });
};

// Supprimer un fil de discussion
exports.deleteThread = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM discussion_threads WHERE id = ?';
    
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Fil de discussion non trouvé' });
        }
        res.json({ message: 'Fil de discussion supprimé avec succès' });
    });
};

// Ajouter un message
exports.addMessage = (req, res) => {
    const { threadId } = req.params;
    const { user_id, content, parent_message_id } = req.body;
    
    const query = 'INSERT INTO messages (thread_id, user_id, content, parent_message_id) VALUES (?, ?, ?, ?)';
    
    db.query(query, [threadId, user_id, content, parent_message_id || null], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ 
            message: 'Message ajouté avec succès',
            messageId: result.insertId 
        });
    });
};

// Obtenir tous les messages d'un fil
exports.getMessages = (req, res) => {
    const { threadId } = req.params;
    const query = `
        SELECT m.*, u.first_name, u.last_name, u.email
        FROM messages m
        JOIN users u ON m.user_id = u.id
        WHERE m.thread_id = ?
        ORDER BY m.created_at ASC
    `;
    
    db.query(query, [threadId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Supprimer un message
exports.deleteMessage = (req, res) => {
    const { messageId } = req.params;
    const query = 'DELETE FROM messages WHERE id = ?';
    
    db.query(query, [messageId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Message non trouvé' });
        }
        res.json({ message: 'Message supprimé avec succès' });
    });
};