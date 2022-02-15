//express 
const express = require('express');
const pendudukController = require('../controllers/penduduk.controller');

//new router
const router = new express.Router();

//router endpoint 
router.get('/index', pendudukController.index);
router.post('/add', pendudukController.add);
router.delete('/delete', pendudukController.delete);
router.put('/update', pendudukController.put);

module.exports = router;

