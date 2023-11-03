import express from 'express';
const appdealers = express()
import { db } from '../db.js';
import cors from 'cors';

appdealers.use(cors());
appdealers.use(express.json());

export const paginaInicio = (req, res) => {
    res.send("Pagina de inicio")
}

appdealers.listen(3006,()=>{
    console.log("Corriendo en 3006, lista de repartidores")
})

appdealers.get("/dealers", (req,res) => {
    db.query('SELECT * from repartidor',
        (err, result)=> {
            if(err){
                console.log(err);
            }
            else {
                res.send(result)
            }
        }
    )
})