import React from "react";

// Libraries
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";

// Components
import { scrollToRef } from "components/helper";

// Actions
import { Messages, SendMessageID } from "redux/actions";

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

  const getUserTimeStatus = user => {
    if (
      !onlineUsers.disconnects.includes(user.id) &&
      (user.is_online || onlineUsers.ids.includes(user.id))
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      {isSearch && <p className="search-result-note">نتیجه جسجتو</p>}
      <div
        key={user.id}
        className={`contact ${selected === user.id ? "selected" : ""}`}
        onClick={() => {
          if (!isSearch) {
            dispatch(SendMessageID({ id: user.id, isWatching: user.id }));
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
            dispatch(SendMessageID({ id: user.id, isWatching: user.id }));
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
              getUserTimeStatus(user) && selected === user.id ? "is-online" : ""
            }`}
          />
        ) : (
          <i
            className={`icon project-client-default-pic user-image ${
              getUserTimeStatus(user) && selected === user.id ? "is-online" : ""
            }`}
          />
        )}
        <div className="user-name-status-wrapper">
          <p>{user.displayname}</p>
          <div
            className={`user-time-status ${
              selected === user.id ? "selected" : ""
            } ${
              getUserTimeStatus(user) && selected === user.id ? "is-online" : ""
            }`}
          >
            {getUserTimeStatus(user) ? (
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
                    {
                      onlineUsers.lastLogins.find(x => x.id === user.id)
                        .lastLogin
                    }
                  </Moment>
                )}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
