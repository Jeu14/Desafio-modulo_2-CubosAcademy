const {
    contas,
    transferencias,
    saques,
    depositos,
} = require("../../bancodedados");

const extrato = async (req, res) => {
    const { numero_conta, senha } = req.query;

    if (!numero_conta || !senha) {
        return res.status(400).json({
            mensagem:
                "Número da conta ou senha não inseridos. Por favor, preencha todos os requisitos",
        });
    }

    const conta = contas.find((conta) => conta.numero === Number(numero_conta));

    if (!conta) {
        return res.status(400).json({ mensagem: "Conta não encontrada" });
    }

    if (senha !== conta.usuario.senha) {
        return res.status(400).json({ mensagem: "Senha incorreta" });
    }

    const transferenciasEnviadas = transferencias.filter(
        (transferencia) => transferencia.numero_conta_origem == numero_conta
    );

    const transferenciasRecebidas = transferencias.filter(
        (transferencia) => transferencia.numero_conta_destino == numero_conta
    );

    const depositosContas = depositos.filter(
        (deposito) => deposito.numero_conta == numero_conta
    );

    const saquesContas = saques.filter(
        (saque) => saque.numero_conta == numero_conta
    );

    const extrato = {
        depositos: depositosContas,
        saques: saquesContas,
        transferenciasEnviadas,
        transferenciasRecebidas,
    };

    return res.status(200).json(extrato);
};

module.exports = extrato;
