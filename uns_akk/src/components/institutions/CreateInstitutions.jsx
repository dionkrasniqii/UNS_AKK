import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CreateAgenciesSchema } from "../schemas/CreateAgenciesSchema";
import { object } from "yup";
import { red } from "@mui/material/colors";
import CrudProvider from "../../provider/CrudProvider";
import ProgressBar from "../custom/ProgressBar";
import CustomSelect from "../custom/CustomSelect";

export default function CreateInstitutions() {
  const navigate = useNavigate();
  const [model, setModel] = useState({
    InstitutionName: "",
    UniqueNumber: "",
    City: "",
    Address: "",
    PostalCode: "",
    PhoneNumber: "",
    MunicipalityId: "1",
    Email: "",
    Web: "",
    Document: "",
  });

  async function SubmitForm() {
    await CrudProvider.createItemWithFile(
      "InstitutionAPI/CreateInstitution",
      model
    ).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          navigate("/agencies");
        }
      }
    });
  }
  const formik = useFormik({
    initialValues: {},
    validationSchema: CreateAgenciesSchema,
    onSubmit: () => SubmitForm(),
  });

function changeCity(e){
  setModel({
    ...model,
    City:e
  })
}

const cityList = [{
  value:1,label:"Malisheve"
},{
  value:2,label:"Prishtine"
}]


  return (
    <div className="col-xl-12">
      <div className="card">
        <div className="card-body">
          <h3 className=" mb-3">Regjistro Institucionin</h3>
          <form onSubmit={formik.handleSubmit}>
            <div id="progressbarwizard">
              <div className="tab-content b-0 mb-0 pt-0">
                <ProgressBar model={model} />
                <div className="tab-pane active" id="account-2">
                  <div className="row">
                    <div className="col-12">
                      <div className="row mb-3">
                        <label className="col-md-3 col-form-label">
                          Name of Institution
                        </label>
                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) => {
                              setModel({
                                ...model,
                                InstitutionName: e.target.value,
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
                        <label className="col-md-3 col-form-label">
                          Unique Number
                        </label>
                        <div className="col-md-9">
                          <input
                            type="number"
                            onChange={(e) => {
                              setModel({
                                ...model,
                                UniqueNumber: e.target.value,
                              });
                              formik.setFieldValue(
                                "UniqueNumber",
                                e.target.value
                              );
                            }}
                            className="form-control"
                          />
                          {formik.errors.UniqueNumber && (
                            <span className="text-danger">
                              {" "}
                              {formik.errors.UniqueNumber}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-md-3 col-form-label">City</label>
                        <div className="col-md-9">
                         <CustomSelect onChangeFunction={changeCity} optionsList={cityList} isMulti={false} />
                          {formik.errors.City && (
                            <span className="text-danger">
                              {" "}
                              {formik.errors.City}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-md-3 col-form-label">
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
                              formik.setFieldValue("Address", e.target.value);
                            }}
                            className="form-control"
                          />
                          {formik.errors.Address && (
                            <span className="text-danger">
                              {" "}
                              {formik.errors.Address}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-md-3 col-form-label">
                          Postal Code
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
                              formik.setFieldValue(
                                "PostalCode",
                                e.target.value
                              );
                            }}
                          />
                          {formik.errors.PostalCode && (
                            <span className="text-danger">
                              {" "}
                              {formik.errors.PostalCode}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-md-3 col-form-label">
                          Phone Number
                        </label>
                        <div className="col-md-9">
                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) => {
                              setModel({
                                ...model,
                                PhoneNumber: e.target.value,
                              });
                              formik.setFieldValue(
                                "PhoneNumber",
                                e.target.value
                              );
                            }}
                          />
                          {formik.errors.PhoneNumber && (
                            <span className="text-danger">
                              {" "}
                              {formik.errors.PhoneNumber}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-md-3 col-form-label">Email</label>
                        <div className="col-md-9">
                          <input
                            type="email"
                            onChange={(e) => {
                              setModel({
                                ...model,
                                Email: e.target.value,
                              });
                              formik.setFieldValue("Email", e.target.value);
                            }}
                            className="form-control"
                          />
                          {formik.errors.Email && (
                            <span className="text-danger">
                              {" "}
                              {formik.errors.Email}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-md-3 col-form-label">Web</label>
                        <div className="col-md-9">
                          <input
                            type="text"
                            onChange={(e) => {
                              setModel({
                                ...model,
                                Web: e.target.value,
                              });
                              formik.setFieldValue("Web", e.target.value);
                            }}
                            className="form-control"
                          />
                          {formik.errors.Web && (
                            <span className="text-danger">
                              {" "}
                              {formik.errors.Web}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-md-3 col-form-label">Logo</label>
                        <div className="col-md-9">
                          <input
                            type="file"
                            onChange={(e) => {
                              setModel({
                                ...model,
                                Document: e.target.files[0],
                              });
                              formik.setFieldValue("Documents", e.target.value);
                            }}
                            className="form-control"
                          />
                          {formik.errors.Documents && (
                            <span className="text-danger">
                              {" "}
                              {formik.errors.Documents}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>{" "}
                    {/* end col */}
                  </div>{" "}
                  {/* end row */}
                </div>
                <ul className="list-inline mb-0 wizard">
                  <Link
                    to="/agencies"
                    className="btn btn-danger waves-effect waves-light float-start"
                  >
                    <span className="btn-label">
                      <i className="fe-arrow-left"></i>
                    </span>
                    Anulo
                  </Link>
                  <li className="next list-inline-item float-end">
                    <button
                      type="submit"
                      className="btn btn-success waves-effect waves-light"
                    >
                      <span className="btn-label">
                        <i className="fe-check"></i>
                      </span>
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
