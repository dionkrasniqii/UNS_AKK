import React, { useEffect, useState } from "react";
import CustomSelect from "../custom/CustomSelect";
import CrudProvider from "../../provider/CrudProvider";
import { useTranslation } from "react-i18next";
import { Button, Row, Col, Card } from "react-bootstrap";
import { toast } from "react-toastify";

export default function Reports() {
  const { t } = useTranslation();
  const [load, setLoad] = useState(false);
  const [raportPrint, setRaportPrint] = useState({
    value: "",
    label: "",
  });
  const reportsList = [
    { value: 1, label: t("GraduatedCandidatesList") },
    { value: 2, label: t("UnderGraduatedCandidatesList") },
    { value: 3, label: t("InstitutionList") },
    { value: 4, label: t("LevelList") },
    { value: 5, label: t("QualificationList") },
    { value: 6, label: t("QualificationChildList") },
    { value: 7, label: t("InstitutionDecisionDetailsList") },
  ];

  async function checkModel(model) {
    return model ? Object.values(model).some((value) => !!value) : false;
  }
  async function PrintReport(fileType, id, value) {
    try {
      setLoad(true);

      const check = await checkModel(raportPrint);
      if (!check) {
        return toast.info(t("ChooseAnReport"));
      }
      await CrudProvider.getReportRDLCWithLang(
        "ReportsAPI/PrintReportType",
        fileType,
        raportPrint.value,
        raportPrint.label
      );
    } finally {
      setLoad(false);
    }
  }
  async function OnChange(e, record) {
    setRaportPrint(record);
  }
  return (
    <div>
      <Card className='card-body'>
        <Row>
          <Col xs={12} lg={6}>
            <h4>{t("RaportList")}</h4>
            <CustomSelect
              optionsList={reportsList}
              onChangeFunction={OnChange}
              isMulti={false}
            />
          </Col>
          {!load ? (
            <Col
              xs={12}
              lg={6}
              className='mt-4 d-flex justify-content-lg-start justify-content-center'
            >
              <Button
                variant='danger'
                onClick={(e) => PrintReport("pdf")}
                className='me-lg-2 mx-2 mx-lg-0'
              >
                <i className='mdi mdi-pdf-box'></i>
                PDF
              </Button>
              <Button variant='success' onClick={(e) => PrintReport("excel")}>
                <i className='mdi mdi-microsoft-excel'></i>
                Excel
              </Button>
            </Col>
          ) : (
            <div className='col-xxl-12 col-lg-12 col-sm-12 text-center mt-5'>
              <div
                className='spinner-border text-primary m-2 text-center'
                role='status'
              />
            </div>
          )}
        </Row>
      </Card>
    </div>
  );
}
