window.dataPersister = (function() {
    var baseUrl = "http://htmlparserapi.apphb.com/api/";
    var weatherUrl = "http://htmlparserapi.apphb.com/api/weather/get?url=http://api.openweathermap.org/data/2.1/find/name?q=";
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
                    clearCache();
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
    
    function clearCache() {
        var i;
        var length = articles.length;
        for (i=0;i < length;i++) {
            articles.pop();
        }
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

    function getWeatherReport(city, country) {
        var query = city.replace(/[\s]/, "") + "," + country;
        var url = weatherUrl+query;
        return httpRequest.getJson(url);
    }
    
    return {
        getWeather:getWeatherReport,
        getArticle:getArticle,
        getArticleById:getArticleById,
        getRss:getRss,
        articles:articles
    }
}());