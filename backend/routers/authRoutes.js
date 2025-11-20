import { Router } from 'express';
import auth from './../util/encrypter.js'
import session from 'express-session';
import db from '../db/connection.js'


const router = Router(); 


router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

function isLoggedIn(req,res,next){
    if(req.session.user){
        return next(); 
    }
    res.status(401).send({message: "you need to be logged in to acess this content"})
}


router.get('/user', async (req,res) => {

})


router.post("/login",async (req,res)=> {
    const {password, email} = req.body
    const result = await db.all('SELECT * FROM users WHERE email = ?', email)
    const user = result[0]
    
    console.log(result)
    if (result.length == 0 || !auth.validatePassword(password, user.password)){
        return res.status(401).send({message: "incorrect"})
    }
    req.session.user = {
        id: user.id,
        name: user.username
    };
    return res.status(200).send({ message: "login successful" });
})

router.post('/user',async (req,res) =>{
    const {username, password, email} = req.body
    hashPassword = await auth.encryptPassword(password)
  
})

export default router