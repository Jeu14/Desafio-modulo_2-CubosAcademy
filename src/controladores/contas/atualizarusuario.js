const bancoDeDados = require("../../bancodedados");
const { contas } = require("../../bancodedados");

const atualizarUsuario = async (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const numeroConta = req.params.numeroConta;

    const encontrarUsuario = bancoDeDados.contas.find((conta) => {
        return conta.numero === Number(numeroConta);
    });

    if (!encontrarUsuario) {
        return res
            .status(400)
            .json({ mensagem: "[ERRO] Insira um numero de usuario" });
    }

    if (!nome && !cpf && !data_nascimento && !telefone && !email && !senha) {
        return res
            .status(400)
            .json({
                mensagem: "Insira pelo menos um dos dados que deseja atualizar",
            });
    }

    if (email) {
        const emailExistente = contas.find(
            (conta) => conta.usuario.email === email
        );

        if (emailExistente) {
            return res.status(400).json({ mensagem: "Este email já existe" });
        }
    }
    if (cpf) {
        const cpfExistente = contas.find((conta) => conta.usuario.cpf === cpf);

        if (cpfExistente) {
            return res.status(400).json({ mensagem: "Este CPF já existe" });
        }
    }

    if (nome) {
        encontrarUsuario.usuario.nome = nome;
    }

    if (data_nascimento) {
        encontrarUsuario.usuario.data_nascimento = data_nascimento;
    }

    if (telefone) {
        encontrarUsuario.usuario.telefone = telefone;
    }

    if (senha) {
        encontrarUsuario.usuario.senha = senha;
    }

    return res.status(201).json({ mensagem: "Conta atualizada com sucesso" });
};

module.exports = atualizarUsuario;
