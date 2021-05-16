import React, { useState, useEffect, useRef } from "react";

// Libraries
import Moment from "react-moment";
import { useSelector, useDispatch } from "react-redux";

// Components
import { Puffloader } from "components/loader";
import User from "./User";

// Requests
import Socket from "requests/Socket";
import { SendMessage, SearchDisplayname } from "requests";

// Actions
import { NewMessagesAction, SendMessageID } from "redux/actions";

// Design
import "./messages.scss";

const TheMessages = () => {
  const dispatch = useDispatch();
  const messageRef = useRef();
  const user = useSelector(state => state.User);
  const messages = useSelector(state => state.Messages.messages);
  const selected = useSelector(state => state.Messages.id);
  const loading = useSelector(state => state.Messages.isLoading);
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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
            JSON.stringify({
              status: "new-message",
              sender_id: user.id,
              ...res,
            })
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
      dispatch(SendMessageID({ id: null, isWatching: null }));
    }
  };

  useEffect(() => {
    dispatch(SendMessageID({ isWatching: selected }));
    window.addEventListener("keydown", escapeHandler);
    return () => {
      window.removeEventListener("keydown", escapeHandler);
      dispatch(SendMessageID({ isWatching: null }));
    };

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (search.length) {
      SearchDisplayname({ search })
        .then(res => {
          setSearchResults(res);
        })
        .catch(err => console.error(err));
    }
  }, [search]);

  return (
    <div className="messages-wrapper">
      {!loading ? (
        <>
          <div className="contact-list-warpper no-select">
            <>
              <input
                className="search"
                placeholder="جستجو نام نمایشی"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <div className="contacts-wrapper">
                {!search.length ? (
                  messages.map(user => (
                    <User
                      user={user}
                      isSearch={false}
                      selected={selected}
                      messages={messages}
                      setSearch={setSearch}
                      setSearchResults={setSearchResults}
                      scrollToBottom={scrollToBottom}
                    />
                  ))
                ) : (
                  <>
                    {searchResults.length ? (
                      searchResults.map(user => (
                        <User
                          user={user}
                          isSearch={true}
                          selected={selected}
                          messages={messages}
                          setSearch={setSearch}
                          setSearchResults={setSearchResults}
                          scrollToBottom={scrollToBottom}
                        />
                      ))
                    ) : (
                      <p style={{ color: "#fff" }}>در حال بارگذاری</p>
                    )}
                  </>
                )}
              </div>
            </>
          </div>
          <div className="message-screen-and-input-wrapper">
            <div
              className={`message-screen ${selected ? "" : "no-message"}`}
              ref={messageRef}
            >
              {selected ? (
                messages
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
                  })
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
        </>
      ) : (
        <div className="middle-of-the-page">
          <Puffloader color="#1c3987" loading={true} size={100} />
        </div>
      )}
    </div>
  );
};

export default TheMessages;
