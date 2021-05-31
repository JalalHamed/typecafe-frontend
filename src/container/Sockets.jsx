import React from "react";

// Libraries
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

// Components
import { farsiNumber } from "components/helper";

// Actions
import * as actions from "redux/actions";

// Requests
import socket from "requests/socket";

const Sockets = () => {
  const dispatch = useDispatch();
  const now = new Date();
  const state = useSelector(state => state);

  if (state.Tokens.ac_t && socket) {
    socket.onopen = () => {
      dispatch(actions.Loading(false));
      console.log("socket open");
    };

    socket.onclose = () => {
      dispatch(actions.Loading(true));
      console.log("socket close");
    };

    socket.onmessage = e => {
      let data = JSON.parse(e.data);
      switch (data.ws_type) {
        case "user-online":
          if (!state.OnlineUsers.ids.includes(data.user_id))
            dispatch(
              actions.OnlineUsers({
                ids: [...state.OnlineUsers.ids, data.user_id],
              })
            );
          if (state.OnlineUsers.disconnects.includes(data.user_id))
            dispatch(
              actions.OnlineUsers({
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
            actions.OnlineUsers({
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
            actions.ProjectsAction({
              projects: [data, ...state.Projects.projects],
            })
          );
          if (data.client_email === state.User.email) {
            dispatch(
              actions.ProjectsAction({
                myprojects: [data, ...state.Projects.myprojects],
              })
            );
          }
          break;
        case "delete-project":
          dispatch(
            actions.ProjectsAction({
              projects: state.Projects.projects.filter(x => x.id !== data.id),
            })
          );
          dispatch(
            actions.ProjectsAction({
              myprojects: state.Projects.myprojects.filter(
                x => x.id !== data.id
              ),
            })
          );
          break;
        case "new-offer":
          dispatch(
            actions.ProjectsAction({ offers: [data, ...state.Projects.offers] })
          );
          break;
        case "delete-offer":
          dispatch(
            actions.ProjectsAction({
              offers: state.Projects.offers.filter(x => x.id !== data.id),
            })
          );
          break;
        case "new-message":
          if (state.Messages.isWatching !== data.sender_id) {
            dispatch(
              actions.MessagesElse({
                totalUnread: state.Messages.totalUnread + 1,
              })
            );
          }
          if (!state.Messages.messages.find(x => x.id === data.sender_id)) {
            dispatch(
              actions.Messages({
                image: data.sender_image,
                id: data.sender_id,
                displayname: data.sender_displayname,
                is_online: data.sender_is_online,
                last_login: data.sender_last_login,
                unread: state.Messages.isWatching !== data.sender_id ? 1 : 0,
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
            dispatch(
              actions.NewMessageAction({ id: data.sender_id, message: data })
            );
          }
          break;
        case "offer-rejected":
          dispatch(actions.ChangeOfferedStatus({ id: data.id }));
          toast.info(
            `پیشنهاد شما برای پروژه با شناسه ${farsiNumber(
              data.project
            )} رد شد.`
          );
          break;
        // case 'client-accept':
        default:
          break;
      }
    };
  } else {
    dispatch(actions.Loading(false));
  }

  return <></>;
};

export default Sockets;
