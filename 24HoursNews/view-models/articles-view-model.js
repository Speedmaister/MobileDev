var app = app || {};

(function(a) {
    var articlesVM = kendo.observable({
        articles : [],
        navigateToFullArticle: function(e) {
            app.application.navigate('views/routeView.html?article=' + e.data);
        }
    });
    
    function initArticles(e) {
        dataPersister.getRss().then(function() {
            articlesVM.set("articles", dataPersister.articles);
        });
        
        kendo.bind(e.view.element, articlesVM);
    }                                                
    
    a.articles = {
        init:initArticles
    }
}(app));