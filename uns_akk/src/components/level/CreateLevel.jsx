import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CrudProvider from "../../provider/CrudProvider";
import { CreateLevelSchema } from "../schemas/CreateLevelSchema";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import ProgressBar from "../progressBar/ProgressBar";

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
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    await CrudProvider.createItem("LevelAPI", JSON.stringify(model)).then(
      (res) => {
        if (res !== undefined) {
          if (res.statusCode === 200) {
            toast.success("Te dhenat u ruajten me sukses");
            navigate("/formular/index");
          } else {
            toast.error("Te dhenat nuk jane ruajtur");
          }
        } else {
          toast.error("Probleme ne server");
        }
      }
    );
  }

  const formik = useFormik({
    initialValues: model,
    validationSchema: CreateLevelSchema,
    onSubmit: handleSubmit,
  });
console.log(model)
  return (
    <div className="col-xl-12">
      <div className="card">
        <div className="card-body">
          <h3 className="mb-3">Create Level</h3>
          <form onSubmit={formik.handleSubmit}>
            <div id="progressbarwizard">
              <div className="tab-content b-0 mb-0 pt-0">
                <ProgressBar model={model} />
                <div className="tab-pane active" id="account-2">
                  <div className="row mb-3">
                    <label className="col-md-3 col-form-label" htmlFor="type">
                      Type
                    </label>
                    <div className="col-md-9">
                      <input
                        name="Type"
                        type="text"
                        onChange={(e) =>
                          setModel({ ...model, Type: e.target.value })
                        }
                        className="form-control"
                        {...formik.getFieldProps("Type")}
                      />
                      {formik.touched.Type && formik.errors.Type && (
                        <span className="text-danger">
                          {formik.errors.Type}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      className="col-md-3 col-form-label"
                      htmlFor="levelRefKEK"
                    >
                      Level Reference KEK
                    </label>
                    <div className="col-md-9">
                      <input
                        name="LevelReferenceKEK"
                        type="text"
                        onChange={(e) =>
                          setModel({
                            ...model,
                            LevelReferenceKEK: e.target.value,
                          })
                        }
                        className="form-control"
                        {...formik.getFieldProps("LevelReferenceKEK")}
                      />
                      {formik.touched.LevelReferenceKEK &&
                        formik.errors.LevelReferenceKEK && (
                          <span className="text-danger">
                            {formik.errors.LevelReferenceKEK}
                          </span>
                        )}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      className="col-md-3 col-form-label"
                      htmlFor="detailedDescription"
                    >
                      Detailed Description
                    </label>
                    <div className="col-md-9">
                      <input
                        name="DetailedDescription"
                        type="text"
                        onChange={(e) =>
                          setModel({
                            ...model,
                            DetailedDescription: e.target.value,
                          })
                        }
                        className="form-control"
                        {...formik.getFieldProps("DetailedDescription")}
                      />
                      {formik.touched.DetailedDescription &&
                        formik.errors.DetailedDescription && (
                          <span className="text-danger">
                            {formik.errors.DetailedDescription}
                          </span>
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
                        name="TheDescriptor"
                        type="text"
                        onChange={(e) =>
                          setModel({ ...model, TheDescriptor: e.target.value })
                        }
                        className="form-control"
                        {...formik.getFieldProps("TheDescriptor")}
                      />
                      {formik.touched.TheDescriptor &&
                        formik.errors.TheDescriptor && (
                          <span className="text-danger">
                            {formik.errors.TheDescriptor}
                          </span>
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
                        name="Knowledge"
                        type="text"
                        onChange={(e) =>
                          setModel({ ...model, Knowledge: e.target.value })
                        }
                        className="form-control"
                        {...formik.getFieldProps("Knowledge")}
                      />
                      {formik.touched.Knowledge && formik.errors.Knowledge && (
                        <span className="text-danger">
                          {formik.errors.Knowledge}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-md-3 col-form-label" htmlFor="skills">
                      Skills
                    </label>
                    <div className="col-md-9">
                      <input
                        name="Skills"
                        type="text"
                        onChange={(e) =>
                          setModel({ ...model, Skills: e.target.value })
                        }
                        className="form-control"
                        {...formik.getFieldProps("Skills")}
                      />
                      {formik.touched.Skills && formik.errors.Skills && (
                        <span className="text-danger">
                          {formik.errors.Skills}
                        </span>
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
                        name="Competencies"
                        type="text"
                        onChange={(e) =>
                          setModel({ ...model, Competencies: e.target.value })
                        }
                        className="form-control"
                        {...formik.getFieldProps("Competencies")}
                      />
                      {formik.touched.Competencies &&
                        formik.errors.Competencies && (
                          <span className="text-danger">
                            {formik.errors.Competencies}
                          </span>
                        )}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      className="col-md-3 col-form-label"
                      htmlFor="levelIndicators"
                    >
                      Level Indicators
                    </label>
                    <div className="col-md-9">
                      <input
                        name="LevelIndicators"
                        type="text"
                        onChange={(e) =>
                          setModel({
                            ...model,
                            LevelIndicators: e.target.value,
                          })
                        }
                        className="form-control"
                        {...formik.getFieldProps("LevelIndicators")}
                      />
                      {formik.touched.LevelIndicators &&
                        formik.errors.LevelIndicators && (
                          <span className="text-danger">
                            {formik.errors.LevelIndicators}
                          </span>
                        )}
                    </div>
                  </div>
                </div>
                <div className="row justify-content-end">
                  <div className="col-md-9">
                    <button
                      className="rbt-btn btn-primary  radius-round btn-sm"
                      type="submit"
                      onClick={handleSubmit} // Make sure to pass the function reference, not calling the function directly
                    >
                      <span className="btn-text">Ruaj</span>
                      <span className="btn-icon"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
