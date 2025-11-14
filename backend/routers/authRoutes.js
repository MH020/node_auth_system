import 'dotenv/config';
import { Router } from 'express';
import auth from './../encrypter'
import session from 'express-session';

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

const router = Router(); 


router.get('/user', async (req,res) => {

})

router.post('/user',async (req,res) =>{
    const {username, password, email} = req.body
    hashPassword = await auth.encryptPassword(password)
  
})

export default router