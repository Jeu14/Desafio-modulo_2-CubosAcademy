const express = require("express");

const transferir = require("../controladores/transacoes/transferir");
const depositar = require("../controladores/transacoes/depositar");
const saque = require("../controladores/transacoes/sacar");

const rotas = express();

rotas.post("/transacoes/transferir", transferir);
rotas.post("/transacoes/depositar", depositar);
rotas.post("/transacoes/sacar", saque);

module.exports = rotas;
