import React, { useEffect, useState, useRef } from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";

// Components
import { Puffloader } from "components/loader";
import { farsiNumber, getUserTimeStatus } from "components/helper";

// Actions
import {
  SelectedImage,
  Sidebar,
  Profile,
  MessagesElse,
  Messages,
} from "redux/actions";

// Requests
import { handleErrors, UserProfile } from "requests";

// xhr
import { baseURL } from "components/xhr";
import Button from "components/buttons/Button";

const OthersProfile = () => {
  const dispatch = useDispatch();
  const sendMessage = useRef();
  const user = useSelector(state => state.Profile);
  const onlineUsers = useSelector(state => state.OnlineUsers);
  const messages = useSelector(state => state.Messages.messages);
  const [asTypist, setAsTypist] = useState(true);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const handleSendMessage = () => {
    if (!messages.find(x => x.id === user.id)) {
      dispatch(
        Messages({
          id: user.id,
          displayname: user.displayname,
          image: user.image,
          is_online: data.userIsOnline,
          last_login: data.userLastLogin,
          messages: [],
        })
      );
    }
    dispatch(MessagesElse({ id: user.id, isWatching: user.id }));
    dispatch(Sidebar({ page: "messages" }));
    dispatch(Profile({ isModalOpen: false }));
  };

  useEffect(() => {
    UserProfile({ id: user.id })
      .then(res => {
        setLoading(false);
        setData({
          typistSuccessfulProjects: res.typist_successful_projects,
          typistUnsuccessfulProjects: res.typist_unsuccessful_projects,
          ontimeDelivery: res.ontime_delivery,
          clientSuccessfulProjects: res.client_successful_projects,
          clientUnsuccessfulProjects: res.client_unsuccessful_projects,
          ontimePayment: res.ontime_payment,
          userIsOnline: res.is_online,
          userLastLogin: res.last_login,
        });
      })
      .catch(err => {
        setLoading(false);
        handleErrors(err);
      });

    // eslint-disable-next-line
  }, []);

  return (
    <div className="profile-content">
      <div className="profile-content-right">
        {!!user.image ? (
          <img
            src={baseURL + user.image}
            alt="profile"
            className={`profile-pic point ${
              getUserTimeStatus(onlineUsers, user.id, data.userIsOnline)
                ? "is-online"
                : ""
            }`}
            onClick={() =>
              dispatch(
                SelectedImage({
                  isModalOpen: true,
                  image: baseURL + user.image,
                })
              )
            }
          />
        ) : (
          <i className="icon profile-pic-default profile-pic" />
        )}
        <p className="profile-displayname">{user.displayname}</p>
        {!loading && (
          <div
            className={`last-login ${
              getUserTimeStatus(onlineUsers, user.id, data.userIsOnline)
                ? "is-online"
                : ""
            }`}
          >
            {getUserTimeStatus(onlineUsers, user.id, data.userIsOnline) ? (
              <span>آنلاین</span>
            ) : (
              <span>
                آخرین بازدید حدود{" "}
                {!onlineUsers.disconnects.includes(user.id) ? (
                  <Moment fromNow locale="fa">
                    {data.userLastLogin}
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
        )}
      </div>
      {!loading ? (
        <div className="profile-content-cv">
          <div className="typist-client-switcher-wrapper no-select">
            به عنوان
            <div
              className="typist-client-switcher no-select"
              onClick={() => setAsTypist(!asTypist)}
            >
              <div className={asTypist ? "activated" : "deactivated"}>
                تایپیست
              </div>
              <div className={asTypist ? "deactivated" : "activated"}>
                کارفرما
              </div>
            </div>
          </div>
          <div className="user-profile-data-wrapper">
            <p className="title">پروژه های موفق</p>
            <p className="value green">
              {asTypist
                ? farsiNumber(Number(data.typistSuccessfulProjects))
                : farsiNumber(Number(data.clientSuccessfulProjects))}
            </p>
            <p className="title">پروژه های ناموفق</p>
            <p className="value red">
              {asTypist
                ? farsiNumber(Number(data.typistUnsuccessfulProjects))
                : farsiNumber(Number(data.clientUnsuccessfulProjects))}
            </p>
            <p className="title">
              {asTypist ? <>تحویل به موقع</> : <>پرداخت به موقع</>}
            </p>
            <p className="value">
              {asTypist ? (
                data.ontimeDelivery ? (
                  <>{farsiNumber(Number(data.ontimeDelivery))}%</>
                ) : (
                  <>—</>
                )
              ) : data.ontimePayment ? (
                <>{farsiNumber(Number(data.ontimePayment))}%</>
              ) : (
                <>—</>
              )}
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <Button
              ref={sendMessage}
              title="ارسال پیام"
              className="fit-width"
              onClick={handleSendMessage}
            />
          </div>
        </div>
      ) : (
        <>
          <Puffloader color="#1c3987" loading={loading} size={100} />
        </>
      )}
    </div>
  );
};

export default OthersProfile;
