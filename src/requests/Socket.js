import { w3cwebsocket as W3CWebSocket } from "websocket";
import { baseWS } from "components/xhr";

const projectWsClient = new W3CWebSocket(baseWS + "/project-socket/");

export default projectWsClient;
