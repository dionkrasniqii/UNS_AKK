import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CustomSelect from "../custom/CustomSelect";
import { useTranslation } from "react-i18next";
import { setNestedObjectValues, useFormik } from "formik";
import CrudProvider from "../../provider/CrudProvider";
import { toast } from "react-toastify";

export default function EditQualifications() {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const langId = localStorage.getItem("i18nextLng");
  const [qualification, setQualification] = useState({
    QualificationId: id,
    LevelKKKId: "",
    CodeAL: "",
    CodeEN: "",
    CodeSR: "",
    QualificationNameAL: "",
    QualificationNameEN: "",
    QualificationNameSR: "",
  });
  const [levels, setLevels] = useState([]);
  const [subQualification, setSubQualification] = useState([]);

  async function getAllLevelsWithLang(){
    CrudProvider.getAllWithLang("GeneralAPI/GetAllLevels").then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          setLevels(res.result);
        }
      }
    })
  }

  async function getAllSubQualificationsWithLang(){
    CrudProvider.getItemByIdLang("GeneralAPI/GetAllSubQualificationsByQualificationId", id).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          setSubQualification(res.result);
        }
      }
    })
  }

  useEffect(() => {
    setLoad(true);
    Promise.all([
      CrudProvider.getItemById("QualificationAPI/GetById", id).then((res) => {
        if (res) {
          if (res.statusCode === 200) {
            const obj = res.result;
            setQualification({
                ...qualification,
                LevelKKKId:obj[0].qualification.levelKKK.levelKKKId,
                CodeAL:obj[1].code,
                CodeEN:obj[2].code,
                CodeSR:obj[0].code,
                QualificationNameAL:obj[1].qualificationName,
                QualificationNameEN:obj[2].qualificationName,
                QualificationNameSR:obj[0].qualificationName
            });
          } else {
            toast.error(res.errorMessages[0]);
            navigate("/qualifications");
          }
        }
      }),
      getAllLevelsWithLang(),
      getAllSubQualificationsWithLang(),
    ]).then((res) => {
      setLoad(false);
    });
  }, [id]);

  useEffect(() => {
    getAllLevelsWithLang();
  },[langId])

  useEffect(() => {
    getAllSubQualificationsWithLang();
  },[langId])


  const levelList =
    levels &&
    levels.length > 0 &&
    levels.map((obj) => {
      return {
        value: obj.levelKKK.levelKKKId,
        label: obj.levelKKKDescription,
      };
    });

  function changeLevel(e) {
    setQualification({
      ...qualification,
      LevelKKKId: e,
    });
    formik.setFieldValue("LevelKKKId", e);
  }


  const defaultSelectValue =
    levels.length > 0 &&
    levels.find( 
      (obj) =>  obj.levelKKK.levelKKKId === qualification.LevelKKKId
    );

  const defaultLabel = defaultSelectValue?.levelKKKDescription ?? "";
  const defaultValue = defaultSelectValue?.levelKKK?.levelKKKId ?? "";

  const defaultOption = {
    label: defaultLabel,
    value: defaultValue,
  };

  
  const subQualificationList =
    subQualification &&
    subQualification.length > 0 &&
    subQualification.map((obj) => {
      return {
        key: obj.qualificationChild.qualificationChildId,
        value: obj.description,
      };
    });

    let textareaValue = "";
    if (Array.isArray(subQualificationList) && subQualificationList.length > 0) {
      textareaValue = subQualificationList
        .map((option) => option.value)
        .join(",\n");
    }

  async function handleSubmit() {
    await CrudProvider.updateItem(
      "QualificationAPI/UpdateQualification",
      qualification
    ).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          toast.success(t("DataUpdatedSuccessfully"));
          navigate("/qualifications");
        } else {
          toast.error(res.errorMessages[0]);
        }
      }
    });
  }
  const formik = useFormik({
    initialValues: {},
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: () => handleSubmit(),
  });
  return (
    <div className="col-xl-12">
      <div className="card">
        { !load ? (
          <div className="card-body">
            <h3 className="mb-3">{t("ModifyQualification")}</h3>
            <form onSubmit={formik.handleSubmit}>
              <div id="progressbarwizard">
                <div className="tab-content b-0 mb-0 pt-0">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="card mb-3">
                        <div className="card-body">
                          <h5 className="card-title">{t("Code")} (AL)</h5>
                          <div className="row">
                            <div className="col-md-5">
                              <label className="col-form-label">
                              {t("Code")} (AL)
                              </label>
                            </div>
                            <div className="col-md-7">
                              <input
                                type="text"
                                defaultValue={qualification.CodeAL}
                                className="form-control"
                                onChange={(e) => {
                                  setQualification({
                                    ...qualification,
                                    codeAL: e.target.value,
                                  });
                                  formik.setFieldValue(
                                    "CodeAL",
                                    e.target.value
                                  );
                                }}
                              />
                              {formik.errors.CodeAL && (
                                <span className="text-danger">
                                  {formik.errors.CodeAL}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card mb-3">
                        <div className="card-body">
                          <h5 className="card-title">{t("Code")} (EN)</h5>
                          <div className="row">
                            <label className="col-md-5 col-form-label">
                            {t("Code")} (EN)
                            </label>
                            <div className="col-md-7">
                              <input
                                type="text"
                                defaultValue={qualification.CodeEN}
                                className="form-control"
                                onChange={(e) => {
                                  setQualification({
                                    ...qualification,
                                    CodeEN: e.target.value,
                                  });
                                  formik.setFieldValue(
                                    "CodeEN",
                                    e.target.value
                                  );
                                }}
                              />
                              {formik.errors.CodeEN && (
                                <span className="text-danger">
                                  {formik.errors.CodeEN}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="card mb-3">
                        <div className="card-body">
                          <h5 className="card-title">{t("Code")} (SR)</h5>
                          <div className="row">
                            <label className="col-md-5 col-form-label">
                            {t("Code")} (SR)
                            </label>
                            <div className="col-md-7">
                              <input
                                type="text"
                                defaultValue={qualification.CodeSR}
                                className="form-control"
                                onChange={(e) => {
                                  setQualification({
                                    ...qualification,
                                    CodeSR: e.target.value,
                                  });
                                  formik.setFieldValue(
                                    "CodeSR",
                                    e.target.value
                                  );
                                }}
                              />
                              {formik.errors.CodeSR && (
                                <span className="text-danger">
                                  {formik.errors.CodeSR}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <div className="card mb-3">
                        <div className="card-body">
                          <h5 className="card-title">
                          {t("QualificationName")} (AL)
                          </h5>
                          <div className="row">
                            <label className="col-md-5 col-form-label">
                            {t("QualificationName")} (AL)
                            </label>
                            <div className="col-md-7">
                              <input
                                type="text"
                                defaultValue={
                                  qualification.QualificationNameAL
                                }
                                className="form-control"
                                onChange={(e) => {
                                  setQualification({
                                    ...qualification,
                                    QualificationNameAL: e.target.value,
                                  });
                                  formik.setFieldValue(
                                    "QualificationNameAL",
                                    e.target.value
                                  );
                                }}
                              />
                              {formik.errors.QualificationNameAL && (
                                <span className="text-danger">
                                  {formik.errors.QualificationNameAL}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="card mb-3">
                        <div className="card-body">
                          <h5 className="card-title">
                          {t("QualificationName")} (EN)
                          </h5>
                          <div className="row">
                            <label className="col-md-5 col-form-label">
                            {t("QualificationName")} (EN)
                            </label>
                            <div className="col-md-7">
                              <input
                                type="text"
                                defaultValue={
                                  qualification.QualificationNameEN
                                }
                                className="form-control"
                                onChange={(e) => {
                                  setQualification({
                                    ...qualification,
                                    QualificationNameEN: e.target.value,
                                  });
                                  formik.setFieldValue(
                                    "QualificationNameEN",
                                    e.target.value
                                  );
                                }}
                              />
                              {formik.errors.QualificationNameEN && (
                                <span className="text-danger">
                                  {formik.errors.QualificationNameEN}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="card mb-3">
                        <div className="card-body">
                          <h5 className="card-title">
                          {t("QualificationName")} (SR)
                          </h5>
                          <div className="row">
                            <label className="col-md-5 col-form-label">
                            {t("QualificationName")} (SR)
                            </label>
                            <div className="col-md-7">
                              <input
                                type="text"
                                defaultValue={
                                  qualification.QualificationNameSR
                                }
                                className="form-control"
                                onChange={(e) => {
                                  setQualification({
                                    ...qualification,
                                    QualificationNameSR: e.target.value,
                                  });
                                  formik.setFieldValue(
                                    "QualificationNameSR",
                                    e.target.value
                                  );
                                }}
                              />
                              {formik.errors.QualificationNameSR && (
                                <span className="text-danger">
                                  {formik.errors.QualificationNameSR}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="card mb-3">
                        <div className="card-body">
                          <h5 className="card-title">{t("Level")}</h5>
                          <div className="row">
                            <label className="col-md-5 col-form-label">
                            {t("Level")}
                            </label>
                            <div className="col-md-7">
                              <CustomSelect
                                hasDefaultValue={true}
                                onChangeFunction={changeLevel}
                                optionsList={levelList}
                                defaultValue={defaultOption}
                                isMulti={false}
                              />
                              {formik.errors.LevelKKKId && (
                                <span className="text-danger">
                                  {" "}
                                  {formik.errors.LevelKKKId}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="card mb-3">
                        <div className="card-body">
                          <h5 className="card-title">{t("SubQualifications")}</h5>
                          <div className="row">
                            <div className="col-md-5">
                              <label className="col-form-label">
                              {t("SubQualifications")}
                              </label>
                            </div>
                            <div className="col-md-7">
                              <textarea
                                type="text"
                                readOnly
                                value={textareaValue}
                                className="form-control"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <ul className="list-inline mb-0 wizard">
                    <Link
                      to="/qualifications"
                      className="btn btn-danger waves-effect waves-light float-start"
                    >
                      <span className="btn-label">
                        <i className="fe-arrow-left"></i>
                      </span>
                      {t("Discard")}
                    </Link>
                    <li className="next list-inline-item float-end">
                      <button
                        type="submit"
                        className="btn btn-success waves-effect waves-light"
                      >
                        <span className="btn-label">
                          <i className="fe-check"></i>
                        </span>
                        {t("Edit")}
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="col-xxl-12 col-lg-12 col-sm-12 text-center">
            <div
              className="spinner-border text-primary m-2 text-center"
              role="status"
            />
          </div>
        )}
      </div>
    </div>
  );
}
