const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');
const { catchErrors } = require('../handlers/errorHandlers');

router.post('/match', catchErrors(matchController.create));

module.exports = router;