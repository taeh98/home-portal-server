/**
 * JS source file to get the news from an API, then return a JSON object of headlines and URLs for links.
 */
const configFolderPath = "../../config";

let noNewsArticles = 0;
let newsAPIDotOrgAPIKey = "";
let newsAPIDotOrgSources = [];


function getNews() {
    let newsApiUrls = ["https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=" + newsAPIDotOrgAPIKey, "https://newsapi.org/v2/top-headlines?sources=independent&apiKey=" + newsAPIDotOrgAPIKey, "https://newsapi.org/v2/top-headlines?sources=the-guardian-uk&apiKey=" + newsAPIDotOrgAPIKey];
    for (let i = 0; i < newsApiUrls.length && noNewsArticles < 50; i++) {
        getNewsForUrl(newsApiUrls[i]);
    }
}

function checkScrolling() {
    if (noNewsArticles > 0 && !scrolling) {
        startScrollingNews();
    }
}

function getNewsForUrl(urlIn) {
    $.ajax({
        url: urlIn,
        success: function(data) {
            if (noNewsArticles === 0) $("#news").html("");
            $("#news").append(JSONToHTML(formatJSON(data)));
        },
        dataType: "json",
        timeout: 2000 //in milliseconds
    });
}

function formatJSON(data) {
    if (data.status != "ok" || data.totalResults <= 0) return -1;
    data = data.articles;
    for (let i = 0; i < data.length; i++) {
        delete data[i].source;
        delete data[i].author;
        delete data[i].description;
        delete data[i].urlToImage;
        delete data[i].publishedAt;
    }
    return data;
}

function JSONToHTML(articlesIn) {
    let returnHTML = "";
    for (let i = 0; i < articlesIn.length && i < 6; i++) {
        let article = articlesIn[i];
        $("#news").append("<div class=\"apiNewsArticle\" id=\"apiNewsArticle" + noNewsArticles++ + "\">\n" +
            "<a href=\"" + article.url + "\">" + article.title + "</a>\n</div>");
        checkScrolling();
    }
    return returnHTML;
}

$(document).ready(function () {
    getNews();
});