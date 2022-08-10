const socket = io()

let pathname = window.location.pathname
let email = pathname.split('/')[3]
console.log(email)



fetch('/req').then(r=>r.json()).then(user=>{

    //socket.emit('createCart')

    let imgDiv = document.getElementById('img')
    let img = document.createElement('img')
    img.src = user.file
    imgDiv.append(img)
    let nameDiv = document.getElementById('name')
    let name = document.createElement('p')
    name.innerHTML = `Hello ${user.name}`
    nameDiv.append(name)
    
    let messageForm = document.getElementById('messageForm')
    let sendBox = document.getElementById('sendBox')
    let replyEmail = document.getElementById('replyEmail')
    let type
    if(user.isAdmin == 'true'){
        type = 'system'
    }else{
        type = 'client'
    }
    const handleChatForm = (e)=>{
        e.preventDefault()
        
        if(sendBox.value.trim().length > 0){
            socket.emit('message',{
                email:user.isAdmin == 'false'?user.username:replyEmail.value,
                message:sendBox.value,
                type: type,
                filter:email
            })
            sendBox.value = ''
            replyEmail.value = ''
        }
        else {console.log('fallo')}
    }

    messageForm.addEventListener('submit',(e)=>{
        handleChatForm(e)
        if(e.key === 'Enter'){
            handleChatForm(e)
        }
    })

})

socket.on('prueba',async data => {
    console.log('ok')
    socket.emit('private',email)
})

    
socket.on('privateMessages', async data => {
    console.log(data)
    let messageBox = document.getElementById('chatBox')

    let messages = ''
    
    data.forEach(message => {
        messages = messages+`<span class="email">${message.email}</span> <span class="type">${message.type}</span> <span class="date">${message.date}</span> dice <span class="message">${message.body}</span> <br>`
    });

    messageBox.innerHTML = messages
})