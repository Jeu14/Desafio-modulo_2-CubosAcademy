const { contas } = require("../../bancodedados");

const excluirConta = async (req, res) => {
    const numero = Number(req.params.numeroConta);

    if (!numero) {
        return res
            .status(400)
            .json({ mensagem: "Insira o número da conta que deseja excluir" });
    }
    if (isNaN(numero)) {
        return res
            .status(400)
            .json({ mensagem: "Este não é um número válido" });
    }
    const indexConta = contas.findIndex((conta) => conta.numero === numero);

    if (indexConta === -1) {
        return res.status(400).json({ mensagem: "Conta não encontrada" });
    }
    if (contas[indexConta].saldo > 0) {
        return res
            .status(400)
            .json({ mensagem: "Só é possível excluir contas com saldo vazio" });
    }

    const contaExcluida = contas.splice(indexConta, 1)[0];
    return res.status(200).json({ mensagem: "Conta excluída com sucesso" });
};

module.exports = excluirConta;
