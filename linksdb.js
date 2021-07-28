const sqlite3 = require("sqlite3").verbose();
const tableName = "Links";
const orderedViewName = "OrderedLinks";
const dbFilePath = "/backend/links.backend";

$(document).ready(function () {
    let db = new sqlite3.Database("/backend/links.backend");
    const sql = "SELECT * from " + orderedViewName + ";";

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }

        rows.forEach((row) => {
            addTile(row.id, row.logoImg, row.name);
        });
    });

    db.close();
});

function addTile(id, logoImg, name) {
    const logoPath = "../logos/" + logoImg;
    $("#tiles").append("<a href=\"javascript:outclick(" + id + ")\"><img class=\"tile\" src=\"" + logoPath + "\" alt=\"" + name + "\" \></a>");
}

function outclick(linkID) {
    const statement = "UPDATE " + tableName + " SET outclicks = outclicks + 1 WHERE id = " + linkID + ";";
    let db = new sqlite3.Database(dbFilePath);

    db.run(statement, data, function(err) {
        if (err) {
          return console.error(err.message);
        }
        console.log("Row(s) updated: ${this.changes}");
    });

    db.close();

    window.location.href = getUrlForId(linkID);
}

function getUrlForId(id) {
    const statement = "SELECT url from " + tableName + " WHERE id = " + id + ";";
    let db = new sqlite3.Database(dbFilePath);
    var url = "";

    db.all(statement, [], (err, rows) => {
        if (err) {
            throw err;
        }

        rows.forEach((row) => {
            url = row.url;
        });
    });

    db.close();

    return url;
}