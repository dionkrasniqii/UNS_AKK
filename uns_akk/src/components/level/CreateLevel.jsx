import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import CrudProvider from "../../provider/CrudProvider";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import ProgressBar from "../custom/ProgressBar";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
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
    TheDescriptor: "",
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

  const CreateLevelSchema = Yup.object().shape({
    Type: Yup.string().max(50).required(t("PleaseFillTheType")),
    LevelReferenceKEK: Yup.string()
      .max(450)
      .required(t("PleaseFillTheLevelReferenceKEK")),
    LevelDescription: Yup.string()
      .max(200)
      .required(t("PleaseFillTheLevelDescription")),
    Competencies: Yup.string()
      .max(1000)
      .required(t("PleaseFillTheCompetencies")),
    DetailedDescription: Yup.string()
      .max(300)
      .required(t("PleaseFillTheDetailedDescription")),
    Knowledge: Yup.string().max(1000).required(t("PleaseFillTheKnowledge")),
    LevelIndicator: Yup.string()
      .max(2000)
      .required(t("PleaseFillTheLevelIndicator")),
    Skills: Yup.string().max(1000).required(t("PleaseFillTheSkills")),
    TheDescriptor: Yup.string().max(1000).required(t("PlaseFillTheDescriptor")),
    LangId: Yup.string().required(t("PleaseChooseTheLanguange")),
  });

  const formik = useFormik({
    initialValues: {},
    validationSchema: CreateLevelSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: () => SubmitForm(),
  });

  const changeLangId = (e) => {
    setModel({
      ...model,
      LangId: e,
    });
    formik.setFieldValue("LangId", e);
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
                  <div className="row">
                    <div className="col-md-1">
                      <div className="row">
                        <div className="col-md-12">
                          <h5 className="card-title">{t("Language")}</h5>
                          <CustomSelect
                            optionsList={langList}
                            isMulti={false}
                            className="form-control"
                            name="LangId"
                            onChangeFunction={changeLangId}
                          />
                          {formik.errors.LangId && (
                            <span className="text-danger">
                              {formik.errors.LangId}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12 mt-2">
                        <h5 className="card-title">
                          {t("Level Reference KEK")}
                        </h5>
                        <input
                          name="LevelReferenceKEK"
                          y
                          type="number"
                          value={formik.values.LevelReferenceKEK}
                          className="form-control"
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
                      <div className="col-md-12 mt-2">
                        <h5 className="card-title">{t("Type")}</h5>
                        <input
                          name="Type"
                          value={formik.values.Type}
                          className="form-control"
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

                    <div className="col-md-11">
                      <div className="form-group">
                        <h5 className="card-title">{t("Level Description")}</h5>
                        <textarea
                          name="LevelDescription"
                          value={formik.values.LevelDescription}
                          className="form-control"
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
                          rows="9"
                        ></textarea>
                        {formik.errors.LevelDescription && (
                          <span className="text-danger">
                            {formik.errors.LevelDescription}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="form-group mt-2">
                    <h5 className="card-title">{t("Detailed Description")}</h5>
                    <textarea
                      name="DetailedDescription"
                      value={formik.values.DetailedDescription}
                      className="form-control"
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
                      rows="4"
                    ></textarea>
                    {formik.errors.DetailedDescription && (
                      <span className="text-danger">
                        {formik.errors.DetailedDescription}
                      </span>
                    )}
                  </div>

                  <div className="col-md-12 mt-2">
                    <h5 className="card-title">{t("Descriptor")}</h5>

                    <textarea
                      name="TheDescriptor"
                      value={formik.values.TheDescriptor}
                      className="form-control"
                      onChange={(e) => {
                        setModel({
                          ...model,
                          TheDescriptor: e.target.value,
                        });
                        formik.setFieldValue("TheDescriptor", e.target.value);
                      }}
                      rows="4"
                    ></textarea>
                    {formik.errors.TheDescriptor && (
                      <span className="text-danger">
                        {formik.errors.TheDescriptor}
                      </span>
                    )}
                  </div>

                  <div className="form-group mt-2">
                    <h5 className="card-title">{t("Knowledge")}</h5>

                    <textarea
                      name="Knowledge"
                      value={formik.values.Knowledge}
                      className="form-control"
                      onChange={(e) => {
                        setModel({
                          ...model,
                          Knowledge: e.target.value,
                        });
                        formik.setFieldValue("Knowledge", e.target.value);
                      }}
                      rows="9"
                    ></textarea>
                    {formik.errors.Knowledge && (
                      <span className="text-danger">
                        {formik.errors.Knowledge}
                      </span>
                    )}
                  </div>

                  <div className="form-group mt-2">
                    <h5 className="card-title">{t("Skills")}</h5>
                    <textarea
                      name="Skills"
                      value={formik.values.Skills}
                      className="form-control"
                      onChange={(e) => {
                        setModel({
                          ...model,
                          Skills: e.target.value,
                        });
                        formik.setFieldValue("Skills", e.target.value);
                      }}
                      rows="5"
                    ></textarea>
                    {formik.errors.Skills && (
                      <span className="text-danger">
                        {formik.errors.Skills}
                      </span>
                    )}
                  </div>

                  <div className="col-md-12 mt-2">
                    <div className="form-group">
                      <h5 className="card-title">{t("Competencies")}</h5>
                      <textarea
                        name="Competencies"
                        value={formik.values.Competencies}
                        className="form-control"
                        onChange={(e) => {
                          setModel({
                            ...model,
                            Competencies: e.target.value,
                          });
                          formik.setFieldValue("Competencies", e.target.value);
                        }}
                        rows="6"
                      ></textarea>
                      {formik.errors.Competencies && (
                        <span className="text-danger">
                          {formik.errors.Competencies}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="col-md-12 mt-2">
                    <h5 className="card-title">{t("Level Indicator")}</h5>
                    <textarea
                      name="LevelIndicator"
                      value={formik.values.LevelIndicator}
                      className="form-control"
                      onChange={(e) => {
                        setModel({
                          ...model,
                          LevelIndicator: e.target.value,
                        });
                        formik.setFieldValue("LevelIndicator", e.target.value);
                      }}
                      rows="10"
                    ></textarea>
                    {formik.errors.LevelIndicator && (
                      <span className="text-danger">
                        {formik.errors.LevelIndicator}
                      </span>
                    )}
                  </div>

                  <ul className="list-inline mb-0 wizard mt-3 mb-2">
                    <Link
                      to="/level"
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
