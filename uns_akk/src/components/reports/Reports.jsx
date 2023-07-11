import React, { useEffect, useState } from "react";
import CustomSelect from "../custom/CustomSelect";
import CrudProvider from "../../provider/CrudProvider";
import { useTranslation } from "react-i18next";
import { Button, Row, Col, Card } from 'react-bootstrap';

export default function Reports() {
  const { t } = useTranslation();
  const [raportPrint, setRaportPrint] = useState({
    value: [],
    label: "",
  });
  const [qualification, setQualification] = useState({
    value: null,
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
    { value: 2, label: t("NonGraduatedCandidatesList") },
    { value: 3, label: t("InstitutionList") },
    { value: 4, label: t("LevelList") },
    { value: 5, label: t("QualificationList") },
    { value: 6, label: t("QualificationChildList") },
    { value: 7, label: t("InstitutionDecisionDetailsList") },
    { value: 8, label: t("InstitutionList") },
  ];

  const qualificationList = [
    { value: false, label: t("NonGraduated") },
    { value: true, label: t("Graduated") },
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
      CrudProvider.getAll(`InstitutionAPI/GetInstitutions/${model.MunicipalityId}`).then((res) => {
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
      CrudProvider.getAll(`InstitutionAPI/GetInstitutions/${model.MunicipalityId}`).then((res) => {
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

  const municipalityList =
    municipality &&
    municipality.length > 0 &&
    municipality
      .map((obj) => {
        return {
          value: obj.municipalityId,
          label: obj.municipalityName,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label));

  const institutionList =
    institution &&
    institution.length > 0 &&
    institution
      .map((obj) => {
        return {
          value: obj.institutionId,
          label: obj.institutionName,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label));

  function changeMunicipality(e) {
    if (!e) {
      setModel((prevModel) => ({
        ...prevModel,
        MunicipalityId: "",
        InstitutionId: null,
        qualificationList: null,
      }));
    } else {
      setModel((prevModel) => ({
        ...prevModel,
        MunicipalityId: e,
      }));
    }
  }

  function changeInstitution(e) {
    if (!e) {
      setModel((prevModel) => ({
        ...prevModel,
        MunicipalityId: null,
        qualificationList: null,
      }));
    }
    setModel((prevModel) => ({
      ...prevModel,
      InstitutionId: e,
    }));
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

  async function PrintWithFilterPDF(e) {
    let url = "ReportsAPI/GetInstitutionFromCityReport";
    let filters = "";

    const values = [];

    if (model.MunicipalityId) {
      values.push(model.MunicipalityId);
    }

    if (model.InstitutionId) {
      let institutionValue = model.InstitutionId;
      
      if (qualification.value !== null) {
        institutionValue += `=${qualification.value}`;
      }
      
      values.push(`?institutionId=${institutionValue}`);
    }
    console.log(qualification.value);

    filters += `${values.join("/")}`;
    console.log(filters);

    await CrudProvider.getReportRDLCWithLang(url, "pdf", filters, raportPrint.label);
  }
  async function PrintWithFilterExcel(e) {
    let url = "ReportsAPI/GetInstitutionFromCityReport";
    let filters = "";

    const values = [];

    if (model.MunicipalityId) {
      values.push(model.MunicipalityId);
    }

    if (model.InstitutionId) {
      let institutionValue = model.InstitutionId;
      
      if (qualification.value !== null) {
        institutionValue += `=${qualification.value}`;
      }
      
      values.push(`?institutionId=${institutionValue}`);
    }
    console.log(qualification.value);

    filters += `${values.join("/")}`;
    console.log(filters);

    await CrudProvider.getReportRDLCWithLang(url, "excel", filters, raportPrint.label);
  }
  async function changeQualification(e, record) {
    setQualification(record);
  }

  async function OnChange(e, record) {
    setRaportPrint(record);
  }
  return (
    <div>
      <Card className="card-body">
        <Row>
          <Col xs={12} lg={3}>
            <h4>{t("RaportList")}</h4>
            <CustomSelect
              optionsList={reportsList}
              onChangeFunction={OnChange}
              isMulti={false}
            />
          </Col>
          <Col xs={12} lg={2} className="mt-4 d-flex justify-content-lg-end justify-content-center">
            <Button variant="danger" onClick={PrintPDF} className="me-lg-2 mx-2 mx-lg-0">
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
      <Card className="card-body">
        <Row>
          <Col xs={12} lg={3}>
            <h4>{t("ChooseMunicipality")}</h4>
            <CustomSelect
              optionsList={municipalityList}
              onChangeFunction={changeMunicipality}
              isMulti={false}
            />
          </Col>
          {institution.length > 0 &&
            <Col xs={12} lg={3}>
              <h4>{t("ChooseInstitution")}</h4>
              <CustomSelect
                optionsList={institutionList}
                onChangeFunction={changeInstitution}
                isMulti={false}
              />
            </Col>
          }
          {model.InstitutionId != null &&
            <Col xs={12} lg={3}>
              <h4>{t("ChooseQualification")}</h4>
              <CustomSelect
                optionsList={qualificationList}
                onChangeFunction={changeQualification}
                isMulti={false}
              />
            </Col>
          }
          <Col xs={12} lg={2} className="mt-4 d-flex justify-content-lg-end justify-content-center">
            <Button variant="danger" onClick={PrintWithFilterPDF} className="me-lg-2 mx-2 mx-lg-0">
              <span className="btn-label">
                <i className="mdi mdi-pdf-box"></i>
              </span>
              PDF
            </Button>
            <Button variant="success" onClick={PrintWithFilterExcel} >
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
