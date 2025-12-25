const db = require('../config/database');

// Créer un sondage
exports.createPoll = (req, res) => {
    const { event_id, organizer_id, title } = req.body;
    
    const query = 'INSERT INTO polls (event_id, organizer_id, title) VALUES (?, ?, ?)';
    
    db.query(query, [event_id, organizer_id, title], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ 
            message: 'Sondage créé avec succès',
            pollId: result.insertId 
        });
    });
};

// Obtenir les sondages d'un événement
exports.getPollsByEvent = (req, res) => {
    const { eventId } = req.params;
    const query = 'SELECT * FROM polls WHERE event_id = ?';
    
    db.query(query, [eventId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Supprimer un sondage
exports.deletePoll = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM polls WHERE id = ?';
    
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Sondage non trouvé' });
        }
        res.json({ message: 'Sondage supprimé avec succès' });
    });
};

// Ajouter une question
exports.addQuestion = (req, res) => {
    const { pollId } = req.params;
    const { question_text } = req.body;
    
    const query = 'INSERT INTO poll_questions (poll_id, question_text) VALUES (?, ?)';
    
    db.query(query, [pollId, question_text], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ 
            message: 'Question ajoutée avec succès',
            questionId: result.insertId 
        });
    });
};

// Obtenir les questions d'un sondage
exports.getQuestions = (req, res) => {
    const { pollId } = req.params;
    const query = 'SELECT * FROM poll_questions WHERE poll_id = ?';
    
    db.query(query, [pollId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Ajouter une option de réponse
exports.addOption = (req, res) => {
    const { questionId } = req.params;
    const { option_text } = req.body;
    
    const query = 'INSERT INTO poll_options (question_id, option_text) VALUES (?, ?)';
    
    db.query(query, [questionId, option_text], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ 
            message: 'Option ajoutée avec succès',
            optionId: result.insertId 
        });
    });
};

// Soumettre une réponse
exports.submitResponse = (req, res) => {
    const { questionId } = req.params;
    const { user_id, option_id } = req.body;
    
    const query = 'INSERT INTO poll_responses (question_id, user_id, option_id) VALUES (?, ?, ?)';
    
    db.query(query, [questionId, user_id, option_id], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'Vous avez déjà répondu à cette question' });
            }
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Réponse enregistrée avec succès' });
    });
};

// Obtenir les résultats d'un sondage
exports.getPollResults = (req, res) => {
    const { pollId } = req.params;
    const query = `
        SELECT 
            pq.id as question_id,
            pq.question_text,
            po.id as option_id,
            po.option_text,
            COUNT(pr.id) as vote_count
        FROM poll_questions pq
        LEFT JOIN poll_options po ON pq.id = po.question_id
        LEFT JOIN poll_responses pr ON po.id = pr.option_id
        WHERE pq.poll_id = ?
        GROUP BY pq.id, po.id
        ORDER BY pq.id, po.id
    `;
    
    db.query(query, [pollId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};