import React, { useRef } from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
// import { toast } from "react-toastify";

// Components
import Close from "components/buttons/Close";
import Button from "components/buttons/Button";
import Previous from "components/buttons/Previous";
import { priceFormat } from "components/helper";

// Actions
import {
  AoROfferAction,
  Sidebar,
  NotEnoughCreditAction,
  RulesScrollToHTWW,
} from "redux/actions";

// Requests
import { RejectOffer } from "requests";

// xhr
import { baseURL } from "components/xhr";

// Designs
import "./aoroffer.scss";

const AoROffer = () => {
  const dispatch = useDispatch();
  const submitButtonRippleRef = useRef();
  const previousButtonRippleRef = useRef();
  const offer = useSelector(state => state.AoROffer);
  const user = useSelector(state => state.User);

  const handleGoToRules = () => {
    dispatch(RulesScrollToHTWW(true));
    dispatch(AoROfferAction({ isModalOpen: false }));
    dispatch(Sidebar({ page: "rules" }));
  };

  const handleAccept = () => {
    if (user.credit < offer.wholePrice) {
      dispatch(NotEnoughCreditAction(true));
      setTimeout(() => {
        dispatch(AoROfferAction({ isModalOpen: false }));
      }, 48);
    }
  };

  const handleReject = () => {
    RejectOffer({ id: offer.id })
      .then(res => console.log(res))
      .catch(err => console.error(err));
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
          <p className="value">{priceFormat(offer.offeredPrice)}</p>
          <p className="title" style={{ marginTop: "7px" }}>
            جمع کل با احتساب ۱۰٪ کارمزد سایت
          </p>
          <p className="value">{priceFormat(offer.wholePrice)}</p>
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
              ref={submitButtonRippleRef}
              title="تایید پیشنهاد"
              className="w-68 green"
              onClick={handleAccept}
            />
            <Previous
              ref={previousButtonRippleRef}
              title="انصراف"
              className="w-30"
              onClick={() => dispatch(AoROfferAction({ isModalOpen: false }))}
            />
          </div>
        </>
      )}
      {offer.status === "reject" && (
        <div className="button-wrapper">
          <Button
            ref={submitButtonRippleRef}
            title="رد پیشنهاد"
            className="w-68 red"
            onClick={handleReject}
          />
          <Previous
            ref={previousButtonRippleRef}
            title="انصراف"
            className="w-30"
            onClick={() => dispatch(AoROfferAction({ isModalOpen: false }))}
          />
        </div>
      )}
    </motion.div>
  );
};

export default AoROffer;
