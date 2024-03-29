import React from "react";
import { useTranslation } from "react-i18next";
import { FallingLines } from "react-loader-spinner";

export default function Loading() {
  const { t } = useTranslation();
  return (
    <div className="container">
      <div className="col-xxl-12 col-lg-12 col-md-10 col-sm-12 d-flex justify-content-center align-items-center  mt--100 mb--100">
        <FallingLines
          color="blue"
          width="250"
          visible={true}
          ariaLabel="falling-lines-loading"
        />
        <h4>{t("PleaseWait")}</h4>
      </div>
    </div>
  );
}
