const io = require('socket.io-client');
const axios = require('axios');

const socket = io('http://localhost:3000');

socket.on('connect', () => {
    console.log('Connected to WebSocket server:', socket.id);

    setInterval(async () => {
        try {
            await axios.post('http://localhost:3000/url', {
                url: 'https://classcalc.com',
                socketId: socket.id,
            });
            console.log('URL sent for shortening...');
        } catch (error) {
            console.error('Error during POST request:', error.response?.data || error.message);
        }
    }, 2000);
});

socket.on('shortened_url', (data) => {
    console.log('Received shortened URL:', data.shortenedUrl);

    socket.emit('acknowledge', { shortenedUrl: data.shortenedUrl });
    console.log('Acknowledgment sent.');
});


socket.on('rate_limit_exceeded', (data) => {
    console.log('Rate limited exceeded:', data.message);
});
