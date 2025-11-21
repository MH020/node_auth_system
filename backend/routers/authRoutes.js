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

router.post('/user', async (req, res) => {
    try {
        const { username, password, email } = req.body;

        if (!username || !password || !email) {
            return res.status(400).send({ message: "Missing required fields" });
        }

        const hashPassword = await auth.encryptPassword(password);

        await db.run(
            'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
            [username, hashPassword, email]
        );

        return res.status(201).send({ message: "User created successfully" });

        //email needs to be sent 

    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Server error", error: error.message });
    }
});

export default router