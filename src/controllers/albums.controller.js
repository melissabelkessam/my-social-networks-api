const db = require('../config/database');

// Créer un album
exports.createAlbum = (req, res) => {
    const { event_id, name } = req.body;
    
    const query = 'INSERT INTO photo_albums (event_id, name) VALUES (?, ?)';
    
    db.query(query, [event_id, name], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ 
            message: 'Album créé avec succès',
            albumId: result.insertId 
        });
    });
};

// Obtenir les albums d'un événement
exports.getAlbumsByEvent = (req, res) => {
    const { eventId } = req.params;
    const query = 'SELECT * FROM photo_albums WHERE event_id = ?';
    
    db.query(query, [eventId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Supprimer un album
exports.deleteAlbum = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM photo_albums WHERE id = ?';
    
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Album non trouvé' });
        }
        res.json({ message: 'Album supprimé avec succès' });
    });
};

// Ajouter une photo
exports.addPhoto = (req, res) => {
    const { albumId } = req.params;
    const { user_id, photo_url, caption } = req.body;
    
    const query = 'INSERT INTO photos (album_id, user_id, photo_url, caption) VALUES (?, ?, ?, ?)';
    
    db.query(query, [albumId, user_id, photo_url, caption], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ 
            message: 'Photo ajoutée avec succès',
            photoId: result.insertId 
        });
    });
};

// Obtenir les photos d'un album
exports.getPhotos = (req, res) => {
    const { albumId } = req.params;
    const query = `
        SELECT p.*, u.first_name, u.last_name
        FROM photos p
        JOIN users u ON p.user_id = u.id
        WHERE p.album_id = ?
        ORDER BY p.created_at DESC
    `;
    
    db.query(query, [albumId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Supprimer une photo
exports.deletePhoto = (req, res) => {
    const { photoId } = req.params;
    const query = 'DELETE FROM photos WHERE id = ?';
    
    db.query(query, [photoId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Photo non trouvée' });
        }
        res.json({ message: 'Photo supprimée avec succès' });
    });
};

// Ajouter un commentaire
exports.addComment = (req, res) => {
    const { photoId } = req.params;
    const { user_id, comment } = req.body;
    
    const query = 'INSERT INTO photo_comments (photo_id, user_id, comment) VALUES (?, ?, ?)';
    
    db.query(query, [photoId, user_id, comment], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ 
            message: 'Commentaire ajouté avec succès',
            commentId: result.insertId 
        });
    });
};

// Obtenir les commentaires d'une photo
exports.getComments = (req, res) => {
    const { photoId } = req.params;
    const query = `
        SELECT pc.*, u.first_name, u.last_name
        FROM photo_comments pc
        JOIN users u ON pc.user_id = u.id
        WHERE pc.photo_id = ?
        ORDER BY pc.created_at ASC
    `;
    
    db.query(query, [photoId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Supprimer un commentaire
exports.deleteComment = (req, res) => {
    const { commentId } = req.params;
    const query = 'DELETE FROM photo_comments WHERE id = ?';
    
    db.query(query, [commentId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Commentaire non trouvé' });
        }
        res.json({ message: 'Commentaire supprimé avec succès' });
    });
};