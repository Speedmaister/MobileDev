var app = app || {};

(function (a) {
    google.load("feeds", "1");
    
    document.addEventListener("deviceready", function () {
        var kendoApp = new kendo.mobile.Application(document.body);
        a.kendo = kendoApp;
       /* var i;
            for (i=2;i <= 8;i++) {
            sqlite.deleteData(i);
        }*/
        sqlite.getById(2, function(tx, rs) {
            if (rs.rows.length == 0) {
                sqlite.addData({id:2,url:"http://en.xn--icne-wqa.com/images/icones/1/4/weather-storm-2.png"});
                sqlite.addData({id:3,url:"http://joinfu.com/img/drizzle.png"});
                sqlite.addData({id:5,url:"http://individual.icons-land.com/IconsPreview/Weather/PNG/256x256/Rain_Heavy.png"});
                sqlite.addData({id:6,url:"http://individual.icons-land.com/IconsPreview/Weather/PNG/256x256/Snow.png"});
                sqlite.addData({id:7,url:"http://www.iconattitude.com/icons/open_icon_library/status/png/256/weather-fog-2.png"});
                sqlite.addData({id:8,url:"http://www.mujerpalabra.net/activismo/greehamcommon/web_graphics/icons&grafs/Overcast-icon.png"});
            }
        });
    }, false);
})(app);