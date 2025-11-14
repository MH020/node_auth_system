import express from 'express'
import authRouthes from './routers/authRoutes'

app.use(authRouthes)

const app = express(); 

app.get("/", (req,res) => {
    res.send({data:"hello"}) 
})

app.get("/login",(req,res)=> {
    
})

const PORT = 8080
app.listen(PORT, () => {
    console.log('Server is running on port:', PORT); 
});