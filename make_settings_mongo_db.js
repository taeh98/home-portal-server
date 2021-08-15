let error = true;

db = db.getSiblingDB('settings');

collections = db.getCollectionNames();

if (!collections.includes('appearance')) {
    db.createCollection('appearance');
    db.appearance.insertMany([{backgroundColor: null, theme: "light"}]);
}

if (!collections.includes('news')) {
    db.createCollection('news');
    db.news.insertMany([{
        apiKey: null,
        sources: ["al-jazeera-english", "associated-press", "bbc-news", "reuters"],
        country: "gb",
        categories: null
    }]);
}

if (!collections.includes('weather')) {
    db.createCollection('weather');
    db.weather.insertMany([{apiKey: null, location: null}]);
}

if (!collections.includes('search')) {
    db.createCollection('search');
    db.search.insertMany([{provider: "DuckDuckGo"}]);
}

if (error) {
    print('Error, exiting');
    print(error);
    quit(1);
}