import express from "express";
import clienteRoutes from "./model/clientes.js";
import adminRoutes from "./model/administradores.js";
import repartidorRoutes from "./model/repartidores.js";
import authRoutes from "./model/auth.js";
import cookieParser from "cookie-parser";

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use("/api/cliente",clienteRoutes)
app.use("/api/admins",adminRoutes)
app.use("/api/repartidores",repartidorRoutes)
app.use("/api/auth",authRoutes)



app.listen(8800, () => {
    console.log("Conectado!")
})
 