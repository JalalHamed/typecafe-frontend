import React from "react";

// Design
import "./messages.scss";

const Messages = () => {
  return (
    <div className="messages-wrapper">
      <div className="left-wrapper"></div>
      <div className="right-wrapper">
        <div className="message-screen"></div>
        <input
          className="message-input"
          noBreak
          placeholder="پیام خود را تایپ کنید و Enter بزنید..."
        />
      </div>
    </div>
  );
};

export default Messages;
