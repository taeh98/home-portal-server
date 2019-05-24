-- get sqlite 3 if necessary:

 sudo apt-get update && sudo apt-get upgrade && sudo apt install sqlite3

-- to make the database of links/tiles:

    -- make the database file and open the sqlite 3 cli:

    sqlite3 newsAPISettings.db

    -- make the table:

    CREATE TABLE Links (id INT NOT NULL PRIMARY KEY, name VARCHAR(500) NOT NULL, url VARCHAR(2000) NOT NULL, logoImg VARCHAR(100) NOT NULL, outclicks INT NOT NULL);
    CREATE VIEW OrderedLinks AS SELECT * from Links ORDER BY outclicks DESC, id ASC;

    -- add your own links (note id must be unique and outclicks should be 0):

    INSERT INTO Links (id, name, url, logoImg, outclicks) VALUES(0, "Facebook", "https://www.facebook.com", "facebook.png", 0);
    INSERT INTO Links (id, name, url, logoImg, outclicks) VALUES(1, "Twitter", "https://www.twitter.com", "twitter.png", 0);
    INSERT INTO Links (id, name, url, logoImg, outclicks) VALUES(2, "BBC News", "https://www.bbc.co.uk/news", "bbcNews.png", 0);
    INSERT INTO Links (id, name, url, logoImg, outclicks) VALUES(3, "YouTube", "https://www.youtube.com", "youtube.png", 0);
    INSERT INTO Links (id, name, url, logoImg, outclicks) VALUES(4, "Google", "https://google.com", "google.png", 0);
    INSERT INTO Links (id, name, url, logoImg, outclicks) VALUES(5, "Wikipedia", "https://www.wikipedia.org", "wikipedia.png", 0);
    INSERT INTO Links (id, name, url, logoImg, outclicks) VALUES(6, "Gmail", "https://www.gmail.com", "gmail.png", 0);
    INSERT INTO Links (id, name, url, logoImg, outclicks) VALUES(7, "The Guardian UK", "https://www.theguardian.com/uk", "theGuardian.png", 0);
    INSERT INTO Links (id, name, url, logoImg, outclicks) VALUES(8, "The Independent UK", "https://www.independent.co.uk", "theIndependent.png", 0);

    -- quit sqlite3 cli:

    .quit

-- to make the database holding the settings for the news api:

    -- make the database file and open the sqlite 3 cli:

    sqlite3 newsAPISettings.db

    -- make the table:

    CREATE TABLE NewsAPISettings (key VARCHAR(32), sources VARCHAR(300));

    -- add your API key and sources:

    INSERT INTO NewsAPISettings (key, sources) VALUES ("<your API key>", "bbc-news, independent, the-guardian-uk");

    -- quit the sqlite3 cli:

    .quit