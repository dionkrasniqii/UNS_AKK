import React, { useEffect, useState } from "react";
import CustomSelect from "../custom/CustomSelect";
import CrudProvider from "../../provider/CrudProvider";
import { useTranslation } from "react-i18next";
import { Button, Row, Col, Card } from "react-bootstrap";

export default function Reports() {
  const { t } = useTranslation();
  const [raportPrint, setRaportPrint] = useState({
    value: [],
    label: "",
  });
  const [municipality, setMunicipality] = useState([]);
  const [institution, setInstitution] = useState([]);
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState({
    MunicipalityId: "",
    InstitutionId: "",
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

  useEffect(() => {
    setLoading(true);
    CrudProvider.getAllWithLang("MunicipalityAPI/GetAll").then((res) => {
      if (res) {
        switch (res.statusCode) {
          case 200:
            setMunicipality(res.result);
            setLoading(false);
            break;
          default:
            setLoading(false);
            break;
        }
      }
    });
  }, []);

  useEffect(() => {
    if (model.MunicipalityId) {
      CrudProvider.getAll(
        `InstitutionAPI/GetInstitutions/${model.MunicipalityId}`
      ).then((res) => {
        if (res) {
          switch (res.statusCode) {
            case 200:
              setInstitution(res.result);
              setLoading(false);
              break;
            default:
              setInstitution([]);
              setLoading(false);
              break;
          }
        }
      });
    } else {
      setInstitution([]);
    }
  }, [model.MunicipalityId]);

  useEffect(() => {
    if (model.InstitutionId) {
      CrudProvider.getAll(
        `InstitutionAPI/GetInstitutions/${model.MunicipalityId}`
      ).then((res) => {
        if (res) {
          switch (res.statusCode) {
            case 200:
              setInstitution(res.result);
              setLoading(false);
              break;
            default:
              setInstitution([]);
              setLoading(false);
              break;
          }
        }
      });
    } else {
      setInstitution([]);
    }
  }, [model.InstitutionId]);

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

  async function OnChange(e, record) {
    setRaportPrint(record);
  }
  return (
    <div>
      <Card className="card-body">
        <Row>
          <Col xs={12} lg={6}>
            <h4>{t("RaportList")}</h4>
            <CustomSelect
              optionsList={reportsList}
              onChangeFunction={OnChange}
              isMulti={false}
            />
          </Col>
          <Col
            xs={12}
            lg={6}
            className="mt-4 d-flex justify-content-lg-start justify-content-center"
          >
            <Button
              variant="danger"
              onClick={PrintPDF}
              className="me-lg-2 mx-2 mx-lg-0"
            >
              <span className="btn-label">
                <i className="mdi mdi-pdf-box"></i>
              </span>
              PDF
            </Button>
            <Button variant="success" onClick={PrintRaport}>
              <span className="btn-label">
                <i className="mdi mdi-microsoft-excel"></i>
              </span>
              Excel
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
