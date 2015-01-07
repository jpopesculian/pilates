define('modules/gallery', ['text!views/gallery.html', 
                           'text!partials/gallery-figure.html',
                           'config/gallery',
                           'text!../../css/photoswipe/photoswipe.css',
                           'text!../../css/photoswipe/default-skin.css'], 
    function(template, figureElem, config) {
    
        var callback = function () {
            require(['modules/init-photoswipe', 'text!partials/photoswipe.html'], 
                function(initPhotoswipe, PhotoswipeElem) {
                    if (document.querySelectorAll('.pswp').length < 1) {
                        var photoswipe = document.createElement('div');
                        photoswipe.innerHTML = PhotoswipeElem;
                        document.body.appendChild(photoswipe);
                    }
                    initPhotoswipe(config.gallerySelector);
                }
            );
        };
    
        var processFigure = (function(template) {
            var re = /\{\{[a-z]*\}\}/gi;
            var found = template.match(re);
            
            return function(item) {
                var figure = template.concat();
                
                found.forEach(function(reference) {
                    var key = reference.substring(2, reference.length-2);
                    var replacement = "";
                    if (typeof item[key] === "string" || typeof item[key] === "number") {
                        replacement = "" + item[key];
                    }
                    figure = figure.replace(reference, replacement);
                });
                
                return figure;
            };
        }(figureElem));
    
        var gallery = "";
    
        config.items.forEach(function(item) {
            gallery += processFigure(item);
        });
        
        template = template.replace("{{gallery}}", gallery);    
    
        return {
            "html": template,
            "callback": callback
        };
    }
);