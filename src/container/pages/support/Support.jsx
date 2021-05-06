import React, { useRef, useState } from "react";

// Components
import TextArea from "components/inputs/TextArea";
import Button from "components/buttons/Button";

// Design
import "./support.scss";

const Support = () => {
  const sendSupportTicketRippleRef = useRef();
  const [message, setMessage] = useState("");

  const handleCreateTicket = () => {};

  return (
    <div className="support-wrapper">
      <div className="support-form-wrapper">
        <TextArea
          label="توضیحات"
          className="support-input"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <Button
          title="ارسال تیکت"
          ref={sendSupportTicketRippleRef}
          className="fit-width"
          onClick={handleCreateTicket}
        />
      </div>
      <div className="support-ticket-history-wrapper">
        <div className="support-ticket-history-title">تاریخچه تیکت‌ها</div>
        <div className="support-ticket-history-tickets">
          <p style={{ marginTop: "10px" }}>
            هنوز هیچ تیکت پشتیبانی ای ارسال نکرده اید.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Support;
