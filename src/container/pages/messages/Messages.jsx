import React from "react";

// Design
import "./messages.scss";

const Messages = () => {
  return (
    <div className="messages-wrapper">
      <div className="left-wrapper"></div>
      <div className="right-wrapper">
        <div className="message-screen no-message">
          <p>برای ارسال پیام، از لیست سمت راست یک کاربر را انتخاب کنید.</p>
        </div>
        {/* <input
          className="message-input"
          placeholder="پیام خود را تایپ کنید و Enter بزنید..."
        /> */}
      </div>
    </div>
  );
};

export default Messages;
