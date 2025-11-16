import 'dotenv/config'
import express from 'express'
import authRouthes from './routers/authRoutes.js'
import path from 'path'
import helmet from 'helmet';

const app = express(); 

app.use(express.static('./../frontend/dist'))


app.use(authRouthes)


app.get("/", (req,res) => {
    res.send({data:"hello"}) 
})

app.get("/login", (req,res) => {
    res.sendFile(path.resolve("../frontend/dist/index.html")) 
})


const PORT = 8080
app.listen(PORT, () => {
    console.log('Server is running on port:', PORT); 
});