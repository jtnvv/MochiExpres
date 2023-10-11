import mysql from "mysql";
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_USER,
  DB_PORT
} from "./config.js";

export const db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME
})

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    // Puedes realizar acciones adicionales, como cerrar la aplicación o enviar una respuesta de error HTTP.
  } else {
    console.log('Conexión a la base de datos establecida');
    // La conexión está establecida correctamente, puedes continuar con tus operaciones de base de datos.
  }
});