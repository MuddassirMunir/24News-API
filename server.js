/**
 * Created by mudasir on 11/11/16.
 */
// modules =================================================
var express        = require('express');
var app            = express();
var cookieParser = require('cookie-parser');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mysql      = require('mysql');
var http = require('http');
var fs = require('fs');
// configuration ===========================================

// config files

var port = 80; // set our port

//Database Connection


// function handleDisconnect() {
//     connection_pool = mysql.createConnection({
//         // host     : 'localhost',
//         // user     : 'root',
//         // password : 'root',
//         // database : 'City42News',
//         // port : "8889"
//         host : 'dvlalicenceservices.co.uk',
//         user     : 'muddassir',
//         password : 'x(MF#+@v-oW?',
//         database : 'City42News',
//         port : "3306"
//     }); // Recreate the connection, since
//                                                     // the old one cannot be reused.
//
//     connection_pool.connect(function(err) {              // The server is either down
//         if(err) {                                     // or restarting (takes a while sometimes).
//             console.log('error when connecting to db:', err);
//             setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
//         }                                     // to avoid a hot loop, and to allow our node script to
//     });                                     // process asynchronous requests in the meantime.
//                                             // If you're also serving http, display a 503 error.
//     connection_pool.on('error', function(err) {
//         console.log('db error', err);
//         if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
//             handleDisconnect();                         // lost due to either server restart, or a
//         } else {                                      // connnection idle timeout (the wait_timeout
//             throw err;                                  // server variable configures this)
//         }
//     });
// }
// handleDisconnect();
var connection_pool = mysql.createPool({
    connectionLimit : 10,
    host : 'dvlalicenceservices.co.uk',
    user     : 'muddassir',
    password : 'x(MF#+@v-oW?',
    database : 'City42News',
    port : "3306"
});

// connection_pool.prototype.releaseConnection = function releaseConnection(connection) {
//     //Use the underlying connection from the mysql-module here:
//     return this.connection_pool.releaseConnection(connection.connection);
// };
app.db_connection = connection_pool;
// connection.connect(function(err) {
//     if (err) {
//         console.error('error connecting: ' + err.stack);
//         return;
//     }
//     console.log('connected as id ' + connection.threadId);
// });

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT

// routes ==================================================
require('./app/controllers')(app);
require('./app/routes')(app);
// start app ===============================================
app.listen(port);
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app