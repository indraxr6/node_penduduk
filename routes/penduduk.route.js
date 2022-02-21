//express 
const express = require('express');
const pendudukController = require('../controllers/penduduk.controller');
const secret = '#@$%^&*()_+';

//new router
const router = new express.Router();
const {checkToken} = require('../auth/token_validation');

//router endpoint 
router.get('/index', checkToken, pendudukController.index);
router.post('/add', checkToken, pendudukController.add);
router.delete('/delete', checkToken, pendudukController.delete);
router.put('/update', checkToken, pendudukController.put);

//user endpoint
router.post('/daftar', pendudukController.registrasi);
router.get('/login', pendudukController.login);
router.get('/logout', pendudukController.logout);

router.get('/getuser', checkToken, pendudukController.getUser); 

module.exports = router;