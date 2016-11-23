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
    app.get('/get-latest-news/:id', newsController.getLatestNews);
    app.get('/get-trending-news', newsController.getTrendingNews);
    app.get('/get-videos', newsController.getVideos);
    app.post('/add-user-news',newsController.UserAddNews);
    app.get('/get-user-news', newsController.getNewsOfUser);
    app.get('*', function(req, res) {
        res.send('This is an illegal URL.');
    });
};