const { contas, saques } = require("../../bancodedados");
const saque = async (req, res) => {
    const { numero_conta, valor, senha } = req.body;

    if (!numero_conta) {
        return res.status(400).json({ mensagem: "Insira o número da conta" });
    }
    if (!valor) {
        return res
            .status(400)
            .json({ mensagem: "Insira o valor a ser sacado" });
    }
    if (!senha) {
        return res.status(400).json({ mensagem: "Insira a senha de acesso" });
    }
    const encontrarConta = contas.find(
        (conta) => conta.numero === numero_conta
    );

    if (!encontrarConta) {
        return res.status(400).json({ mensagem: "Conta não encontrada" });
    }
    if (encontrarConta.usuario.senha !== senha) {
        return res.status(400).json({ mensagem: "Senha incorreta" });
    }
    if (encontrarConta.saldo < valor) {
        return res.status(400).json({ mensagem: "Saldo insuficiente" });
    }

    const data = new Date().toLocaleString();
    const registrarSaques = {
        data,
        numero_conta,
        valor,
    };
    saques.push(registrarSaques);

    encontrarConta.saldo -= valor;
    return res.status(200).json({ mensagem: "Saque realizado com sucesso" });
};

module.exports = saque;
