// elementos login
const login = document.querySelector('.login')
const loginForm = document.querySelector('.login__form')
const loginInput = document.querySelector('.login__input')

// elementos chat
const chat = document.querySelector('.chat')
const chatForm = document.querySelector('.chat__form')
const chatInput = document.querySelector('.chat__input')
const chatMessages = document.querySelector('.chat__messages')

const usuario = {id: '', nome: '', cor: ''}

const colors = [
    'cadetblue',
    'darkgoldenrod',
    'cornflowerblue',
    'darkkhaki',
    'hotpink',
    'gold'
]

function gerarCorAleatoria() {
    const randomIndex = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]
}

let websocket

function minhasMensagens(conteudo) {
    const div = document.createElement('div') // criar um elemento div no HTML
    div.classList.add('minhas__mensagens') // dar uma classe a esse elemento
    div.innerHTML = conteudo // o conteudo da div é o (conteudo: chatInput.value)

    return div
}

function outrasMensagens(conteudo, remetente, remetenteCor) {
    const div = document.createElement('div')
    const span = document.createElement('span')

    div.classList.add('outras__mensagens')
    span.classList.add('mensagem__remetente')
    span.style.color = remetenteCor

    div.appendChild(span)

    span.innerHTML = remetente
    div.innerHTML += conteudo

    return div
}

function rolarTela() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    })
}

const processMessage = ({ data }) =>{
    const { userId, userName, userColor, conteudo } = JSON.parse(data)

    const mensagem = userId == usuario.id ? minhasMensagens(conteudo) : outrasMensagens(conteudo, userName, userColor)

    chatMessages.appendChild(mensagem)
    rolarTela()
}

const logar = (event) => {
    event.preventDefault() // para a página não recarregar quando dar submit
    
    usuario.id = crypto.randomUUID() // gera um ID aletório
    usuario.nome = loginInput.value
    usuario.cor = gerarCorAleatoria()

    login.style.display = 'none'
    chat.style.display = 'flex'

    websocket = new WebSocket('ws://localhost:8080') // cria conexão com o servidor
    websocket.onmessage = processMessage

    chatInput.focus()
}

function enviarMensagem(event) {
    event.preventDefault()

    const mensagem = {
        userId: usuario.id,
        userName: usuario.nome,
        userColor: usuario.cor,
        conteudo: chatInput.value
    }

    websocket.send(JSON.stringify(mensagem))

    chatInput.value = ''
}

loginForm.addEventListener('submit', logar)
chatForm.addEventListener('submit', enviarMensagem)