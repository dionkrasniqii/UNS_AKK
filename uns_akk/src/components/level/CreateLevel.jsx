import { useFormik } from "formik";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CreateLevelSchema } from "../schemas/CreateLevelSchema";

export default function CreateLevel() {
  const [model, setModel] = useState({
    Type: "",
    LevelReferenceKEK: "",
    DetailedDescription: "",
    TheDescriptor: "",
    Knowledge: "",
    Skills: "",
    Competencies: "",
    LevelIndicators: "",
  });
  const [progessBarWidth, setProgressBarWidth] = useState(0);
  async function SubmitForm() {}

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
              <div className="progress mb-3" style={{ height: 7 }}>
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated bg-success"
                  style={{ width: progessBarWidth }}
                />
              </div>
              <div className="tab-pane active" id="account-2">
                <div className="row mb-3">
                  <label className="col-md-3 col-form-label" htmlFor="type">
                    Type
                  </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      id="type"
                      className="form-control"
                      onChange={(e) => {
                        setModel({
                          ...model,
                          Type: e.target.value,
                        });
                        formik.setFieldValue("Name", e.target.value);
                      }}
                    />
                    {formik.errors.Type && (
                      <span className="text-danger"> {formik.errors.Type}</span>
                    )}
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    className="col-md-3 col-form-label"
                    htmlFor="reference"
                  >
                    Level Reference KEK
                  </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      id="reference"
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
                      <span className="text-danger"> {formik.errors.LevelReferenceKEK}</span>
                    )}
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    className="col-md-3 col-form-label"
                    htmlFor="description"
                  >
                    Detailed Description
                  </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      id="description"
                      className="form-control"
                      onChange={(e) => {
                        setModel({
                          ...model,
                          DetailedDescription: e.target.value,
                        });
                        formik.setFieldValue("DetailedDescription", e.target.value);
                      }}
                    />
                    {formik.errors.DetailedDescription && (
                      <span className="text-danger"> {formik.errors.DetailedDescription}</span>
                    )}
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    className="col-md-3 col-form-label"
                    htmlFor="descriptor"
                  >
                    The Descriptor
                  </label>
                  <div className="col-md-9">
                    <input
                      type="email"
                      id="descriptor"
                      className="form-control"
                      onChange={(e) => {
                        setModel({
                          ...model,
                          TheDescriptor: e.target.value,
                        });
                        formik.setFieldValue("TheDescriptor", e.target.value);
                      }}
                    />
                    {formik.errors.TheDescriptor && (
                      <span className="text-danger"> {formik.errors.TheDescriptor}</span>
                    )}
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    className="col-md-3 col-form-label"
                    htmlFor="knowledge"
                  >
                    Knowledge
                  </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      id="knowledge"
                      className="form-control"
                      onChange={(e) => {
                        setModel({
                          ...model,
                          Knowledge: e.target.value,
                        });
                        formik.setFieldValue("Name", e.target.Knowledge);
                      }}
                    />
                    {formik.errors.Knowledge && (
                      <span className="text-danger"> {formik.errors.Knowledge}</span>
                    )}
                  </div>
                </div>

                <div className="row mb-3">
                  <label className="col-md-3 col-form-label" htmlFor="skills">
                    Skills
                  </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      id="skills"
                      className="form-control"
                      onChange={(e) => {
                        setModel({
                          ...model,
                          Skills: e.target.value,
                        });
                        formik.setFieldValue("Skills", e.target.value);
                      }}
                    />
                    {formik.errors.Skills && (
                      <span className="text-danger"> {formik.errors.Skills}</span>
                    )}
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    className="col-md-3 col-form-label"
                    htmlFor="competencies"
                  >
                    Competencies
                  </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      id="competencies"
                      className="form-control"
                      onChange={(e) => {
                        setModel({
                          ...model,
                          Competencies: e.target.value,
                        });
                        formik.setFieldValue("Competencies", e.target.value);
                      }}
                    />
                    {formik.errors.Competencies && (
                      <span className="text-danger"> {formik.errors.Competencies}</span>
                    )}
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    className="col-md-3 col-form-label"
                    htmlFor="indicators"
                  >
                    Level Indicators
                  </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      id="indicators"
                      className="form-control"
                      onChange={(e) => {
                        setModel({
                          ...model,
                          LevelIndicators: e.target.value,
                        });
                        formik.setFieldValue("LevelIndicators", e.target.value);
                      }}
                    />
                    {formik.errors.Type && (
                      <span className="text-danger"> {formik.errors.LevelIndicators}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Link to="/agencies" className="btn btn-danger float-start">
                <i className="fe-arrow-left me-2"></i>
                Cancel
              </Link>
              <button type="submit" className="btn btn-success float-end">
                <i className="fe-check me-2"></i>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
