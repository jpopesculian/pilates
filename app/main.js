define([], function() {
    'use strict';

    // Configure require.js paths and shims
    require.config({
        paths: {
            'text': '../js/vendor/require/text',
            'router': '../js/vendor/require/router',
            'async': '../js/vendor/require/async',
        }
    });
    
    require(['text!partials/wrapper.html',
             'modules/get-scrollbarwidth',
             'modules/css-insert', 
             'text!../css/main.css', 
             'text!../img/logo.jpg'],
           function (wrapper, getScrollbarwidth, cssInsert, css) {
        
        // inject stylesheet
        cssInsert(css);
        
        // inject wrapper
        var main = document.getElementById('main');
        main.innerHTML = wrapper;
        
        // create elements for route injection
        var viewContainer = document.getElementById('site-content');
        var loader = document.getElementById('site-loader');
        var footer = document.getElementById('site-footer');
        var header = document.getElementById('site-header');
        var nav = document.getElementById('site-nav');
        var navListItems = nav.getElementsByTagName('li');
        navListItems.forEach = Array.prototype.forEach;
        
        // fix padding for scrollbar
        var scrollbarwidth = getScrollbarwidth();
        nav.style.paddingRight = scrollbarwidth + "px";
        header.style.paddingRight = scrollbarwidth + "px";
        viewContainer.style.right = scrollbarwidth/2 + "px";
        footer.style.paddingRight = scrollbarwidth + "px";
        
        
        // set to home route if no route set
        document.location.hash = document.location.hash || "#/home";
        // do animation
        
        setTimeout(function() {
            document.getElementById('site-nav').className += " loaded";
            document.getElementById('logo').className += " loaded";
            document.getElementById('logo-subheader').className += " loaded";
        }, 100);
        
        // Load the router
        require(['router'], function(router) {
            router
            .registerRoutes({
                home: { path: '/home', moduleId: 'modules/home' },
                about: { path: '/about', moduleId: 'modules/about' },
                bios: { path: '/bios', moduleId: 'modules/bios' },
                classes: { path: '/classes', moduleId: 'modules/classes' },
                contact: { path: '/contact', moduleId: 'modules/contact' },
                gallery: { path: '/gallery', moduleId: 'modules/gallery' },
                notFound: { path: '*', moduleId: 'modules/notFound' }
            })
            .on('statechange', function() {
                // set loading
                loader.className = "";
                
                // Clear and Set active tab
                navListItems.forEach(function(item) {
                    item.className = "";
                });
                document.getElementById("nav-item-" + document.location.hash.substr(2)).className = "active";
                
                // animate leaving document
                var leavingArticle = viewContainer.getElementsByTagName('article');
                if (leavingArticle.length > 0) {
                    leavingArticle = leavingArticle[0];
                    leavingArticle.className = leavingArticle.className.split("loaded").join(" ");
                    footer.className += " hidden";
                    
                    setTimeout(function () {
                        leavingArticle.parentNode.removeChild(leavingArticle);
                    }, 200);
                }
                
                
            })
            .on('routeload', function(view) {
                // When a route loads, render the view and attach it to the document
                var article = document.createElement("article");
                article.innerHTML = view.html;
                viewContainer.appendChild(article);
                loader.className = "hidden";
                setTimeout(view.callback, 1);
                setTimeout(function() {
                    article.className += " loaded";
                }, 100);
                setTimeout(function() {
                    footer.className = footer.className.split("hidden").join(" ");
                }, 300);
            })
            .init(); // Set up event handlers and trigger the initial page load
        });
    });
        
});