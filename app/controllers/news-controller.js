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
        connection.query('SELECT term_id,name from c24e_terms', function(err, rows, fields) {
            if (err){
                res.send(err);
            }
            else
                res.send(rows);
        });
    }
    Controller.getCategory = function (req, res) {
        connection.query('SELECT ID,post_author,post_title,post_content,guid from c24e_posts where post_author='+req.params.id, function(err, rows, fields) {
            if (err){
                res.send(err);
            }
            else
                res.send(rows);
        });
    }
    return Controller
}
