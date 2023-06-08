import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import CrudProvider from "../../provider/CrudProvider";
import { CreateLevelSchema } from "../schemas/CreateLevelSchema";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import ProgressBar from "../custom/ProgressBar";
import { useTranslation } from "react-i18next";
import CustomSelect from "../custom/CustomSelect";

export default function CreateLevel() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [model, setModel] = useState({
    LevelReferenceKEK: "",
    LevelDescription: "",
    Competencies: "",
    DetailedDescription: "",
    Knowledge: "",
    LevelIndicator: "",
    Skills: "",
    Descriptor: "",
    Type: "",
    LangId: "",
  });

  const SubmitForm = async () => {
    await CrudProvider.createItem("LevelAPI/CreateLevel", model).then((res) => {
      console.log(res);
      if (res) {
        if (res.statusCode === 200) {
          navigate("/level");
        }
      }
    });
  };

  const formik = useFormik({
    initialValues: {},
    validationSchema: CreateLevelSchema,
    onSubmit: () => SubmitForm(),
  });

  const changeLangId = (e) => {
    setModel({
      ...model,
      LangId: e,
    });
  };

  const langList = [
    {
      value: 1,
      label: t("Albanian"),
    },
    {
      value: 2,
      label: t("English"),
    },
    {
      value: 3,
      label: t("Serbian"),
    },
  ];

  return (
    <>
      <ProgressBar model={model} />
      <div className="main-content">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">{t("Create Level")}</h4>
              </div>
              <div className="card-body">
                <form onSubmit={formik.handleSubmit}>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-4">
                      <label style={{ fontFamily: 'Arial', fontWeight: 'bold', color: 'black' }}>{t("Language")}</label>
                        <CustomSelect
                          optionsList={langList}
                          isMulti={false}
                          onChangeFunction={changeLangId}
                          placeholder={t("ChooseLanguage")}
                        />
                      </div>
                      <div className="col-md-4">
                      <label style={{ fontFamily: 'Arial', fontWeight: 'bold', color: 'black' }}>{t("Level Reference KEK")}</label>
                        <input
                          name="LevelReferenceKEK"
                          type="number"
                          value={formik.values.LevelReferenceKEK}
                          className="form-control"
                          placeholder={t("Enter Level Reference KEK")}
                          onChange={(e) => {
                            setModel({
                              ...model,
                              LevelReferenceKEK: e.target.value,
                            });
                            formik.setFieldValue(
                              "LevelReferenceKEK",
                              e.target.value
                            );
                          }}
                        />
                        {formik.errors.LevelReferenceKEK && (
                          <span className="text-danger">
                            {formik.errors.LevelReferenceKEK}
                          </span>
                        )}
                      </div>
                      <div className="col-md-4">
                      <label style={{ fontFamily: 'Arial', fontWeight: 'bold', color: 'black' }}>{t("Type")}</label>
                        <textarea
                          name="Type"
                          value={formik.values.Type}
                          className="form-control"
                          placeholder={t("Enter Type")}
                          onChange={(e) => {
                            setModel({
                              ...model,
                              Type: e.target.value,
                            });
                            formik.setFieldValue("Type", e.target.value);
                          }}
                          rows="1"
                        />
                        {formik.errors.Type && (
                          <span className="text-danger">
                            {formik.errors.Type}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group mt-2">
                      <label style={{ fontFamily: 'Arial', fontWeight: 'bold', color: 'black' }}>{t("Level Description")}</label>

                        <textarea
                          name="LevelDescription"
                          value={formik.values.LevelDescription}
                          className="form-control"
                          placeholder={t("Enter Level Description")}
                          onChange={(e) => {
                            setModel({
                              ...model,
                              LevelDescription: e.target.value,
                            });
                            formik.setFieldValue(
                              "LevelDescription",
                              e.target.value
                            );
                          }}
                          rows="5"
                        ></textarea>
                        {formik.errors.LevelDescription && (
                          <span className="text-danger">
                            {formik.errors.LevelDescription}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6 mt-2">
                      <div className="form-group">
                      <label style={{ fontFamily: 'Arial', fontWeight: 'bold', color: 'black' }}>{t("Competencies")}</label>

                        <textarea
                          name="Competencies"
                          value={formik.values.Competencies}
                          className="form-control"
                          placeholder={t("Enter Competencies")}
                          onChange={(e) => {
                            setModel({
                              ...model,
                              Competencies: e.target.value,
                            });
                            formik.setFieldValue(
                              "Competencies",
                              e.target.value
                            );
                          }}
                          rows="5"
                        ></textarea>
                        {formik.errors.Competencies && (
                          <span className="text-danger">
                            {formik.errors.Competencies}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="form-group mt-2">
                  <label style={{ fontFamily: 'Arial', fontWeight: 'bold', color: 'black' }}>{t("Detailed Description")}</label>

                    <textarea
                      name="DetailedDescription"
                      value={formik.values.DetailedDescription}
                      className="form-control"
                      placeholder={t("Enter Detailed Description")}
                      onChange={(e) => {
                        setModel({
                          ...model,
                          DetailedDescription: e.target.value,
                        });
                        formik.setFieldValue(
                          "DetailedDescription",
                          e.target.value
                        );
                      }}
                      rows="6"
                    ></textarea>
                    {formik.errors.DetailedDescription && (
                      <span className="text-danger">
                        {formik.errors.DetailedDescription}
                      </span>
                    )}
                  </div>

                  <div className="form-group mt-2">
                    <div className="row">
                      <div className="col-md-6">
                      <label style={{ fontFamily: 'Arial', fontWeight: 'bold', color: 'black' }}>{t("Descriptor")}</label>

                        <textarea
                          name="Descriptor"
                          value={formik.values.Descriptor}
                          className="form-control"
                          placeholder={t("Enter Descriptor")}
                          onChange={(e) => {
                            setModel({
                              ...model,
                              Descriptor: e.target.value,
                            });
                            formik.setFieldValue("Descriptor", e.target.value);
                          }}
                          rows="6"
                        ></textarea>
                        {formik.errors.Descriptor && (
                          <span className="text-danger">
                            {formik.errors.Descriptor}
                          </span>
                        )}
                      </div>
                      <div className="col-md-6">
                      <label style={{ fontFamily: 'Arial', fontWeight: 'bold', color: 'black' }}>{t("Level Indicator")}</label>

                        <textarea
                          name="LevelIndicator"
                          value={formik.values.LevelIndicator}
                          className="form-control"
                          placeholder={t("Enter Level Indicator")}
                          onChange={(e) => {
                            setModel({
                              ...model,
                              LevelIndicator: e.target.value,
                            });
                            formik.setFieldValue(
                              "LevelIndicator",
                              e.target.value
                            );
                          }}
                          rows="6"
                        ></textarea>
                        {formik.errors.LevelIndicator && (
                          <span className="text-danger">
                            {formik.errors.LevelIndicator}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="form-group mt-2">
                  <label style={{ fontFamily: 'Arial', fontWeight: 'bold', color: 'black' }}>{t("Knowledge")}</label>

                    <textarea
                      name="Knowledge"
                      value={formik.values.Knowledge}
                      className="form-control"
                      placeholder={t("Enter Knowledge")}
                      onChange={(e) => {
                        setModel({
                          ...model,
                          Knowledge: e.target.value,
                        });
                        formik.setFieldValue("Knowledge", e.target.value);
                      }}
                      rows="6"
                    ></textarea>
                    {formik.errors.Knowledge && (
                      <span className="text-danger">
                        {formik.errors.Knowledge}
                      </span>
                    )}
                  </div>

                  <div className="form-group mt-2">
                  <label style={{ fontFamily: 'Arial', fontWeight: 'bold', color: 'black' }}>{t("Skills")}</label>

                    <textarea
                      name="Skills"
                      value={formik.values.Skills}
                      className="form-control"
                      placeholder={t("Enter Skills")}
                      onChange={(e) => {
                        setModel({
                          ...model,
                          Skills: e.target.value,
                        });
                        formik.setFieldValue("Skills", e.target.value);
                      }}
                      rows="6"
                    ></textarea>
                    {formik.errors.Skills && (
                      <span className="text-danger">
                        {formik.errors.Skills}
                      </span>
                    )}
                  </div>

                  <ul className="list-inline mb-0 wizard mt-3 mb-2">
                    <Link
                      to="/agencies"
                      className="btn btn-danger waves-effect waves-light float-start"
                    >
                      <span className="btn-label">
                        <i className="fe-arrow-left"></i>
                      </span>
                      {t("Back")}
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
