import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql2';
import path from 'path';

dotenv.config({ path: './config/config.env' });

const app = express();
app.use(express.static('public'));
app.use('/pics', express.static('public'));
app.set('maxHttpHeaderSize', 64 * 1024);




var connection = mysql.createConnection({
    host: "finalproject2.c2o85ykvznww.eu-central-1.rds.amazonaws.com",
    user: "admin",
    password: "Final2023",
    database: "Library"
});


function connection_to_sql(){
    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL database: ' + err.stack);
            return;
        }
        console.log('Connected to MySQL database with ID ' + connection.threadId);
    });
}

//
// // Example query
// connection.query('SELECT * FROM my_table', (err, results, fields) => {
//     if (err) throw err;
//     console.log(results);
// });
//
// // Close the connection when done
// connection.end();


app.get('/', (req, res) => res.send('Server running'));

app.get('/home', function(req, res) {
    res.sendFile(process.cwd()+ '/client/public/index.html');
});

app.get('/f1', function(req, res) {
    // Execute a query to retrieve data from the database
    connection.query('SELECT * FROM Tables Where Floor = 1', function(err, results) {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(500).json({ error: 'Error executing query' });
            return;
        }
        // Format the results as a JSON object and send the response
        res.json({ data: results });
    });
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

app.get('/scan', function(req, res) {
    res.sendFile(process.cwd()+ '/client/public/pages/Scanning.html');
});

app.get('/ext', function(req, res) {
    res.sendFile(process.cwd()+ '/client/public/pages/extension.html');
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));