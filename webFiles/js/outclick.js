function outclick(linkID) {
    url = getURL(linkID, links);
    sendPostOutclickUpdate(linkID);

    
}

function sendPostOutclickUpdate(linkID) {

    alasql.promise("SELECT * FROM CSV(\"" + csvExportDBFilePath + "\", {headers:false})")
            .then(function(data){
                var links = data;
                console.log(links);
                
                let found = false;
                for (let i = 0; i < links.length - 1 && !found; ++i) {
                    if (links[i][0] != linkID) continue;
                    else {
                        found = true;
                        links[i][0] = (N).toString();
                    }
                }
                
                links.forEach(link => {
                    addTile(link);
                });
    
                
            }).catch(function(err){
                 console.log("Error:", err);
            });
}