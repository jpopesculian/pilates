define('modules/contact', ['text!views/contact.html'], function(template) {
    
    var callback = function () {
        var initMaps = function() {
            var mapOptions = {
                "zoom": 16,
                "center": new google.maps.LatLng(34.026627, -84.360728)
              };

            var map = new google.maps.Map(document.getElementById('map'),
                                          mapOptions);
            
            var marker = new google.maps.Marker({
                "map": map,
                "position": new google.maps.LatLng(34.026627, -84.360728),
                "title": "Pilates Powerhouse Studio",
                "animation": google.maps.Animation.DROP,
            });         
              
        };

        if (typeof google !== "undefined") {
            initMaps();
        } else {
            require(['async!http://maps.google.com/maps/api/js?sensor=false'], initMaps);
        }  
    };
    
    return {
        "html": template,
        "callback": callback
    };
});