import React, { useState } from "react";

// Design
import "./accordion.scss";

const Accordion = ({ q, a }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="accordion-wrapper no-select" onClick={() => setOpen(!open)}>
      <i
        className={`icon icon-arrow-down accordion-arrow ${
          open ? "accordion-arrow-up" : ""
        }`}
      />
      <p className="accordion-question">{q}</p>
      {open && <p className="accordion-answer">{a}</p>}
    </div>
  );
};

export default Accordion;
