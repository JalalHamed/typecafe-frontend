import React, { useEffect, useState, useRef } from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";

// Components
import { Puffloader } from "components/loader";
import { farsiNumber } from "components/helper";

// Actions
import { SelectedImage } from "redux/actions";

// Requests
import { UserProfile } from "requests";

// xhr
import { baseURL } from "components/xhr";
import Button from "components/buttons/Button";

const OthersProfile = () => {
  const dispatch = useDispatch();
  const sendMessage = useRef();
  const user = useSelector(state => state.Profile);
  const [asTypist, setAsTypist] = useState(true);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

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
        });
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
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
            className="profile-pic point"
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
