# Desafio Back-end - Módulo 2 - Cubos Academy

API para o banco digital Cubos Bank.

## Funcionalidades
-   Listagem de contas bancárias
-   Criar conta bancária
-   Atualizar os dados do usuário da conta bancária
-   Excluir uma conta bancária
-   Depositar em uma conta bancária
-   Sacar de uma conta bancária
-   Transferir valores entre contas bancárias
-   Consultar saldo da conta bancária
-   Emitir extrato bancário 


## **Persistências dos dados**

Neste desafio, os dados serão persistidos em memória!



### **Listar contas bancárias**

#### **Exemplo de requisição**

```javascript
// GET /contas?senha_banco=senha-do-banco
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201
// 2 contas encontradas
[
    {
        numero: "1",
        saldo: 0,
        usuario: {
            nome: 'Foo Bar',
            cpf: '00011122233',
            data_nascimento: '2021-03-15',
            telefone: '71999998888',
            email: 'foo@bar.com',
            senha: '1234'
        }
    },
    {
        numero: "2",
        saldo: 1000,
        usuario: {
            nome: 'Foo Bar 2',
            cpf: '00011122234',
            data_nascimento: '2021-03-15',
            telefone: '71999998888',
            email: 'foo@bar2.com',
            senha: '12345'
        }
    }
]

// HTTP Status 200 / 201
// nenhuma conta encontrada
[]
```

### **Criar conta bancária**

#### **Exemplo de requisição**

```javascript
// POST /contas
{
    "nome": "Foo Bar",
    "email": "foo@bar.com",
    "cpf": "00011122233",
    "data_nascimento": "15/03/2001",
    "telefone": "11999998888",
    "senha": "1234"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201
// sucesso ao cadastrar
{
    numero:  "1",
    saldo: 0,
    usuario: {
        nome: "Foo Bar",
        cpf: "00011122233",
        data_nascimento: "2001-03-15",
        telefone: "11999998888",
        email: "foo@bar.com",
        senha: "1234"
    }
}

// HTTP Status 400, 404
// erro ao cadastrar
{
    mensagem: 'Mensagem de erro'
}
```

### **Atualizar usuário da conta bancária**

#### **Exemplos de requisição**

```javascript
// PUT /contas/1/usuario
// informando apenas um campo para atualizar
{
    "nome": "Bar Foo"
}

// informando todos os campos para atualizar
{
    "nome": "Bar Foo",
    "email": "bar@foo.com",
    "cpf": "33322211100",
    "data_nascimento": "03/05/2010",
    "telefone": "11988889999",
    "senha": "4321"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201
// sucesso ao atualizar
{
    mensagem: "Conta atualizada com sucesso"
}

// HTTP Status 400, 404
// erro ao atualizar
{
    mensagem: "Mensagem de erro"
}
```

### **Excluir Conta**

#### **Exemplo de requisição**

```javascript
// DELETE /contas/1
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201
// sucesso ao excluir
{
    mensagem: "Conta excluída com sucesso"
}

// HTTP Status 400, 404
// erro ao excluir
{
    mensagem: "Mensagem de erro"
}
```

### **Depositar**

#### **Exemplo de requisição**

```javascript
// POST /transacoes/depositar
{
    "numero_conta": "1",
    "valor": 10000
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201
// sucesso ao depositar
{
    mensagem: "Depósito realizado com sucesso"
}

// HTTP Status 400, 404
// erro ao depositar
{
    mensagem: "Mensagem de erro"
}
```

#### **Exemplo do registro de um depósito**

```javascript
{
    data: "2021-08-10 23:40:35",
    numero_conta: "1",
    valor: 10000
}
```

### **Sacar**

#### **Exemplo de requisição**

```javascript
// POST /transacoes/sacar
{
    "numero_conta": "1",
    "valor": 10000,
    "senha": "1234"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201
// sucesso ao sacar
{
    mensagem: "Saque realizado com sucesso"
}

// HTTP Status 400, 404
// erro ao sacar
{
    mensagem: "Mensagem de erro"
}
```

#### **Exemplo do registro de um saque**

```javascript
{
    data: "2021-08-10 23:40:35",
    numero_conta: "1",
    valor: 10000
}
```

### **Transferir**

#### **Exemplo de requisição**

```javascript
// POST /transacoes/transferir
{
    "numero_conta_origem": "1",
    "numero_conta_destino": "1",
    "valor": 10000,
    "senha": "1234"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201
// sucesso ao transferir
{
    mensagem: "Transferência realizado com sucesso"
}

// HTTP Status 400, 404
// erro ao transferir
{
    mensagem: "Mensagem de erro"
}
```

#### **Exemplo do registro de uma transferência**

```javascript
{
    data: "2021-08-10 23:40:35",
    numero_conta_origem: "1",
    numero_conta_destino: "2",
    valor: 10000
}
```

### **Consultar Saldo**

#### **Exemplo de requisição**

```javascript
// GET /contas/saldo?numero_conta=numero-da-conta&senha=senha-da-conta
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201
// sucesso ao obter saldo
{
    saldo: 10000
}

// HTTP Status 400, 404
// erro ao obter saldo
{
    mensagem: "Mensagem de erro"
}
```

### Extrato

#### **Exemplo de requisição**

```javascript
// GET /contas/extrato?numero_conta=numero-da-conta&senha=senha-da-conta
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200
// sucesso ao obter extrato
{
  depositos: [
    {
      data: "2021-08-18 20:46:03",
      numero_conta: "1",
      valor: 10000
    },
    {
      data: "2021-08-18 20:46:06",
      numero_conta: "1",
      valor: 10000
    }
  ],
  saques: [
    {
      data: "2021-08-18 20:46:18",
      numero_conta: "1",
      valor: 1000
    }
  ],
  transferenciasEnviadas: [
    {
      data: "2021-08-18 20:47:10",
      numero_conta_origem: "1",
      numero_conta_destino: "2",
      valor: 5000
    }
  ],
  transferenciasRecebidas: [
    {
      data: "2021-08-18 20:47:24",
      numero_conta_origem: "2",
      numero_conta_destino: "1",
      valor: 2000
    },
    {
      data: "2021-08-18 20:47:26",
      numero_conta_origem: "2",
      numero_conta_destino: "1",
      valor: 2000
    }
  ]
}

// HTTP Status 400, 404
// erro ao obter extrato
{
    mensagem: 'Mensagem do erro!'
}
```