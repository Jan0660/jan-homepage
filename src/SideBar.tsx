import React from "react";
import { ScrollablePane, Stack, Text } from "@fluentui/react";
// import { rgb2hex, hsv2rgb, rgb2hsv } from "@fluentui/react";
// import hexRgb from "hex-rgb";
import { boldStyle } from "./App";
import { Markdown } from "./Markdown";
import { ozhlathiClient, settings } from ".";
import { useState } from "react";
import { Timer } from "./util/timer";

let timer: Timer | null = null;

type NotificationColor =
  | "white"
  | "violentRed"
  | "pink"
  | "cyan"
  | "yellow"
  | "green"
  | "violet";

export interface Notification {
  color: NotificationColor;
  title: string;
  content: string;
}

// interface NotifButton {
//     link: string;
//     text: string;
//     isPrimary: boolean;
// }

const NotificationColors: Map<NotificationColor, string> = new Map<
  NotificationColor,
  string
>([
  ["white", "#FFFFFF"],
  ["violentRed", "#FF0000"],
  ["pink", "#ff00ff"],
  ["cyan", "#00ffff"],
  ["yellow", "#ffff00"],
  ["green", "#00ff00"],
  ["violet", "#6900ff"],
]);

export const SideBar: React.FunctionComponent = () => {
  let notifs: Notification[] = [];
  if(settings.notificationColorsTest){
    NotificationColors.forEach((_, key) => {
      notifs.push({ color: key, title: key, content: "Content" });
    });
    notifs.push({
      color: "white",
      title: "Markdown Test",
      content: "woo **bold** *italic*",
    });
  }
  const [notifications, updateNotifications] = useState(notifs);
  if(timer == null){
    timer = new Timer(settings.notificationInterval, () => {
      ozhlathiClient.getNotifications().then(res => {console.log(res); updateNotifications([...notifications, ...res]);});
      console.log(notifications)
    })
    timer.func();
    setTimeout(() => {
      timer!.run()
    }, 1);
  }
  return (
    <>
      <ScrollablePane>
        {Array.from(notifications, (v, k) => {
          return <NotificationElement notification={v} key={k} />;
        })}
      </ScrollablePane>
    </>
  );
};

type NotificationElementProps = {
  notification: Notification;
};

const NotificationElement: React.FC<NotificationElementProps> = (
  props: NotificationElementProps
) => {
  const notif = props.notification;
  return (
    <Stack
      className="notificationElement"
      style={{
        borderColor: NotificationColors.get(notif.color),
        borderWidth: "0 0 0 2px",
        borderStyle: "solid",
        borderRadius: 0,
        padding: "2px 2px 2px 4px",
      }}
    >
      <Text variant="mediumPlus" styles={boldStyle}>
        {notif.title}
      </Text>
      <Text variant="medium">
        <Markdown text={notif.content} />
      </Text>
    </Stack>
  );
};
