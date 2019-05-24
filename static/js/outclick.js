const sqlite3 = require('sqlite3').verbose();
const tableName = "Links";

function outclick(linkID) {
    const statement = "UPDATE " + tableName + " SET outclicks = outclicks + 1 WHERE id = " + linkID + ";";
    let db = new sqlite3.Database('../../db/links.db');

    db.run(statement, data, function(err) {
        if (err) {
          return console.error(err.message);
        }
        console.log(`Row(s) updated: ${this.changes}`);
    });

    db.close();

    window.location.href = getUrlForId(linkID);
}

function getUrlForId(id) {
    const statement = "SELECT url from " + tableName + " WHERE id = " + id + ";";
    let db = new sqlite3.Database('../../db/links.db');
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