const db = require('../config/database');

// Créer un utilisateur
exports.createUser = (req, res) => {
    const { email, password, first_name, last_name, phone, avatar } = req.body;
    
    const query = 'INSERT INTO users (email, password, first_name, last_name, phone, avatar) VALUES (?, ?, ?, ?, ?, ?)';
    
    db.query(query, [email, password, first_name, last_name, phone, avatar], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'Cet email existe déjà' });
            }
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ 
            message: 'Utilisateur créé avec succès',
            userId: result.insertId 
        });
    });
};

// Obtenir tous les utilisateurs
exports.getAllUsers = (req, res) => {
    const query = 'SELECT id, email, first_name, last_name, phone, avatar, created_at FROM users';
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Obtenir un utilisateur par ID
exports.getUserById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT id, email, first_name, last_name, phone, avatar, created_at FROM users WHERE id = ?';
    
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        res.json(results[0]);
    });
};

// Mettre à jour un utilisateur
exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { email, first_name, last_name, phone, avatar } = req.body;
    
    const query = 'UPDATE users SET email = ?, first_name = ?, last_name = ?, phone = ?, avatar = ? WHERE id = ?';
    
    db.query(query, [email, first_name, last_name, phone, avatar, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        res.json({ message: 'Utilisateur mis à jour avec succès' });
    });
};

// Supprimer un utilisateur
exports.deleteUser = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM users WHERE id = ?';
    
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        res.json({ message: 'Utilisateur supprimé avec succès' });
    });
};