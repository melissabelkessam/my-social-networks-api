const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const { createUserValidator, updateUserValidator, validate } = require('../validators/users.validator');

// Routes pour les utilisateurs
router.post('/', createUserValidator, validate, usersController.createUser);
router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);
router.put('/:id', updateUserValidator, validate, usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;