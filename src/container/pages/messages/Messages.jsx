import React, { useState, useEffect, useRef } from "react";

// Libraries
import Moment from "react-moment";
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
  const messageRef = useRef();
  const user = useSelector(state => state.User);
  const messages = useSelector(state => state.Messages);
  const [selected, setSelected] = useState(null);
  const [value, setValue] = useState("");

  const scrollToBottom = () => {
    const scroll =
      messageRef.current.scrollHeight - messageRef.current.clientHeight;

    messageRef.current.scrollTo(0, scroll);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (value)
      SendMessage({ receiver: selected, content: value })
        .then(res => {
          Socket.send(
            JSON.stringify({ status: "new-message", sender: user.id, ...res })
          );
          setValue("");
          dispatch(
            NewMessagesAction({
              id: selected,
              message: { ...res, sor: "sent" },
            })
          );
          scrollToBottom();
        })
        .catch(err => console.log(err));
  };

  const escapeHandler = ({ key }) => {
    if (key === "Escape") {
      setSelected(null);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", escapeHandler);
    return () => window.removeEventListener("keydown", escapeHandler);
  }, []);

  return (
    <div className="messages-wrapper">
      <div className="contact-list-warpper no-select">
        <input className="search" placeholder="جستجو" />
        {messages.map(user => {
          return (
            <div
              key={user.id}
              className={`contact ${selected === user.id ? "selected" : ""}`}
              onClick={() => {
                setSelected(user.id);
                setTimeout(() => {
                  scrollToBottom();
                }, 100);
              }}
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
        <div
          className={`message-screen ${selected ? "" : "no-message"}`}
          ref={messageRef}
        >
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
                })}
            </div>
          ) : (
            <p className="pick-a-message-to-chat">
              برای ارسال پیام یک کاربر را انتخاب کنید.
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
