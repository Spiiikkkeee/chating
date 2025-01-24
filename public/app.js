document.addEventListener('DOMContentLoaded', () => {
  const socket = io('https://chating-1-eh40.onrender.com');
  console.log(socket.connected); // Check if the socket is connected

  // Handle chat messages
  const messageInput = document.getElementById('messageInput');
  const sendButton = document.getElementById('sendButton');
  const messagesDiv = document.getElementById('messages');

  sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message) {
      socket.emit('chatMessage', message);
      messageInput.value = '';
    }
  });

  socket.on('chatMessage', (msg) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = msg;
    messageElement.classList.add('chat-message');
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  });

  // Handle music playback
  const playMusicButton = document.getElementById('playMusic');
  const pauseMusicButton = document.getElementById('pauseMusic');
  const backgroundMusic = document.getElementById('backgroundMusic');

  // Play music when the button is clicked
  playMusicButton.addEventListener('click', () => {
    console.log("Play music button clicked!");
    socket.emit('musicControl', 'play');
  });

  // Pause music when the button is clicked
  pauseMusicButton.addEventListener('click', () => {
    console.log("Pause music button clicked!");
    socket.emit('musicControl', 'pause');
  });

  // Listen for music control from server and update the audio element
  socket.on('musicControl', (action) => {
    if (action === 'play') {
      console.log("Playing music...");
      backgroundMusic.play();
    } else if (action === 'pause') {
      console.log("Pausing music...");
      backgroundMusic.pause();
    }
  });
});
