import React, { useEffect, useState, useRef } from "react";

// Libraries
import Moment from "react-moment";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

// Components
import Input from "components/inputs/Input";
import Button from "components/buttons/Button";
import { priceFormat, extractCommission } from "components/helper";
import { Puffloader, Skewloader } from "components/loader";

// Requests
import socket from "requests/socket";
import { DeleteOffer } from "requests";

// Actions
import { CreateOffer, OffersAction } from "redux/actions";

const OthersProject = ({ project, downloaded }) => {
  const dispatch = useDispatch();
  const submitReqeustRef = useRef();
  const user = useSelector(state => state.User);
  const offereds = useSelector(state => state.Offers.offereds);
  const isLoading = useSelector(state => state.Projects);
  const [errMsg, setErrMsg] = useState("");
  const [inputDisabled, setInputDisabled] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [price, setPrice] = useState(1560);
  const [typistEarning, setTypistEarning] = useState(extractCommission(price));
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOffer = () => {
    dispatch(
      CreateOffer({
        isModalOpen: true,
        selectedPageCount: project.number_of_pages,
        selectedPricePerPage: price,
        selectedDeadline: project.delivery_deadline,
        selectedId: project.id,
      })
    );
  };

  const handleDelete = id => {
    if (!loading) {
      setLoading(true);
      DeleteOffer({ id })
        .then(() => {
          setLoading(false);
          dispatch(
            OffersAction({ offereds: offereds.filter(x => x.id !== id) })
          );
          socket.send(
            JSON.stringify({
              status: "offer-delete",
              id: id,
              project_owner: project.client_id,
            })
          );
          toast.info("پیشنهاد شما با موفقیت لغو شد.");
        })
        .catch(err => {
          setLoading(false);
          console.error(err);
        });
    }
  };

  useEffect(() => {
    if (!user.isLoggedIn && project.status === "O") {
      setErrMsg("جهت ثبت پیشنهاد، ابتدا به حساب کاربری خود وارد شوید.");
      setButtonDisabled(true);
      setInputDisabled(true);
    } else if (!user.isLoggedIn && project.status === "IP") {
      setErrMsg("In Progress");
      setButtonDisabled(true);
      setInputDisabled(true);
    } else if (!downloaded.includes(project.id)) {
      setErrMsg("جهت ثبت پیشنهاد، ابتدا فایل پروژه را دانلود کنید.");
      setButtonDisabled(true);
      setInputDisabled(true);
    } else if (price < 1560) {
      setErrMsg("قیمت پیشنهادی نمی‌تواند کمتر از ۱,۵۶۰ تومان باشد.");
      setButtonDisabled(true);
      setInputDisabled(false);
    } else {
      setErrMsg("");
      setButtonDisabled(false);
      setInputDisabled(false);
    }
  }, [user.isLoggedIn, downloaded, price, project.id, project.status]);

  useEffect(() => {
    setTypistEarning(extractCommission(price));
  }, [price]);

  useEffect(() => {
    if (offereds.find(offer => offer.project === project.id)) {
      setOffer(offereds.find(offer => offer.project === project.id));
    } else {
      setOffer(null);
    }

    // eslint-disable-next-line
  }, [offereds]);

  return (
    <>
      {!isLoading.offeredsLoading && !isLoading.downloadsLoading ? (
        <>
          {downloaded.includes(project.id) ? (
            <>
              {offer ? (
                <>
                  {offer.status === "ACC" ? (
                    <></>
                  ) : (
                    <div
                      className={`has-offers-wrapper no-height less-width ${
                        loading ? "lower-opacity" : ""
                      }`}
                    >
                      <p style={{ marginRight: "10px", fontSize: "14px" }}>
                        پیشنهاد من
                      </p>
                      <div
                        className={`request-wrapper less-tp ${
                          offer.status === "A" ? "more-pl" : ""
                        }`}
                      >
                        {offer.status === "A" && (
                          <i
                            className={`icon icon-close-background-red delete-offer ${
                              loading ? "not-pointer" : ""
                            }`}
                            onClick={() => handleDelete(offer.id)}
                          />
                        )}
                        <div
                          className={`offer ${
                            offer.status === "REJ" ? "rejected" : ""
                          }`}
                        >
                          <div className="offered-price-wrapper">
                            <span className="offered-price-title">
                              قیمت پیشنهادی
                            </span>
                            <span className="offered-price">
                              {priceFormat(offer.offered_price)}
                            </span>
                          </div>
                          <div className="offered-price-wrapper">
                            <span className="offered-price-title">
                              عایدی کل
                            </span>
                            <span className="offered-price">
                              {priceFormat(
                                extractCommission(
                                  offer.offered_price * project.number_of_pages
                                )
                              )}
                            </span>
                          </div>
                          <p className="waiting-for-approval">
                            {offer.status === "A" && (
                              <span>در انتظار تایید</span>
                            )}
                            {offer.status === "REJ" && (
                              <span className="rejected-note">رد شده</span>
                            )}
                          </p>
                          <div className="offer-created-at">
                            <Moment fromNow locale="fa">
                              {offer.created_at}
                            </Moment>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="request-offer-wrapper">
                  {project.status === "O" && (
                    <>
                      <div className="request-offer-form-wrapper">
                        <Input
                          label="قیمت پیشنهادی (هر صفحه)"
                          name="request"
                          type="number"
                          id={project.id}
                          wrapperStyle={{ width: "100%" }}
                          labelStyle={{ fontSize: "14px" }}
                          style={{ fontSize: "14px", width: "200px" }}
                          min={1560}
                          disabled={inputDisabled}
                          value={price}
                          onChange={e => setPrice(e.target.value)}
                        />
                        <Button
                          ref={submitReqeustRef}
                          title="ثبت پیشنهاد"
                          className="fit-width no-break"
                          disabled={buttonDisabled}
                          onClick={handleOffer}
                        />
                        <p className="err-msg">{errMsg}</p>
                      </div>
                      <div className="calculate-price-wrapper">
                        <p className="left-title">کارمزد</p>
                        <span className="left-value">٪۱۰</span>
                        <p className="left-title">عایدی شما به ازای هر صفحه</p>
                        <span className="left-value">
                          {priceFormat(typistEarning)}
                        </span>
                        <>
                          <p className="left-title">جمع کل</p>
                          <p className="left-value">
                            {priceFormat(
                              extractCommission(price * project.number_of_pages)
                            )}
                          </p>
                        </>
                      </div>
                    </>
                  )}
                  {project.status === "IP" && <Skewloader color="#fca636" />}
                </div>
              )}
            </>
          ) : (
            <p className="err-msg">
              {errMsg === "In Progress" && <Skewloader color="#fca636" />}
              {errMsg !== "In Progress" && errMsg}
            </p>
          )}
        </>
      ) : (
        <Puffloader color="#1c3987" loading={true} size={100} />
      )}
    </>
  );
};

export default OthersProject;
