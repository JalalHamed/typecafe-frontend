import React, { useEffect, useState, useRef } from "react";

// Libraries
import { useSelector, useDispatch } from "react-redux";

// Components
import Input from "components/inputs/Input";
import Button from "components/buttons/Button";
import { priceFormat, extractCommission } from "components/helper";
import { Puffloader } from "components/loader";

// Actions
import { CreateOffer } from "redux/actions";

const OthersProject = ({ project, downloaded }) => {
  const dispatch = useDispatch();
  const submitReqeustRippleRef = useRef();
  const user = useSelector(state => state.User);
  const isLoading = useSelector(state => state.Projects.downloadsLoading);
  const [errMsg, setErrMsg] = useState("");
  const [inputDisabled, setInputDisabled] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [price, setPrice] = useState(1500);
  const [typistEarning, setTypistEarning] = useState(extractCommission(price));

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

  useEffect(() => {
    if (!user.isLoggedIn) {
      setErrMsg("جهت ثبت پیشنهاد، ابتدا به حساب کاربری خود وارد شوید.");
      setButtonDisabled(true);
      setInputDisabled(true);
    } else if (!downloaded.includes(project.id)) {
      setErrMsg("جهت ثبت پیشنهاد، ابتدا فایل پروژه را دانلود کنید.");
      setButtonDisabled(true);
      setInputDisabled(true);
    } else if (price < 1500) {
      setErrMsg("قیمت پیشنهادی نمی‌تواند کمتر از ۱,۵۰۰ تومان باشد.");
      setButtonDisabled(true);
      setInputDisabled(false);
    } else {
      setErrMsg("");
      setButtonDisabled(false);
      setInputDisabled(false);
    }
  }, [user.isLoggedIn, downloaded, price, project.id]);

  useEffect(() => {
    setTypistEarning(extractCommission(price));
  }, [price]);

  return (
    <>
      {!isLoading ? (
        <div className="request-offer-wrapper">
          {downloaded.includes(project.id) ? (
            <>
              <div className="request-offer-form-wrapper">
                <Input
                  label="قیمت پیشنهادی (هر صفحه)"
                  name="request"
                  type="number"
                  id="request"
                  wrapperStyle={{ width: "100%" }}
                  labelStyle={{ fontSize: "14px" }}
                  style={{ fontSize: "14px", width: "200px" }}
                  min="1500"
                  disabled={inputDisabled}
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                />
                <Button
                  ref={submitReqeustRippleRef}
                  title="ثبت پیشنهاد"
                  className="fit-width no-break"
                  disabled={buttonDisabled}
                  onClick={handleOffer}
                />
              </div>
              <div className="calculate-price-wrapper">
                <p className="left-title">کارمزد</p>
                <span className="left-value">٪۵</span>
                <p className="left-title">عایدی شما به ازای هر صفحه</p>
                <span className="left-value">{priceFormat(typistEarning)}</span>
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
          ) : (
            <p className="err-msg">{errMsg}</p>
          )}
        </div>
      ) : (
        <Puffloader color="#1c3987" loading={true} size={100} />
      )}
    </>
  );
};

export default OthersProject;
