var app = app || {};

(function(a) {
    var articlesVM = kendo.observable({
        articles : [],
        navigateToFullArticle: function(e) {
            a.kendo.navigate('views/full-article.html#full-article?id=' + e.data.id);
        }
    });
    
    function initArticles(e) {
        dataPersister.getRss().then(function() {
            console.log(dataPersister.articles);    
            articlesVM.set("articles", dataPersister.articles);
        });
        
        kendo.bind(e.view.element, articlesVM);
    }                                                
    
    a.articles = {
        init:initArticles
    }
}(app));