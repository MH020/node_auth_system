import bcrypt from 'bcryptjs'

export async function encryptPassword(password){

    if(typeof password !== "string"){
        throw new Error("password is not a string yo")
    }

   const encryptedPassword = await bcrypt.hash(password,15)

    return encryptedPassword

}

async function validatePassword(password) {
        if(typeof password !== "string"){
        throw new Error("password is not a string yo")
    } 
}


export default {
    encryptPassword,
    validatePassword
}