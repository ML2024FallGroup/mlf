"use client";

import useMainAudioStore from "@/lib/audioStore";
import useStemStore from "@/lib/stemStore";
import { useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import UseAnimations from "react-useanimations";
import activity from "react-useanimations/lib/activity";
import alertTriangle from "react-useanimations/lib/alertTriangle";
import loading from "react-useanimations/lib/loading2";

const WSStatus = () => {
  const setAudioData = useMainAudioStore((state) => state.setAudioData);
  const addStem = useStemStore((state) => state.addStem);
  const [socketUrl, setSocketUrl] = useState("ws://localhost:8000/ws/process/");
  const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);

  const { lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      if (data.item_type === "main_audio_data") {
        setAudioData(data);
      }
      if (data.item_type === "stem_data") {
        addStem(data);
      }
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return <Animation status={connectionStatus} />;
};

export default WSStatus;
const Animation = (props: { status: string }) => {
  return (
    <div key={props.status}>
      {props.status === "Connecting" ? (
        <UseAnimations animation={loading} size={56} />
      ) : props.status === "Open" ? (
        <UseAnimations animation={activity} size={56} />
      ) : (
        <UseAnimations animation={alertTriangle} size={56} />
      )}
    </div>
  );
};
