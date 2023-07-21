import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import CrudProvider from "../../provider/CrudProvider";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function EditQualificationType() {
  const [load, setLoad] = useState(false);
  const [model, setModel] = useState({});
  const [newData, setNewData] = useState({
    QualificationTypeId: "",
    QualificationTypeNameAL: "",
    QualificationTypeNameEN: "",
    QualificationTypeNameSR: "",
  });
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    CrudProvider.getItemById("QualificationTypeAPI/GetById", id).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          const arr = res.result;
          setModel(arr);
          setNewData({
            ...newData,
            QualificationTypeId: arr[0].qualificationTypeId,
            QualificationTypeNameAL:
              arr.find((type) => type.languageId === "1")
                ?.qualificationTypeName || "",
            QualificationTypeNameEN:
              arr.find((type) => type.languageId === "2")
                ?.qualificationTypeName || "",
            QualificationTypeNameSR:
              arr.find((type) => type.languageId === "3")
                ?.qualificationTypeName || "",
          });
        }
      }
    });
  }, [id]);
  async function SubmitForm(e) {
    e.preventDefault();
    await CrudProvider.updateItem(
      "QualificationTypeAPI/UpdateQualificationType",
      newData
    ).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          toast.success(t("DataUpdatedSuccessfully"));
          navigate("/qualifications-type");
        } else {
          toast.error(res.errorMessages[0]);
        }
      }
    });
  }
  return (
    <form onSubmit={SubmitForm}>
      <div className='card'>
        <div className='card-body'>
          <h3 className='card-title'>{t("EditQualificationType")}</h3>
          <hr />
          {Object.keys(model).length > 0 ? (
            <div className='row'>
              {model
                .sort((a, b) => a.languageId - b.languageId)
                .map((obj, index) => {
                  return (
                    <div
                      className='col-xxl-2 col-lg-4 col-sm-12 mb-3'
                      key={index}
                    >
                      <label>
                        {t("QualificationType")} (
                        {obj.languageId === "1"
                          ? "AL"
                          : obj.languageId === "2"
                          ? "EN"
                          : "SR"}
                        ):
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        defaultValue={
                          obj.languageId === "1"
                            ? newData.QualificationTypeNameAL
                            : obj.languageId === "2"
                            ? newData.QualificationTypeNameEN
                            : newData.QualificationTypeNameSR
                        }
                        onChange={(e) => {
                          const targetValue = e.target.value;
                          setNewData((prevData) => {
                            return {
                              ...prevData,
                              [obj.languageId === "1"
                                ? "QualificationTypeNameAL"
                                : obj.languageId === "2"
                                ? "QualificationTypeNameEN"
                                : "QualificationTypeNameSR"]: targetValue,
                            };
                          });
                        }}
                      />
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className='col-xxl-12 col-lg-12 col-sm-12 text-center'>
              <div
                className='spinner-border text-primary m-2 text-center'
                role='status'
              />
            </div>
          )}

          <ul className='list-inline mb-0 wizard'>
            <Link
              to='/qualifications-type'
              className='btn btn-danger waves-effect waves-light float-start'
            >
              <span className='btn-label'>
                <i className='fe-arrow-left'></i>
              </span>
              {t("Discard")}
            </Link>
            <li className='next list-inline-item float-end'>
              {!load ? (
                <button
                  type='submit'
                  className='btn btn-success waves-effect waves-light'
                >
                  <span className='btn-label'>
                    <i className='fe-check'></i>
                  </span>
                  {t("Save")}
                </button>
              ) : (
                <div
                  className='spinner-border text-primary m-2 text-center'
                  role='status'
                />
              )}
            </li>
          </ul>
        </div>
      </div>
    </form>
  );
}
