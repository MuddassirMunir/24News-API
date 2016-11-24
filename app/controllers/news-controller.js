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
        connection.query('SELECT Category_ID,Category_Name from Categories', function(err, rows) {
            if (err){
                res.send(err);
            }
            else
                res.send(rows);
        });
    }
    Controller.getNewsOfCategory = function (req, res) {
        connection.query('SELECT * FROM `News` WHERE Category_ID='+req.params.id, function(err, rows) {
            if (err){
                res.send(err);
            }
            else
                res.send(rows);
        });
    }
    Controller.getLatestNews = function (req, res) {
        connection.query('select * from Latest_News', function(err, rows) {
            if (err){
                res.send(err);
            }
            else
                console.log(rows)
            res.send(rows);
        });
    }
    Controller.getTrendingNews = function (req, res) {
        connection.query("select * from News where Trending='YES'", function(err, rows) {
            if (err){
                console.log(err)
                res.send(err);
            }
            else
                console.log(rows)
            res.send(rows);
        });
    }
    Controller.getVideos = function (req, res) {
        connection.query("select News_ID,News_Title,Video_Link from News where Video_Link IS NOT NULL", function(err, rows) {
            if (err){
                res.send(err);
            }
            else
                res.send(rows);
        });
    }
    Controller.UserAddNews = function (req, res) {
        function getDateTime() {

            var date = new Date();

            var hour = date.getHours();
            hour = (hour < 10 ? "0" : "") + hour;

            var min  = date.getMinutes();
            min = (min < 10 ? "0" : "") + min;

            var sec  = date.getSeconds();
            sec = (sec < 10 ? "0" : "") + sec;

            var year = date.getFullYear();

            var month = date.getMonth() + 1;
            month = (month < 10 ? "0" : "") + month;

            var day  = date.getDate();
            day = (day < 10 ? "0" : "") + day;

            return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

        }
        var post = {
            User_News_Title : req.body.title,
            User_News_Content : req.body.news_content,
            Image_Link : req.body.image_link,
            Video_Link : req.body.video_link,
            User_News_Time_Stamp : getDateTime()
        }
        connection.query("Insert INTO User_News SET ? ",post, function(err, rows) {
            if (err){
                res.send(err);
            }
            else
                res.send(rows);
        });
    }
    Controller.getNewsOfUser = function (req, res) {
        connection.query('select * from User_News', function(err, rows) {
            if (err){
                res.send(err);
            }
            else
                res.send(rows);
        });
    }
    return Controller
}
