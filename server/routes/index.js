const Router = require('express');
const router = new Router();
const noteRouter = require('./note.routes');

router.use('/notes', noteRouter);

module.exports = router;
