define('config/classes', ['text!config/classes.json'], function(config) {
    return JSON.parse(config);
});