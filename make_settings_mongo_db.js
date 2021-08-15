let error = true;

db = db.getSiblingDB('settings');

collections = db.getCollectionNames();

print("initial collections = " + JSON.stringify(collections));

if (!collections.includes('appearance')) {
    let appearanceRes = [
        db.createCollection('appearance'),
        db.appearance.insertMany([{backgroundColor: null, theme: "light"}])
    ];
    print("appearanceRes = " + JSON.stringify(appearanceRes));
}

if (!collections.includes('news')) {
    let newsRes = [
        db.createCollection('news'),
        db.news.insertMany([{
            apiKey: null,
            sources: ["al-jazeera-english", "associated-press", "bbc-news", "reuters"],
            country: "gb",
            categories: null
        }])
    ];
    print("newsRes = " + JSON.stringify(newsRes));
}

if (!collections.includes('weather')) {
    let weatherRes = [
        db.createCollection('weather'),
        db.weather.insertMany([{apiKey: null, location: null}])
    ];
    print("weatherRes = " + JSON.stringify(weatherRes));
}

if (!collections.includes('search')) {
    let searchRes = [
        db.createCollection('search'),
        db.search.insertMany([{provider: "DuckDuckGo"}])
    ];
    print("searchRes = " + JSON.stringify(searchRes));
}

collections = db.getCollectionNames();

for (let i = 0; i < collections.length; i++) {
    collection_name = collections[i];
    collection = db.getCollection(collection_name);
    indices = collection.getIndexes();
    print("for i = " + i + ", collection_name = " + collection_name + ", and collection = " + collection + ", indices = " + JSON.stringify(indices));
}

if (error) {
    print('Error, exiting');
    print(error);
    quit(1);
}