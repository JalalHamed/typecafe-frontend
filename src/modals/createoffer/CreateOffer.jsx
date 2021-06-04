import React, { useRef, useState } from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

// Components
import Close from "components/buttons/Close";
import Button from "components/buttons/Button";
import Previous from "components/buttons/Previous";
import { priceFormat, farsiNumber, extractCommission } from "components/helper";

// Actions
import {
  CreateOffer,
  Sidebar,
  OffersAction,
  NotEnoughCreditAction,
  RulesScrollToHTWW,
} from "redux/actions";

// Request
import socket from "requests/socket";
import { CreateOfferReq } from "requests";

// Design
import "./createoffer.scss";

const TheCreateOffer = () => {
  const dispatch = useDispatch();
  const submitButtonRef = useRef();
  const previousButtonRef = useRef();
  const state = useSelector(state => state);
  const credit = useSelector(state => state.User.credit);
  const [loading, setLoading] = useState(false);
  const pageCount = Number(state.CreateOffer.selectedPageCount);
  const pricePerPage = Number(state.CreateOffer.selectedPricePerPage);
  const deadline = Number(state.CreateOffer.selectedDeadline);
  const wholePrice = extractCommission(pageCount * pricePerPage);

  const handleMoreAboutThis = () => {
    dispatch(RulesScrollToHTWW(true));
    dispatch(CreateOffer({ isModalOpen: false }));
    dispatch(Sidebar({ page: "rules" }));
  };

  const handleSubmitRequest = () => {
    if (credit >= wholePrice) {
      let project_id = state.CreateOffer.selectedId;
      let body = {
        project: project_id,
        offered_price: pricePerPage,
      };
      setLoading(true);
      CreateOfferReq(body)
        .then(res => {
          setLoading(false);
          socket.send(
            JSON.stringify({
              status: "new-offer",
              id: res.id,
              user_email: state.User.email,
              project_id: project_id,
            })
          );
          dispatch(
            OffersAction({
              offereds: [
                ...state.Offers.offereds,
                {
                  project: project_id,
                  offered_price: pricePerPage,
                  id: res.id,
                  created_at: new Date(),
                  status: res.status,
                },
              ],
            })
          );
          dispatch(CreateOffer({ isModalOpen: false }));
          toast.success("پیشنهاد شما با موفقیت ثبت شد.");
        })
        .catch(err => {
          setLoading(false);
          dispatch(CreateOffer({ isModalOpen: false }));
          if (typeof err?.response?.data === "number")
            toast.error(
              `ابتدا پروژه با شناسه ${farsiNumber(
                err.response.data
              )} را تحویل دهید.`
            );
          console.log(err.response);
        });
    } else {
      dispatch(NotEnoughCreditAction(true));
      setTimeout(() => {
        dispatch(CreateOffer({ isModalOpen: false }));
      }, 48);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      className="offerrequest-wrapper"
    >
      <Close
        className="close-modal"
        onClick={() => dispatch(CreateOffer({ isModalOpen: false }))}
      />
      <div className="offerrequest-content">
        <p className="offerrequest-note">
          در صورت تایید پیشنهاد شما توسط کارفرما، مجموع مبلغ پروژه با احتساب
          کارمزد سایت{" "}
          <span className="highlight">{priceFormat(wholePrice)}</span> به عنوان
          مبلغ ضمانت انجام پروژه از اعتبار شما کسر خواهد شد و در صورت عدم تحویل
          پروژه تا قبل از مهلت تعیین شده{" "}
          <span className="highlight">{farsiNumber(deadline)} ساعت</span> به
          ازای هر ۱۵ دقیقه تاخیر ٪۱۰ از این مبلغ کسر و به حساب کارفرما انتقال
          داده خواهد شد.
        </p>
        <p className="go-to-rules" onClick={handleMoreAboutThis}>
          اطلاعات بیشتر درباره نحوه ایجاد و انجام پروژه
        </p>
        <div className="button-wrapper">
          <Button
            ref={submitButtonRef}
            title="تایید و ثبت پیشنهاد"
            className="w-68"
            onClick={handleSubmitRequest}
            loading={loading}
          />
          <Previous
            ref={previousButtonRef}
            title="انصراف"
            className="w-30"
            onClick={() => dispatch(CreateOffer({ isModalOpen: false }))}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default TheCreateOffer;
