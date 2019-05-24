const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('../../db/links.db');
const sql = `SELECT * from OrderedLinks;`;

$(document).ready(function () {
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