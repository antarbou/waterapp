const express = require('express');
const auth=require('./auth');
const router = express.Router();

const mck=require('./mockdata');

const admin = require('../controllers/admin/admin_controller');






router.get('/', admin.homepage,);//if the token already exisr it will pass through
router.post('/signin', admin.signin,);

router.get('/register', admin.registerForm,);
router.post('/register', admin.registerPost);


router.get('/dashBoard', auth.authenticate,admin.dashBoard);
router.post('/dashBoard/:id', auth.authenticate,admin.editUserInfo);


//mck.createUser('agent','azerty');
module.exports=router;
