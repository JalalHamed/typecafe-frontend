import React, { useState, useEffect, useRef } from "react";

// Libraries
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

// Components
import User from "components/messages/User";
import Message from "components/messages/Message";
import { Puffloader } from "components/loader";
import { scrollToRef } from "components/helper";

// Requests
import socket from "requests/socket";
import {
  SendMessage,
  SearchDisplayname,
  ReadMessages,
  handleErrors,
} from "requests";

// Actions
import {
  NewMessageAction,
  MessagesElse,
  ReadMessagesAction,
} from "redux/actions";

// Design
import "./messages.scss";

const TheMessages = () => {
  const dispatch = useDispatch();
  const messageRef = useRef();
  const inputRef = useRef();
  const user = useSelector(state => state.User);
  const messages = useSelector(state => state.Messages.messages);
  const selected = useSelector(state => state.Messages.id);
  const totalUnread = useSelector(state => state.Messages.totalUnread);
  const loading = useSelector(state => state.Messages.isLoading);
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    if (value.trim())
      SendMessage({ receiver: selected, content: value })
        .then(res => {
          socket.send(
            JSON.stringify({
              status: "new-message",
              sender_id: user.id,
              ...res,
            })
          );
          setValue("");
          dispatch(
            NewMessageAction({
              id: selected,
              message: { ...res, sor: "sent" },
            })
          );
        })
        .catch(err => handleErrors(err));
  };

  const escapeHandler = ({ key }) => {
    if (key === "Escape") {
      dispatch(MessagesElse({ id: null, isWatching: null }));
    }
  };

  useEffect(() => {
    if (selected) {
      ReadMessages({ sender_id: selected });
      dispatch(
        MessagesElse({
          isWatching: selected,
          totalUnread:
            totalUnread - messages.find(x => x.id === selected).unread,
        })
      );
      dispatch(ReadMessagesAction({ id: selected }));
    }
    window.addEventListener("keydown", escapeHandler);
    return () => {
      dispatch(MessagesElse({ isWatching: null }));
      window.removeEventListener("keydown", escapeHandler);
    };

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (search.length && search.length < 2) {
      setSearchLoading(true);
      SearchDisplayname({ search })
        .then(res => {
          setSearchResults(res);
          setSearchLoading(false);
        })
        .catch(err => {
          handleErrors(err);
          setSearchLoading(false);
        });
    }
    if (search.length > 1 && search.length < 15 && searchResults.length) {
      setSearchLoading(true);
      SearchDisplayname({ search })
        .then(res => {
          setSearchResults(res);
          setSearchLoading(false);
        })
        .catch(err => {
          handleErrors(err);
          setSearchLoading(false);
        });
    }

    // eslint-disable-next-line
  }, [search]);

  useEffect(() => {
    scrollToRef(messageRef);
  }, [messages]);

  return (
    <div className="messages-wrapper">
      {!loading ? (
        <>
          <div className="contact-list-warpper no-select">
            <input
              className="search"
              placeholder="جستجو نام نمایشی"
              value={search}
              onChange={e => setSearch(e.target.value)}
              maxLength={14}
            />
            {!searchLoading ? (
              <div className="contacts-wrapper">
                {search.length ? (
                  <p className="search-result-note">نتیجه جسجتو</p>
                ) : (
                  <></>
                )}
                {!search.length ? (
                  messages.length ? (
                    messages.map(user => (
                      <User
                        key={user.id}
                        user={user}
                        isSearch={false}
                        selected={selected}
                        messages={messages}
                        setSearch={setSearch}
                        setSearchResults={setSearchResults}
                        messageRef={messageRef}
                      />
                    ))
                  ) : (
                    <p className="no-messasges-yet">هنوز هیچ پیامی ندارید.</p>
                  )
                ) : (
                  <>
                    {searchResults.length ? (
                      searchResults.map(user => (
                        <User
                          key={user.id}
                          user={user}
                          isSearch={true}
                          selected={selected}
                          messages={messages}
                          setSearch={setSearch}
                          setSearchResults={setSearchResults}
                          messageRef={messageRef}
                        />
                      ))
                    ) : (
                      <p className="no-messasges-yet">
                        کاربری با این نام نمایشی یافت نشد.
                      </p>
                    )}
                  </>
                )}
              </div>
            ) : (
              <div className="middle-of-the-page">
                <Puffloader color="#fff" loading={true} size={100} />
              </div>
            )}
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
                  .map(message => (
                    <Message key={message.id} message={message} />
                  ))
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
                  ref={inputRef}
                  placeholder="پیام خود را تایپ کنید و Enter بزنید..."
                  value={value}
                  onChange={e => setValue(e.target.value)}
                  autoFocus
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
