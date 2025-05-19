import { createContext, useContext, useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [uid, setUid] = useState(null);
  const reconnectInterval = useRef(null); // Store the interval reference

  // Get user ID from cookies
  useEffect(() => {
    const interval = setInterval(() => {
      const userCookie = Cookies.get("user");
      if (userCookie) {
        try {
          const user = JSON.parse(userCookie);
          if (user?.id) {
            setUid(user.id);
            clearInterval(interval); // Stop checking once the user ID is set
          }
        } catch (error) {
          console.error("Error parsing user cookie:", error);
        }
      }
    }, 500); // Check every 500ms

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Function to connect WebSocket
  const connectWebSocket = () => {
    if (!uid) return;

    const ws = new WebSocket(`wss://beta.waifu.it/ws?uid=${uid}`);

    ws.onopen = () => {
      //  console.log("Connected!");
      setSocket(ws);
      clearInterval(reconnectInterval.current); // Stop reconnect attempts on success
      reconnectInterval.current = null; // Reset the interval reference
    };

    ws.onerror = (err) => console.log("WebSocket Error:", err);

    ws.onmessage = (event) => {
      try {
        const newNotification = JSON.parse(event.data);
        setNotifications((prev) => [newNotification, ...prev]);

        playNotificationSound();
        toast.dismiss(); // Dismiss any existing toasts
        toast.info(`New notification: ${newNotification.message}`, {
          position: "bottom-right",
          autoClose: false,
          theme: "dark",
        });
      } catch (error) {
        console.error("Error processing WebSocket message:", error);
      }
    };

    ws.onclose = () => {
      // console.log("Disconnected! Attempting to reconnect...");

      if (!reconnectInterval.current) {
        reconnectInterval.current = setInterval(() => {
          //  console.log("Reconnecting...");
          connectWebSocket();
        }, 5000); // Retry every 5 seconds
      }
    };
  };

  // Establish WebSocket connection
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (uid) {
      connectWebSocket();
    }

    return () => {
      if (socket) {
        socket.close();
      }
      clearInterval(reconnectInterval.current);
    };
  }, [uid]);

  return (
    <WebSocketContext.Provider value={{ socket, notifications, uid, setUid }}>
      {children}
    </WebSocketContext.Provider>
  );
};

// Hook to use WebSocket context
export const useWebSocket = () => useContext(WebSocketContext);

// Notification sound
const playNotificationSound = () => {
  const audio = new Audio("/notification.mp3");
  audio.play();
};
