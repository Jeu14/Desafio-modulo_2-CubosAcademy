let bancoDeDados = require("../../bancodedados");
const { contas } = require("../../bancodedados");
let numero = 1;

const criarConta = async (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!cpf) {
        return res.status(400).json({ mensagem: "cpf não inserido" });
    }
    if (cpf.length !== 11) {
        return res.status(400).json({ mensagem: "cpf inválido" });
    }
    if (!email) {
        return res.status(400).json({ mensagem: "email não inserido" });
    }
    if (!telefone || !data_nascimento || !nome || !senha) {
        return res
            .status(400)
            .json({ mensagem: "[ERRO] Preencha os itens requisitados" });
    }
    const cpfExistente = contas.find((conta) => conta.usuario.cpf == cpf);
    if (cpfExistente) {
        return res.status(400).json({ mensagem: "cpf já existe" });
    }
    const emailExistente = contas.find((conta) => conta.usuario.email == email);
    if (emailExistente) {
        return res.status(400).json({ mensagem: "email já existe" });
    }

    const novaConta = {
        numero: numero++,
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha,
        },
    };

    bancoDeDados.contas.push(novaConta);
    return res.status(201).json(novaConta);
};

module.exports = criarConta;
