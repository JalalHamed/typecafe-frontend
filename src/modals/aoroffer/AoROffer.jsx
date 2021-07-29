import React, { useRef, useState } from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

// Components
import Close from "components/buttons/Close";
import Button from "components/buttons/Button";
import Previous from "components/buttons/Previous";
import { priceFormat } from "components/helper";

// Requests
import socket from "requests/socket";
import { RejectOffer, ClientAcceptReq, handleErrors } from "requests";

// Actions
import {
  AoROfferAction,
  Sidebar,
  NotEnoughCreditAction,
  RulesScrollTo,
  ClientAccept,
  OffersAction,
} from "redux/actions";

// xhr
import { baseURL } from "components/xhr";

// Designs
import "./aoroffer.scss";

const AoROffer = () => {
  const dispatch = useDispatch();
  const submitButtonRef = useRef();
  const previousButtonRef = useRef();
  const offer = useSelector(state => state.AoROffer);
  const user = useSelector(state => state.User);
  const offers = useSelector(state => state.Offers.offers);
  const [loading, setLoading] = useState(false);

  const handleGoToRules = () => {
    dispatch(RulesScrollTo("HowTheWebsiteWorks"));
    dispatch(AoROfferAction({ isModalOpen: false }));
    dispatch(Sidebar({ page: "rules" }));
  };

  const handleAccept = () => {
    if (user.credit < offer.totalPrice) {
      dispatch(NotEnoughCreditAction(true));
      setTimeout(() => {
        dispatch(AoROfferAction({ isModalOpen: false }));
      }, 48);
    } else {
      dispatch(AoROfferAction({ isModalOpen: false }));
      ClientAcceptReq({ id: offer.id })
        .then(res => {
          socket.send(
            JSON.stringify({
              status: "client-accept",
              id: offer.id,
              client: user.displayname,
              issued_at: res,
            })
          );
          dispatch(
            ClientAccept({
              offer: offer.id,
              issued_at: res,
              project: offer.project_id,
            })
          );
        })
        .catch(err => handleErrors(err));
    }
  };

  const handleReject = () => {
    setLoading(true);
    RejectOffer({ id: offer.id })
      .then(() => {
        setLoading(false);
        dispatch(
          OffersAction({ offers: offers.filter(x => x.id !== offer.id) })
        );
        dispatch(AoROfferAction({ isModalOpen: false }));
        socket.send(
          JSON.stringify({
            status: "offer-rejected",
            id: offer.id,
          })
        );
      })
      .catch(err => {
        setLoading(false);
        handleErrors(err);
      });
  };

  return (
    <motion.div
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      className="aoroffer-wrapper"
    >
      <Close
        className="close-modal"
        onClick={() => dispatch(AoROfferAction({ isModalOpen: false }))}
      />
      <div className="top-layer">
        <div className="typist-wrapper">
          {offer.typistImage ? (
            <img
              src={baseURL + offer.typistImage}
              alt="typist"
              className="typist-image"
            />
          ) : (
            <i className="icon aofoffer-typist-default-pic" />
          )}
          <p className="typist-name">{offer.typist}</p>
        </div>
        <div className="aoroffer-details-wrapper">
          <p className="title">قیمت پیشنهادی به ازای هرصفحه</p>
          <p className="value">{priceFormat(offer.myOfferPrice)}</p>
          <p className="title" style={{ marginTop: "7px" }}>
            جمع کل با احتساب ۱۰٪ کارمزد سایت
          </p>
          <p className="value">{priceFormat(offer.totalPrice)}</p>
        </div>
      </div>
      {offer.status === "accept" && (
        <>
          <p className="aoroffer-note">
            پس از تایید درخواست، مبلغ کل از حساب شما کسر و در حساب سایت بلوکه
            خواهد شد. در صورت نپرداختن دستمزد تایپیست به مدت ۲۴ ساعت پس از آپلود
            شدن فایل نهایی توسط تایپیست برای شما، این مبلغ به طور خودکار به حساب
            تایپیست واریز و یک پروژه ناموفق در کارنامه شما ثبت خواهد شد.
          </p>
          <p className="go-to-rules" onClick={handleGoToRules}>
            اطلاعات بیشتر درباره نحوه ایجاد و انجام پروژه
          </p>
          <div className="button-wrapper">
            <Button
              ref={submitButtonRef}
              title="تایید پیشنهاد"
              className="w-68 green"
              onClick={handleAccept}
              loading={loading}
            />
            <Previous
              ref={previousButtonRef}
              title="انصراف"
              className="w-30"
              onClick={() =>
                dispatch(
                  AoROfferAction({
                    isModalOpen: false,
                    id: null,
                    project_id: null,
                    typist: "",
                    typistImage: "",
                    myOfferPrice: 0,
                    totalPrice: 0,
                    status: "",
                  })
                )
              }
            />
          </div>
        </>
      )}
      {offer.status === "reject" && (
        <div className="button-wrapper">
          <Button
            ref={submitButtonRef}
            title="رد پیشنهاد"
            className="w-68 red"
            onClick={handleReject}
            loading={loading}
          />
          <Previous
            ref={previousButtonRef}
            title="انصراف"
            className="w-30"
            onClick={() =>
              dispatch(
                AoROfferAction({
                  isModalOpen: false,
                  id: null,
                  project_id: null,
                  typist: "",
                  typistImage: "",
                  myOfferPrice: 0,
                  totalPrice: 0,
                  status: "",
                })
              )
            }
          />
        </div>
      )}
    </motion.div>
  );
};

export default AoROffer;
