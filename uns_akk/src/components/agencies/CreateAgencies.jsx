import { useFormik } from "formik";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CreateAgenciesSchema } from "../schemas/CreateAgenciesSchema";

export default function CreateAgencies() {
  const [model, setModel] = useState({
    Name: "",
    City: "",
    PostalCode: "",
    Email: "",
    Web: "",
    Address: "",
  });
  const [progessBarWidth, setProgressBarWidth] = useState(0);

  async function SubmitForm() {}

  const formik = useFormik({
    initialValues: {},
    validationSchema: CreateAgenciesSchema,
    onSubmit: () => SubmitForm(),
  });

  return (
    <div className="col-xl-12">
      <div className="card">
        <div className="card-body">
          <h3 className=" mb-3">Krijo Agjencion</h3>
          <form onSubmit={formik.handleSubmit}>
            <div id="progressbarwizard">
              <div className="tab-content b-0 mb-0 pt-0">
                <div id="bar" className="progress mb-3" style={{ height: 7 }}>
                  <div
                    className="bar progress-bar progress-bar-striped progress-bar-animated bg-success"
                    style={{ width: progessBarWidth }}
                  />
                </div>
                <div className="tab-pane active" id="account-2">
                  <div className="row">
                    <div className="col-12">
                      <div className="row mb-3">
                        <label
                          className="col-md-3 col-form-label"
                          htmlFor="userName1"
                        >
                          Name of institution
                        </label>
                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) => {
                              setModel({
                                ...model,
                                Name: e.target.value,
                              });
                              formik.setFieldValue("Name", e.target.value);
                            }}
                          />
                          {formik.errors.Name && (
                            <span className="text-danger">
                              {" "}
                              {formik.errors.Name}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label
                          className="col-md-3 col-form-label"
                          htmlFor="password1"
                        >
                          City
                        </label>
                        <div className="col-md-9">
                          <input
                            type="text"
                            onChange={(e) => {
                              setModel({
                                ...model,
                                City: e.target.value,
                              });
                            }}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label
                          className="col-md-3 col-form-label"
                          htmlFor="confirm1"
                        >
                          PostalCode
                        </label>
                        <div className="col-md-9">
                          <input
                            type="number"
                            className="form-control"
                            onChange={(e) => {
                              setModel({
                                ...model,
                                PostalCode: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label
                          className="col-md-3 col-form-label"
                          htmlFor="password1"
                        >
                          Email
                        </label>
                        <div className="col-md-9">
                          <input
                            type="email"
                            onChange={(e) => {
                              setModel({
                                ...model,
                                Email: e.target.value,
                              });
                            }}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label
                          className="col-md-3 col-form-label"
                          htmlFor="password1"
                        >
                          Web
                        </label>
                        <div className="col-md-9">
                          <input
                            type="text"
                            onChange={(e) => {
                              setModel({
                                ...model,
                                Web: e.target.value,
                              });
                            }}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label
                          className="col-md-3 col-form-label"
                          htmlFor="password1"
                        >
                          Address
                        </label>
                        <div className="col-md-9">
                          <input
                            type="text"
                            onChange={(e) => {
                              setModel({
                                ...model,
                                Address: e.target.value,
                              });
                            }}
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>{" "}
                    {/* end col */}
                  </div>{" "}
                  {/* end row */}
                </div>
                <ul className="list-inline mb-0 wizard">
                  <Link
                    to='/agencies'
                    class="btn btn-danger waves-effect waves-light float-start"
                  >
                    <span class="btn-label">
                      <i class="fe-arrow-left"></i>
                    </span>
                    Anulo
                  </Link>
                  <li className="next list-inline-item float-end">
                    <button type="submit" className="btn btn-success waves-effect waves-light">
                    <span class="btn-label"><i class="fe-check"></i></span>
                    Ruaj
                    </button>
                  </li>
                </ul>
              </div>{" "}
              {/* tab-content */}
            </div>{" "}
            {/* end #progressbarwizard*/}
          </form>
        </div>{" "}
        {/* end card-body */}
      </div>{" "}
      {/* end card*/}
    </div>
  );
}
