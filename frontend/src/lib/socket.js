import { io } from "socket.io-client";

// Use the browser origin for forwarded/dev builds and an explicit API origin
// for deployments where the API is hosted separately.
const configuredApiUrl = import.meta.env.VITE_API_URL || "/api";
const SOCKET_URL = configuredApiUrl.startsWith("/")
  ? window.location.origin
  : configuredApiUrl.replace(/\/api\/?$/, "");

let socket = null;

export function getSocket() {
  if (!socket) {
    socket = io(SOCKET_URL, {
      withCredentials: true,
      autoConnect: true,
      path: "/socket.io",
    });
  }
  return socket;
}
