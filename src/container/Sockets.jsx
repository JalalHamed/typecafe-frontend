import React from "react";

// Libraries
import { useSelector, useDispatch } from "react-redux";

// Actions
import {
  ProjectsAction,
  Loading,
  OnlineUsers,
  Messages,
  NewMessagesAction,
} from "redux/actions";

// Requests
import Socket from "requests/Socket";

const Sockets = () => {
  const dispatch = useDispatch();
  const now = new Date();
  const state = useSelector(state => state);

  if (localStorage.getItem("ac_t") && Socket) {
    Socket.onopen = () => {
      dispatch(Loading(false));
      console.log("socket open");
    };

    Socket.onclose = () => {
      dispatch(Loading(true));
      console.log("socket close");
    };

    Socket.onmessage = e => {
      let data = JSON.parse(e.data);
      switch (data.ws_type) {
        case "user-online":
          if (!state.OnlineUsers.ids.includes(data.user_id))
            dispatch(
              OnlineUsers({ ids: [...state.OnlineUsers.ids, data.user_id] })
            );
          if (state.OnlineUsers.disconnects.includes(data.user_id))
            dispatch(
              OnlineUsers({
                disconnects: state.OnlineUsers.disconnects.filter(
                  x => x !== data.user_id
                ),
                lastLogins: state.OnlineUsers.lastLogins.filter(
                  x => x.id !== data.user_id
                ),
              })
            );
          break;
        case "user-offline":
          dispatch(
            OnlineUsers({
              ids: state.OnlineUsers.ids.filter(x => x !== data.user_id),
              disconnects: [...state.OnlineUsers.disconnects, data.user_id],
              lastLogins: [
                ...state.OnlineUsers.lastLogins,
                { id: data.user_id, lastLogin: now },
              ],
            })
          );
          break;
        case "new-project":
          dispatch(
            ProjectsAction({ projects: [data, ...state.Projects.projects] })
          );
          if (data.client_email === state.User.email) {
            dispatch(
              ProjectsAction({
                myprojects: [data, ...state.Projects.myprojects],
              })
            );
          }
          break;
        case "delete-project":
          dispatch(
            ProjectsAction({
              projects: state.Projects.projects.filter(x => x.id !== data.id),
            })
          );
          dispatch(
            ProjectsAction({
              myprojects: state.Projects.myprojects.filter(
                x => x.id !== data.id
              ),
            })
          );
          break;
        case "new-offer":
          dispatch(
            ProjectsAction({ offers: [data, ...state.Projects.offers] })
          );
          break;
        case "new-message":
          if (!state.Messages.messages.find(x => x.id === data.sender_id)) {
            dispatch(
              Messages({
                image: data.sender_image,
                id: data.sender_id,
                displayname: data.sender_displayname,
                is_online: data.sender_is_online,
                last_login: data.sender_last_login,
                messages: [
                  {
                    content: data.content,
                    is_read: data.is_read,
                    sor: data.sor,
                    id: data.id,
                    issue_date: data.issue_date,
                  },
                ],
              })
            );
          } else {
            dispatch(NewMessagesAction({ id: data.sender_id, message: data }));
          }
          break;
        default:
          break;
      }
    };
  }

  return <></>;
};

export default Sockets;
