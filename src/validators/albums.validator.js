const { body, validationResult } = require('express-validator');

exports.createAlbumValidator = [
    body('event_id')
        .notEmpty().withMessage('L\'ID de l\'événement est obligatoire')
        .isInt().withMessage('event_id doit être un nombre entier'),
    body('name')
        .notEmpty().withMessage('Le nom est obligatoire')
        .isLength({ max: 255 }).withMessage('Le nom ne peut pas dépasser 255 caractères')
];

exports.addPhotoValidator = [
    body('user_id')
        .notEmpty().withMessage('L\'ID de l\'utilisateur est obligatoire')
        .isInt().withMessage('user_id doit être un nombre entier'),
    body('photo_url')
        .notEmpty().withMessage('L\'URL de la photo est obligatoire')
        .isURL().withMessage('photo_url doit être une URL valide'),
    body('caption')
        .optional()
];

exports.addCommentValidator = [
    body('user_id')
        .notEmpty().withMessage('L\'ID de l\'utilisateur est obligatoire')
        .isInt().withMessage('user_id doit être un nombre entier'),
    body('comment')
        .notEmpty().withMessage('Le commentaire est obligatoire')
];

exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};