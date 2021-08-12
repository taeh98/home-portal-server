CREATE TABLE IF NOT EXISTS links (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    click_count BIGINT NOT NULL
);

INSERT INTO links (name , url, click_count)
VALUES
    ("Google", "https://www.google.com", 0),
    ("YouTube", "https://www.youtube.com", 0),
    ("Facebook", "https://facebook.com", 0),
    ("Twitter", "https://twitter.com", 0),
    ("Spotify", "https://www.spotify.com", 0),
    ("Netflix", "https://www.netflix.com", 0),
    ("Wikipedia", "https://www.wikipedia.org", 0),
    ("Reuters", "https://www.reuters.com", 0),
    ("Associated Press", "https://apnews.com", 0),
    ("CNBC", "https://www.cnbc.com/", 0),
    ("AccuWeather", "https://www.accuweather.com", 0);
