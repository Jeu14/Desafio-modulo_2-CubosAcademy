let bancoDeDados = require('../bancodedados')

const validarSenha = async(req, res, next) => {
    const senha_banco = req.query.senha_banco

    if (!senha_banco) {
        return res.status(400).json({mensagem: "Senha não inserida"})
    }
    if (senha_banco !== bancoDeDados.banco.senha) {
        return res.status(401).json({mensagem: "Senha incorreta"})
    }
    next()
}

module.exports = validarSenha