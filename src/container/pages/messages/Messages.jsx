import React, { useEffect } from "react";

// Libraries
import { useSelector } from "react-redux";

// XHR
import { baseURL } from "components/xhr";

// Design
import "./messages.scss";

const Messages = () => {
  const messages = useSelector(state => state.Messages);

  useEffect(() => {
    console.log("messages", messages);
  }, [messages]);

  return (
    <div className="messages-wrapper">
      <div className="contact-list-warpper">
        <input className="search" placeholder="جستجو" />
        {messages.map(user => {
          return (
            <div key={user.id} className="contact">
              {user.image ? (
                <img
                  src={baseURL + user.image}
                  alt={`profile ${user.id}`}
                  className="user-image"
                />
              ) : (
                <i className="icon project-client-default-pic" />
              )}
              <p className="user-displayname">{user.displayname}</p>
            </div>
          );
        })}
      </div>
      <div className="message-screen-and-input-wrapper">
        <div className="message-screen no-message">
          <p className="pick-a-message-to-chat">
            برای ارسال پیام، از لیست سمت راست یک کاربر را انتخاب کنید.
          </p>
        </div>
        <input
          className="message-input"
          placeholder="پیام خود را تایپ کنید و Enter بزنید..."
        />
      </div>
    </div>
  );
};

export default Messages;
