import { settings } from "..";
import { FrontBookmark } from "../App";

export async function getFrontBookmarks(): Promise<FrontBookmark[]> {
  let curNode = (await chrome.bookmarks.getTree())[0];
  settings.bookmarkFolderPath.forEach((val) => {
    curNode = curNode.children?.filter((v) => v.title === val)[0]!;
  });
  console.log(curNode);
  let frontBookmarks: FrontBookmark[] = [];
  curNode.children?.forEach((child) => {
    let url = child.url!;
    let baseUrl = url.substring(
      0,
      url.indexOf("/", url.indexOf("/", url.indexOf("/") + 1) + 1)
    );
    let faviconUrl = baseUrl + "/favicon.ico";
    frontBookmarks.push({
      url: url,
      faviconUrl: faviconUrl,
      title: child.title,
    });
  });
  return frontBookmarks;
}
