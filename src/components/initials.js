// Libraries
import { useDispatch } from "react-redux";

// Actions
import { User, ProjectsAction, Sidebar } from "redux/actions";

// Requests
import {
  UserData,
  GetProjects,
  GetMyProjects,
  GetOffers,
  GetDownloads,
} from "requests";

export const Initials = () => {
  const dispatch = useDispatch();

  // Get Projects
  GetProjects()
    .then(res => {
      dispatch(ProjectsAction({ loading: false, projects: res.results }));
      if (res.next) {
        dispatch(ProjectsAction({ next: res.next }));
      } else {
        dispatch(ProjectsAction({ next: "" }));
      }
    })
    .catch(err => {
      dispatch(ProjectsAction({ loading: false }));
      console.log(err);
    });

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

      // Get Offers
      GetOffers()
        .then(res => {
          dispatch(ProjectsAction({ offers: res, offersLoading: false }));
        })
        .catch(err => {
          dispatch(ProjectsAction({ offersLoading: false }));
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
        localStorage.removeItem("ac_t");
      }
      dispatch(Sidebar({ isLoading: false }));
      dispatch(User({ isTopbarLoading: false }));
      dispatch(
        ProjectsAction({
          loading: false,
          myprojectsloading: false,
          offersLoading: false,
          downloadsLoading: false,
        })
      );
    });
};
