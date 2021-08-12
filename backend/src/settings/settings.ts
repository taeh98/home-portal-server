import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';

const MONGO_DB_PORT_NUMBER: number = 27017;

type NewsApiDotOrgCountry =
     "ae" | "ar" | "at" | "au" | "be" | "bg" | "br" | "ca" | "ch" | "cn" | "co" | "cu" | "cz" | "de" | "eg" | "fr" | "gb" | "gr" | "hk" | "hu" | "id" | "ie" | "il" | "in" | "it" | "jp" | "kr" | "lt" | "lv" | "ma" | "mx" | "my" | "ng" | "nl" | "no" | "nz" | "ph" | "pl" | "pt" | "ro" | "rs" | "ru" | "sa" | "se" | "sg" | "si" | "sk" | "th" | "tr" | "tw" | "ua" | "us" | "ve" | "za"
;
type NewsApiDotOrgSource = "abc-news" | "abc-news-au" | "aftenposten" | "al-jazeera-english" | "ansa" | "argaam" | "ars-technica" | "ary-news" | "associated-press" | "australian-financial-review" | "axios" | "bbc-news" | "bbc-sport" | "bild" | "blasting-news-br" | "bleacher-report" | "bloomberg" | "breitbart-news" | "business-insider" | "business-insider-uk" | "buzzfeed" | "cbc-news" | "cbs-news" | "cnn" | "cnn-es" | "crypto-coins-news" | "der-tagesspiegel" | "die-zeit" | "el-mundo" | "engadget" | "entertainment-weekly" | "espn" | "espn-cric-info" | "financial-post" | "focus" | "football-italia" | "fortune" | "four-four-two" | "fox-news" | "fox-sports" | "globo" | "google-news" | "google-news-ar" | "google-news-au" | "google-news-br" | "google-news-ca" | "google-news-fr" | "google-news-in" | "google-news-is" | "google-news-it" | "google-news-ru" | "google-news-sa" | "google-news-uk" | "goteborgs-posten" | "gruenderszene" | "hacker-news" | "handelsblatt" | "ign" | "il-sole-24-ore" | "independent" | "infobae" | "info-money" | "la-gaceta" | "la-nacion" | "la-repubblica" | "le-monde" | "lenta" | "lequipe" | "les-echos" | "liberation" | "marca" | "mashable" | "medical-news-today" | "msnbc" | "mtv-news" | "mtv-news-uk" | "national-geographic" | "national-review" | "nbc-news" | "news24" | "new-scientist" | "news-com-au" | "newsweek" | "new-york-magazine" | "next-big-future" | "nfl-news" | "nhl-news" | "nrk" | "politico" | "polygon" | "rbc" | "recode" | "reddit-r-all" | "reuters" | "rt" | "rte" | "rtl-nieuws" | "sabq" | "spiegel-online" | "svenska-dagbladet" | "t3n" | "talksport" | "techcrunch" | "techcrunch-cn" | "techradar" | "the-american-conservative" | "the-globe-and-mail" | "the-hill" | "the-hindu" | "the-huffington-post" | "the-irish-times" | "the-jerusalem-post" | "the-lad-bible" | "the-next-web" | "the-sport-bible" | "the-times-of-india" | "the-verge" | "the-wall-street-journal" | "the-washington-post" | "the-washington-times" | "time" | "usa-today" | "vice-news" | "wired" | "wired-de" | "wirtschafts-woche" | "xinhua-net" | "ynet";
type NewsApiDotOrgCategory =
    "business" | "entertainment" | "general" | "health" | "science" | "sports" | "technology"
    ;

type NewsSettings = {
    NewsApiDotOrgApiKey: string,
    NewsApiDotOrgCountry: NewsApiDotOrgCountry,
    NewsApiDotOrgCategories: NewsApiDotOrgCategory[],
    NewsApiDotOrgSources: NewsApiDotOrgSource[],
};

type Theme = "Light" | "Dark";

type AppearanceSettings = null | {
    BackgroundColour: string,
    TextColour: string
} | {
    Theme: Theme
};

type MongoSettingsObject = {
    OpenWeatherMapDotOrgApiKey: string,
    NewsSettings: NewsSettings,
    AppearanceSettings: AppearanceSettings
};