import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql2';
import path from 'path';


dotenv.config({path: './config/config.env'});
const app = express();
app.use(express.static('public'));
app.use('/pics', express.static('public'));
app.set('maxHttpHeaderSize', 64 * 1024);
app.use(express.json());


var connection = mysql.createConnection({
    host: "finalproject2.c2o85ykvznww.eu-central-1.rds.amazonaws.com",
    user: "admin",
    password: "Final2023",
    database: "Library"
});


function connection_to_sql() {
    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL database: ' + err.stack);
            return;
        }
        console.log('Connected to MySQL database with ID ' + connection.threadId);
    });
}


app.get('/', (req, res) => res.send('Server running'));

app.get('/home', function (req, res) {
    res.json({1: 'home'});
});

app.get('/f1', function (req, res) {
    // Execute a query to retrieve data from the database
    connection.query('SELECT * FROM Tables Where Floor = 1', function (err, results) {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(500).json({error: 'Error executing query'});
            return;
        }
        // Format the results as a JSON object and send the response
        res.json({data: results});
    });
});

app.get('/f2', function (req, res) {
    // Execute a query to retrieve data from the database
    connection.query('SELECT * FROM Tables Where Floor = 2', function (err, results) {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(500).json({error: 'Error executing query'});
            return;
        }
        // Format the results as a JSON object and send the response
        res.json({data: results});
    });
});

app.get('/f3', function (req, res) {
    // Execute a query to retrieve data from the database
    connection.query('SELECT * FROM Tables Where Floor = 3', function (err, results) {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(500).json({error: 'Error executing query'});
            return;
        }
        // Format the results as a JSON object and send the response
        res.json({data: results});
    });
});
app.get('/f4', function (req, res) {
    // Execute a query to retrieve data from the database
    connection.query('SELECT * FROM Tables Where Floor = 4', function (err, results) {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(500).json({error: 'Error executing query'});
            return;
        }
        // Format the results as a JSON object and send the response
        res.json({data: results});
    });
});

app.post('/submit', function (req, res) {
    const floorId = req.body.floor_id;
    const tableId = req.body.table_id;
    const id = req.body.id;
    const email = req.body.email;
    const time = req.body.time;

    const currentDate = new Date();
    const [hour, minute] = time.split(":");
    const newDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        currentDate.getHours() + hour,
        currentDate.getMinutes() + minute
    );

    const currentDateSQL = currentDate.toISOString().slice(0, 19).replace('T', ' ');
    const newDateSQL = newDate.toISOString().slice(0, 19).replace('T', ' ');
    console.log(newDate);
    console.log(newDateSQL);

    connection.query(`UPDATE Tables
                  SET CurrentStudents = CurrentStudents + 1
                  WHERE Floor = ${floorId} AND TableNum = ${tableId}`,
        function (err, results) {
            if (err) {
                console.error('Error executing query: ' + err.stack);
                res.status(500).json({error: 'Error executing query'});
                return;
            }
            // Format the results as a JSON object and send the response
            connection.query(`INSERT INTO Students (ID, Email,EntryTime,LeaveTime,Floor,Table_num)
                                  VALUES (${id},'${email}','${currentDateSQL}','${newDateSQL}',${floorId},${tableId});`,
                function (err, results) {
                    if (err) {
                        console.error('Error executing query: ' + err.stack);
                        res.status(500).json({error: 'Error executing query'});
                        return;
                    }
                    // Format the results as a JSON object and send the response
                    res.json("Ciiii");
                });
        });
});

app.get('/ext', function (req, res) {
    res.sendFile(process.cwd() + '/client/public/pages/extension.html');
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));