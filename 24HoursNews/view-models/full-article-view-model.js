var app = app || {};

(function(a) {
    var fullArticleVM = kendo.observable({
        fullArticle : {},
        shareArticalWithContact:function(e) {
            a.kendo.navigate('views/share-view.html#share?id='+fullArticleVM.fullArticle.id);
        }
    });
    
    function initFullArticle(e) {
        var article = dataPersister.getArticleById(e.view.params.id);
        dataPersister.getArticle(article.url).then(function(text) {
            var fullarticle = {
                id:article.id,
                title:article.title,
                content:text.substring(1, text.length - 2),
                imageSource:getImageSource(article.image)
            };
            fullArticleVM.set("fullArticle", fullarticle);
        });
        
        kendo.bind(e.view.element, fullArticleVM);
    }  
    
    function getImageSource(source) {
        var indexOfSrcTag = source.indexOf("src=\"");
        var indexOfLastQuot = source.indexOf("\"", indexOfSrcTag + 5);
        var fakeSrc = source.substr(indexOfSrcTag + 5, indexOfLastQuot - indexOfSrcTag - 4);
        var indexOfUndescore = fakeSrc.lastIndexOf("_");
        var firstHalf = fakeSrc.substr(0, indexOfUndescore + 1);
        var secondHalf = "126.jpg";
        var realSrc = firstHalf + secondHalf;
        return realSrc;
    }
    
    a.fullArticles = {
        init:initFullArticle
    }
}(app));