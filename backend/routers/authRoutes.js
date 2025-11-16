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

function isLoggedIn(req,res,next){
    if(req.session.user){
        return next(); 
    }
    res.status(401).send({message: "you need to be logged in to acess this content"})
}


router.get('/user', async (req,res) => {

})


app.post("/login",(req,res)=> {
    const {username, password, email} = req.body
    res.status(200).send({message: "login"})

})

router.post('/user',async (req,res) =>{
    const {username, password, email} = req.body
    hashPassword = await auth.encryptPassword(password)
  
})

export default router