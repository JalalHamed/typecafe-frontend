// Libraries
import { useSelector } from 'react-redux';

// Modals
import ModalWrapper from 'modals/ModalWrapper';
import AoROffer from 'modals/aoroffer/AoROffer';
import OfferRequest from 'modals/createoffer/CreateOffer';
import CreateProject from 'modals/createproject/CreateProject';
import ClientAccept from 'modals/declareready/DeclareReady';
import DeleteProject from 'modals/deleteproject/DeleteProject';
import Image from 'modals/image/Image';
import Loading from 'modals/loading/Loading';
import LoginRegister from 'modals/loginregister/LoginRegister';
import NotEnoughCredit from 'modals/notenoughcredit/NotEnoughCredit';
import Profile from 'modals/profile/Profile';

const Modals = () => {
  const state = useSelector((state) => state);

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
      {state.Profile.isModalOpen && (
        <ModalWrapper>
          <Profile />
        </ModalWrapper>
      )}
      {/* Send Request */}
      {state.CreateOffer.isModalOpen && (
        <ModalWrapper>
          <OfferRequest />
        </ModalWrapper>
      )}
      {/* Delete Project */}
      {state.DeleteProject.isModalOpen && (
        <ModalWrapper>
          <DeleteProject />
        </ModalWrapper>
      )}
      {/* Accept or Reject Offer */}
      {state.AoROffer.isModalOpen && (
        <ModalWrapper>
          <AoROffer />
        </ModalWrapper>
      )}
      {/* Not Enough Credit */}
      {state.NotEnoughCredit && (
        <ModalWrapper>
          <NotEnoughCredit />
        </ModalWrapper>
      )}
      {/* Image */}
      {/* NOTE: This has to be the third last modal so it appers on top of everything else except ClientAccept & Loading... */}
      {state.SelectedImage.isModalOpen && (
        <ModalWrapper>
          <Image />
        </ModalWrapper>
      )}
      {/* Client Accept */}
      {/* NOTE: This has to be the second last modal so it appers on top of everything else except Loading... */}
      {state.ClientAccept.isModalOpen && (
        <ModalWrapper>
          <ClientAccept />
        </ModalWrapper>
      )}
      {/* Loading */}
      {/* NOTE: This has to be the last modal so it appers on top of everything else... */}
      {state.Loading && (
        <ModalWrapper>
          <Loading />
        </ModalWrapper>
      )}
    </>
  );
};

export default Modals;
