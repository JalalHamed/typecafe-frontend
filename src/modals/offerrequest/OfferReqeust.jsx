import React, { useRef } from "react";

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
  ProjectsAction,
  NotEnoughCreditAction,
  RulesScrollToHTWW,
} from "redux/actions";

// Request
import Socket from "requests/Socket";
import { CreateOfferReq, handleErrors } from "requests";

// Design
import "./offerrequest.scss";

const OfferRequest = () => {
  const dispatch = useDispatch();
  const submitButtonRippleRef = useRef();
  const previousButtonRippleRef = useRef();
  const state = useSelector(state => state);
  const credit = useSelector(state => state.User.credit);
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
      CreateOfferReq(body)
        .then(res => {
          Socket.send(
            JSON.stringify({
              status: "new-offer",
              id: res.id,
              user_email: state.User.email,
              project_id: project_id,
            })
          );
          dispatch(CreateOffer({ isModalOpen: false }));
          dispatch(
            ProjectsAction({
              requested: [...state.Projects.requested, project_id],
            })
          );
          toast.success("پیشنهاد شما با موفقیت ثبت گردید.");
        })
        .catch(err => {
          dispatch(CreateOffer({ isModalOpen: false }));
          handleErrors(err, toast.error);
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
            ref={submitButtonRippleRef}
            title="تایید و ثبت پیشنهاد"
            className="w-68"
            onClick={handleSubmitRequest}
          />
          <Previous
            ref={previousButtonRippleRef}
            title="انصراف"
            className="w-30"
            onClick={() => dispatch(CreateOffer({ isModalOpen: false }))}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default OfferRequest;
