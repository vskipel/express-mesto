const router = require('express').Router();
const getError = require('../controllers/error')

router.get('*', getError)
router.post('*', getError)

module.exports = router;


