const db = require('../config/database');

// Créer un groupe
exports.createGroup = (req, res) => {
    const { name, description, icon, cover_photo, type, allow_members_post, allow_members_create_events } = req.body;
    
    const query = 'INSERT INTO groups_table (name, description, icon, cover_photo, type, allow_members_post, allow_members_create_events) VALUES (?, ?, ?, ?, ?, ?, ?)';
    
    db.query(query, [name, description, icon, cover_photo, type, allow_members_post, allow_members_create_events], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ 
            message: 'Groupe créé avec succès',
            groupId: result.insertId 
        });
    });
};

// Obtenir tous les groupes
exports.getAllGroups = (req, res) => {
    const query = 'SELECT * FROM groups_table';
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Obtenir un groupe par ID
exports.getGroupById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM groups_table WHERE id = ?';
    
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Groupe non trouvé' });
        }
        res.json(results[0]);
    });
};

// Mettre à jour un groupe
exports.updateGroup = (req, res) => {
    const { id } = req.params;
    const { name, description, icon, cover_photo, type, allow_members_post, allow_members_create_events } = req.body;
    
    const query = 'UPDATE groups_table SET name = ?, description = ?, icon = ?, cover_photo = ?, type = ?, allow_members_post = ?, allow_members_create_events = ? WHERE id = ?';
    
    db.query(query, [name, description, icon, cover_photo, type, allow_members_post, allow_members_create_events, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Groupe non trouvé' });
        }
        res.json({ message: 'Groupe mis à jour avec succès' });
    });
};

// Supprimer un groupe
exports.deleteGroup = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM groups_table WHERE id = ?';
    
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Groupe non trouvé' });
        }
        res.json({ message: 'Groupe supprimé avec succès' });
    });
};

// Ajouter un membre
exports.addMember = (req, res) => {
    const { id } = req.params;
    const { user_id } = req.body;
    
    const query = 'INSERT INTO group_members (group_id, user_id) VALUES (?, ?)';
    
    db.query(query, [id, user_id], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'Ce membre existe déjà dans le groupe' });
            }
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Membre ajouté avec succès' });
    });
};

// Retirer un membre
exports.removeMember = (req, res) => {
    const { id, userId } = req.params;
    const query = 'DELETE FROM group_members WHERE group_id = ? AND user_id = ?';
    
    db.query(query, [id, userId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Membre non trouvé dans ce groupe' });
        }
        res.json({ message: 'Membre retiré avec succès' });
    });
};

// Obtenir les membres d'un groupe
exports.getGroupMembers = (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT u.id, u.email, u.first_name, u.last_name, gm.joined_at 
        FROM group_members gm
        JOIN users u ON gm.user_id = u.id
        WHERE gm.group_id = ?
    `;
    
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Ajouter un admin
exports.addAdmin = (req, res) => {
    const { id } = req.params;
    const { user_id } = req.body;
    
    const query = 'INSERT INTO group_admins (group_id, user_id) VALUES (?, ?)';
    
    db.query(query, [id, user_id], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'Cet admin existe déjà' });
            }
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Admin ajouté avec succès' });
    });
};

// Retirer un admin
exports.removeAdmin = (req, res) => {
    const { id, userId } = req.params;
    const query = 'DELETE FROM group_admins WHERE group_id = ? AND user_id = ?';
    
    db.query(query, [id, userId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Admin non trouvé' });
        }
        res.json({ message: 'Admin retiré avec succès' });
    });
};