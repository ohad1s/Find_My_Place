import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: './config/config.env' });

const app = express();

app.get('/', (req, res) => res.send('Server running'));

app.get('/home', function(req, res) {
    res.sendFile(process.cwd()+ '/client/public/index.html');
});

app.get('/f1', function(req, res) {
    res.sendFile(process.cwd()+ '/client/public/pages/f1.html');
});

app.get('/f2', (req, res) => {
    res.sendFile(process.cwd()+ '/client/public/pages/f2.html');
});

app.get('/f3', function(req, res) {
    res.sendFile(process.cwd()+ '/client/public/pages/f3.html');
});
app.get('/f4', function(req, res) {
    res.sendFile(process.cwd()+ '/client/public/pages/f4.html');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));