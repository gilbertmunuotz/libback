var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

/* GET home page. */
router.get('/', userController.checkConnection);


/* POST books. */
router.post('/api/post', userController.postBooks);


/* GET All books. */
router.get('/api/get', userController.getBooks);


/* GET Specific Book By Id. */
router.get('/api/get/:id', userController.getSingleBook);


/* Update Book By Id. */
router.put('/api/updateBook/:id', userController.updateBook);


/* Delete Book. */
router.delete('/api/deleteBook/:id', userController.deleteABook);

module.exports = router;