import ReconnectingWebSocket from "reconnecting-websocket";

let projectWsClient = null;

if (sessionStorage.getItem("ac_t"))
  projectWsClient = new ReconnectingWebSocket(
    "ws://127.0.0.1:8000/ws/tc/?token=" + sessionStorage.getItem("ac_t")
  );

export default projectWsClient;
