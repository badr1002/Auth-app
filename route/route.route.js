const express = require('express');
const router = express.Router();
const routeControlles = require('../app/controllers/route.controller');
const auth = require('../app/middleware/auth');

router.post('/add', routeControlles.addRoute)
router.post('/:id/add', routeControlles.addRole)

module.exports = router;