import { renderHook, act } from "@testing-library/react";
import { Server } from "mock-socket";
import { useReducer, useState } from "react";
import { useWebSocket } from "./webSocket";

const MOCK_WS_URL = "ws://localhost:8080";

const reducer = (state: any[], action: { type: string; payload: any }) => {
  switch (action.type) {
    case "ADD_ACTIVITY":
      return [...state, action.payload];
    default:
      return state;
  }
};

describe("useWebSocket Hook", () => {
  let mockServer: Server;

  beforeEach(() => {
    mockServer = new Server(MOCK_WS_URL);
  });

  afterEach(() => {
    mockServer.stop();
  });

  test("connects to WebSocket successfully", async () => {
    const { result } = renderHook(() => {
      const [_state, dispatch] = useReducer(reducer, []);
      return useWebSocket(MOCK_WS_URL, dispatch, 0);
    });

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(result.current.connectionError).toBe("");
  });

  test("receives messages and dispatches actions", async () => {
    const { result } = renderHook(() => {
      const [state, dispatch] = useReducer(reducer, []);
      return { state, ...useWebSocket(MOCK_WS_URL, dispatch, 0) };
    });

    const testMessage = { text: "User logged in", timestamp: "12:34 PM" };

    act(() => {
      mockServer.clients().forEach((client) => {
        client.send(JSON.stringify(testMessage));
      });
    });

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(result.current.state).toContainEqual(testMessage);
  });

  test("handles WebSocket errors and retries connection", async () => {
    const { result } = renderHook(() => {
      const [_state, dispatch] = useReducer(reducer, []);
      const [retryCount, setRetryCount] = useState(0);

      return {
        ...useWebSocket(MOCK_WS_URL, dispatch, retryCount),
        setRetryCount,
      };
    });

    act(() => {
      mockServer.simulate("error");
    });

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(result.current.connectionError).toBe(
      "Error connecting to the server"
    );

    // Simulate a retry
    act(() => {
      result.current.setRetryCount(1);
    });

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(result.current.connectionError).toBe(
      "Error connecting to the server"
    );
  });
});
