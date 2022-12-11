const noteController = require('../controllers/note.controller.js');
const Router = require('express');
const router = new Router();

router.post('/', noteController.create);
router.get('/', noteController.getAll);
router.get('/:id', noteController.getById);
router.delete('/delete/:id', noteController.deleteById);
router.delete('/delete/', noteController.deleteAll);

module.exports = router;
