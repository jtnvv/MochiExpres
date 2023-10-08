import express from "express"
import clienteRoutes from "./model/clientes.js"
import adminRoutes from "./model/administradores.js"
import repartidorRoutes from "./model/repartidores.js"


const app = express()

app.use("/cliente",clienteRoutes)
app.use("/api/admins",adminRoutes)
app.use("/api/repartidores",repartidorRoutes)



app.listen(8800, () => {
    console.log("Conectado!")
})
 