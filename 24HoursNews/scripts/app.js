var app = app || {};

(function (a) {
    google.load("feeds", "1");
    
    document.addEventListener("deviceready", function () {
        var kendoApp = new kendo.mobile.Application(document.body);
        a.kendo = kendoApp;
    }, false);
})(app);