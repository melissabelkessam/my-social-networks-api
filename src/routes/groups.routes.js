const express = require('express');
const router = express.Router();
const groupsController = require('../controllers/groups.controller');

// Routes pour les groupes
router.post('/', groupsController.createGroup);
router.get('/', groupsController.getAllGroups);
router.get('/:id', groupsController.getGroupById);
router.put('/:id', groupsController.updateGroup);
router.delete('/:id', groupsController.deleteGroup);

// Routes pour les membres
router.post('/:id/members', groupsController.addMember);
router.delete('/:id/members/:userId', groupsController.removeMember);
router.get('/:id/members', groupsController.getGroupMembers);

// Routes pour les admins
router.post('/:id/admins', groupsController.addAdmin);
router.delete('/:id/admins/:userId', groupsController.removeAdmin);

module.exports = router;