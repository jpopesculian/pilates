define('modules/css-insert', [], function() {
    return function(css) {
        var style = document.createElement('style');
        style.innerHTML = css;
        document.getElementsByTagName('head')[0].appendChild(style);
    };
});