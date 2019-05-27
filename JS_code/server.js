const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyParser = require('body-parser');

// parse all the form data
app.use(bodyParser.urlencoded({extended: true }));

// formate the dates
var dateFormat = require('dateFormat');
var now = new Date();

// view engine 

app.set('view engine', 'ejs');


app.use('/js', express.static(__dirname + 'node_modules/boostrap/dist/js'));
app.use('/js', express.static(__dirname + 'node_modules/tether/dist/js'));
app.use('/js', express.static(__dirname + 'node_modules/jquery/dist/js'));
app.use('/js', express.static(__dirname + 'node_modules/boostrap/dist/css'));


// connecting to the database
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'customers1'
});

const siteTitle = "simple app";
const baseURL = 'http://localhost:3000/';

mysqlConnection.connect((err) => {
    if (!err) {
        console.log('DB connection succeeded');
        console.log('connected as id ' + mysqlConnection.threadId);
    } else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
})

// get a customer
app.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM customers1.customers LIMIT 0, 2500 ',  (err, result, fields) => {
      
        res.render('pages/index', {
            siteTitle : siteTitle,
            pageTitle : "Customer list",
            items : result
    });
});
    });

    // get a customer
app.get('/customer/add', (req, res) => {
        res.render('pages/add-event.ejs', {
            siteTitle : siteTitle,
            pageTitle : "Add a customer",
            items : ''
        });

    });
    // formatting the date
    var date =dateFormat(now, "isoDateTime");
var newdate =date.replace('T', ' ');
newdate = newdate.substr(0,19)
var zero1 =0;
// add a customer
app.post('/customer/add', (req, res) => {
    // post method
    console.log(req);
    var query =  "INSERT INTO customers (email,first_name,last_name,ip,latitude,longitude,created_at) VALUES("
        query +=    " '"+req.body.email+"',";
        query +=    " '"+req.body.first_name+"',";
        query +=    " '"+req.body.last_name+"',";
        query +=    " '"+req.body.ip+"',";
        query +=    " '"+req.body.latitude+"',";
        query +=    " '"+req.body.longitude+"',";
        query +=    " '"+newdate+"')";
        console.log(query);
      /// redirect to the base url
        mysqlConnection.query(query, function(err,result){
            res.redirect(baseURL);
        })
    });
    var date =dateFormat(now, "isoDateTime");
    var newdate =date.replace('T', ' ');
    newdate = newdate.substr(0,19)
    console.log(newdate);
    // search and edit a customer
app.get('/customer/edit/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM customers1.customers WHERE id=? ', [req.params.id], (err, result) => {
        result[0].updated_at = newdate;
        res.render('pages/index', {
            siteTitle : siteTitle,
            pageTitle : "Search and edit" +result[0].email,
            items : result
    });
});
    });
app.listen(3000, () => console.log('Express server is running at port number 3000'));

