import React, { useRef } from "react";

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
import Socket from "requests/Socket";
import { DeleteProjectReq } from "requests";

// Design
import "./deleteproject.scss";

const DeleteProjectComp = () => {
  const dispatch = useDispatch();
  const submitButtonRippleRef = useRef();
  const cancelButtonRippleRef = useRef();
  const state = useSelector(state => state.DeleteProject);

  const handleDelete = () => {
    DeleteProjectReq({ id: state.id })
      .then(() => {
        Socket.send(JSON.stringify({ status: "delete-project", id: state.id }));
        dispatch(DeleteProject({ isModalOpen: false, id: "" }));
        toast.success(
          "پروژه شما با شناسه " + farsiNumber(state.id) + " با موفقیت حذف شد."
        );
      })
      .catch(err => console.log(err));
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
      <div className="deleteproject-content">
        <p className="deleteproject-note">
          آیا از حذف پروژه با شناسه {farsiNumber(state.id)} مطمئن هستید؟
        </p>
        <div className="button-wrapper">
          <Button
            ref={submitButtonRippleRef}
            title="حذف"
            className="w-68 red"
            onClick={handleDelete}
          />
          <Previous
            ref={cancelButtonRippleRef}
            title="انصراف"
            className="w-30"
            onClick={() => dispatch(DeleteProject({ isModalOpen: false }))}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default DeleteProjectComp;
