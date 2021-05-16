import React from "react";

// Libraries
import Moment from "react-moment";

const Message = ({ message }) => {
  return (
    <div
      key={message.id}
      className={`message-wrapper ${
        message.sor === "received" ? "received" : ""
      }`}
    >
      <div className="message-content">
        {message.sor === "received" && (
          <div className="message-date received">
            <Moment fromNow locale="fa">
              {message.issue_date}
            </Moment>
          </div>
        )}
        <div
          className={`message ${
            message.sor === "received" ? "received" : "sent"
          }`}
        >
          {message.content}
        </div>
        {message.sor === "sent" && (
          <div className="message-date sent">
            <Moment fromNow locale="fa">
              {message.issue_date}
            </Moment>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
