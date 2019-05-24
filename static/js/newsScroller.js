/**
 * JS source file to scroll between news articles once they're loaded.
 */

let scrolling = false;

function startScrollingNews() {
    if (scrolling) return;
    scrolling = true;
    let currentArticle = 0;
    setInterval(function() { currentArticle = changeArticle(currentArticle, noNewsArticles); }, 15000);
}

function changeArticle(currentArticle, noArticles) {
    let nextArticle = currentArticle + 1;
    if (nextArticle > noArticles - 1) nextArticle = 0;
    let currentID = "apiNewsArticle" + currentArticle;
    let nextID = "apiNewsArticle" + nextArticle;
    document.getElementById(currentID).style.visibility = "hidden";
    document.getElementById(nextID).style.visibility = "visible";
    return nextArticle;
}