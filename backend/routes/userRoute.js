const express = require('express');
const UserController = require('../controllers/userController');
const router = express.Router();

var userController = new UserController();

router.get('/', async (req, res, next) => await userController.getAllUsers(req, res).catch(next));
router.get('/:id', async (req, res, next) => await userController.getContactDetails(req, res).catch(next));

module.exports = router;