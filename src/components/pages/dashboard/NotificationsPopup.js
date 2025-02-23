import React, { useState, useEffect, useRef } from "react";
import { useWebSocket } from "@/components/hooks/WebsocketProvider";
import {
  FiBell,
  FiCheckCircle,
  FiAlertTriangle,
  FiInfo,
  FiX,
  FiCheck,
} from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactMarkdown from "react-markdown";

const typeStyles = {
  success: "bg-green-600",
  warning: "bg-yellow-600",
  info: "bg-blue-600",
  error: "bg-red-600",
};

const typeIcons = {
  success: <FiCheckCircle className="text-green-100" />,
  warning: <FiAlertTriangle className="text-yellow-100" />,
  info: <FiInfo className="text-blue-100" />,
  error: <FiAlertTriangle className="text-red-100" />,
};

const formatTime = (timestamp) => {
  if (!timestamp) return "Invalid Date";

  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return "Invalid Date";

  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} sec ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} min ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  }

  return new Intl.DateTimeFormat(navigator.language, {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const playNotificationSound = () => {
  const audio = new Audio("/notification.mp3");
  audio.play();
};

export default function NotificationsPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { notifications: wsNotifications } = useWebSocket();
  const toastShown = useRef(false);
  const popupRef = useRef(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("/api/notifications", {
          headers: {
            uid: "649452442253000704",
          },
        });
        if (!response.ok) throw new Error("Failed to fetch notifications");
        const data = await response.json();

        // Remove expired notifications
        const validNotifications = data.filter(
          (n) => !n.expiry || new Date(n.expiry) > new Date()
        );

        setNotifications(validNotifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    if (wsNotifications.length > 0) {
      setNotifications((prev) => {
        const newNotifications = wsNotifications.filter(
          (wsNotif) => !prev.some((notif) => notif._id === wsNotif._id)
        );

        return [...newNotifications, ...prev];
      });
    }
  }, [wsNotifications]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    if (unreadCount > 0 && !toastShown.current) {
      playNotificationSound();
      toast.info(
        `You have ${unreadCount} unread notification${
          unreadCount > 1 ? "s" : ""
        }.`,
        {
          position: "bottom-right",
          autoClose: false,
          theme: "dark",
        }
      );
      toastShown.current = true;
    }
  }, [unreadCount]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setFadeOut(true);
        setTimeout(() => {
          setIsOpen(false);
          setFadeOut(false);
        }, 300);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, read: true } : n))
    );
  };

  const removeNotification = (id) => {
    setNotifications(notifications.filter((n) => n._id !== id));
  };

  return (
    <div>
      <button
        className="p-2 relative hover:bg-gray-700 focus:bg-gray-700 rounded-lg transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiBell className="w-6 h-6 text-white" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full px-1.5">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          ref={popupRef}
          className={`absolute top-14 right-4 w-80 bg-gray-900 p-4 rounded-lg shadow-lg border-gray-700 z-50 
            transition-opacity duration-300 ${
              fadeOut ? "opacity-0" : "opacity-100"
            }`}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Notifications</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-red-400"
            >
              <FiX size={19} />
            </button>
          </div>

          <div className="mt-3 max-h-60 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-gray-400 text-center">No new notifications</p>
            ) : (
              <ul>
                {notifications.map(
                  ({ _id, type, message, timestamp, read }, index) => (
                    <React.Fragment key={_id}>
                      <li
                        className={`relative p-4 rounded-lg ${
                          read ? "opacity-50" : ""
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <span
                            className={`p-2 rounded-full ${
                              typeStyles[type] || "bg-gray-600"
                            }`}
                          >
                            {typeIcons[type] || (
                              <FiInfo className="text-gray-100" />
                            )}
                          </span>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-100">
                              <ReactMarkdown
                                components={{
                                  p: ({ node, ...props }) => (
                                    <span {...props} />
                                  ),
                                }}
                              >
                                {message}
                              </ReactMarkdown>
                            </div>

                            <span className="text-xs text-gray-400">
                              {formatTime(timestamp)}
                            </span>
                          </div>
                          {!read && (
                            <button
                              onClick={() => markAsRead(_id)}
                              className="text-gray-500 hover:text-green-400"
                            >
                              <FiCheck size={14} />
                            </button>
                          )}
                          <button
                            onClick={() => removeNotification(_id)}
                            className="text-gray-500 hover:text-red-400"
                          >
                            <FiX size={14} />
                          </button>
                        </div>
                      </li>
                      {index < notifications.length - 1 && (
                        <hr className="border-gray-700 my-2" />
                      )}
                    </React.Fragment>
                  )
                )}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
