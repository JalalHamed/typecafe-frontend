import React, { useState } from "react";

// Libraries
import { useSelector, useDispatch } from "react-redux";

// Requests
import Socket from "requests/Socket";
import { SendMessage } from "requests";

// Actions
import { NewMessagesAction } from "redux/actions";

// XHR
import { baseURL } from "components/xhr";

// Design
import "./messages.scss";

const TheMessages = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.User);
  const messages = useSelector(state => state.Messages);
  const [selected, setSelected] = useState(null);
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    SendMessage({ receiver: selected, content: value })
      .then(res => {
        Socket.send(
          JSON.stringify({ status: "new-message", sender: user.id, ...res })
        );
        setValue("");
        dispatch(NewMessagesAction({ id: selected, message: res }));
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="messages-wrapper">
      <div className="contact-list-warpper no-select">
        <input className="search" placeholder="جستجو" />
        {messages.map(user => {
          return (
            <div
              key={user.id}
              className={`contact ${selected === user.id ? "selected" : ""}`}
              onClick={() => setSelected(user.id)}
            >
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
        <div className={`message-screen ${selected ? "" : "no-message"}`}>
          {selected ? (
            <div>
              {messages
                .find(user => user.id === selected)
                .messages.sort((a, b) =>
                  a.id > b.id ? 1 : b.id > a.id ? -1 : 0
                )
                .map(message => {
                  return (
                    <div
                      key={message.id}
                      className={`message-wrapper ${
                        message.sor === "received" ? "received" : ""
                      }`}
                    >
                      <p
                        className={`message ${
                          message.sor === "received" ? "received" : "sent"
                        }`}
                      >
                        {message.content}
                      </p>
                    </div>
                  );
                })}
            </div>
          ) : (
            <p className="pick-a-message-to-chat">
              برای ارسال پیام، از لیست سمت راست یک کاربر را انتخاب کنید.
            </p>
          )}
        </div>
        {selected && (
          <form onSubmit={handleSubmit}>
            <input
              className="message-input"
              placeholder="پیام خود را تایپ کنید و Enter بزنید..."
              value={value}
              onChange={e => setValue(e.target.value)}
            />
          </form>
        )}
      </div>
    </div>
  );
};

export default TheMessages;
