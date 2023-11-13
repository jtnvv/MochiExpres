import mysql from "mysql";
// import mysql2 from 'mysql2';
// import { Client } from 'ssh2';

import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_USER,
  DB_PORT
} from "./config.js";

const db_config =
{
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME
}
// export const db = mysql.createConnection({
//   host: DB_HOST,
//   user: DB_USER,
//   password: DB_PASSWORD,
//   database: DB_NAME
// })

// db.connect((err) => {
//   if (err) {
//     console.error('Error al conectar a la base de datos:', err);
//     // Puedes realizar acciones adicionales, como cerrar la aplicación o enviar una respuesta de error HTTP.
//   } else {
//     console.log('Conexión a la base de datos establecida');
//     // La conexión está establecida correctamente, puedes continuar con tus operaciones de base de datos.
//   }
// });
export const db = mysql.createPool(db_config);

function handleDisconnect() {
  

  db.getConnection(function(err) {
    if (err) {
      console.error('Error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000);
    }else{
      console.log('Conexión a la base de datos establecida');
    }
  });

  db.on('error', function(err) {
    console.error('DB error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();


