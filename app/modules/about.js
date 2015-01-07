define('modules/about', ['text!views/about.html'], function(template) {
    return {
        "html": template,
        "callback": function() {}
    };
});