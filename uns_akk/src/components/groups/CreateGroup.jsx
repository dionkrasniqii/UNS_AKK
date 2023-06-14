import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import ProgressBar from "../custom/ProgressBar";
import { Link, useNavigate } from "react-router-dom";
import CustomSelect from "../custom/CustomSelect";
import CustomDatePicker from "../custom/CustomDatePicker";
import CrudProvider from "../../provider/CrudProvider";
import { toast } from "react-toastify";
import * as Yup from "yup";
import jwtDecode from "jwt-decode";
export default function CreateGroup() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [loadSubmit, setLoadSubmit] = useState(false);
  const [decisions, setDecisons] = useState([]);
  const token = localStorage.getItem("akktoken");
  const decodedToken = token && jwtDecode(token);
  const [model, setModel] = useState({
    InstitutionDecisionDetailsId: "",
    GroupName: "",
    StartDate: "",
    EndDate: "",
  });

  useEffect(() => {
    setLoad(true);
    CrudProvider.getItemById(
      "GeneralAPI/GetDecisionsByInstitution",
      decodedToken.groupsid
    ).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          setDecisons(res.result);
        }
      }
      setLoad(false);
    });
  }, []);
  const decisionList =
    decisions &&
    decisions.length > 0 &&
    decisions.map((obj) => ({
      value: obj.institutionDecisionDetailsId,
      label:
        obj.municipality.municipalityLanguages[0].municipalityName +
        " - " +
        obj.qualification.qualificationLanguages[0].qualificationName,
    }));

  function changeDecision(e) {
    setModel({
      ...model,
      InstitutionDecisionDetailsId: e,
    });
    formik.setFieldValue("Decision", e);
  }
  function changeStartDate(date, dateString) {
    setModel({
      ...model,
      StartDate: dateString,
    });
    formik.setFieldValue("StartDate", dateString);
  }
  function changeEndDate(date, dateString) {
    setModel({
      ...model,
      EndDate: dateString,
    });
    formik.setFieldValue("EndDate", dateString);
  }
  async function submitForm() {
    setLoad(true);
    if (model.StartDate >= model.EndDate) {
      toast.error(t("DecisionDateCannotBeGreaterThanTermDate"));
      setLoad(false);
      return;
    }
    await CrudProvider.createItem(
      "InstitutionGroupDecisionAPI/CreateGroup",
      model
    ).then((res) => {
      if (res) {
        switch (res.statusCode) {
          case 200:
            navigate("/groups");
            toast.success(t("DataSavedSuccessfully"));
            break;
          case 409:
            toast.error(t("YouHaveExceededGroupLimit"));
            break;
          case 400:
            toast.error("Mbushni të dhënat");
            break;
          case 500:
            toast.error(res.errorMessages[0]);
            break;
          default:
            break;
        }
      }
      setLoad(false);
    });
  }

  const CreateGroupSchema = Yup.object().shape({
    GroupName: Yup.string().required(t("WriteGroupName")),
    Decision: Yup.string().required(t("ChooseDecision")),
    StartDate: Yup.string().required(t("ChooseStartDate")),
    EndDate: Yup.string().required(t("ChooseEndDate")),
  });

  const formik = useFormik({
    initialValues: {},
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: CreateGroupSchema,
    onSubmit: () => submitForm(),
  });
  return (
    <div className='col-xl-12'>
      <div className='card'>
        <div className='card-body'>
          <h3 className=' mb-3'>{t("RegisterGroup")}</h3>
          <form onSubmit={formik.handleSubmit}>
            <div id='progressbarwizard'>
              <div className='tab-content b-0 mb-0 pt-0'>
                <ProgressBar model={model} />
                <div className='tab-pane active' id='account-2'>
                  <div className='row'>
                    <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                      <label>{t("GroupName")}:</label>
                      <input
                        type='text'
                        className='form-control'
                        onChange={(e) => {
                          setModel({
                            ...model,
                            GroupName: e.target.value,
                          });
                          formik.setFieldValue("GroupName", e.target.value);
                        }}
                      />
                      {formik.errors.GroupName && (
                        <span className='text-danger'>
                          {formik.errors.GroupName}
                        </span>
                      )}
                    </div>
                    <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                      <label>{t("Municipality")}:</label>
                      <CustomSelect
                        onChangeFunction={changeDecision}
                        isMulti={false}
                        optionsList={decisionList}
                      />
                      {formik.errors.Decision && (
                        <span className='text-danger'>
                          {formik.errors.Decision}
                        </span>
                      )}
                    </div>
                    <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                      <label>{t("StartDate")}:</label>
                      <CustomDatePicker onChangeFunction={changeStartDate} />
                      {formik.errors.StartDate && (
                        <span className='text-danger'>
                          {formik.errors.StartDate}
                        </span>
                      )}
                    </div>
                    <div className='col-xxl-3 col-lg-3 col-sm-12 mb-3'>
                      <label>{t("EndDate")}:</label>
                      <CustomDatePicker onChangeFunction={changeEndDate} />
                      {formik.errors.EndDate && (
                        <span className='text-danger'>
                          {formik.errors.EndDate}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <ul className='list-inline mb-0 wizard'>
                <Link
                  to='/groups'
                  className='btn btn-danger waves-effect waves-light float-start'
                >
                  <span className='btn-label'>
                    <i className='fe-arrow-left'></i>
                  </span>
                  {t("Discard")}
                </Link>
                <li className='next list-inline-item float-end'>
                  {!loadSubmit ? (
                    <button
                      type='submit'
                      className='btn btn-success waves-effect waves-light'
                    >
                      <span className='btn-label'>
                        <i className='fe-check'></i>
                      </span>
                      {t("Save")}
                    </button>
                  ) : (
                    <div
                      className='spinner-border text-primary m-2 text-center'
                      role='status'
                    />
                  )}
                </li>
              </ul>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
