import ReconnectingWebSocket from "reconnecting-websocket";

let socket = null;

export function setTokenWs(ac_t) {
  socket = new ReconnectingWebSocket(
    "ws://127.0.0.1:8000/ws/tc/?token=" + ac_t
  );
}

export default socket;
