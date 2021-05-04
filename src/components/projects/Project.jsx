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
import { DeleteProject, ProjectsAction } from "redux/actions";

// XHR
import { baseURL } from "components/xhr";

// Designs
import "./project.scss";

const TheProject = ({ project }) => {
  const dispatch = useDispatch();
  const downloadFileRippleRef = useRef();
  const deleteProjectRippleRef = useRef();
  const user = useSelector(state => state.User);
  const onlineUsers = useSelector(state => state.OnlineUsers);
  const downloaded = useSelector(state => state.Projects.downloaded);

  const handleDownloaded = () => {
    window.location.href = project.file;
    dispatch(ProjectsAction({ downloaded: [...downloaded, project.id] }));
  };

  const getUserTimeStatus = () => {
    if (
      !onlineUsers.disconnects.includes(project.client_id) &&
      (project.client_is_online || onlineUsers.ids.includes(project.client_id))
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="project-wrapper">
      <div className="right">
        <div className="client-wrapper">
          {!!project.client_image ? (
            <img
              src={baseURL + project.client_image}
              alt="User Profile"
              className={`client-image ${
                getUserTimeStatus() ? "is-online" : ""
              }`}
            />
          ) : (
            <i
              className={`icon project-client-default-pic client-image ${
                getUserTimeStatus() ? "is-online" : ""
              }`}
            />
          )}
          <div className="client-status-wrapper">
            <div className="client-name">{project.client}</div>
            <div
              className={`last-login ${getUserTimeStatus() ? "is-online" : ""}`}
            >
              {getUserTimeStatus() ? (
                <span>آنلاین</span>
              ) : (
                <span>
                  آخرین بازدید حدود{" "}
                  {!onlineUsers.disconnects.includes(project.client_id) ? (
                    <Moment fromNow locale="fa">
                      {project.client_last_login}
                    </Moment>
                  ) : (
                    <Moment fromNow locale="fa">
                      {
                        onlineUsers.lastLogins.find(
                          x => x.id === project.client_id
                        ).lastLogin
                      }
                    </Moment>
                  )}
                </span>
              )}
            </div>
          </div>
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
        {user.id === project.client_id && (
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
        {user.id === project.client_id ? (
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
