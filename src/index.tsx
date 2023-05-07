import React from "react";
import ReactDOM from "react-dom";
import { App, FrontBookmark } from "./App";
import { mergeStyles } from "@fluentui/react";
import reportWebVitals from "./reportWebVitals";
import { initializeIcons } from "@fluentui/font-icons-mdl2";
import localforage from "localforage";
import { OzhlathiClient } from "./util/ozhlathi";
import { getFrontBookmarks } from "./util/other";

const testFrontBookmarks: FrontBookmark[] = [
  {
    url: "https://www.youtube.com/",
    faviconUrl: "https://www.youtube.com/favicon.ico",
    title: "YouTube",
  },
  {
    url: "https://github.com/Jan0660",
    faviconUrl: "https://github.com/favicon.ico",
    title: "GitHub",
  },
  {
    url: "https://www.twitch.tv/",
    faviconUrl: "https://www.twitch.tv/favicon.ico",
    title: "Twitch",
  },
  {
    url: "https://anilist.co/home",
    faviconUrl: "https://anilist.co/favicon.ico",
    title: "AniList",
  },
];

// Inject some global styles
mergeStyles({
  ":global(body,html,#root)": {
    margin: 0,
    padding: 0,
    height: "100vh",
  },
});

interface Config {
  backgroundImageUrl: string;
  backgroundOverlay: boolean;
  transparentSidebar: boolean;
  ozhlathiUrl: string;
  ozhlathiPassword: string;
  notificationInterval: number;
  notificationColorsTest: boolean;
  bookmarkFolderPath: string[];
  bookmarkFaviconOverrides: { [title: string]: string };
}

let item = (await localforage.getItem("jan-homepage.settings")) as Config;

if (item === null) {
  item = {
    backgroundImageUrl: "https://raw.githubusercontent.com/Jan0660/jan-homepage/master/screenshot.png",
    backgroundOverlay: true,
    transparentSidebar: true,
    ozhlathiUrl: "http://localhost:8053",
    ozhlathiPassword: "password",
    notificationInterval: 10000,
    notificationColorsTest: false,
    bookmarkFolderPath: ["Other favorites", "jan-homepage"],
    bookmarkFaviconOverrides: {
      YouTube:
        "https://www.youtube.com/s/desktop/2cbeb7d0/img/favicon_48x48.png",
      GitHub: "https://github.githubassets.com/favicons/favicon-dark.png",
      Jstris: "https://jstris.jezevec10.com/res/favicon.ico"
    },
  };
  await localforage.setItem("jan-homepage.settings", item);
}
export const settings: Config = item;
console.log(settings);
export const ozhlathiClient = new OzhlathiClient(
  settings.ozhlathiUrl,
  settings.ozhlathiPassword
);

export const frontBookmarks: FrontBookmark[] =
  chrome.bookmarks !== undefined
    ? await getFrontBookmarks()
    : testFrontBookmarks;

frontBookmarks.forEach((e) => {
  let h = settings.bookmarkFaviconOverrides[e.title];
  if (h !== undefined) {
    e.faviconUrl = h;
  }
});

let r = document.querySelector("html") as HTMLElement;
r.style.setProperty(
  "--backgroundImageUrl",
  "url(" + settings.backgroundImageUrl + ")"
);

// https://developer.microsoft.com/en-us/fluentui#/styles/web/icons#overview
initializeIcons();

ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
