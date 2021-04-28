import React, { useEffect, useState, useRef } from "react";

// Libraries
import { useSelector, useDispatch } from "react-redux";

// Components
import Input from "components/inputs/Input";
import Button from "components/buttons/Button";
import { PriceFormat } from "components/helper";

// Actions
import { CreateOffer } from "redux/actions";

const OthersProject = ({ project, downloaded }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.User);
  const submitReqeustRippleRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const [inputDisabled, setInputDisabled] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [price, setPrice] = useState(1500);
  const [contractorEarning, setContractorEarning] = useState(
    Math.round(price - (price * 5) / 100)
  );

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
    setContractorEarning(Math.round(price - (price * 5) / 100));
  }, [price]);

  return (
    <>
      <Input
        label="قیمت پیشنهادی شما برای هر صفحه (تومان)"
        name="request"
        type="number"
        id="request"
        wrapperStyle={{ width: "70%", marginTop: "10px" }}
        labelStyle={{ fontSize: "14px" }}
        style={{ fontSize: "14px", width: "200px" }}
        min="1500"
        disabled={inputDisabled}
        value={price}
        onChange={e => setPrice(e.target.value)}
      />
      <p className="left-title">
        کارمزد<span className="left-value">٪۵</span>
      </p>
      <p className="left-title">
        عایدی شما
        <span className="left-value">
          {PriceFormat(contractorEarning)} به ازای هر صفحه
        </span>
      </p>
      <Button
        ref={submitReqeustRippleRef}
        title="ثبت پیشنهاد"
        className="fit-width"
        disabled={buttonDisabled}
        onClick={handleOffer}
      />
      <p className="err-msg">{errMsg}</p>
    </>
  );
};

export default OthersProject;
