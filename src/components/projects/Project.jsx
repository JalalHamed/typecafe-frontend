import React, { useRef } from "react";

// Libraries
import { useSelector, useDispatch } from "react-redux";
import Moment from "react-moment";
import "moment/locale/fa";

// Components
import Button from "components/buttons/Button";
import OwnProject from "./OwnProject";
import OthersProject from "./OthersProject";
import { farsiNumber } from "components/helper";

// Actions
import { DeleteProject, Downloaded } from "redux/actions";

// XHR
import { baseURL } from "components/xhr";

// Designs
import "./project.scss";

const TheProject = ({ project }) => {
  const dispatch = useDispatch();
  const downloadFileRippleRef = useRef();
  const deleteProjectRippleRef = useRef();
  const user = useSelector(state => state.User);
  const downloaded = useSelector(state => state.Downloaded.ids);

  const handleDownloaded = () => {
    window.location.href = project.file;
    dispatch(Downloaded({ ids: [...downloaded, project.id] }));
  };

  return (
    <div className="project-wrapper">
      <div className="right">
        <div className="client-wrapper">
          {!!project.client_image ? (
            <img
              src={baseURL + project.client_image}
              alt="User Profile"
              className="client-image"
            />
          ) : (
            <i className="icon project-client-default-pic" />
          )}
          <div className="client-name">{project.client}</div>
        </div>
        <div className="title">توضیحات</div>
        <div className="description-value value">{project.description}</div>
        <div className="inline">
          <div>
            <div className="title">تعداد صفحات</div>
            <div className="value">{farsiNumber(project.number_of_pages)}</div>
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
              {farsiNumber(project.delivery_deadline)} ساعت
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
            className="fit-width delete-project red"
            onClick={() =>
              dispatch(DeleteProject({ isModalOpen: true, id: project.id }))
            }
          />
        )}
      </div>
      <div className="left">
        {user.email === project.client_email ? (
          <OwnProject project={project} />
        ) : (
          <OthersProject project={project} downloaded={downloaded} />
        )}
      </div>
      <div className="top-left">
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
        شناسه پروژه{" "}
        <span className="project-id-value">[ {farsiNumber(project.id)}# ]</span>
      </div>
    </div>
  );
};

export default TheProject;
