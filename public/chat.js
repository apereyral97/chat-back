const socket = io();
const message = document.getElementById('message');
const username = document.getElementById('username');
const action = document.getElementById('actions');
const btn = document.getElementById('send');
const output = document.getElementById('output');

btn.addEventListener('click', () => {
    socket.emit('chat:message', {
        message: message.value,
        username: username.value
    })
})

message.addEventListener('keypress', () => {
    socket.emit('chat:typing', username.value)
})

socket.on('chat:message', (data) => {
    output.innerHTML += `
    <p>
        <strong>${data.username}</strong>: ${data.message}
    </p>
    `;
})

socket.on('chat:typing', (data) => {
   action.innerHTML = `<p><em>${data} is typing...</em></p>`;
})