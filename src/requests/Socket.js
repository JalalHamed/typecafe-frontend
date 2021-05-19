import ReconnectingWebSocket from "reconnecting-websocket";

let projectWsClient = null;

if (localStorage.getItem("_at")) {
  projectWsClient = new ReconnectingWebSocket(
    "ws://127.0.0.1:8000/ws/tc/?token=" + localStorage.getItem("_at")
  );
}

export default projectWsClient;
