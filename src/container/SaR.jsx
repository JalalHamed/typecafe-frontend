import React, { useEffect } from "react";

// Libraries
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

// Components
import { farsiNumber } from "components/helper";

// Actions
import * as actions from "redux/actions";

// Requests
import socket from "requests/socket";
import {
  ReadMessages,
  UserData,
  GetProjects,
  GetMyProjects,
  GetOffers,
  GetOffereds,
  GetDownloads,
  GetMessages,
  handleErrors,
} from "requests";

const SocketsAndRequests = () => {
  const dispatch = useDispatch();
  const now = new Date();
  const state = useSelector(state => state);

  useEffect(() => {
    GetProjects()
      .then(res => {
        dispatch(
          actions.ProjectsAction({ loading: false, projects: res.results })
        );
        if (res.next) dispatch(actions.ProjectsAction({ next: res.next }));
        if (!res.next && state.Projects.next)
          dispatch(actions.ProjectsAction({ next: "" }));
      })
      .catch(err => {
        dispatch(actions.ProjectsAction({ loading: false, error: true }));
        handleErrors(err);
      });

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!sessionStorage.getItem("_at")) {
      dispatch(actions.Sidebar({ isLoading: false }));
      dispatch(actions.User({ isTopbarLoading: false }));
      dispatch(
        actions.ProjectsAction({
          downloadsLoading: false,
        })
      );
    }

    // eslint-disable-next-line
  }, []);

  if (state.Tokens.ac_t) {
    socket.onopen = () => {
      console.log("socket open");
      if (state.Loading) dispatch(actions.Loading(false));
      UserData()
        .then(res => {
          dispatch(
            actions.User({
              isLoggedIn: true,
              displayname: res.displayname,
              id: res.id,
              email: res.email,
              credit: res.credit,
              image: res.image,
              ontimeDelivery: res.ontime_delivery,
              successfulProjects: res.successful_projects,
              unsuccessfulProjects: res.unsuccessful_projects,
            })
          );
          dispatch(actions.Sidebar({ isLoading: false }));
          dispatch(actions.User({ isTopbarLoading: false }));

          // Get My Projects
          GetMyProjects()
            .then(res => {
              dispatch(
                actions.ProjectsAction({
                  myprojectsloading: false,
                  myprojects: res,
                })
              );
            })
            .catch(err => {
              dispatch(actions.ProjectsAction({ myprojectsloading: false }));
              handleErrors(err);
            });

          // Get Messages
          GetMessages()
            .then(res => {
              let total_unread = 0;
              res.forEach(message => {
                if (message.sor === "received" && !message.is_read)
                  total_unread += 1;
              });
              if (total_unread) {
                dispatch(actions.MessagesElse({ totalUnread: total_unread }));
                dispatch(
                  actions.Sounds({ newMessage: state.Sounds.newMessage + 1 })
                );
              }
              let userIdArr = res.map(message => message.user_id);
              let uniqUserIdArr = [...new Set(userIdArr)];
              uniqUserIdArr.forEach(id => {
                let messages = [];
                let unread_count = 0;
                res.forEach(message => {
                  if (message.user_id === id) messages.push(message);
                });
                messages.forEach(message => {
                  if (message.sor === "received" && !message.is_read)
                    unread_count += 1;
                });
                dispatch(
                  actions.Messages({
                    displayname: messages[0].user,
                    id: messages[0].user_id,
                    is_online: messages[0].user_is_online,
                    last_login: messages[0].user_last_login,
                    image: messages[0].user_image,
                    unread: unread_count,
                    messages: messages,
                  })
                );
              });
              dispatch(actions.MessagesElse({ isLoading: false }));
            })
            .catch(err => handleErrors(err));

          // Get Offers
          GetOffers()
            .then(res =>
              dispatch(
                actions.OffersAction({ offers: res, offersLoading: false })
              )
            )
            .catch(err => {
              dispatch(actions.OffersAction({ offersLoading: false }));
              handleErrors(err);
            });

          // Get Offereds
          GetOffereds()
            .then(res =>
              dispatch(
                actions.OffersAction({
                  offereds: res,
                  offeredsLoading: false,
                })
              )
            )
            .catch(err => {
              dispatch(actions.OffersAction({ offeredsLoading: false }));
              handleErrors(err);
            });

          // Get Downloads
          GetDownloads()
            .then(res => {
              dispatch(
                actions.ProjectsAction({
                  downloaded: res,
                  downloadsLoading: false,
                })
              );
            })
            .catch(err => {
              dispatch(actions.ProjectsAction({ downloadsLoading: false }));
              handleErrors(err);
            });
        })
        .catch(err => {
          handleErrors(err);
          dispatch(actions.Sidebar({ isLoading: false }));
          dispatch(actions.User({ isTopbarLoading: false }));
          dispatch(
            actions.ProjectsAction({
              loading: false,
              myprojectsloading: false,
              downloadsLoading: false,
            })
          );
          dispatch(
            actions.OffersAction({
              offersLoading: false,
              offeredsLoading: true,
            })
          );
        });
    };

    socket.onclose = () => {
      console.log("socket close");
      dispatch(actions.Loading(true));
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
          dispatch(actions.Sounds({ newProject: state.Sounds.newProject + 1 }));
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
            actions.OffersAction({ offers: [data, ...state.Offers.offers] })
          );
          break;
        case "delete-offer":
          dispatch(
            actions.OffersAction({
              offers: state.Offers.offers.filter(x => x.id !== data.id),
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
            dispatch(
              actions.Sounds({ newMessage: state.Sounds.newMessage + 1 })
            );
          } else {
            ReadMessages({ sender_id: data.sender_id });
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
        case "client-accept":
          dispatch(
            actions.ClientAccept({
              isModalOpen: true,
              project: data.project,
              issued_at: data.issued_at,
              client: data.client,
              offer: data.offer,
            })
          );
          dispatch(
            actions.Sounds({ clientAccept: state.Sounds.clientAccept + 1 })
          );
          break;
        case "in-progress":
          dispatch(actions.ProjectInProgress({ id: data.project }));
          console.log(data);
          break;
        default:
          break;
      }
    };
  }

  if (!state.Tokens.ac_t && state.Loading) {
    dispatch(actions.Loading(false));
  }

  return <></>;
};

export default SocketsAndRequests;
