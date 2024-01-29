const { contas, depositos } = require("../../bancodedados");

const depositar = async (req, res) => {
    const { numero_conta, valor } = req.body;

    if (!numero_conta) {
        return res.status(400).json({ mensagem: "Insira o número da conta" });
    }

    const identificarConta = contas.find(
        (conta) => conta.numero === numero_conta
    );

    if (!identificarConta) {
        return res.status(400).json({ mensagem: "conta não encontrada" });
    }
    if (!valor) {
        return res.status(400).json({ mensagem: "Insira um valor" });
    }

    if (valor < 1) {
        return res
            .status(400)
            .json({ mensagem: "[Valor inválido] insira um valor maior que 0" });
    }
    identificarConta.saldo += valor;

    const data = new Date().toLocaleString();
    const registrarDepositos = {
        data,
        numero_conta,
        valor,
    };
    depositos.push(registrarDepositos);

    return res.status(200).json({ mensagem: "Depósito realizado com sucesso" });
};

module.exports = depositar;
