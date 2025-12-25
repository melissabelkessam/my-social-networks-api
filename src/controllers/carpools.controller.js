const db = require('../config/database');

// Créer une offre de covoiturage
exports.createCarpool = (req, res) => {
    const { event_id, driver_id, departure_location, departure_time, price, available_seats, max_time_difference } = req.body;
    
    const query = 'INSERT INTO carpools (event_id, driver_id, departure_location, departure_time, price, available_seats, max_time_difference) VALUES (?, ?, ?, ?, ?, ?, ?)';
    
    db.query(query, [event_id, driver_id, departure_location, departure_time, price, available_seats, max_time_difference], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ 
            message: 'Covoiturage créé avec succès',
            carpoolId: result.insertId 
        });
    });
};

// Obtenir les covoiturages d'un événement
exports.getCarpoolsByEvent = (req, res) => {
    const { eventId } = req.params;
    const query = `
        SELECT c.*, u.first_name, u.last_name, u.phone
        FROM carpools c
        JOIN users u ON c.driver_id = u.id
        WHERE c.event_id = ?
        ORDER BY c.departure_time ASC
    `;
    
    db.query(query, [eventId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Mettre à jour un covoiturage
exports.updateCarpool = (req, res) => {
    const { id } = req.params;
    const { departure_location, departure_time, price, available_seats, max_time_difference } = req.body;
    
    const query = 'UPDATE carpools SET departure_location = ?, departure_time = ?, price = ?, available_seats = ?, max_time_difference = ? WHERE id = ?';
    
    db.query(query, [departure_location, departure_time, price, available_seats, max_time_difference, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Covoiturage non trouvé' });
        }
        res.json({ message: 'Covoiturage mis à jour avec succès' });
    });
};

// Supprimer un covoiturage
exports.deleteCarpool = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM carpools WHERE id = ?';
    
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Covoiturage non trouvé' });
        }
        res.json({ message: 'Covoiturage supprimé avec succès' });
    });
};