let socket = null;

if (sessionStorage.getItem("_at"))
  socket = new WebSocket(
    "ws://127.0.0.1:8000/ws/tc/?token=" + sessionStorage.getItem("_at")
  );

export default socket;
