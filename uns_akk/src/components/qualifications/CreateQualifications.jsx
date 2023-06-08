import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import CrudProvider from "../../provider/CrudProvider";
import { useFormik } from "formik";
import ProgressBar from "../custom/ProgressBar";
import CustomSelect from "../custom/CustomSelect";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

export default function CreateQualifications() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [levels, setLevels] = useState([]);
  const [model, setModel] = useState({
    LevelKKKId: "",
    CodeAL: "",
    CodeEN: "",
    CodeSR: "",
    QualificationNameAL: "",
    QualificationNameEN: "",
    QualificationNameSR: "",
  });

  useEffect(() => {
    CrudProvider.getAllWithLang("GeneralAPI/GetAllLevels").then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          setLevels(res.result);
        }
      }
    });
  }, []);

  async function SubmitForm() {
    await CrudProvider.createItem(
      "QualificationAPI/CreateQualification",
      model
    ).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          navigate("/qualifications");
          toast.success(t("DataSavedSuccessfully"));
        }
      }
    });
  }

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
    setModel({
      ...model,
      LevelKKKId: e,
    });
    formik.setFieldValue("LevelKKKId", e);
  }

  const CreateQualificationsSchema = Yup.object().shape({
    CodeAL: Yup.string().required(t("PleaseFillCodeAL")),
    CodeEN: Yup.string().required(t("PleaseFillCodeEN")),
    CodeSR: Yup.string().required(t("PleaseFillCodeSR")),
    QualificationNameAL: Yup.string().required(
      t("PleaseFillQualificationNameAL")
    ),
    QualificationNameEN: Yup.string().required(
      t("PleaseFillQualificationNameEN")
    ),
    QualificationNameSR: Yup.string().required(
      t("PleaseFillQualificationNameSR")
    ),
    LevelKKKId: Yup.string().required(t("PleaseFillLevel")),
  });

  const formik = useFormik({
    initialValues: {},
    validationSchema: CreateQualificationsSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: () => SubmitForm(),
  });

  return (
    <div className="col-xl-12">
      <div className="card">
        <div className="card-body">
          <h3 className="mb-3">{t("RegisterQualification")}</h3>
          <form onSubmit={formik.handleSubmit}>
            <div id="progressbarwizard">
              <div className="tab-content b-0 mb-0 pt-0">
                <ProgressBar model={model} />

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
                              className="form-control"
                              onChange={(e) => {
                                setModel({
                                  ...model,
                                  CodeAL: e.target.value,
                                });
                                formik.setFieldValue("CodeAL", e.target.value);
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
                              className="form-control"
                              onChange={(e) => {
                                setModel({
                                  ...model,
                                  CodeEN: e.target.value,
                                });
                                formik.setFieldValue("CodeEN", e.target.value);
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
                              className="form-control"
                              onChange={(e) => {
                                setModel({
                                  ...model,
                                  CodeSR: e.target.value,
                                });
                                formik.setFieldValue("CodeSR", e.target.value);
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
                              className="form-control"
                              onChange={(e) => {
                                setModel({
                                  ...model,
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
                              className="form-control"
                              onChange={(e) => {
                                setModel({
                                  ...model,
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
                              className="form-control"
                              onChange={(e) => {
                                setModel({
                                  ...model,
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
                              onChangeFunction={changeLevel}
                              optionsList={levelList}
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
                      {t("Save")}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
