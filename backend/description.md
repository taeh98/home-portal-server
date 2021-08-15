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

get into bash for container with: "docker exec -it postgres_tiles_db bash"
then get into psql with "psql --host=postgres_tiles_db --username=unicorn_user --dbname=rainbow_database --port=5432"

mongo collections within the settings db:

appearance
    bg colour or theme

news
    https://newsapi.org/ api key (mandatory)
    sources
    country
    categories

weather
    https://openweathermap.org/ api key (mandatory)
    location - coords or city (?)

search provider
    DuckDuckGo, Bing, Google

getting weather
getting news

future:
    finance, calendar, etc
    quote
    search
    todo list
    calendar integration - upcoming events and schedule for day
    emails