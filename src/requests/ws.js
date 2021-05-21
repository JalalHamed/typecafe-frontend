import ReconnectingWebSocket from "reconnecting-websocket";

let ws = null;
let ac_t = null;

export function setTokenWs(token) {
  ac_t = token;
}

setTimeout(() => {
  ws = new ReconnectingWebSocket("ws://127.0.0.1:8000/ws/tc/?token=" + ac_t);
}, 2000);

export default ws;
