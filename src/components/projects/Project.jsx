import React, { useRef, useState, useEffect } from "react";

// Libraries
import { useSelector } from "react-redux";
import Moment from "react-moment";

// Components
import Button from "components/buttons/Button";
import Input from "components/inputs/Input";

// XHR
import { baseURL } from "components/xhr";

// Designs
import "./project.scss";

const Project = ({ index, project }) => {
  const submitReqeustRippleRef = useRef();
  const downloadFileRippleRef = useRef();
  const isLoggedIn = useSelector(state => state.User.isLoggedIn);
  const [downloaded, setDownloaded] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [price, setPrice] = useState(1555);
  const [contractorEarning, setContractorEarning] = useState(
    Math.round(price - (price * 5) / 100)
  );

  const handleDownloaded = () => {
    window.location.href = baseURL + project.file;
    setDownloaded(true);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setErrMsg("جهت ثبت پیشنهاد، ابتدا به حساب کاربری خود وارد شوید.");
      setDisabled(true);
    } else if (!downloaded) {
      setErrMsg("جهت ثبت پیشنهاد، ابتدا فایل پروژه را دانلود کنید.");
      setDisabled(true);
    } else {
      setErrMsg("");
      setDisabled(false);
    }
  }, [isLoggedIn, downloaded]);

  useEffect(() => {
    setContractorEarning(Math.round(price - (price * 5) / 100));
  }, [price]);

  return (
    <div className="project-wrapper" key={index}>
      <div className="right">
        <div className="client-wrapper">
          {!!project.client_picture ? (
            <img
              src={baseURL + project.client_picture}
              alt="User Profile"
              className="client-image"
            />
          ) : (
            <i className="icon post-profile-pic" />
          )}
          <div className="client-name">{project.client}</div>
        </div>
        <div className="title">توضیحات</div>
        <div className="description-value value">{project.description}</div>
        <div className="inline">
          <div>
            <div className="title">تعداد صفحات</div>
            <div className="value">{project.number_of_pages}</div>
          </div>
          <div>
            <div className="title">زبان(ها) و پیوست‌ های پروژه</div>
            <div className="value">{project.languages_and_additions}</div>
          </div>
          <div>
            <div className="title">مهلت تحویل</div>
            <div className="value">{project.delivery_deadline} ساعت</div>
          </div>
        </div>
        <Button
          ref={downloadFileRippleRef}
          title="دانلود فایل پروژه"
          className="fit-width"
          onClick={handleDownloaded}
        />
      </div>
      <div className="left">
        <Input
          label="قیمت پیشنهادی شما برای هر صفحه (تومان)"
          name="request"
          type="number"
          id="request"
          wrapperStyle={{ width: "70%", marginTop: "10px" }}
          labelStyle={{ fontSize: "14px" }}
          style={{ fontSize: "14px" }}
          min="1100"
          disabled={disabled}
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        <p>کارمزد: ۵٪</p>
        <p>عایدی شما: {contractorEarning} تومان به ازای هر صفحه</p>
        <Button
          ref={submitReqeustRippleRef}
          title="ثبت پیشنهاد"
          className="fit-width"
          disabled={disabled}
        />
        <p className="err-msg">{errMsg}</p>
      </div>
      <div className="top-left">
        {<Moment fromNow>{project.created_at}</Moment>}
      </div>
    </div>
  );
};

export default Project;
