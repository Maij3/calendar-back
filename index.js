const express = require("express");
const { dbConnection } = require("./database/config");
const cors = require("cors");
require("dotenv").config();

//Crear el Servidor de Express
const app = express();

//Base de Datos
dbConnection();

//CORS
app.use(cors());

//Directorio Publico
app.use(express.static("public"));
//Lectura y parseo del body
app.use(express.json());
//Rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

//Escuchar peticion
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
