const express = require("express");

const validarSenha = require("../intermediarios/validarsenha");
const criarConta = require("../controladores/contas/criarconta");
const listarContas = require("../controladores/contas/listarcontas");
const atualizarUsuario = require("../controladores/contas/atualizarusuario");
const excluirConta = require("../controladores/contas/excluirconta");
const consultarSaldo = require("../controladores/contas/consultarsaldo");
const extrato = require("../controladores/contas/extrato");

const rotas = express();

rotas.get("/contas", validarSenha, listarContas);
rotas.post("/contas", criarConta);
rotas.delete("/contas/:numeroConta", excluirConta);
rotas.put("/contas/:numeroConta/usuario", atualizarUsuario);
rotas.get("/contas/saldo", consultarSaldo);
rotas.get("/contas/extrato", extrato);

module.exports = rotas;
