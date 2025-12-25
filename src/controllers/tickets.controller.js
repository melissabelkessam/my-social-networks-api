const db = require('../config/database');

// Créer un type de billet
exports.createTicketType = (req, res) => {
    const { event_id, name, price, quantity } = req.body;
    
    const query = 'INSERT INTO ticket_types (event_id, name, price, quantity, available_quantity) VALUES (?, ?, ?, ?, ?)';
    
    db.query(query, [event_id, name, price, quantity, quantity], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ 
            message: 'Type de billet créé avec succès',
            ticketTypeId: result.insertId 
        });
    });
};

// Obtenir les types de billets d'un événement
exports.getTicketTypesByEvent = (req, res) => {
    const { eventId } = req.params;
    const query = 'SELECT * FROM ticket_types WHERE event_id = ?';
    
    db.query(query, [eventId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Mettre à jour un type de billet
exports.updateTicketType = (req, res) => {
    const { id } = req.params;
    const { name, price, quantity } = req.body;
    
    const query = 'UPDATE ticket_types SET name = ?, price = ?, quantity = ?, available_quantity = ? WHERE id = ?';
    
    db.query(query, [name, price, quantity, quantity, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Type de billet non trouvé' });
        }
        res.json({ message: 'Type de billet mis à jour avec succès' });
    });
};

// Supprimer un type de billet
exports.deleteTicketType = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM ticket_types WHERE id = ?';
    
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Type de billet non trouvé' });
        }
        res.json({ message: 'Type de billet supprimé avec succès' });
    });
};

// Acheter un billet
exports.purchaseTicket = (req, res) => {
    const { ticket_type_id, first_name, last_name, address } = req.body;
    
    // Vérifier la disponibilité
    db.query('SELECT available_quantity FROM ticket_types WHERE id = ?', [ticket_type_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Type de billet non trouvé' });
        }
        if (results[0].available_quantity <= 0) {
            return res.status(400).json({ error: 'Plus de billets disponibles' });
        }
        
        // Acheter le billet
        const insertQuery = 'INSERT INTO purchased_tickets (ticket_type_id, first_name, last_name, address) VALUES (?, ?, ?, ?)';
        
        db.query(insertQuery, [ticket_type_id, first_name, last_name, address], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            
            // Décrémenter la quantité disponible
            db.query('UPDATE ticket_types SET available_quantity = available_quantity - 1 WHERE id = ?', [ticket_type_id], (err) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.status(201).json({ 
                    message: 'Billet acheté avec succès',
                    ticketId: result.insertId 
                });
            });
        });
    });
};

// Obtenir les achats d'un événement
exports.getPurchasesByEvent = (req, res) => {
    const { eventId } = req.params;
    const query = `
        SELECT pt.*, tt.name as ticket_type_name, tt.price
        FROM purchased_tickets pt
        JOIN ticket_types tt ON pt.ticket_type_id = tt.id
        WHERE tt.event_id = ?
        ORDER BY pt.purchase_date DESC
    `;
    
    db.query(query, [eventId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};