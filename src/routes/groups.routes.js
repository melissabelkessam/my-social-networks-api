const express = require('express');
const router = express.Router();
const groupsController = require('../controllers/groups.controller');
const { createGroupValidator, updateGroupValidator, addMemberValidator, validate } = require('../validators/groups.validator');

// Routes pour les groupes
router.post('/', createGroupValidator, validate, groupsController.createGroup);
router.get('/', groupsController.getAllGroups);
router.get('/:id', groupsController.getGroupById);
router.put('/:id', updateGroupValidator, validate, groupsController.updateGroup);
router.delete('/:id', groupsController.deleteGroup);

// Routes pour les membres
router.post('/:id/members', addMemberValidator, validate, groupsController.addMember);
router.delete('/:id/members/:userId', groupsController.removeMember);
router.get('/:id/members', groupsController.getGroupMembers);

// Routes pour les admins
router.post('/:id/admins', addMemberValidator, validate, groupsController.addAdmin);
router.delete('/:id/admins/:userId', groupsController.removeAdmin);

module.exports = router;