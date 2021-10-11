import { useRef } from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

// Components
import Close from "components/buttons/Close";
import Button from "components/buttons/Button";
import Previous from "components/buttons/Previous";
import { farsiNumber } from "components/helper";

// Actions
import { DeleteProject } from "redux/actions";

// Request
import socket from "requests/socket";
import { DeleteProjectReq, handleErrors } from "requests";

// Design
import "./deleteproject.scss";

const DeleteProjectComp = () => {
  const dispatch = useDispatch();
  const submitButtonRef = useRef();
  const cancelButtonRef = useRef();
  const state = useSelector(state => state.DeleteProject);

  const handleDelete = () => {
    DeleteProjectReq({ id: state.id })
      .then(() => {
        socket.send(JSON.stringify({ status: "delete-project", id: state.id }));
        dispatch(DeleteProject({ isModalOpen: false, id: "" }));
        toast.info(<>پروژه شما حذف شد.</>);
      })
      .catch(err => handleErrors(err));
  };

  return (
    <motion.div
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      className="deleteproject-wrapper"
    >
      <Close
        className="close-modal"
        onClick={() => dispatch(DeleteProject({ isModalOpen: false }))}
      />
      <p>
        آیا از حذف پروژه با شناسه{" "}
        <span style={{ fontSize: "20px" }}>{farsiNumber(state.id)}</span> مطمئن
        هستید؟
      </p>
      <Button
        ref={submitButtonRef}
        title="حذف"
        className="w-68 red"
        onClick={handleDelete}
      />
      <Previous
        ref={cancelButtonRef}
        title="انصراف"
        className="w-30"
        onClick={() => dispatch(DeleteProject({ isModalOpen: false }))}
      />
    </motion.div>
  );
};

export default DeleteProjectComp;
