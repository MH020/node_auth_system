import { Router } from 'express';
import auth from './../util/encrypter.js'
import session from 'express-session';
import db from '../db/connection.js'
import sendMail from '../util/nodeMailer.js';
import crypto from 'crypto'
import { buildSingupEmail } from '../util/emailPageBuilder.js';


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


router.post("/api/login",async (req,res)=> {
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



//new user
router.post('/api/user', async (req, res) => {
    try {
        const { username, password, email } = req.body;

        if (!username || !password || !email) {
            return res.status(400).send({ message: "missing fields" });
        }

        const usedEmail = await db.all('SELECT * FROM users WHERE email = ?', email)
        if(usedEmail.length > 0){
            return res.status(409).send({ message: "email allready in use"});
        }

        const code = crypto.randomBytes(3);
        const verificationCode = code.toString("hex")
        console.log(verificationCode)

        const expires = Date.now() + (15 * 60 * 1000);

        const hashPassword = await auth.encryptPassword(password);

        await db.run(
            `INSERT INTO users (username, password, email, verified, verification_code, verification_timed_out)
             VALUES (?, ?, ?, 0, ?, ?)`,
            [username, hashPassword, email, verificationCode, expires]
        );

        const singupHTML = buildSingupEmail(username,verificationCode)

        //email needs to be sent
        sendMail(email,"vaify signup","welcome to the front soldier",singupHTML)

        return res.status(201).send({ message: "User created successfully" });
 

    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "server error", error: error.message });
    }
});

export default router