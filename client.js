const io = require('socket.io-client');
const axios = require('axios');

const socket = io('http://localhost:3000');

socket.on('connect', async () => {
    console.log('Connected to WebSocket server:', socket.id);

    try {
        await axios.post('http://localhost:3000/url', {
            url: 'https://classcalc.com',
            socketId: socket.id,
        });
        console.log('URL sent for shortening...');
    } catch (error) {
        console.error('Error during POST request:', error.response?.data || error.message);
    }
});

socket.on('shortened_url', (data) => {
    console.log('Received shortened URL:', data.shortenedUrl);

    socket.emit('acknowledge', { shortenedUrl: data.shortenedUrl });
    console.log('Acknowledgment sent.');
});
