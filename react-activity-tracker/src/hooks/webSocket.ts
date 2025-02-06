import { useState, useEffect } from "react";

type DispatchData = {
  type: string;
  payload: any;
};

type Activity = {
  text: string;
  timestamp: string;
};

export const useWebSocket = (
  webSocketUrl: string,
  dispatch: (data: DispatchData) => void,
  retryCount: number
) => {
  const [connectionError, setConnectionError] = useState("");
  const [webSocketConnection, setWebSocketConnection] =
    useState<WebSocket | null>(null);

  const connectToWebSocket = () => {
    const ws = new WebSocket(webSocketUrl);

    ws.onopen = () => {
      console.log("Connected to mock WebSocket");
      setWebSocketConnection(ws);
    };

    ws.onmessage = (event) => {
      const data: Activity = JSON.parse(event.data);
      dispatch({ type: "ADD_ACTIVITY", payload: data });
    };

    ws.onerror = () => {
      setConnectionError("Error connecting to the server");
      ws.close();
    };
  };

  useEffect(() => {
    connectToWebSocket();
    return () => webSocketConnection?.close();
  }, []);

  useEffect(() => {
    if (retryCount > 0) {
      connectToWebSocket();
    }

    return () => webSocketConnection?.close();
  }, [retryCount]);

  return { connectionError };
};
