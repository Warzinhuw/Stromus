const express = require("express");
const bodyParser = require("body-parser"); // Necessário para interpretar o corpo das requisições HTTP
const cors = require("cors");
const ArtistaRoutes = require("./src/api/routes/ArtistaRoute")
const app = express();

//Configuração dos middlewares
app.use(cors());
app.use(bodyParser.json()); // Converterá qualquer corpo em JSON em um objeto javascript

// //Configuração das rotas da API
// app.get("/", (req, res) =>{
//     res.send("Express server");
//     res.end();
// });
app.use(ArtistaRoutes);

//Exporta o aplicativo express configurado
module.exports = app;