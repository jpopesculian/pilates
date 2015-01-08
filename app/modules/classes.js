define('modules/classes', ['text!views/classes.html', 'config/classes'], function(template, config) {
    
    function getClassesTable(config) {
        
        var table = "<table class='schedule'>";
        
        function createHeader(config) {
            var header = "<thead><tr><td></td>";
            config.days.forEach(function(day) {
                header += "<td>"+day+"</td>";
            });
            header += "</tr></th>";
            return header;
        }
        
        function createBody(config) {
            var body = "<tbody>";
            
            function createBodyRow(info) {
                var row = "<tr><td>"+info.time+"</td>";
                info.schedule.forEach(function(col) {
                    row += "<td>"+col+"</td>";
                });
                row += "</tr>";
                return row;
            }
            
            config.rows.forEach(function (row) {
                body += createBodyRow(row);
            });
            
            body += "</tbody>";
            return body;
        }
        
        table += createHeader(config);
        table += createBody(config);
        table += "</table>";
            
        return table;
    }
    
    var schedule = getClassesTable(config);
    template = template.replace("{{schedule}}", schedule);
    
    return {
        "html": template,
        "callback": function() {}
    };
});