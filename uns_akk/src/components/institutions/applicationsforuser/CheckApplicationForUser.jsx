import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CrudProvider from "../../../provider/CrudProvider";
import { Checkbox, Modal } from "antd";

export default function CheckApplicationForUser() {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [load, setLoad] = useState(true);
  const [institution, setInstitution] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [model, setModel] = useState({
    InstitutionId: id,
    Status: false,
  });

  useEffect(() => {
    CrudProvider.getItemById(
      "InstitutionAPI/GetSelfRegistredInsitutionsById",
      id
    ).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          setInstitution(res.result);
          setLoad(false);
        } else {
          toast.error(res.errorMessages[0]);
          navigate("/institution-application");
        }
      }
    });
  }, [id]);
  async function handleSubmit() {
    try {
      setLoad(true);
      await CrudProvider.createItem(
        "InstitutionAPI/ChangeInstitutionActive",
        model
      ).then((res) => {
        if (res) {
          if (res.statusCode === 200) {
            toast.success(t("DataUpdatedSuccessfully"));
            navigate("/institution-application");
          } else {
            toast.error(res.errorMessages[0]);
          }
        }
      });
    } finally {
      setLoad(false);
    }
  }
  console.log(institution);
  return (
    <div className="col-xl-12">
      <div className="card">
        {!load ? (
          <div className="card-body">
            <h3 className=" mb-3">{t("InstitutionsDetails")}</h3>
            <form>
              <div className="tab-pane active" id="account-2">
                <div className="row">
                  <div className="col-12">
                    <div className="row mb-3">
                      <div className="col-12 text-center">
                        <img
                          src={CrudProvider.documentPath(institution.path)}
                          alt="image"
                          className="img-fluid rounded"
                          style={{ width: "250px", height: "150px" }}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-md-3 col-form-label">
                        {t("InstitutionName")}
                      </label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          defaultValue={institution.institutionName}
                          className="form-control"
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-md-3 col-form-label">
                        {t("InstitutionStatus")}
                      </label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          defaultValue={
                            institution.institutionStatusDescription
                          }
                          className="form-control"
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-md-3 col-form-label">
                        {t("InstitutionActivity")}
                      </label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          defaultValue={institution.institutionActivities.map(
                            (obj) => obj.label
                          )}
                          className="form-control"
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-md-3 col-form-label">
                        {t("UniqueNumber")}
                      </label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          defaultValue={institution.uniqueNumber}
                          readOnly
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-md-3 col-form-label">
                        {t("Municipality")}
                      </label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          defaultValue={institution.municipalityName}
                          readOnly
                          className="form-control"
                        />
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
                          readOnly
                          className="form-control"
                        />
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
                          readOnly
                        />
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
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-md-3 col-form-label">Email</label>
                      <div className="col-md-9">
                        <input
                          type="email"
                          defaultValue={institution.email}
                          readOnly
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-md-3 col-form-label">
                        {t("Web")}
                      </label>
                      <div className="col-md-9">
                        <input
                          type="text"
                          defaultValue={institution.web}
                          readOnly
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-md-3 col-form-label">
                        {t("BusinessDocuments")}
                      </label>
                      <div className="col-md-5">
                        <button
                          type="button"
                          className=" fs-6  btn2 btn-modal btn-raporti"
                          onClick={() => setIsOpen(true)}
                        >
                          {t("BusinessDocuments")}
                        </button>
                        <Modal
                          title={t("BusinessDocuments")}
                          centered
                          className="responsive-modal"
                          open={isOpen}
                          okButtonProps={{ style: { display: "none" } }}
                          onCancel={() => setIsOpen(false)}
                        >
                          {institution.institutionDocuments.map((document) => {
                            return CrudProvider.checkIsPDf(document.docPath) ==
                              true ? (
                              <iframe
                                key={document.docPath}
                                id={document.docPath}
                                src={CrudProvider.documentPath(
                                  document.docPath
                                )}
                                loading="lazy"
                              />
                            ) : (
                              <img
                                key={document.docPath}
                                src={CrudProvider.documentPath(
                                  document.docPath
                                )}
                                width="800px"
                                height="800px"
                                loading="lazy"
                              />
                            );
                          })}
                        </Modal>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <ul className="list-inline mb-0 wizard">
                <Link
                  to="/institution-application"
                  className="btn btn-danger waves-effect waves-light float-start"
                >
                  <span className="btn-label">
                    <i className="fe-arrow-left"></i>
                  </span>
                  {t("Back")}
                </Link>
                <li className="next list-inline-item float-end">
                  {!load ? (
                    <>
                      <Checkbox
                        value={false}
                        checked={!model.Status}
                        onChange={() =>
                          setModel((prev) => ({
                            ...prev,
                            Status: false,
                          }))
                        }
                      >
                        Refuzo
                      </Checkbox>
                      <Checkbox
                        value={true}
                        checked={model.Status}
                        onChange={() =>
                          setModel((prev) => ({
                            ...prev,
                            Status: true,
                          }))
                        }
                      >
                        Aprovo
                      </Checkbox>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="btn btn-success waves-effect waves-light"
                      >
                        <span className="btn-label">
                          <i className="fe-check"></i>
                        </span>
                        {t("Save")}
                      </button>
                    </>
                  ) : (
                    <div className="col-xxl-12 col-lg-12 col-sm-12 text-center">
                      <div
                        className="spinner-border text-primary m-2 text-center"
                        role="status"
                      />
                    </div>
                  )}
                </li>
              </ul>
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
