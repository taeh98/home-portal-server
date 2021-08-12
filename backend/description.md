express api to the following

postgres table of links:
    id (auto)
    name
    url
    num of clicks (auto)

CREATE TABLE links (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    click_count BIGINT NOT NULL
);

mongo db of settings:
    https://newsapi.org/ api key (mandatory)
    https://openweathermap.org/ api key (mandatory)
    sources
    country
    bg colour
    news categories

getting weather
getting news

future:
    finance, calendar, etc
    quote
    search
    todo list
    calendar integration - upcoming events and schedule for day
    emails