import React from "react";
import {
  Stack,
  FontWeights,
  IStackTokens,
  IStackStyles,
  ITextStyles,
  ThemeProvider,
  SearchBox,
  ISearchBoxStyles,
} from "@fluentui/react";
import "./App.css";
import { IIconProps } from "@fluentui/react/lib/Icon";
import { MainCommandBar } from "./MainCommandBar";
import { myTheme, searchBarTheme } from "./util/themes";
import SplitPane from "react-split-pane";
import { SideBar } from "./SideBar";
import { frontBookmarks, settings } from ".";

export const boldStyle: Partial<ITextStyles> = {
  root: { fontWeight: FontWeights.semibold },
};

export interface FrontBookmark {
  url: string;
  faviconUrl: string;
  title: string;
}

const stackTokens: IStackTokens = { childrenGap: 15 };
const stackStyles: Partial<IStackStyles> = {
  root: {
    // width: "960px",
    margin: "0 auto",
    textAlign: "center",
    color: "#605e5c",
  },
};
const searchBoxStyles: Partial<ISearchBoxStyles> = {
  root: { width: 600, border: "none" },
};

const filterIcon: IIconProps = { iconName: "BingLogo", theme: myTheme };

export const App: React.FunctionComponent = () => {
  return (
    <>
      {settings.transparentSidebar && (
        <>
          <span className="wallpaper" />
          {settings.backgroundOverlay && <span className="overlay" />}
        </>
      )}
      <SplitPane split="vertical" minSize={360} allowResize={true}>
        <div className="fill-window">
          <ThemeProvider theme={myTheme} className="fill-window">
            <SideBar />
          </ThemeProvider>
        </div>
        <ThemeProvider theme={myTheme} className="fill-window">
          {!settings.transparentSidebar && (
            <>
              <span className="wallpaper" />
              {settings.backgroundOverlay && <span className="overlay" />}
            </>
          )}
          {/*  style={{backgroundImage: "url(https://slave.waifusfor.sale/1631184938710.jpg)"}} */}
          <div
            style={{ display: "flex", flexFlow: "column", height: "100%" }}
            className="balls"
          >
            <div style={{ flexGrow: 0, flexShrink: 1, flexBasis: "auto" }}>
              <MainCommandBar />
            </div>
            <div style={{ flexGrow: 1, flexShrink: 1, flexBasis: "auto" }}>
              <Stack
                horizontalAlign="center"
                verticalAlign="center"
                verticalFill
                styles={stackStyles}
                tokens={stackTokens}
              >
                <SearchBox
                  placeholder="Platzhalter"
                  iconProps={filterIcon}
                  styles={searchBoxStyles}
                  theme={searchBarTheme}
                  onSearch={(val) => {
                    const url =
                      "https://google.com/search?q=" + encodeURIComponent(val);
                    window.open(url, "_self");
                  }}
                />
                <Stack horizontal>
                  {frontBookmarks.map((val, i, arr) => {
                    let faviconUrl = val.faviconUrl;
                    return (
                      <>
                      <a href={val.url}>
                      <div
                        style={{ backgroundColor: "#3b3b3b", padding: "8px", paddingBottom: "4px", borderRadius: "12px", }}
                        key={val.toString()}
                      >
                          <img
                            src={faviconUrl}
                            width={24}
                            height={24}
                            alt="an icon"
                          />
                      </div>
                      </a>
                      {i !== arr.length-1 &&
                        <span style={{marginLeft: "12px"}}/>
                      }
                      </>
                    );
                  })}
                </Stack>
              </Stack>
            </div>
          </div>
        </ThemeProvider>
      </SplitPane>
    </>
  );
};
