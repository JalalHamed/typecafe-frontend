import React, { useEffect } from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";

// Actions
import {
  User,
  ProjectsAction,
  OffersAction,
  Sidebar,
  Messages,
  MessagesElse,
  Sounds,
} from "redux/actions";

// Requests
import {
  UserData,
  GetProjects,
  GetMyProjects,
  GetOffers,
  GetOffereds,
  GetDownloads,
  GetMessages,
} from "requests";

const Requests = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const token = useSelector(state => state.Tokens.ac_t);

  useEffect(() => {
    GetProjects()
      .then(res => {
        dispatch(ProjectsAction({ loading: false, projects: res.results }));
        if (res.next) dispatch(ProjectsAction({ next: res.next }));
        if (!res.next && state.Projects.next)
          dispatch(ProjectsAction({ next: "" }));
      })
      .catch(() => {
        dispatch(ProjectsAction({ loading: false, error: true }));
      });

    if (token)
      // Get User Data
      UserData()
        .then(res => {
          dispatch(
            User({
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
          dispatch(Sidebar({ isLoading: false }));
          dispatch(User({ isTopbarLoading: false }));

          // Get My Projects
          GetMyProjects()
            .then(res => {
              dispatch(
                ProjectsAction({ myprojectsloading: false, myprojects: res })
              );
            })
            .catch(err => {
              dispatch(ProjectsAction({ myprojectsloading: false }));
              console.log(err);
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
                dispatch(MessagesElse({ totalUnread: total_unread }));
                dispatch(Sounds({ newMessage: state.Sounds.newMessage + 1 }));
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
                  Messages({
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
              dispatch(MessagesElse({ isLoading: false }));
            })
            .catch(err => console.log(err));

          // Get Offers
          GetOffers()
            .then(res =>
              dispatch(OffersAction({ offers: res, offersLoading: false }))
            )
            .catch(err => {
              dispatch(OffersAction({ offersLoading: false }));
              console.log(err);
            });

          // Get Offereds
          GetOffereds()
            .then(res =>
              dispatch(
                OffersAction({
                  offereds: res,
                  offeredsLoading: false,
                })
              )
            )
            .catch(err => {
              dispatch(OffersAction({ offeredsLoading: false }));
              console.log(err);
            });

          // Get Downloads
          GetDownloads()
            .then(res => {
              dispatch(
                ProjectsAction({ downloaded: res, downloadsLoading: false })
              );
            })
            .catch(err => {
              dispatch(ProjectsAction({ downloadsLoading: false }));
              console.log(err);
            });
        })
        .catch(err => {
          if (err.response?.data?.detail === "User not found") {
            sessionStorage.removeItem("_at");
          }
          dispatch(Sidebar({ isLoading: false }));
          dispatch(User({ isTopbarLoading: false }));
          dispatch(
            ProjectsAction({
              loading: false,
              myprojectsloading: false,
              downloadsLoading: false,
            })
          );
          dispatch(
            OffersAction({
              offersLoading: false,
              offeredsLoading: true,
            })
          );
        });

    if (!sessionStorage.getItem("_at") && !sessionStorage.getItem("_rt")) {
      dispatch(Sidebar({ isLoading: false }));
      dispatch(User({ isTopbarLoading: false }));
      dispatch(
        ProjectsAction({
          loading: false,
          myprojectsloading: false,
          downloadsLoading: false,
        })
      );
      dispatch(
        OffersAction({
          offersLoading: false,
          offeredsLoading: true,
        })
      );
    }
    // eslint-disable-next-line
  }, [token]);

  return <></>;
};

export default Requests;
