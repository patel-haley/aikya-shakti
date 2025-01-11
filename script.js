document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (!userInput.trim()) return;

    addMessage(userInput, 'user');

    document.getElementById('user-input').value = '';

    fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => response.json())
    .then(data => {
        addMessage(data.reply, 'bot');
    })
    .catch(error => console.error('Error:', error));
}

function addMessage(message, sender) {
    const chatlogs = document.getElementById('chatlogs');
    const messageElement = document.createElement('p');
    messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageElement.innerText = message;
    chatlogs.appendChild(messageElement);

    chatlogs.scrollTop = chatlogs.scrollHeight;
}
