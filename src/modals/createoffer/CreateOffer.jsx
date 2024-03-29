import { useRef, useState } from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

// Components
import Close from "components/buttons/Close";
import Button from "components/buttons/Button";
import Previous from "components/buttons/Previous";
import { priceFormat, farsiNumber, addCommission } from "components/helper";

// Actions
import {
  CreateOffer,
  Sidebar,
  OffersAction,
  NotEnoughCreditAction,
  RulesScrollTo,
} from "redux/actions";

// Request
import socket from "requests/socket";
import { CreateOfferReq, handleErrors } from "requests";

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
  const totalPrice = addCommission(pageCount * pricePerPage);

  const handleMoreAboutThis = () => {
    dispatch(RulesScrollTo("HowTheWebsiteWorks"));
    dispatch(CreateOffer({ isModalOpen: false }));
    dispatch(Sidebar({ page: "rules" }));
  };

  const handleSubmitRequest = () => {
    if (credit >= totalPrice) {
      let project_id = state.CreateOffer.selectedId;
      let body = {
        project: project_id,
        offer_price: pricePerPage,
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
              myOffers: [
                ...state.Offers.myOffers,
                {
                  project: project_id,
                  offer_price: pricePerPage,
                  total_price: res.total_price,
                  id: res.id,
                  created_at: new Date(),
                  status: res.status,
                  typist_id: res.typist_id,
                },
              ],
            })
          );
          dispatch(CreateOffer({ isModalOpen: false }));
          toast.success(<>پیشنهاد شما ثبت شد.</>);
        })
        .catch(err => {
          setLoading(false);
          dispatch(CreateOffer({ isModalOpen: false }));
          if (typeof err?.response?.data === "number") {
            toast.error(
              `ابتدا پروژه با شناسه ${farsiNumber(
                err.response.data
              )} را تحویل دهید.`
            );
          } else {
            handleErrors(err);
          }
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
          <span className="highlight">{priceFormat(totalPrice)}</span> به عنوان
          مبلغ ضمانت انجام پروژه از اعتبار شما کسر خواهد شد و در صورت عدم تحویل
          پروژه تا قبل از مهلت تعیین شده{" "}
          <span className="highlight">{farsiNumber(deadline)} ساعت</span> به
          ازای هر ۵ دقیقه تاخیر ٪۱۰ از این مبلغ کسر و به حساب کارفرما انتقال
          داده خواهد شد. در نتیجه پس از ۵۰ دقیقه کل مبلغ گروگذاری شده به حساب
          کارفرما منتقل و یک پروژه ناموفق برای شما ثبت خواهد شد.
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
