const {Router} = require('express');
const { recibirUrl, redireccionar } = require('../controllers/url.controller');

const router = Router();

router.post('/shorten', recibirUrl);


router.get('/:code', redireccionar);


module.exports = router;