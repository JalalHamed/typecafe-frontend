import ReconnectingWebSocket from "reconnecting-websocket";

const projectWsClient = new ReconnectingWebSocket("ws://127.0.0.1:8000/ws/tc/");

export default projectWsClient;
