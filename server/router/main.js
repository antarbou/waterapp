const express = require('express');
const router = express.Router();
const mainController = require('../controllers/main_controller');
const auth=require('./auth')
const src=require('./real.js');
const filler=require('./mockdata.js');


/**
 * get home page
 * 
 */

router.get('/home',auth.authenticate, mainController.homepage);

router.get('/consumer/:id', auth.authenticate,mainController.consumerInfoReadOnly);
router.get('/edit/:id',auth.authenticate, mainController.editFormForConsumer);
router.post('/edit/:id',auth.authenticate, mainController.editAndSaveConsumer);

router.get('/new',auth.authenticate, mainController.newConsumerForm);
router.post('/new',auth.authenticate, mainController.editAndSaveConsumer);

router.get('/printList', auth.authenticate,mainController.printList);
router.get('/printInvoices', auth.authenticate,mainController.printInvoices);


router.get('/about', auth.authenticate,mainController.about);

//router.post('/searchAddress', auth.authenticate,mainController.searchAddress);
router.post('/search', auth.authenticate,mainController.search);
router.get('/logout', mainController.logout);

router.get('/editMany',  auth.authenticate,mainController.editMany);
router.post('/saveRow', auth.authenticate, mainController.saveRow);




//filler.insertDatas(src.db);
module.exports = router;