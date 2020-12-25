import React from "react";

// Design
import "./sitedescription.scss";

const SiteDescription = () => {
  return (
    <div className="sitedescription-wrapper">
      <p className="sitedescription-title">جایی که پروژه ها تایپ می‌شوند</p>
      <p className="sitedescription-description">
        نیازی نیست بابت سفارش های خود کارمزدی پرداخت کنید. فقط کافیست عضوی از
        خانواده ی تایپ کافه باشید.
      </p>
      <p className="sitedescription-description">
        در تایپ کافه شما می‌توانید با بررسی عملکرد تایپیست هایی که برای انجام
        پروژه ی شما اعلام آمادگی می‌کنند، طی فرآیند بررسی عملکرد، ابتدا نحوه‌ی
        عملکرد وی را مشاهده کنید و اینگونه در انتخاب تایپیست مورد اعتماد خود
        شانس بهتری داشته باشید.
      </p>
    </div>
  );
};

export default SiteDescription;
