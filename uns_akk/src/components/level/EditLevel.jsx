/* eslint-disable react/jsx-no-undef */
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CrudProvider from "../../provider/CrudProvider";
import { CreateLevelSchema } from "../schemas/CreateLevelSchema";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import ProgressBar from "../custom/ProgressBar";
import { useTranslation } from "react-i18next";

import CustomSelect from "../custom/CustomSelect";

export default function Editlevel() {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [level, setLevel] = useState({});
  const [lang, setLang] = useState([]);
const[model,setModel]=useState({
    LevelKKKLanguageId:"",
    LevelReferenceKEK:"",
    LevelDescription:"",
    Competencies:"",
    DetailedDescription:"",
    Knowledge:"",
    LevelIndicator:"",
    Skills:"",
    TheDescriptor:"",
    Type:"",
})



  useEffect(() => {
    setLoad(true);
    CrudProvider.getItemByIdLang("LevelAPI/GetLevelById", id).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
            const obj =res.result;
            console.log(obj)
          setModel({
            LevelKKKLanguageId:obj.levelKKKLanguageId,
            LevelReferenceKEK:obj.levelKKK.levelReferenceKEK,
            LevelDescription:obj.levelKKKDescription,
            Competencies:obj.competencies,
            DetailedDescription:obj.detailedDescription,
            Knowledge:obj.knowledge,
            LevelIndicator: obj.levelIndicators,
            Skills:obj.skills,
            TheDescriptor:obj.theDescriptor,
            Type:obj.type
          })

        }
        setLoad(false);
      }
    });
  }, []);



  async function handleSubmit() {
    await CrudProvider.updateItem("LevelAPI/UpdateLeveli", model).then(
      (res) => {
        if (res && res.statusCode === 200) {
          toast.success(t("DataUpdatedSuccessfully"));
          navigate("/level");
        } else {
          toast.error(res.errorMessages[0]);
        }
      }
    );
  }


  const formik = useFormik({
    initialValues: {},
    validateOnBlur: false,
    validateOnMount: false,
    onSubmit: handleSubmit,
  });

console.log(level);
  return (
    <>
    {!load &&
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
                        <h5 className="card-title">
                          {t("Level Reference KEK")}
                        </h5>
                        <input
                          name="LevelReferenceKEK"
                          type="number"
                          value={model.LevelReferenceKEK}
                          className="form-control"
                          placeholder={t("Enter Level Reference KEK")}
                          onChange={(e) => {
                            setModel({
                              ...model,
                              LevelReferenceKEK: e.target.value,
                            });
                        
                          }}
                        />
                      </div>
                      <div className="col-md-8">
                        <h5 className="card-title">
                          {t("Type")}
                        </h5>
                        <textarea
                          name="Type"
                          value={model.Type}
                          className="form-control"
                          placeholder={t("Enter Type")}
                          onChange={(e) => {
                            setModel({
                              ...model,
                              Type: e.target.value,
                            });
                          }}
                          rows="1"
                        />
                       
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group mt-2">
                      <h5 className="card-title">
                          {t("Level Description")}
                        </h5>

                        <textarea
                          name="LevelDescription"
                          value={model.LevelDescription}
                          className="form-control"
                          placeholder={t("Enter Level Description")}
                          onChange={(e) => {
                            setModel({
                              ...model,
                              LevelDescription : e.target.value,
                            });
                          }}
                          rows="5"
                        ></textarea>
                       
                      </div>
                    </div>
                    <div className="col-md-6 mt-2">
                      <div className="form-group">
                      <h5 className="card-title">
                          {t("Competencies")}
                        </h5>

                        <textarea
                          name="Competencies"
                          value={model.Competencies}
                          className="form-control"
                          placeholder={t("Enter Competencies")}
                          onChange={(e) => {
                            setModel({
                              ...model,
                              Competencies : e.target.value,
                            });
                          
                          }}
                          rows="5"
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="form-group mt-2">
                  <h5 className="card-title">
                      {t("Detailed Description")}
                    </h5>

                    <textarea
                      name="DetailedDescription"
                      value={model.DetailedDescription}
                      className="form-control"
                      placeholder={t("Enter Detailed Description")}
                      onChange={(e) => {
                        setModel({
                              ...model,
                              DetailedDescription : e.target.value,
                            });
                        formik.setFieldValue(
                          "DetailedDescription",
                          e.target.value
                        );
                      }}
                      rows="6"
                    ></textarea>
                  </div>

                  <div className="form-group mt-2">
                    <div className="row">
                      <div className="col-md-6">
                      <h5 className="card-title">
                          {t("Descriptor")}
                        </h5>

                        <textarea
                          name="TheDescriptor"
                          value={model.TheDescriptor}
                          className="form-control"
                          placeholder={t("Enter The Descriptor")}
                          onChange={(e) => {
                           setModel({
                              ...model,
                              TheDescriptor : e.target.value,
                            });
                            formik.setFieldValue("TheDescriptor", e.target.value);
                          }}
                          rows="6"
                        ></textarea>
                      </div>

                      <div className="col-md-6">
                      <h5 className="card-title">
                          {t("Level Indicator")}
                        </h5>

                        <textarea
                          name="LevelIndicator"
                          value={model.LevelIndicator}
                          className="form-control"
                          placeholder={t("Enter Level Indicator")}
                          onChange={(e) => {
                            setModel({
                              ...model,
                              LevelIndicator : e.target.value,
                            });
                            formik.setFieldValue(
                              "LevelIndicator",
                              e.target.value
                            );
                          }}
                          rows="6"
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="form-group mt-2">
                  <h5 className="card-title">
                      {t("Knowledge")}
                    </h5>

                    <textarea
                      name="Knowledge"
                      value={model.Knowledge}
                      className="form-control"
                      placeholder={t("Enter Knowledge")}
                      onChange={(e) => {
                        setModel({
                              ...model,
                              Knowledge : e.target.value,
                            });
                        formik.setFieldValue("Knowledge", e.target.value);
                      }}
                      rows="6"
                    ></textarea>
                  </div>

                  <div className="form-group mt-2">
                  <h5 className="card-title">
                      {t("Skills")}
                    </h5>

                    <textarea
                      name="Skills"
                      value={model.Skills}
                      className="form-control"
                      placeholder={t("Enter Skills")}
                      onChange={(e) => {
                        setModel({
                              ...model,
                              Skills : e.target.value,
                            });
                        formik.setFieldValue("Skills", e.target.value);
                      }}
                      rows="6"
                    ></textarea>
                  </div>

                  <ul className="list-inline mb-0 wizard mt-3 mb-2">
                    <Link
                      to="/level"
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
                        {t("Edit")}
                      </button>
                    </li>
                  </ul>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
    </>
  );
}
