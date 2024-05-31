const socket = io()

socket.on('connect', () => {
    console.log('Connected to server')
  })

  socket.on('message', (data) => {
    console.log(data)
  })

// Získání přístupu k mikrofonu pomocí getUserMedia
navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => {
    // Vytvoření objektu MediaRecorder pro záznam hlasových dat
    const mediaRecorder = new MediaRecorder(stream);

    // Nastavení callbacku pro událost dataavailable
    mediaRecorder.ondataavailable = event => {
      // Odeslat hlasová data na server pomocí Socket.IO
      socket.emit('voice_data', {
        room: 2,
        user_id: '1',
        voice_data: event.data
      });
    };

    // Spuštění záznamu hlasových dat
    mediaRecorder.start();
  })
  .catch(error => {
    console.error('Chyba při získávání přístupu k mikrofonu:', error);
  });

document.getElementById('test').addEventListener('click', () => {
  socket.emit('join_call', {room: 2})  
})