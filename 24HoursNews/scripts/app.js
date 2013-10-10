var app = app || {};

(function (a) {
    google.load("feeds", "1");
    
    document.addEventListener("deviceready", function () {
        a = new kendo.mobile.Application(document.body);
    }, false);
})(app);