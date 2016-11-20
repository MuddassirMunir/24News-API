/**
 * Created by mudasir on 11/11/16.
 */
module.exports = function(app) {
//	// server routes ===========================================================
//	// handle things like api calls
//    // ***** Defining Controllers *****

    var newsController = app.controllers.News;
    app.get('/get-categories', newsController.getCategories);
    app.get('/get-news/:id', newsController.getNewsOfCategory);
    app.get('*', function(req, res) {
        res.send('Illegal URL...');
    });

};