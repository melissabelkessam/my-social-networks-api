const db = require('../config/database');

// Ajouter un item
exports.addItem = (req, res) => {
    const { event_id, user_id, item_name, quantity, arrival_time } = req.body;
    
    const query = 'INSERT INTO shopping_items (event_id, user_id, item_name, quantity, arrival_time) VALUES (?, ?, ?, ?, ?)';
    
    db.query(query, [event_id, user_id, item_name, quantity, arrival_time], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'Cet item existe déjà pour cet événement' });
            }
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ 
            message: 'Item ajouté avec succès',
            itemId: result.insertId 
        });
    });
};

// Obtenir les items d'un événement
exports.getItemsByEvent = (req, res) => {
    const { eventId } = req.params;
    const query = `
        SELECT si.*, u.first_name, u.last_name
        FROM shopping_items si
        JOIN users u ON si.user_id = u.id
        WHERE si.event_id = ?
        ORDER BY si.arrival_time ASC
    `;
    
    db.query(query, [eventId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Mettre à jour un item
exports.updateItem = (req, res) => {
    const { id } = req.params;
    const { quantity, arrival_time } = req.body;
    
    const query = 'UPDATE shopping_items SET quantity = ?, arrival_time = ? WHERE id = ?';
    
    db.query(query, [quantity, arrival_time, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Item non trouvé' });
        }
        res.json({ message: 'Item mis à jour avec succès' });
    });
};

// Supprimer un item
exports.deleteItem = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM shopping_items WHERE id = ?';
    
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Item non trouvé' });
        }
        res.json({ message: 'Item supprimé avec succès' });
    });
};