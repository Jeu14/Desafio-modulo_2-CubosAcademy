const { contas, transferencias } = require("../../bancodedados");

const transferir = async (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } =
        req.body;

    if (!numero_conta_destino || !numero_conta_origem || !valor || !senha) {
        return res
            .status(400)
            .json({ mensagem: "Preencha todos os campos obrigatórios" });
    }

    const verificarNumOrigem = contas.find(
        (conta) => conta.numero === Number(numero_conta_origem)
    );

    if (!verificarNumOrigem) {
        return res
            .status(400)
            .json({ mensagem: "Conta de origem não encontrada" });
    }

    const verificarNumDestino = contas.find(
        (conta) => conta.numero === Number(numero_conta_destino)
    );

    if (!verificarNumDestino) {
        return res
            .status(400)
            .json({ mensagem: "Numero de destino não encontrado" });
    }

    if (senha !== verificarNumOrigem.usuario.senha) {
        return res.status(400).json({ mensagem: "senha incorreta" });
    }
    if (valor > verificarNumOrigem.saldo) {
        return res.status(400).json({ mensagem: "Saldo insuficiente" });
    }
    if (numero_conta_origem === numero_conta_destino) {
        return res.status(400).json({
            mensagem: "Você não pode transferir para sua própria conta",
        });
    }
    verificarNumOrigem.saldo -= valor;
    verificarNumDestino.saldo += valor;

    const data = new Date().toLocaleString();

    const registrarTransferencias = {
        data,
        numero_conta_origem,
        numero_conta_destino,
        valor,
    };
    transferencias.push(registrarTransferencias);

    return res
        .status(200)
        .json({ mensagem: "Transferência realizada com sucesso" });
};

module.exports = transferir;
