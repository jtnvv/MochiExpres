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

// // Configuración de la conexión SSH
// const sshConfig = {
//   host: 'ec2-18-212-142-95.compute-1.amazonaws.com',
//   port: 22,
//   username: 'ubuntu',
//   privateKey: require('fs').readFileSync('./ssh-key/ICKJ.pem')
// };

// // Configuración de la conexión a la base de datos MySQL
// const dbConfig = {
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'mochiexpres',
//   port: 3306
// };

// db.connect((err) => {
//   if (err) {
//     console.error('Error al conectar a la base de datos:', err);
//     // Puedes realizar acciones adicionales, como cerrar la aplicación o enviar una respuesta de error HTTP.
//   } else {
//     console.log('Conexión a la base de datos establecida');
//     // La conexión está establecida correctamente, puedes continuar con tus operaciones de base de datos.
//   }
// });

//-

// const ssh2 = require('ssh2');


// const sshConfig = {
//   host: 'ec2-3-80-248-93.compute-1.amazonaws.com',
//   port: 22,
//   username: 'ubuntu',
//   privateKey: require('fs').readFileSync('./ssh-key/ICKJ.pem')
// };

// const tunnelConfig = {
//   srcPort: 3306, // Puerto local
//   srcHost: '127.0.0.1',
//   dstPort: 3306, // Puerto del servidor MySQL en AWS
//   dstHost: 'ec2-3-80-248-93.compute-1.amazonaws.com',
//   localHost: '127.0.0.1',
//   localPort: 3306
// };

// const conn = new ssh2.Client();

// conn.on('ready', () => {
//   conn.forwardOut(
//     tunnelConfig.localHost,
//     tunnelConfig.localPort,
//     tunnelConfig.dstHost,
//     tunnelConfig.dstPort,
//     (err, stream) => {
//       if (err) throw err;
//       // Una vez establecido el túnel SSH, puedes conectar a la base de datos MySQL.
//       const mysql = require('mysql2');

//       const dbConfig = {
//         host: tunnelConfig.localHost,
//         port: tunnelConfig.localPort,
//         user: 'root',
//         password: 'root',
//         database: 'mochiexpres'
//       };

//       const connection = mysql.createConnection(dbConfig);
      
//       connection.connect((err) => {
//         if (err) {
//           console.error('Error al conectar a la base de datos MySQL:', err);
//         } else {
//           console.log('Conexión exitosa a la base de datos MySQL a través de SSH.');
//           // Realiza tus consultas MySQL aquí
//         }
//       });
//       module.exports = connection;
//     }
//   );
// });

// conn.connect(sshConfig);
// conn.on('error', function(err) {
//   console.log(err);
// });
// // export default conn;