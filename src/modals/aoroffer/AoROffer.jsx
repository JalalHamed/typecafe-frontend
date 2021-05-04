import React from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
// import { toast } from "react-toastify";

// Components
import Close from "components/buttons/Close";
import { priceFormat } from "components/helper";

// Actions
import { AoROfferAction } from "redux/actions";

// xhr
import { baseURL } from "components/xhr";

// Designs
import "./aoroffer.scss";

const AoROffer = () => {
  const dispatch = useDispatch();
  const offer = useSelector(state => state.AoROffer);

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
            مبلغ کل با احتساب ٪۵ کارمزد سایت
          </p>
          <p className="value">{priceFormat(offer.wholePrice)}</p>
        </div>
      </div>
      <p className="aoroffer-note">
        پس از تایید درخواست، مبلغ کل از حساب شما کسر و در حساب سایت بلوکه خواهد
        شد. در صورت نپرداختن دستمزد تایپیست به مدت ۲۴ ساعت پس از آپلود شدن پروژه
        تایپ شده توسط تایپیست برای شما، این مبلغ به طور خودکار به حساب تایپیست
        واریز خواهد شد.
      </p>
    </motion.div>
  );
};

export default AoROffer;