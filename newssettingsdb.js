const sqlite3 = require("sqlite3").verbose();
const tableName = "NewsAPISettings";
const dbFilePath = "/backend/links.backend";

function setNewsAPISettings(key, sources) {
    const statement = "DELETE FROM " + tableName + "; INSERT INTO " + tableName + " VALUES (\"" + key + "\", \"" + sources + "\");";
    let db = new sqlite3.Database(dbFilePath);

    db.run(statement, data, function(err) {
        if (err) {
          return console.error(err.message);
        }
        console.log("Row(s) updated: ${this.changes}");
    });

    db.close();
}

function getNewsAPISettings() {
    const statement = "SELECT * from " + tableName + ";";
    let db = new sqlite3.Database(dbFilePath);
    var settings = [];

    db.all(statement, [], (err, rows) => {
        if (err) {
            throw err;
        }

        rows.forEach((row) => {
            row.forEach((field) => {
                settings.push(field);
            });
        });
    });

    db.close();
    return settings;
}