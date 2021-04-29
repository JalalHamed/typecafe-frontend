import React, { useState, useRef, useEffect } from "react";

// Components
import Input from "components/inputs/Input";
import Button from "components/buttons/Button";
import { priceFormat } from "components/helper";

// Designs
import "./financials.scss";

const Financials = () => {
  const addInputRef = useRef();
  const addButtonRef = useRef();
  const [active, setActive] = useState("addcredit");
  const [addvalue, setAddValue] = useState(50000);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    if (addvalue < 10000 || addvalue > 50000000) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [addvalue]);

  return (
    <div className="financials-wrapper">
      <div className="tab">
        <div className="tab-options no-select">
          <div
            className={`tab-option ${active === "addcredit" ? "active" : ""}`}
            onClick={() => setActive("addcredit")}
          >
            افزایش اعتبار
          </div>
          <div
            className={`tab-option ${active === "withdrawal" ? "active" : ""}`}
            onClick={() => setActive("withdrawal")}
          >
            برداشت اعتبار
          </div>
        </div>
        <div className="tab-content">
          {active === "addcredit" && (
            <div className="addcredit-wrapper">
              <Input
                ref={addInputRef}
                label="مبلغ"
                type="number"
                min={10000}
                value={addvalue}
                onChange={e => setAddValue(e.target.value)}
                noBreak
              />
              <p className="price-format-display">{priceFormat(addvalue)}</p>
              <Button
                ref={addButtonRef}
                title="پرداخت"
                disabled={disable}
                min="10000"
                max="50000000"
              />
              {disable && (
                <p className="error">
                  {addvalue < 10000 && (
                    <span>
                      مبلغ نمی‌تواند کمتر از {priceFormat(10000)} باشد.
                    </span>
                  )}
                  {addvalue > 50000000 && (
                    <span>
                      مبلغ نمی‌تواند بیشتر از {priceFormat(50000000)} باشد.
                    </span>
                  )}
                </p>
              )}
            </div>
          )}
          {active === "withdrawal" && (
            <div>
              <Input label="نام و نام‌خانوادگی" />
              <Input label="مبلغ" type="number" />
              <Input label="نام بانک" />
              <Input label="شماره حساب" type="number" />
              <Input label="شماره شبا" type="number" />
              <Button ref={addButtonRef} title="درخواست برداشت" />
            </div>
          )}
        </div>
      </div>
      <div className="transaction-history-wrapper">
        <div className="transaction-history-title">تاریخچه تراکنش‌ها</div>
        <div className="transaction-history-tickets">
          <i className="icon icon-leafless-tree" />
          <p style={{ marginTop: "10px" }}>هنوز هیچ تراکنشی انجام نشده است.</p>
        </div>
      </div>
    </div>
  );
};

export default Financials;
