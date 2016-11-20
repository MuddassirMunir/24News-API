/**
 * Created by mudasir on 11/11/16.
 */
module.exports = function(app) {

    var mysql = require("mysql")
    console.log("this" + app.db_connection)
    var connection = app.db_connection;
    var fs = require('fs');
    var Controller = {
        name: 'News'
    }
    //****************************************   APIs  ****************************************
    Controller.getCategories = function (req, res) {
        connection.query('SELECT Category_ID,Category_Name from Categories', function(err, rows, fields) {
            connection.releaseConnection(c);
            if (err){
                res.send(err);
            }
            else
                res.send(rows);
        });
        // connection.release();

    }
    Controller.getNewsOfCategory = function (req, res) {
        connection.query('SELECT * FROM `News` WHERE Category_ID='+req.params.id, function(err, rows, fields) {
            if (err){
                res.send(err);
            }
            else
                res.send(rows);
        });
    }
    // connection.release();
    return Controller
}
