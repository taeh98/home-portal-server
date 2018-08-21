const csvExportDBFilePath = "linkTiles/" + "linksDBExport.csv";
$(document).ready(function () {
    alasql.promise("SELECT * FROM CSV(\"" + csvExportDBFilePath + "\", {headers:false})")
        .then(function(data){
            var links = data;
            console.log(links);

            console.log(links.length);
            console.log(links[0]);
            console.log(links[0][0]);
            
            links.forEach(link => {
                addTile(link);
            });

            
        }).catch(function(err){
             console.log("Error:", err);
        })
});

function addTile(tileArray) {
    let id = tileArray[0];
    let logoPath = tileArray[3];
    let name = tileArray[1];
    $("#tiles").append("<a href=\"javascript:outclick(" + id + ")\"><img class=\"tile\" src=\"" + logoPath + "\" alt=\"" + name + "\" \></a>");
}