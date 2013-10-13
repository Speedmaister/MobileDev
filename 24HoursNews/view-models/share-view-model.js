var app = app || {};

(function(a) {
    var shareVM = kendo.observable({
        partialArticle : {},
        contacts:[],
        performSearch:function(e) {
        }
    });
    
    function onSuccess(contacts) {
        var foundContacts = [];
        for (var i = 0;i < contacts.length;i++) {
            foundContacts.push(contacts[i]);
        }
        console.log("success contacts");
        shareVM.set("contacts", foundContacts);
    }
    
    function onError(error) {
        console.log("Error APPEARD");
         
        console.log(error);
    }
    
    function initShare(e) {
        var article = dataPersister.getArticleById(e.view.params.id);
        var partialArticle = {};
        partialArticle.title = article.title;
        partialArticle.url = article.url;
        shareVM.set("partialArticle", partialArticle);
        kendo.bind(e.view.element, shareVM);
    }  
    
    document.addEventListener("deviceready", function(e) {
        var options = new ContactFindOptions();
        options.filter = "";
        options.multiple = true;
        var fields = ["displayName", "name"];
        navigator.contacts.find(fields, onSuccess, onError, options);
    }, false);
    
    kendo.init($("k-input"));
    a.share = {
        init:initShare
    }
}(app));