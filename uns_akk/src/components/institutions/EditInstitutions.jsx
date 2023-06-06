import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import CrudProvider from "../../provider/CrudProvider";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import CustomSelect from "../custom/CustomSelect";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function EditInstitution() {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [institution, setInstitution] = useState({});
  const [cities, setCities] = useState([]);

  useEffect(() => {
    setLoad(true);
    Promise.all([
      CrudProvider.getItemById("InstitutionAPI/GetInstitution", id).then(
        (res) => {
          if (res) {
            if (res.statusCode === 200) {
              setInstitution(res.result);
            } else {
              toast.error(res.errorMessages[0]);
              navigate("/institutions");
            }
          }
        }
      ),
      CrudProvider.getAllWithLang("GeneralAPI/GetAllMunicipalities").then(
        (res) => {
          if (res) {
            if (res.statusCode === 200) {
              setCities(res.result);
            }
          }
        }
      ),
    ]).then((res) => {
      setLoad(false);
    });
  }, [id]);

  const citiesList =
    cities &&
    cities.length > 0 &&
    cities
      .map((obj) => {
        return {
          value: obj.municipality.municipalityId,
          label: obj.municipalityName,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label));

  const defaultSelectValue =
    cities.length > 0 &&
    cities.find(
      (obj) => obj.municipality.municipalityId === institution.municipalityId
    );
  const defaultLabel = defaultSelectValue?.municipalityName ?? "";
  const defaultValue = defaultSelectValue?.municipality?.municipalityId ?? "";

  const defaultOption = {
    label: defaultLabel,
    value: defaultValue,
  };

  function changeCity(e) {
    setInstitution({
      ...institution,
      municipalityId: e,
    });
    formik.setFieldValue("MunicipalityId", e);
  }
  async function handleSubmit() {
    await CrudProvider.updateItemWithFile(
      "InstitutionAPI/UpdateInstitution",
      institution
    ).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          toast.success(t("DataUpdatedSuccessfully"));
          navigate("/institutions");
        } else {
          toast.error(res.errorMessages[0]);
        }
      }
    });
  }

  const formik = useFormik({
    initialValues: {},
    validateOnBlur: false,
    validateOnMount: false,
    onSubmit: () => handleSubmit(),
  });
  console.log(institution);
  return (
    <div className="col-xl-12">
      <div className="card">
        {!load ? (
          <div className="card-body">
            <h3 className=" mb-3">{t("ModifyInstitution")}</h3>
            <form onSubmit={formik.handleSubmit}>
              <div id="progressbarwizard">
                <div className="tab-content b-0 mb-0 pt-0">
                  <div className="tab-pane active" id="account-2">
                    <div className="row">
                      <div className="col-12">
                        <div className="row mb-3">
                          <div className="col-12 text-center">
                            <img
                              src={CrudProvider.documentPath(institution.path)}
                              alt="image"
                              class="img-fluid rounded"
                              style={{ width: "250px", height: "150px" }}
                            />
                          </div>
                        </div>
                        {console.log(
                          CrudProvider.documentPath(institution.path)
                        )}
                        <div className="row mb-3">
                          <label className="col-md-3 col-form-label">
                          {t("InstitutionName")}
                          </label>
                          <div className="col-md-9">
                            <input
                              type="text"
                              defaultValue={institution.institutionName}
                              className="form-control"
                              onChange={(e) => {
                                setInstitution({
                                  ...institution,
                                  institutionName: e.target.value,
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
                          {t("UniqueNumber")}
                          </label>
                          <div className="col-md-9">
                            <input
                              type="number"
                              defaultValue={institution.uniqueNumber}
                              onChange={(e) => {
                                setInstitution({
                                  ...institution,
                                  uniqueNumber: e.target.value,
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
                          <label className="col-md-3 col-form-label">
                          {t("Municipality")}
                          </label>
                          <div className="col-md-9">
                            <CustomSelect
                              hasDefaultValue={true}
                              defaultValue={defaultOption}
                              onChangeFunction={changeCity}
                              optionsList={citiesList}
                              isMulti={false}
                            />
                            {formik.errors.MunicipalityId && (
                              <span className="text-danger">
                                {" "}
                                {formik.errors.MunicipalityId}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label className="col-md-3 col-form-label">
                          {t("Address")}
                          </label>
                          <div className="col-md-9">
                            <input
                              type="text"
                              defaultValue={institution.address}
                              onChange={(e) => {
                                setInstitution({
                                  ...institution,
                                  address: e.target.value,
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
                          {t("PostalCode")}
                          </label>
                          <div className="col-md-9">
                            <input
                              type="number"
                              defaultValue={institution.postalCode}
                              className="form-control"
                              onChange={(e) => {
                                setInstitution({
                                  ...institution,
                                  postalCode: e.target.value,
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
                          {t("PhoneNumber")}
                          </label>
                          <div className="col-md-9">
                            <input
                              type="text"
                              defaultValue={institution.phoneNum}
                              className="form-control"
                              onChange={(e) => {
                                setInstitution({
                                  ...institution,
                                  phoneNum: e.target.value,
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
                          <label className="col-md-3 col-form-label">
                            Email
                          </label>
                          <div className="col-md-9">
                            <input
                              type="email"
                              defaultValue={institution.email}
                              onChange={(e) => {
                                setInstitution({
                                  ...institution,
                                  email: e.target.value,
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
                        {console.log(institution)}
                        <div className="row mb-3">
                          <label className="col-md-3 col-form-label">{t("Web")}</label>
                          <div className="col-md-9">
                            <input
                              type="text"
                              defaultValue={institution.web}
                              onChange={(e) => {
                                setInstitution({
                                  ...institution,
                                  web: e.target.value,
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
                      </div>{" "}
                      {/* end col */}
                    </div>{" "}
                    {/* end row */}
                  </div>
                  <ul className="list-inline mb-0 wizard">
                    <Link
                      to="/institutions"
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
                </div>{" "}
                {/* tab-content */}
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
