const { body, validationResult } = require('express-validator');

// Règles de validation pour créer un utilisateur
exports.createUserValidator = [
    body('email')
        .notEmpty().withMessage('L\'email est obligatoire')
        .isEmail().withMessage('L\'email doit être valide'),
    body('password')
        .notEmpty().withMessage('Le mot de passe est obligatoire')
        .isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
    body('first_name')
        .notEmpty().withMessage('Le prénom est obligatoire')
        .isLength({ max: 100 }).withMessage('Le prénom ne peut pas dépasser 100 caractères'),
    body('last_name')
        .notEmpty().withMessage('Le nom est obligatoire')
        .isLength({ max: 100 }).withMessage('Le nom ne peut pas dépasser 100 caractères'),
    body('phone')
        .optional()
        .isLength({ max: 20 }).withMessage('Le téléphone ne peut pas dépasser 20 caractères'),
    body('avatar')
        .optional()
        .isURL().withMessage('L\'avatar doit être une URL valide')
];

// Règles de validation pour modifier un utilisateur
exports.updateUserValidator = [
    body('email')
        .optional()
        .isEmail().withMessage('L\'email doit être valide'),
    body('first_name')
        .optional()
        .isLength({ max: 100 }).withMessage('Le prénom ne peut pas dépasser 100 caractères'),
    body('last_name')
        .optional()
        .isLength({ max: 100 }).withMessage('Le nom ne peut pas dépasser 100 caractères'),
    body('phone')
        .optional()
        .isLength({ max: 20 }).withMessage('Le téléphone ne peut pas dépasser 20 caractères'),
    body('avatar')
        .optional()
        .isURL().withMessage('L\'avatar doit être une URL valide')
];

// Middleware pour vérifier les résultats de validation
exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};