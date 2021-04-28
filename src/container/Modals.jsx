import React from "react";

// Libraries
import { useSelector } from "react-redux";

// Modals
import ModalWrapper from "modals/ModalWrapper";
import LoginRegister from "modals/loginregister/LoginRegister";
import CreateProject from "modals/createproject/CreateProject";
import Image from "modals/image/Image";
import Profile from "modals/profile/Profile";
import SendRequest from "modals/sendrequest/SendReqeust";
import DeleteProject from "modals/deleteproject/DeleteProject";

const Modals = () => {
  const state = useSelector(state => state);

  return (
    <>
      {/* Register and Login */}
      {state.LR.isModalOpen && (
        <ModalWrapper>
          <LoginRegister />
        </ModalWrapper>
      )}
      {/* Create New Project */}
      {state.CreateProject.isModalOpen && (
        <ModalWrapper>
          <CreateProject />
        </ModalWrapper>
      )}
      {/* Profile */}
      {state.User.isModalOpen && (
        <ModalWrapper>
          <Profile />
        </ModalWrapper>
      )}
      {/* Send Request */}
      {state.CreateOffer.isModalOpen && (
        <ModalWrapper>
          <SendRequest />
        </ModalWrapper>
      )}
      {/* Delete Project */}
      {state.DeleteProject.isModalOpen && (
        <ModalWrapper>
          <DeleteProject />
        </ModalWrapper>
      )}
      {/* Image */}
      {/* NOTE: This has to be the last modal so it appers on top of everything else... */}
      {state.SelectedImage.isModalOpen && (
        <ModalWrapper>
          <Image />
        </ModalWrapper>
      )}
    </>
  );
};

export default Modals;
