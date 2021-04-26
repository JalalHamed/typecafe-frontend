import React, { useRef, useState, useEffect } from "react";

// Libraries
import { useSelector, useDispatch } from "react-redux";
import Moment from "react-moment";
import "moment/locale/fa";

// Components
import Button from "components/buttons/Button";
import Input from "components/inputs/Input";
import { PriceFormat, toFarsiNumber } from "components/helper";

// Actions
import { Project } from "redux/actions";

// XHR
import { baseURL } from "components/xhr";

// Requests
import Socket from "requests/Socket";

// Designs
import "./project.scss";

const TheProject = ({ index, project }) => {
  const dispatch = useDispatch();
  const submitReqeustRippleRef = useRef();
  const downloadFileRippleRef = useRef();
  const deleteProjectRippleRef = useRef();
  const user = useSelector(state => state.User);
  const [downloaded, setDownloaded] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [inputDisabled, setInputDisabled] = useState(true);
  const [price, setPrice] = useState(1500);
  const [contractorEarning, setContractorEarning] = useState(
    Math.round(price - (price * 5) / 100)
  );

  const handleDownloaded = () => {
    window.location.href = baseURL + project.file;
    setDownloaded(true);
  };

  const handleOffer = () => {
    dispatch(
      Project({
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
    } else if (!downloaded) {
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
  }, [user.isLoggedIn, downloaded, price]);

  const handleTimeClick = () => {
    Socket.send(
      JSON.stringify({
        status: "new-project",
        id: 28,
        email: "sara@gmail.com",
      })
    );
  };

  useEffect(() => {
    setContractorEarning(Math.round(price - (price * 5) / 100));
  }, [price]);

  return (
    <div className="project-wrapper" key={index}>
      <div className="right">
        <div className="client-wrapper">
          {!!project.client_image ? (
            <img
              src={baseURL + project.client_image}
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
            <div className="value">
              {toFarsiNumber(project.number_of_pages)}
            </div>
          </div>
          <div>
            <div className="title">زبان(ها) و پیوست‌ های پروژه</div>
            <div className="value">{project.languages_and_additions}</div>
          </div>
          <div>
            <div className="title">نوع پروژه</div>
            <div className="value">{project.type}</div>
          </div>
          <div>
            <div className="title">مهلت تحویل</div>
            <div className="value">
              {toFarsiNumber(project.delivery_deadline)} ساعت
            </div>
          </div>
        </div>
        <Button
          ref={downloadFileRippleRef}
          title="دانلود فایل پروژه"
          className="fit-width"
          onClick={handleDownloaded}
        />
        {user.email === project.client_email && (
          <Button
            ref={deleteProjectRippleRef}
            title="حذف پروژه"
            className="fit-width delete-project"
          />
        )}
      </div>
      <div className="left">
        {user.email === project.client_email ? (
          <p>پروژه شما</p>
        ) : (
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
        )}
      </div>
      <div className="top-left" onClick={handleTimeClick}>
        {
          <Moment fromNow locale="fa">
            {project.created_at}
          </Moment>
        }
      </div>
      <div className="bottom-left">
        <p className="project-status">وضعیت پروژه: باز</p>
      </div>
      <div className="project-id">
        شناسه پروژه <span className="project-id-value">[ {project.id}# ]</span>
      </div>
    </div>
  );
};

export default TheProject;
