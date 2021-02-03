import React from "react";

// Libraries
import { useSelector } from "react-redux";

// Modals
import ModalWrapper from "modals/ModalWrapper";
import LoginRegister from "modals/loginregister/LoginRegister";
import CreateProject from "modals/createproject/CreateProject";
import Image from "modals/image/Image";

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
      {/* Image */}
      {state.SelectedImage.isModalOpen && (
        <ModalWrapper>
          <Image />
        </ModalWrapper>
      )}
    </>
  );
};

export default Modals;
