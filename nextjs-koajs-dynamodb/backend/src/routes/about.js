const Router = require('koa-router');
const { getAboutDetails } = require('../controllers/about.js');

const router = new Router();

router.get('/', getAboutDetails);

module.exports = router;