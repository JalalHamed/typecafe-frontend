import { useRef } from "react";

// Libraries
import { useSelector, useDispatch } from "react-redux";
import Moment from "react-moment";
import "moment/locale/fa";

// Components
import Button from "components/buttons/Button";
import { farsiNumber, getUserTimeStatus, lastSeen } from "components/helper";
import HintArrow from "./HintArrow";
import Open from "./statuses/open/Open";
import InProgress from "./statuses/inprogress/InProgress";
import Delivered from "./statuses/delivered/Delivered";

// Requests
import { Downloaded } from "requests";

// Actions
import { DeleteProject, ProjectsAction, Profile } from "redux/actions";

// XHR
import { baseURL } from "components/xhr";

// Designs
import "./project.scss";

const TheProject = ({ project }) => {
  const dispatch = useDispatch();
  const downloadFileRef = useRef();
  const deleteProjectRef = useRef();
  const user = useSelector(state => state.User);
  const onlineUsers = useSelector(state => state.OnlineUsers);
  const downloaded = useSelector(state => state.Projects.downloaded);
  const myOffers = useSelector(state => state.Offers.myOffers);
  const offers = useSelector(state => state.Offers.offers);
  const myoffer = myOffers.find(
    x => x.project === project.id && (x.status === "ACC" || x.status === "END")
  );
  const offer = offers.find(
    x => x.project === project.id && (x.status === "ACC" || x.status === "END")
  );

  const handleDownloaded = () => {
    window.open(project.file, "_self");
    if (user.isLoggedIn) {
      dispatch(ProjectsAction({ downloaded: [...downloaded, project.id] }));
      Downloaded({ project: project.id });
    }
  };

  const openProfile = project => {
    dispatch(
      Profile({
        isModalOpen: true,
        id: project.client_id,
        displayname: project.client,
        image: project.client_image,
      })
    );
  };

  return (
    <div
      className={`project-wrapper ${
        project.status === "I" ? "pw-in-progress" : ""
      } ${project.status === "D" ? "pw-delivered" : ""}`}
    >
      <div className="right">
        <div className="client-wrapper">
          {!!project.client_image ? (
            <img
              src={baseURL + project.client_image}
              alt="User Profile"
              className={`client-image ${
                getUserTimeStatus(
                  onlineUsers,
                  project.client_id,
                  project.client_is_online
                )
                  ? "is-online"
                  : ""
              }`}
              onClick={() => openProfile(project)}
            />
          ) : (
            <i
              className={`icon project-client-default-pic client-image ${
                getUserTimeStatus(
                  onlineUsers,
                  project.client_id,
                  project.client_is_online
                )
                  ? "is-online"
                  : ""
              }`}
              onClick={() => openProfile(project)}
            />
          )}
          <div className="client-name-and-status-wrapper">
            <div
              className="client-name no-select"
              onClick={() => openProfile(project)}
            >
              {project.client}
            </div>
            <div
              className={`last-login ${
                getUserTimeStatus(
                  onlineUsers,
                  project.client_id,
                  project.client_is_online
                )
                  ? "is-online"
                  : ""
              }`}
            >
              {getUserTimeStatus(
                onlineUsers,
                project.client_id,
                project.client_is_online
              ) ? (
                <span>آنلاین</span>
              ) : (
                <span>
                  آخرین بازدید حدود{" "}
                  {lastSeen(onlineUsers, project.client_id) ? (
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
        <div className="description-value value">
          {project.description ? project.description : <>ـــ</>}
        </div>
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
          ref={downloadFileRef}
          title="دانلود فایل پروژه"
          className={`fit-width ${
            project.status === "I" &&
            user.id !== project.client_id &&
            !myOffers.find(x => x.project === project.id)
              ? "download-project-orange"
              : ""
          }`}
          onClick={handleDownloaded}
          disabled={
            !user.isLoggedIn ||
            (project.status === "I" &&
              user.id !== project.client_id &&
              !myOffers.find(x => x.project === project.id))
          }
        />
        {user.id === project.client_id && project.status === "O" && (
          <Button
            ref={deleteProjectRef}
            title="حذف پروژه"
            className="fit-width delete-project red"
            onClick={() =>
              dispatch(DeleteProject({ isModalOpen: true, id: project.id }))
            }
          />
        )}
      </div>
      <div className="left">
        {project.status === "O" && <Open project={project} />}
        {project.status === "I" && (
          <InProgress project={project} offer={offer} myoffer={myoffer} />
        )}
        {project.status === "D" && (
          <Delivered project={project} offer={offer} myoffer={myoffer} />
        )}
        {myOffers.find(offer => offer.project === project.id)?.status ===
          "A" && (
          <div className="hint-arrow-wrapper">
            <div className="ha-arrow">
              <HintArrow />
            </div>
            <p className="ha-note">لغو پیشنهاد</p>
          </div>
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
        <p
          className={`project-status ${
            project.status === "I" ? "ps-in-progress" : ""
          } ${project.status === "D" ? "ps-delivered" : ""}`}
        >
          <span style={{ color: "#555", fontSize: "11px" }}>وضعیت پروژه</span>
          &nbsp;&nbsp;
          {project.status === "O" && <span>باز</span>}
          {project.status === "I" && <span>در دست اجرا</span>}
          {project.status === "D" && <span>تحویل داده شده</span>}
        </p>
      </div>
      <div className="project-id">
        شناسه پروژه{" "}
        <span className="project-id-value">[ {farsiNumber(project.id)} ]</span>
      </div>
    </div>
  );
};

export default TheProject;
