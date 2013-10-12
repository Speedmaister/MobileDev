var sqlite = (function() {
    var app = app || {};
    app.db = null;

    app.openDb = function() {
        if (window.sqlitePlugin !== undefined) {
            app.db = window.sqlitePlugin.openDatabase("Images");
        }
        else {
            // For debugging in simulator fallback to native SQL Lite
            app.db = window.openDatabase("Images", "1.0", "ImagesNews", 200000);
        }
    }
    
    app.createTable = function() {
        app.db.transaction(function(tx) {
            tx.executeSql("CREATE TABLE IF NOT EXISTS Images" +
                          "(id INTEGER PRIMARY KEY, " +
                          "url TEXT);", []);
        });
    }

    app.insertRecord = function(image) {
        app.db.transaction(function(tx) {
            tx.executeSql("INSERT INTO Images(id, url) VALUES (?,?);",
                          [image.id,image.url],
                          app.onSuccess,
                          app.onError);
        });
    }
    
     app.deleteRecord = function(id) {
        app.db.transaction(function(tx) {
            tx.executeSql("DELETE FROM Images WHERE id = ?;",
                          [id],
                          app.onSuccess,
                          app.onError);
        });
    }

    app.updateRecord = function(id, rentOption) {
        app.db.transaction(function(tx) {
            tx.executeSql("UPDATE Images SET rentOption = ? WHERE id = ?;",
                          [rentOption, id],
                          app.onSuccess,
                          app.onError);
        });
    }

    app.selectAllRecords = function(fn) {
        app.db.transaction(function(tx) {
            tx.executeSql("SELECT * FROM Images;", [],
                          fn,
                          app.onError);
        });
    }
    
    app.selectCurrentRecords = function(id,fn) {
        app.db.transaction(function(tx) {
            tx.executeSql("SELECT url FROM Images WHERE id = ?;", [id],
                          fn,
                          app.onError);
        });
    }

    function getAllTheData(handleReceivedData) {
        app.selectAllRecords(handleReceivedData);
    }

    app.onSuccess = function(tx, r) {
        console.log("Your SQLite query was successful!");
    }

    app.onError = function(tx, e) {
        console.log("SQLite Error: " + e.message);
    }

    function init() {
        app.openDb();
        app.createTable();
    }
    
    init();
    
    return {
        getById:app.selectCurrentRecords,
        getData:getAllTheData,
        addData:app.insertRecord,
        deleteData:app.deleteRecord
    }
}());
/*
Available cars for rent
Car details and rent option
Rented cars with return date
Home/About/Contacts view
*/
