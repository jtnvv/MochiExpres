import express from "express";
import clienteRoutes from "./model/clientes.js";
import adminRoutes from "./model/administradores.js";
import repartidorRoutes from "./model/repartidores.js";
import authRoutes from "./model/auth.js";
import usersRoutes from "./model/usuarios.js";
import solicitudesenvioRoutes from "./model/solicitudesenvio.js";
import enviosRoutes from "./model/envios.js";
import authRecoverRoutes from "./model/auth_pass.js";
import cookieParser from "cookie-parser";
import { PORT } from "./config.js";

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use("/api/clientes", clienteRoutes)
app.use("/api/admins", adminRoutes)
app.use("/api/repartidores", repartidorRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/auth_pass", authRecoverRoutes)
app.use("/api/usuarios", usersRoutes)
app.use("/api/solicitudesenvio", solicitudesenvioRoutes);
app.use("/api/envios", enviosRoutes);



app.listen(PORT, () => {
    console.log("Conectado! ", PORT);
})
