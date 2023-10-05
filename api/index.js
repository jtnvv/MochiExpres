import express from "express"
import clienteRoutes from "./model/clientes.js"
import adminRoutes from "./model/administradores.js"
import repartidorRoutes from "./model/repartidores.js"


const app = express()

app.use(express.json())
app.use("/api/clientes",clienteRoutes)
app.use("/api/admins",adminRoutes)
app.use("/api/repartidores",repartidorRoutes)


app.get("/test",(req,res) => {
    res.json("Funciona :D!")
})

app.listen(8800, () => {
    console.log("Conectado!")
})
 