define('config/gallery', ['text!config/gallery.json'], function(config) {
    return JSON.parse(config);
});