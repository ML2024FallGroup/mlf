"use client";

import { useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { toast } from "sonner";

const Demo = () => {
  const [socketUrl, setSocketUrl] = useState("ws://localhost:8000/ws/process/");
  const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);

  const { lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      console.log("entered here");
      setMessageHistory((prev) => prev.concat(lastMessage));
      toast.success("Event has been created", {
        description: "Sunday, December 03, 2023 at 9:00 AM",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    }
  }, [lastMessage]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <div>
      <h1 className="font-bold text-xl">
        WebSocket Is Currently: {connectionStatus}
      </h1>
    </div>
  );
};

export default Demo;
