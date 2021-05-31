import React from "react";

// Libraries
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";

// Components
import { scrollToRef, getUserTimeStatus, farsiNumber } from "components/helper";

// Requests
import { ReadMessages } from "requests";

// Actions
import { Messages, MessagesElse, ReadMessagesAction } from "redux/actions";

// XHR
import { baseURL } from "components/xhr";

const User = ({
  user,
  isSearch,
  selected,
  messages,
  setSearch,
  setSearchResults,
  messageRef,
}) => {
  const dispatch = useDispatch();
  const onlineUsers = useSelector(state => state.OnlineUsers);
  const totalUnread = useSelector(state => state.Messages.totalUnread);

  return (
    <div
      className={`contact ${selected === user.id ? "selected" : ""}`}
      onClick={() => {
        if (!isSearch) {
          if (user.unread) ReadMessages({ sender_id: user.id });
          dispatch(
            MessagesElse({
              id: user.id,
              isWatching: user.id,
              totalUnread: totalUnread - user.unread,
            })
          );
          dispatch(ReadMessagesAction({ id: user.id }));
        } else {
          if (!messages.find(x => x.id === user.id)) {
            dispatch(
              Messages({
                id: user.id,
                displayname: user.displayname,
                image: user.image,
                is_online: user.is_online,
                last_login: user.last_login,
                messages: [],
              })
            );
          }
          dispatch(MessagesElse({ id: user.id, isWatching: user.id }));
          setSearch("");
          setSearchResults([]);
        }
        setTimeout(() => {
          scrollToRef(messageRef);
        }, 100);
      }}
    >
      {user.image ? (
        <img
          src={baseURL + user.image}
          alt={`profile ${user.id}`}
          className={`user-image ${
            getUserTimeStatus(onlineUsers, user.id, user.is_online) &&
            selected === user.id
              ? "is-online"
              : ""
          }`}
        />
      ) : (
        <i
          className={`icon project-client-default-pic user-image ${
            getUserTimeStatus(onlineUsers, user.id, user.is_online) &&
            selected === user.id
              ? "is-online"
              : ""
          }`}
        />
      )}
      <div className="user-name-status-wrapper">
        <p>{user.displayname}</p>
        <div
          className={`user-time-status ${
            selected === user.id ? "selected" : ""
          } ${
            getUserTimeStatus(onlineUsers, user.id, user.is_online) &&
            selected === user.id
              ? "is-online"
              : ""
          }`}
        >
          {getUserTimeStatus(onlineUsers, user.id, user.is_online) ? (
            <span>آنلاین</span>
          ) : (
            <span>
              آخرین بازدید حدود{" "}
              {!onlineUsers.disconnects.includes(user.id) ? (
                <Moment fromNow locale="fa">
                  {user.last_login}
                </Moment>
              ) : (
                <Moment fromNow locale="fa">
                  {onlineUsers.lastLogins.find(x => x.id === user.id).lastLogin}
                </Moment>
              )}
            </span>
          )}
        </div>
      </div>
      {!!user.unread && (
        <div className="unread-messages-counter">
          {farsiNumber(user.unread)}
        </div>
      )}
    </div>
  );
};

export default User;
