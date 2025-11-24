import 'dotenv/config'
import express from 'express'
import authRouthes from './routers/authRoutes.js'
import path from 'path'
import helmet from 'helmet';
import session from 'express-session';

const app = express(); 

app.use(express.json())

app.use(express.static('./../frontend/dist'))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


app.use(authRouthes)


app.get("/", (req,res) => {
    res.send({data:"hello"}) 
})

app.get("/{*splat}", (req, res) => {
    res.sendFile(path.resolve("../frontend/dist/index.html")) 
});

app.all("/{*splat}", (req, res) => {
    res.status(404).send({ data: "Didn't match with a route" });
});


const PORT = 8080
app.listen(PORT, () => {
    console.log('Server is running on port:', PORT); 
});