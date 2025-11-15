import { Router } from 'express';
import auth from './../util/encrypter.js'
import session from 'express-session';


const router = Router(); 

router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


router.get('/user', async (req,res) => {

})

router.post('/user',async (req,res) =>{
    const {username, password, email} = req.body
    hashPassword = await auth.encryptPassword(password)
  
})

export default router