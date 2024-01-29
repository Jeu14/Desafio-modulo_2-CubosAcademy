const { banco, contas } = require("../../bancodedados");

const consultarSaldo = async (req, res) => {
    const { numero_conta, senha } = req.query;

    if (!numero_conta || !senha) {
        return res
            .status(400)
            .json({
                mensagem:
                    "Número da conta ou senha não inserido. Por favor, preencha todos os requisitos",
            });
    }

    const verificarNumeroConta = contas.find(
        (conta) => conta.numero === Number(numero_conta)
    );
    if (!verificarNumeroConta) {
        return res.status(400).json({ mensagem: "Conta não encontrada" });
    }

    if (senha !== verificarNumeroConta.usuario.senha) {
        return res.status(400).json({ mensagem: "Senha incorreta" });
    }

    return res.status(200).json("Saldo: " + verificarNumeroConta.saldo);
};

module.exports = consultarSaldo;
