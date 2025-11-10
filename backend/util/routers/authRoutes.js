import { Router } from 'express';
import auth from './../encrypter'

const router = Router(); 

router.post('/newLogin',async (req,res) =>{
    const {username, password, email} = req.body
    aencrytedPassword = await auth.encryptPassword(password)

    
})