const express = require('express');
const router = express.Router();
const UserControlles = require('../app/controllers/user.controller');
const auth = require('../app/middleware/auth');

router.post('/register',UserControlles.register)
router.post('/login',UserControlles.login)
router.get('/active/:key', UserControlles.activateUser)

router.post('/forget/password', UserControlles.getPassword)
router.post('/check/code',UserControlles.checkCode)
router.patch('/set/password',auth,UserControlles.setPassword)


router.get('/me',auth,UserControlles.me)
router.get('/dashboard',auth,UserControlles.me)

router.delete('/logout',auth,UserControlles.logout)
router.delete('/logoutAll', auth, UserControlles.logoutAll)

router.patch('/edit',auth,UserControlles.editProfile)



module.exports = router;