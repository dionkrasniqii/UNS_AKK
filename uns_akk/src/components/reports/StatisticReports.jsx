import React, { useEffect, useState } from "react";
import CustomSelect from "../custom/CustomSelect";
import CrudProvider from "../../provider/CrudProvider";
import { useTranslation } from "react-i18next";
import { Button, Row, Col, Card, Form } from "react-bootstrap";
import { toast } from "react-toastify";

export default function Reports() {
  const { t } = useTranslation();
  const [raportPrint, setRaportPrint] = useState({
    value: [],
    label: "",
  });
  const [qualification, setQualification] = useState({
    value: null,
    selectedOption: null,
  });
  const [municipality, setMunicipality] = useState([]);
  const [institution, setInstitution] = useState([]);
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState({
    MunicipalityId: "",
    InstitutionId: "",
  });

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

  const municipalityList =
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
        InstitutionId: null,
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
  async function PrintReport(fileType) {
    try {
      setLoading(true);
      let url = "ReportsAPI/GetInstitutionFromCityReport";
      let filters = "";

      const values = [];

      if (model.MunicipalityId) {
        values.push(model.MunicipalityId);
      }

      if (model.InstitutionId !== null) {
        let institutionValue = model.InstitutionId;

        if (qualification.selectedOption !== null) {
          institutionValue += `=${qualification.selectedOption}`;
        }

        values.push(`?institutionId=${institutionValue}`);
      }
      filters += `${values.join("/")}`;
      if (!model.MunicipalityId) {
        return toast.info(t("ChooseMunicipality"));
      }
      await CrudProvider.getReportRDLCWithLang(
        url,
        fileType,
        filters,
        raportPrint.label
      );
    } finally {
      setLoading(false);
    }
  }
  const handleQualificationChange = (event) => {
    const { value } = event.target;
    const selectedValue = value === "graduated" ? true : false;

    setQualification((prevValues) => ({
      ...prevValues,
      selectedOption: value,
      value: selectedValue,
    }));
  };

  return (
    <div>
      <Card className='card-body'>
        <Row>
          <div className='alert alert-info text-dark border-0' role='alert'>
            {t("ReportStatsDesc1")}{" "}
            <strong className='text-uppercase'>{t("InstitutionList")}</strong>{" "}
            {t("ReportStatsDesc2")}{" "}
            <strong className='text-uppercase'>{t("CandidatesList")}</strong>{" "}
            {t("InThatInstitution")}
          </div>
          <Col xs={12} lg={3}>
            <h4>{t("ChooseMunicipality")}</h4>
            <CustomSelect
              optionsList={municipalityList}
              onChangeFunction={changeMunicipality}
              isMulti={false}
            />
          </Col>
          {institution.length > 0 && (
            <Col xs={12} lg={3}>
              <h4>{t("ChooseInstitution")}</h4>
              <CustomSelect
                optionsList={institutionList}
                onChangeFunction={changeInstitution}
                isMulti={false}
              />
            </Col>
          )}
          {model.InstitutionId && (
            <Col xs={12} lg={3}>
              <h4>{t("ChooseStatus")}</h4>
              <Form>
                <Form.Check
                  type='radio'
                  label={t("UnderGraduated")}
                  name='qualification'
                  value='nongraduated'
                  checked={qualification.selectedOption === "nongraduated"}
                  onChange={handleQualificationChange}
                />
                <Form.Check
                  type='radio'
                  label={t("Graduated")}
                  name='qualification'
                  value='graduated'
                  checked={qualification.selectedOption === "graduated"}
                  onChange={handleQualificationChange}
                />
              </Form>
            </Col>
          )}
          <Col
            xs={12}
            lg={3}
            className='mt-4  d-flex justify-content-lg-start justify-content-center'
          >
            {!loading ? (
              <>
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
              </>
            ) : (
              <div className='col-xxl-12 col-lg-12 col-sm-12 text-center'>
                <div
                  className='spinner-border text-primary m-2 text-center'
                  role='status'
                />
              </div>
            )}
          </Col>
        </Row>
      </Card>
    </div>
  );
}
