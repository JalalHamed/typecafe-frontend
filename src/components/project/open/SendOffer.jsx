import React, { useEffect, useState, useRef } from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

// Components
import Input from "components/inputs/Input";
import Button from "components/buttons/Button";
import Offer from "components/offer/Offer";
import {
  extractCommission,
  remainingTime,
  priceFormat,
  addCommission,
} from "components/helper";

// Requests
import socket from "requests/socket";
import { DeleteOffer, handleErrors } from "requests";

// Actions
import { CreateOffer, OffersAction, ClientAccept } from "redux/actions";

// Designs
import "./open.scss";

const SendOffer = ({ project }) => {
  const dispatch = useDispatch();
  const submitReqeustRef = useRef();
  const user = useSelector(state => state.User);
  const downloaded = useSelector(state => state.Projects.downloaded);
  const offereds = useSelector(state => state.Offers.offereds);
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
          toast.info(<>پیشنهاد شما لغو شد.</>);
        })
        .catch(err => {
          setLoading(false);
          handleErrors(err);
        });
    }
  };

  useEffect(() => {
    if (!user.isLoggedIn && project.status === "O") {
      setErrMsg("جهت ثبت پیشنهاد، ابتدا به حساب کاربری خود وارد شوید.");
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
    let ownOffer = offereds.find(offer => offer.project === project.id);
    if (ownOffer) {
      setOffer(ownOffer);
      if (
        ownOffer.client_accept &&
        remainingTime(ownOffer.client_accept, 30) >= 0
      )
        dispatch(
          ClientAccept({
            isModalOpen: true,
            project: ownOffer.project,
            issued_at: ownOffer.client_accept,
            client: project.client,
            offer: ownOffer.id,
          })
        );
    } else {
      setOffer(null);
    }

    // eslint-disable-next-line
  }, [offereds]);

  return (
    <>
      {downloaded.includes(project.id) ? (
        <>
          {offer ? (
            <div
              className={`has-offers-wrapper no-height less-width ${
                loading ? "lower-opacity" : ""
              }`}
            >
              <p style={{ fontSize: "14px" }}>پیشنهاد من</p>
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
                <Offer project={project} offer={offer} />
              </div>
            </div>
          ) : (
            <div className="request-offer-wrapper">
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
                <span className="left-value">{priceFormat(typistEarning)}</span>
                <>
                  <p className="left-title">جمع کل</p>
                  <p className="left-value">
                    {priceFormat(
                      addCommission(price * project.number_of_pages)
                    )}
                  </p>
                </>
              </div>
            </div>
          )}
        </>
      ) : (
        <p className="err-msg">{errMsg}</p>
      )}
    </>
  );
};

export default SendOffer;
