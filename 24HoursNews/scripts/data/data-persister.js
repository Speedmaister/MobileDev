window.dataPersister = (function() {
    var baseUrl = "http://localhost:20017/api/";
    var articles = [];
    
    function getArticle(url) {
        var serviceUrl = baseUrl + "html/get?url=" + url;
        return httpRequest.getText(serviceUrl);
    }
    
    function getArticleById(id) {
        var article;
        var i;
        for (i = 0;i < articles.length;i++) {
            if (articles[i].id == id) {
                article = articles[i];
                break;
            }
        }
        
        return article;
    }
    
    function getRss() {
        var promise = new RSVP.Promise(function(resolve, reject) {
            var feed = new google.feeds.Feed("http://www.24chasa.bg/Rss.asp");
            feed.setNumEntries(50);
            feed.load(function(result) {
                if (!result.error) {
                    var i;
                    for (i = 0; i < result.feed.entries.length; i++) {
                        var article = {};
                        article.id = i;
                        article.title = result.feed.entries[i].title;
                        article.url = result.feed.entries[i].link;
                        article.date = result.feed.entries[i].publishedDate;
                        articles.categories = result.feed.entries[i].categories;
                        var image = getImage(result.feed.entries[i].content);
                        if (image) {
                            article.image = image;
                            article.content = getContent(result.feed.entries[i].content);
                        }
                        else {
                            article.content = result.feed.entries[i].content;
                        }
                        articles.push(article);
                    }
                    
                    resolve();
                }
                else {
                    // HANDLE GOOGLE OR RSS FAIL
                    reject();
                }
            });
        });
        
        return promise;
    }
    
    function getContent(content) {
        var indexOfSecondBracket = content.indexOf(">");
        var textContent = content.substr(indexOfSecondBracket + 1, content.length - indexOfSecondBracket - 1);
        return textContent;
    }
    
    function getImage(content) {
        var indexOfFirstBracket = content.indexOf("<");
        if (indexOfFirstBracket != -1) {
            var indexOfSecondBracket = content.indexOf(">", indexOfFirstBracket);
            var image = content.substr(indexOfFirstBracket, indexOfSecondBracket - indexOfFirstBracket + 1);
            return image;
        }
    }
    
    return {
        getArticle:getArticle,
        getArticleById:getArticleById,
        getRss:getRss,
        articles:articles
    }
}());