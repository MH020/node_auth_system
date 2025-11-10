import bcrypt from 'bcryptjs'

async function encryptPassword(password){

    if(typeof password !== "string"){
        throw new Error("password is not a string yo")
    }

    encryptedPassword = await bcrypt.hash(password,15)

    return encryptedPassword

}

async function validatePassword(password) {
        if(typeof password !== "string"){
        throw new Error("password is not a string yo")
    }

    
    
}