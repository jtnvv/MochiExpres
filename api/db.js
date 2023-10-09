import mysql from "mysql"

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database:"mochiexpres"
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