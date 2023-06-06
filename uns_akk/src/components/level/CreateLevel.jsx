import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CrudProvider from "../../provider/CrudProvider";
import { CreateLevelSchema } from "../schemas/CreateLevelSchema";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import ProgressBar from "../custom/ProgressBar";
import { useTranslation } from "react-i18next";

export default function CreateLevel() {
  const {t} = useTranslation()
  const navigate = useNavigate();
  const [model, setModel] = useState({
    LevelReferenceKEK: "",
    LevelDescriptionAl: "",
    LevelDescriptionEn: "",
    LevelDescriptionSr: "",
    CompetenciesAl: "",
    CompetenciesEn: "",
    CompetenciesSr: "",
    DetailedDescriptionAl: "",
    DetailedDescriptionEn: "",
    DetailedDescriptionSr: "",
    KnowledgeAl: "",
    KnowledgeEn: "",
    KnowledgeSr: "",
    LevelIndicatorAl: "",
    LevelIndicatorEn: "",
    LevelIndicatorSr: "",
    SkillsAl: "",
    SkillsEn: "",
    SkillsSr: "",
    DescriptorAl: "",
    DescriptorEn: "",
    DescriptorSr: "",
    TypeAl: "",
    TypeEn: "",
    TypeSr: "",
  });

  async function SubmitForm() {
    await CrudProvider.createItem("LevelAPI/CreateLevel", model).then((res) => {
      console.log(res);
      if (res) {
        if (res.statusCode === 200) {
          navigate("/level");
        }
      }
    });
  }
  const formik = useFormik({
    initialValues: {},
    validationSchema: CreateLevelSchema,
    onSubmit: () => SubmitForm(),
  });
  return (
      <div className="col-xl-12">
        <div className="card">
          <div className="card-body">
            <h3 className="mb-3">Create Level</h3>
            <form onSubmit={formik.handleSubmit}>
              <div id="progressbarwizard">
                <div className="tab-content b-0 mb-0 pt-0">
                  <ProgressBar model={model} />
    
                  {/* LevelReferenceKEK */}
                  <div className="card mb-3">
                    <div className="card-body">
                      <h5 className="card-title">Level Reference KEK</h5>
                      <div className="row">
                        <label className="col-md-3 col-form-label" htmlFor="levelRefKEK">
                          Level Reference KEK
                          {t("Hello")}
                        </label>
                        <div className="col-md-9">
                          <input
                            type="number"
                            className="form-control"
                            onChange={(e) => {
                              setModel({
                                ...model,
                                LevelReferenceKEK: e.target.value,
                              });
                              formik.setFieldValue("LevelReferenceKEK", e.target.value);
                            }}
                          />
                          {formik.errors.LevelReferenceKEK && (
                            <span className="text-danger">{formik.errors.LevelReferenceKEK}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                {/* LevelDescription */}
                <div className="row mb-3">
                  <label
                    className="col-md-3 col-form-label"
                    htmlFor="levelDescAL"
                  >
                    Level Description (AL)
                  </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setModel({
                          ...model,
                          LevelDescriptionAl: e.target.value,
                        });
                        formik.setFieldValue(
                          "LevelDescriptionAl",
                          e.target.value
                        );
                      }}
                    />
                    {formik.errors.LevelDescriptionAl && (
                      <span className="text-danger">
                        {formik.errors.LevelDescriptionAl}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    className="col-md-3 col-form-label"
                    htmlFor="levelDescEN"
                  >
                    Level Description (EN)
                  </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setModel({
                          ...model,
                          LevelDescriptionEn: e.target.value,
                        });
                        formik.setFieldValue(
                          "LevelDescriptionEn",
                          e.target.value
                        );
                      }}
                    />
                    {formik.errors.LevelDescriptionEn && (
                      <span className="text-danger">
                        {formik.errors.LevelDescriptionEn}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    className="col-md-3 col-form-label"
                    htmlFor="levelDescSR"
                  >
                    Level Description (SR)
                  </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setModel({
                          ...model,
                          LevelDescriptionSr: e.target.value,
                        });
                        formik.setFieldValue(
                          "LevelDescriptionSr",
                          e.target.value
                        );
                      }}
                    />
                    {formik.errors.LevelDescriptionSr && (
                      <span className="text-danger">
                        {formik.errors.LevelDescriptionSr}
                      </span>
                    )}
                  </div>
                </div>

                {/* Competencies */}
                <div className="row mb-3">
                  <label
                    className="col-md-3 col-form-label"
                    htmlFor="competenciesAL"
                  >
                    Competencies (AL)
                  </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setModel({
                          ...model,
                          CompetenciesAl: e.target.value,
                        });
                        formik.setFieldValue("CompetenciesAl", e.target.value);
                      }}
                    />
                    {formik.errors.CompetenciesAl && (
                      <span className="text-danger">
                        {formik.errors.CompetenciesAl}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    className="col-md-3 col-form-label"
                    htmlFor="competenciesEN"
                  >
                    Competencies (EN)
                  </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setModel({
                          ...model,
                          CompetenciesEn: e.target.value,
                        });
                        formik.setFieldValue("CompetenciesEn", e.target.value);
                      }}
                    />
                    {formik.errors.CompetenciesEn && (
                      <span className="text-danger">
                        {formik.errors.CompetenciesEn}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    className="col-md-3 col-form-label"
                    htmlFor="competenciesSR"
                  >
                    Competencies (SR)
                  </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setModel({
                          ...model,
                          CompetenciesSr: e.target.value,
                        });
                        formik.setFieldValue("CompetenciesSr", e.target.value);
                      }}
                    />
                    {formik.errors.CompetenciesSr && (
                      <span className="text-danger">
                        {formik.errors.CompetenciesSr}
                      </span>
                    )}
                  </div>
                </div>

                {/* DetailedDescription */}
                <div className="row mb-3">
                  <label
                    className="col-md-3 col-form-label"
                    htmlFor="detailedDescAL"
                  >
                    Detailed Description (AL)
                  </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setModel({
                          ...model,
                          DetailedDescriptionAl: e.target.value,
                        });
                        formik.setFieldValue(
                          "DetailedDescriptionAl",
                          e.target.value
                        );
                      }}
                    />
                    {formik.errors.DetailedDescriptionAl && (
                      <span className="text-danger">
                        {formik.errors.DetailedDescriptionAl}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    className="col-md-3 col-form-label"
                    htmlFor="detailedDescEN"
                  >
                    Detailed Description (EN)
                  </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setModel({
                          ...model,
                          DetailedDescriptionEn: e.target.value,
                        });
                        formik.setFieldValue(
                          "DetailedDescriptionEn",
                          e.target.value
                        );
                      }}
                    />
                    {formik.errors.DetailedDescriptionEn && (
                      <span className="text-danger">
                        {formik.errors.DetailedDescriptionEn}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    className="col-md-3 col-form-label"
                    htmlFor="detailedDescSR"
                  >
                    Detailed Description (SR)
                  </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setModel({
                          ...model,
                          DetailedDescriptionSr: e.target.value,
                        });
                        formik.setFieldValue(
                          "DetailedDescriptionSr",
                          e.target.value
                        );
                      }}
                    />
                    {formik.errors.DetailedDescriptionSr && (
                      <span className="text-danger">
                        {formik.errors.DetailedDescriptionSr}
                      </span>
                    )}
                  </div>
                </div>

                {/* Knowledge */}
                <div className="row mb-3">
                  <label
                    className="col-md-3 col-form-label"
                    htmlFor="knowledgeAL"
                  >
                    Knowledge (AL)
                  </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setModel({
                          ...model,
                          KnowledgeAl: e.target.value,
                        });
                        formik.setFieldValue("KnowledgeAl", e.target.value);
                      }}
                    />
                    {formik.errors.KnowledgeAl && (
                      <span className="text-danger">
                        {formik.errors.KnowledgeAl}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    className="col-md-3 col-form-label"
                    htmlFor="knowledgeEN"
                  >
                    Knowledge (EN)
                  </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setModel({
                          ...model,
                          KnowledgeEn: e.target.value,
                        });
                        formik.setFieldValue("KnowledgeEn", e.target.value);
                      }}
                    />
                    {formik.errors.KnowledgeEn && (
                      <span className="text-danger">
                        {formik.errors.KnowledgeEn}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    className="col-md-3 col-form-label"
                    htmlFor="knowledgeSR"
                  >
                    Knowledge (SR)
                  </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setModel({
                          ...model,
                          KnowledgeSr: e.target.value,
                        });
                        formik.setFieldValue("KnowledgeSr", e.target.value);
                      }}
                    />
                    {formik.errors.KnowledgeSr && (
                      <span className="text-danger">
                        {formik.errors.KnowledgeSr}
                      </span>
                    )}
                  </div>
                </div>

                {/* LevelIndicator */}
                <div className="row mb-3">
                  <label
                    className="col-md-3 col-form-label"
                    htmlFor="levelIndicatorAL"
                  >
                    Level Indicator (AL)
                  </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setModel({
                          ...model,
                          LevelIndicatorAl: e.target.value,
                        });
                        formik.setFieldValue(
                          "LevelIndicatorAl",
                          e.target.value
                        );
                      }}
                    />
                    {formik.errors.LevelIndicatorAl && (
                      <span className="text-danger">
                        {formik.errors.LevelIndicatorAl}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    className="col-md-3 col-form-label"
                    htmlFor="levelIndicatorEN"
                  >
                    Level Indicator (EN)
                  </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setModel({
                          ...model,
                          LevelIndicatorEn: e.target.value,
                        });
                        formik.setFieldValue(
                          "LevelIndicatorEn",
                          e.target.value
                        );
                      }}
                    />
                    {formik.errors.LevelIndicatorEn && (
                      <span className="text-danger">
                        {formik.errors.LevelIndicatorEn}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    className="col-md-3 col-form-label"
                    htmlFor="levelIndicatorSR"
                  >
                    Level Indicator (SR)
                  </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setModel({
                          ...model,
                          LevelIndicatorSr: e.target.value,
                        });
                        formik.setFieldValue(
                          "LevelIndicatorSr",
                          e.target.value
                        );
                      }}
                    />
                    {formik.errors.LevelIndicatorSr && (
                      <span className="text-danger">
                        {formik.errors.LevelIndicatorSr}
                      </span>
                    )}
                  </div>
                </div>

                {/* Skills */}
                <div className="row mb-3">
                  <label className="col-md-3 col-form-label" htmlFor="skillsAL">
                    Skills (AL)
                  </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setModel({
                          ...model,
                          SkillsAl: e.target.value,
                        });
                        formik.setFieldValue("SkillsAl", e.target.value);
                      }}
                    />
                    {formik.errors.SkillsAl && (
                      <span className="text-danger">
                        {formik.errors.SkillsAl}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-md-3 col-form-label" htmlFor="skillsEN">
                    Skills (EN)
                  </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setModel({
                          ...model,
                          SkillsEn: e.target.value,
                        });
                        formik.setFieldValue("SkillsEn", e.target.value);
                      }}
                    />
                    {formik.errors.SkillsEn && (
                      <span className="text-danger">
                        {formik.errors.SkillsEn}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-md-3 col-form-label" htmlFor="skillsSR">
                    Skills (SR)
                  </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setModel({
                          ...model,
                          SkillsSr: e.target.value,
                        });
                        formik.setFieldValue("SkillsSr", e.target.value);
                      }}
                    />
                    {formik.errors.SkillsSr && (
                      <span className="text-danger">
                        {formik.errors.SkillsSr}
                      </span>
                    )}
                  </div>
                </div>

                {/* Descriptor */}
                <div className="row mb-3">
                  <label
                    className="col-md-3 col-form-label"
                    htmlFor="descriptorAL"
                  >
                    Descriptor (AL)
                  </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setModel({
                          ...model,
                          DescriptorAl: e.target.value,
                        });
                        formik.setFieldValue("DescriptorAl", e.target.value);
                      }}
                    />
                    {formik.errors.DescriptorAl && (
                      <span className="text-danger">
                        {formik.errors.DescriptorAl}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    className="col-md-3 col-form-label"
                    htmlFor="descriptorEN"
                  >
                    Descriptor (EN)
                  </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setModel({
                          ...model,
                          DescriptorEn: e.target.value,
                        });
                        formik.setFieldValue("DescriptorEn", e.target.value);
                      }}
                    />
                    {formik.errors.DescriptorEn && (
                      <span className="text-danger">
                        {formik.errors.DescriptorEn}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    className="col-md-3 col-form-label"
                    htmlFor="descriptorSR"
                  >
                    Descriptor (SR)
                  </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setModel({
                          ...model,
                          DescriptorSr: e.target.value,
                        });
                        formik.setFieldValue("DescriptorSr", e.target.value);
                      }}
                    />
                    {formik.errors.DescriptorSr && (
                      <span className="text-danger">
                        {formik.errors.DescriptorSr}
                      </span>
                    )}
                  </div>
                </div>

                {/* Type */}
                <div className="row mb-3">
                  <label className="col-md-3 col-form-label" htmlFor="typeAL">
                    Type (AL)
                  </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setModel({
                          ...model,
                          TypeAl: e.target.value,
                        });
                        formik.setFieldValue("TypeAl", e.target.value);
                      }}
                    />
                    {formik.errors.TypeAl && (
                      <span className="text-danger">
                        {formik.errors.TypeAl}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-md-3 col-form-label" htmlFor="typeEN">
                    Type (EN)
                  </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setModel({
                          ...model,
                          TypeEn: e.target.value,
                        });
                        formik.setFieldValue("TypeEn", e.target.value);
                      }}
                    />
                    {formik.errors.TypeEn && (
                      <span className="text-danger">
                        {formik.errors.TypeEn}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-md-3 col-form-label" htmlFor="typeSR">
                    Type (SR)
                  </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setModel({
                          ...model,
                          TypeSr: e.target.value,
                        });
                        formik.setFieldValue("TypeSr", e.target.value);
                      }}
                    />
                    {formik.errors.TypeSr && (
                      <span className="text-danger">
                        {formik.errors.TypeSr}
                      </span>
                    )}
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
