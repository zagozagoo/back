const express = require('express');
const PersonController = require('../controller/PersonController');
const router = express.Router();
router
    .get('/', PersonController.getAllPeople)
    .post('/', PersonController.create)
    .delete('/:id', PersonController.deleteById)
module.exports = router;