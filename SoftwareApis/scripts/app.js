var app = app || {};

document.addEventListener("deviceready", function () {
    //CAMERA API SCRIPT
    var cameraButton = $("#take-picture-btn");
    cameraButton.on("click", getPicture);
        
    function getPicture(e) {
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL
        });

        function onSuccess(imageData) {
            var image = document.getElementById('camera-image-frame');
            image.src = "data:image/jpeg;base64," + imageData;
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }
    }
    
    //CAPTURE API SCRIPT
    $("#capture-btn").on("click", captureImage);
    
    function captureImage(e) {
        navigator.device.capture.captureImage(captureSuccess, captureError, {limit:1});
        
        function captureSuccess(mediaFiles) {
            var i, path, len; 
            var image = document.getElementById('capture-image-frame');
            for (i = 0, len = mediaFiles.length; i < len; i += 1) {
                path = mediaFiles[i].fullPath;
                image.src = path;
            }
        };

        function captureError(error) {
            navigator.notification.alert(error, null, 'Capture Error');
        };
    }
    
    document.addEventListener("online", onGoingOnline, false);
    function onGoingOnline(e) {
        $("#events-indicator").text("You are online.");
    }
    
    document.addEventListener("offline", onGoingOffline, false);
    function onGoingOffline(e) {
        $("#events-indicator").text("You are offline.");
    }
        
    app = new kendo.mobile.Application(document.body);
});