/*
- fiz instalação das bibliotecas "ws" e "dotenv" com o comando "npm install ws"
*/

const { WebSocketServer } = require('ws')   // biblioteca para criar o servidor
const dotenv = require('dotenv')

dotenv.config()

const jschat = new WebSocketServer({ port: process.env.PORT || 8080 })

jschat.on('connection', (usuario) => {      // usuário se conecta
    usuario.on('error', console.error)      // erro se não conseguir conectar

    usuario.on('message', (mensagem) => {       // quando o usuário manda mensagem
        jschat.clients.forEach((mensagensParaTodos) => mensagensParaTodos.send(mensagem.toString())) // mensagem parece para todos usuários
    })

    console.log('Usuário conectado')
})