const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyParser = require('body-parser');
const router = express.Router();
app.use(bodyParser.json());
var dateFormat = require('dateFormat');
var now = new Date();

/*
app.use(function(req, res, next){
	res.locals.connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : 'password',
		database : 'customers1'
	});
	res.locals.connection.connect();
	next();
});*/

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'customers1',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err) {
        console.log('DB connection succeeded');
        console.log('connected as id ' + mysqlConnection.threadId);
    } else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
})

app.listen(3000, () => console.log('Express server is running at port number 3000'));



mysqlConnection.query('SELECT email FROM customers1.customers ;', function (error, results, fields) {
    if (error) throw error;
    // `results` is an array with one element for every statement in the query:
    console.log(results[0]); // [{1: 1}]
});

app.get('/customer', (req, res) => {
    mysqlConnection.query('SELECT * FROM customers1.customers', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//
// get a customer
app.get('/customer/id/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM customers1.customers WHERE id=? ', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

// get a customer by email
app.get('/customer/email/:email', (req, res) => {
    mysqlConnection.query('SELECT * FROM customers1.customers WHERE email;=? ', [req.params.email], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});
// delete an employee by id
app.delete('/customer/id/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM customers1.customers WHERE id=? ', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send('Deleted successfully');
            console.log('deleted ' + res.affectedRows + ' rows');
        } else
            console.log(err);
    })
});

// delete an employee by email
app.delete('/customer/email/:email', (req, res) => {
    mysqlConnection.query('DELETE FROM customers1.customers WHERE email=? ', [req.params.email], (err, rows, fields) => {
        if (!err) {
            res.send('Deleted successfully');
            console.log('deleted ' + res.affectedRows + ' rows');
        } else
            console.log(err);
    })
});
// insert a customer
/*
app.post('/customer/add/email/:email/fisrtname/:first_name/last_name/:last_name/ip/:ip/latitude/:latitude/longitude/:longitude', (req, res) => {
    mysqlConnection.query('INSERT INTO customers1.customers  ' ,[req.params.email],
    [req.params.first_name], [req.params.last_name], [req.params.ip], [req.params.latitude], [req.params.longitude], dateFormat(req.params.created_at, "yyyy-mm-dd"),  
    (err, rows, fields) => {
        if (!err) {
            res.send('Inserted successfully');
            console.log('Inserted ' + res.affectedRows + ' rows');
        } else
            console.log(err);
    })
});
*/
var date =dateFormat(now, "isoDateTime");
var newdate =date.replace('T', ' ');
newdate = newdate.substr(0,19)
console.log(newdate);
//Insert a customer
app.post('/customer', (req, res) => {
    let cus = req.body;
    var sql = "SET @id = ?;SET @email = ?;SET @first_name = ?;SET @last_name = ?;SET @ip = ?; \
    SET @latitude = ?; SET @longitude = ?; SET @created_at = '" + newdate + "'; SET @updated_at = NULL; \
     CALL CustomerAddOrUpdate(@id,@email,@first_name,@last_name,@ip,@latitude,@longitude,@created_at, @updated_at);";
    mysqlConnection.query(sql, [cus.id,cus.email,cus.first_name, cus.last_name, cus.ip, 
     cus.latitude, cus.longitude,cus.created_at], (err, rows, fields) => {
        if (!err)
        res.send("Inserted ${cus.email} successfully");
        else
            console.log(err);
    })
});


var date =dateFormat(now, "isoDateTime");
var newdate =date.replace('T', ' ');
newdate = newdate.substr(0,19)
console.log(newdate);
//update a customer
app.put('/customer', (req, res) => {
    let cus = req.body;
    var sql = "SET @id = ?;SET @email = ?;SET @first_name = ?;SET @last_name = ?;SET @ip = ?; \
    SET @latitude = ?; SET @longitude = ?; SET @updated_at = '" + newdate + "'; \
     CALL CustomerAddOrUpdate(@id,@email,@first_name,@last_name,@ip,@latitude,@longitude,@created_at, @updated_at);";
    mysqlConnection.query(sql, [cus.id,cus.email,cus.first_name, cus.last_name, cus.ip, 
     cus.latitude, cus.longitude,cus.created_at], (err, rows, fields) => {
        if (!err)
            res.send("updated successfully");
        else
            console.log(err);
    })
});

