import React, { useRef } from "react";

// Libraries
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
        <div className="description-value">{project.description}</div>
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
            <div className="title">مهلت تحویل (ساعت)</div>
            <div className="value">{project.delivery_deadline}</div>
          </div>
        </div>
        <Button
          ref={downloadFileRippleRef}
          title="دانلود فایل پروژه"
          className="fit-width"
          onClick={() => (window.location.href = baseURL + project.file)}
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
          min="1000"
        />
        <p></p>
        <Button
          ref={submitReqeustRippleRef}
          title="ثبت پیشنهاد"
          className="fit-width"
        />
      </div>
      <div className="top-left">
        {<Moment fromNow>{project.created_at}</Moment>}
      </div>
    </div>
  );
};

export default Project;
