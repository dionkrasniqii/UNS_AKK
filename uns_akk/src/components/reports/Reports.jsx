import React, { useState } from "react";
import CustomSelect from "../custom/CustomSelect";
import CrudProvider from "../../provider/CrudProvider";
import { useTranslation } from "react-i18next";

export default function Reports() {
  const { t } = useTranslation();
  const [raportPrint, setRaportPrint] = useState({
    value: "",
    label: "",
  });
  const reportsList = [{ value: 1, label: "Lista e kandidateve te diplomuar" },
  {value: 2, label: "Lista e kandidateve te pa diplomuar"}, {value: 3, label: "Lista e instuticioneve"}];
  async function OnChange(e, record) {
    setRaportPrint(record);
  }

  async function PrintRaport(e) {
    await CrudProvider.getReportRDLCWithLang(
      "ReportsAPI/PrintReportType",
      "excel",
      raportPrint.value,
      raportPrint.label
    );
  }

  async function PrintPDF(e) {
    await CrudProvider.getReportRDLCWithLang(
      "ReportsAPI/PrintReportType",
      "pdf",
      raportPrint.value,
      raportPrint.label
    );
  }
  return (
    <div className="card card-body">
      <div className="row">
        <div className="col-xxl-3 col-lg-3 col-sm-12">
          <h3>{t("RaportList")}</h3>
          <CustomSelect
            optionsList={reportsList}
            onChangeFunction={OnChange}
            isMulti={false}
          />
        </div>
        <div className="col-xxl-2 col-lg-2 col-sm-12 mt-4 d-flex justify-content-between">
          <button
            onClick={PrintRaport}
            type="button"
            class="btn btn-success waves-effect waves-light"
          >
            <span class="btn-label">
              <i class="mdi mdi-microsoft-excel"></i>
            </span>
            Excel
          </button>
          <button
            onClick={PrintPDF}
            type="button"
            class="btn btn-secondary waves-effect waves-light"
          >
            <span class="btn-label">
              <i class="mdi mdi-pdf-box"></i>
            </span>
            PDF
          </button>
        </div>
      </div>
    </div>
  );
}