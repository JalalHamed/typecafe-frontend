import React from "react";

// Components
import Accordion from "components/accordion/Accordion";

const Faq = () => {
  return (
    <div className="faq-wrapper">
      <Accordion q={"سوال اینه حاجی"} a={"اینم یه جواب کاملا کامل"} />
      <Accordion q={"سوال اینه حاجی"} a={"اینم یه جواب کاملا کامل"} />
      <Accordion q={"سوال اینه حاجی"} a={"اینم یه جواب کاملا کامل"} />
    </div>
  );
};

export default Faq;
