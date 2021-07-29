import React from "react";

// Libraries
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";

// Components
import { getUserTimeStatus, lastSeen, priceFormat } from "components/helper";

// Actions
import { Profile } from "redux/actions";

// XHR
import { baseURL } from "components/xhr";

const WaitingForTypedFile = ({ offer }) => {
  const dispatch = useDispatch();
  const onlineUsers = useSelector(state => state.OnlineUsers);

  const openProfile = () => {
    dispatch(
      Profile({
        isModalOpen: true,
        id: offer.typist_id,
        displayname: offer.typist,
        image: offer.typist_image,
      })
    );
  };

  return (
    <div className="waiting-wrapper">
      <div className="user-wrapper">
        {!!offer.typist_image ? (
          <>
            <img
              src={baseURL + offer.typist_image}
              alt="profile-pic"
              className={`profile-picture ${
                getUserTimeStatus(
                  onlineUsers,
                  offer.typist_id,
                  offer.typist_is_online
                )
                  ? "is-online"
                  : ""
              }`}
              onClick={openProfile}
            />
          </>
        ) : (
          <i
            className={`icon profile-pic-70 profile-picture ${
              getUserTimeStatus(
                onlineUsers,
                offer.typist_id,
                offer.typist_is_online
              )
                ? "is-online"
                : ""
            }`}
            onClick={openProfile}
          />
        )}
        <p className="username" onClick={openProfile}>
          {offer.typist}
        </p>
        <p
          className={`last-login ${
            getUserTimeStatus(
              onlineUsers,
              offer.typist_id,
              offer.typist_is_online
            )
              ? "is-online"
              : ""
          }`}
        >
          {getUserTimeStatus(
            onlineUsers,
            offer.typist_id,
            offer.typist_is_online
          ) ? (
            <span>آنلاین</span>
          ) : (
            <span>
              آخرین بازدید حدود{" "}
              {lastSeen(onlineUsers, offer.typist_id) ? (
                <Moment fromNow locale="fa">
                  {offer.typist_last_login}
                </Moment>
              ) : (
                <Moment fromNow locale="fa">
                  {
                    onlineUsers.lastLogins.find(x => x.id === offer.typist_id)
                      .lastLogin
                  }
                </Moment>
              )}
            </span>
          )}
        </p>
      </div>
      <div className="offer-details">
        <div>
          <p className="title">قیمت پیشنهادی</p>
          <p>&nbsp;&nbsp;{priceFormat(offer.myOffer_price)}</p>
        </div>
        <div style={{ marginRight: "20px" }}>
          <p className="title">قیمت کل</p>
          <p>&nbsp;&nbsp;{priceFormat(offer.total_price)}</p>
        </div>
      </div>
    </div>
  );
};

export default WaitingForTypedFile;
