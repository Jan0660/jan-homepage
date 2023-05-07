///<reference path="maps/chrome.d.ts" />
import React, { useState } from "react";
import { Pivot, PivotItem, PrimaryButton, Stack, Text } from "@fluentui/react";
import MonacoEditor from "react-monaco-editor";
import localforage from "localforage";
import { ozhlathiClient, settings } from ".";

export const Settings: React.FunctionComponent = () => {
  let [config, setConfig] = useState(JSON.stringify(settings, null, 4));
  let [ozhlathiConfig, setOzhlathiConfig] = useState("");
  if(ozhlathiConfig === ""){
    ozhlathiClient.getConfig().then((res) => {
      setOzhlathiConfig(JSON.stringify(res, null, 4));
    });
  }
  return (
    <Stack>
      <Text variant="large">WOOOOOOOOOOOOOOOOOOO</Text>
      <Pivot>
        <PivotItem headerText="Config">
          <PrimaryButton
            onClick={async () => {
              await localforage.setItem(
                "jan-homepage.settings",
                JSON.parse(config)
              );
              window.location.reload();
            }}
          >
            Save and Reload
          </PrimaryButton>
          <MonacoEditor
            height={400}
            language="json"
            theme="vs-dark"
            value={config}
            options={{}}
            onChange={(val, ev) => {
              setConfig(val);
            }}
            editorDidMount={() => {
              console.log("mounted");
            }}
          />
        </PivotItem>
        <PivotItem headerText="Ozhlathi Config">
          <PrimaryButton
            onClick={async () => {
              await ozhlathiClient.setConfig(ozhlathiConfig);
            }}
          >
            Save
          </PrimaryButton>
          <MonacoEditor
            height={400}
            language="json"
            theme="vs-dark"
            value={ozhlathiConfig}
            options={{}}
            onChange={(val, ev) => {
              setOzhlathiConfig(val);
            }}
            editorDidMount={() => {
              console.log("mounted");
            }}
          />
        </PivotItem>
      </Pivot>
    </Stack>
  );
};
