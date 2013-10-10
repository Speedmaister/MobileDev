window.httpRequest = (function(){
    function getText(url){
        var promise = new RSVP.Promise(function(resolve, reject){
            $.ajax({
                url:url,
                type:"GET",
                dataType:"text",
                contentType:"text/plain",
                timeout:5000,
                success:function(data){
                    resolve(data);
                },
                error:function(err){
                    reject(err);
                }
            });
        });
        return promise;
    }
    
    return {
        getText:getText
    };    
}());