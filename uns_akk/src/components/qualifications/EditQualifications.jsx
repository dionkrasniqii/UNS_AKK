import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CustomSelect from "../custom/CustomSelect";
import { useTranslation } from "react-i18next";
import CrudProvider from "../../provider/CrudProvider";
import { toast } from "react-toastify";

export default function EditQualifications() {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const langId = localStorage.getItem("i18nextLng");
  const [qualificationTypes, setQualificationTypes] = useState([]);
  const [qualification, setQualification] = useState({
    QualificationId: id,
    LevelKKKId: "",
    CodeAL: "",
    CodeEN: "",
    CodeSR: "",
    QualificationNameAL: "",
    QualificationNameEN: "",
    QualificationNameSR: "",
    QualificationTypeId: "",
  });
  const [levels, setLevels] = useState([]);
  const [subQualification, setSubQualification] = useState([]);

  async function getAllLevelsWithLang() {
    CrudProvider.getAllWithLang("GeneralAPI/GetAllLevels").then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          setLevels(res.result);
        }
      }
    });
  }
  async function GetQualificationTypesWithLang() {
    await CrudProvider.getAllWithLang("QualificationTypeAPI/GetAll").then(
      (res) => {
        if (res) {
          if (res.statusCode === 200) {
            setQualificationTypes(res.result);
          }
        }
      }
    );
  }

  async function getAllSubQualificationsWithLang() {
    CrudProvider.getItemByIdLang(
      "GeneralAPI/GetAllSubQualificationsByQualificationId",
      id
    ).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          setSubQualification(res.result);
        }
      }
    });
  }

  useEffect(() => {
    setLoad(true);
    Promise.all([
      CrudProvider.getItemById("QualificationAPI/GetById", id).then((res) => {
        if (res) {
          if (res.statusCode === 200) {
            const obj = res.result;
            setQualification({
              ...qualification,
              LevelKKKId: obj[0].qualification.levelKKK.levelKKKId,
              CodeAL: obj[1].code,
              CodeEN: obj[2].code,
              CodeSR: obj[0].code,
              QualificationNameAL: obj[1].qualificationName,
              QualificationNameEN: obj[2].qualificationName,
              QualificationNameSR: obj[0].qualificationName,
              QualificationTypeId:
                obj[0].qualification?.qualificationType?.qualificationTypeId,
            });
          } else {
            toast.error(res.errorMessages[0]);
            navigate("/qualifications");
          }
        }
      }),
      getAllLevelsWithLang(),
      getAllSubQualificationsWithLang(),
      GetQualificationTypesWithLang(),
    ]).then((res) => {
      setLoad(false);
    });
  }, [id]);

  useEffect(() => {
    getAllLevelsWithLang();
    GetQualificationTypesWithLang();
    getAllSubQualificationsWithLang();
  }, [langId]);

  const qualificationTypeList =
    qualificationTypes &&
    qualificationTypes.length > 0 &&
    qualificationTypes.map((obj) => {
      return {
        value: obj.qualificationType?.qualificationTypeId,
        label: obj.qualificationTypeName,
      };
    });
  const levelList =
    levels &&
    levels.length > 0 &&
    levels.map((obj) => {
      return {
        value: obj.levelKKK.levelKKKId,
        label: obj.levelKKKDescription,
      };
    });

  function changeLevel(e) {
    setQualification({
      ...qualification,
      LevelKKKId: e,
    });
  }

  const defaultSelectValue =
    levels.length > 0 &&
    levels.find((obj) => obj.levelKKK.levelKKKId === qualification.LevelKKKId);

  const defaultLabel = defaultSelectValue?.levelKKKDescription ?? "";
  const defaultValue = defaultSelectValue?.levelKKK?.levelKKKId ?? "";

  const defaultOption = {
    label: defaultLabel,
    value: defaultValue,
  };

  const subQualificationList =
    subQualification &&
    subQualification.length > 0 &&
    subQualification.map((obj) => {
      return {
        key: obj.qualificationChild.qualificationChildId,
        value: obj.description,
      };
    });

  let textareaValue = "";
  if (Array.isArray(subQualificationList) && subQualificationList.length > 0) {
    textareaValue = subQualificationList
      .map((option) => option.value)
      .join(",");
  }
  function changeType(e) {
    setQualification({
      ...qualification,
      QualificationTypeId: e,
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    await CrudProvider.updateItem(
      "QualificationAPI/UpdateQualification",
      qualification
    ).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          toast.success(t("DataUpdatedSuccessfully"));
          navigate("/qualifications");
        } else {
          toast.error(res.errorMessages[0]);
        }
      }
    });
  }

  return (
    <div className='card'>
      {!load ? (
        <div className='card-body'>
          <h3 className='mb-3'>{t("ModifyQualification")}</h3>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className='row'>
              <div className='col-md-4'>
                <label className='col-form-label'>{t("Code")} (AL)</label>
                <input
                  type='text'
                  defaultValue={qualification.CodeAL}
                  className='form-control'
                  onChange={(e) => {
                    setQualification({
                      ...qualification,
                      codeAL: e.target.value,
                    });
                  }}
                />
              </div>
              <div className='col-md-4'>
                <label className='col-md-5 col-form-label'>
                  {t("Code")} (EN)
                </label>
                <input
                  type='text'
                  defaultValue={qualification.CodeEN}
                  className='form-control'
                  onChange={(e) => {
                    setQualification({
                      ...qualification,
                      CodeEN: e.target.value,
                    });
                  }}
                />
              </div>

              <div className='col-md-4'>
                <label className='col-md-5 col-form-label'>
                  {t("Code")} (SR)
                </label>
                <input
                  type='text'
                  defaultValue={qualification.CodeSR}
                  className='form-control'
                  onChange={(e) => {
                    setQualification({
                      ...qualification,
                      CodeSR: e.target.value,
                    });
                  }}
                />
              </div>
              <div className='col-md-12'>
                <label className='col-md-2 col-form-label'>
                  {t("QualificationName")} (AL)
                </label>
                <textarea
                  type='text'
                  rows={6}
                  defaultValue={qualification.QualificationNameAL}
                  className='form-control'
                  onChange={(e) => {
                    setQualification({
                      ...qualification,
                      QualificationNameAL: e.target.value,
                    });
                  }}
                />
              </div>

              <div className='col-md-12'>
                <label className='col-md-2 col-form-label'>
                  {t("QualificationName")} (EN)
                </label>
                <textarea
                  type='text'
                  rows={6}
                  defaultValue={qualification.QualificationNameEN}
                  className='form-control'
                  onChange={(e) => {
                    setQualification({
                      ...qualification,
                      QualificationNameEN: e.target.value,
                    });
                  }}
                />
              </div>

              <div className='col-md-12'>
                <label className='col-md-2 col-form-label'>
                  {t("QualificationName")} (SR)
                </label>
                <textarea
                  type='text'
                  rows={6}
                  defaultValue={qualification.QualificationNameSR}
                  className='form-control'
                  onChange={(e) => {
                    setQualification({
                      ...qualification,
                      QualificationNameSR: e.target.value,
                    });
                  }}
                />
              </div>
              <div className='col-md-12'>
                <label className='col-form-label'>
                  {t("SubQualifications")}
                </label>
                <textarea
                  type='text'
                  rows={3}
                  readOnly
                  value={textareaValue}
                  className='form-control'
                />
              </div>
              <div className='col-md-4'>
                <label className='col-md-5 col-form-label'>{t("Level")}</label>
                <CustomSelect
                  hasDefaultValue={true}
                  onChangeFunction={changeLevel}
                  optionsList={levelList}
                  defaultValue={defaultOption}
                  isMulti={false}
                />
              </div>
              <div className='col-md-4'>
                <label className='col-md-5 col-form-label'>
                  {t("QualificationType")}
                </label>
                <CustomSelect
                  hasDefaultValue={true}
                  onChangeFunction={changeType}
                  optionsList={qualificationTypeList}
                  defaultValue={
                    qualificationTypeList &&
                    qualificationTypeList.find(
                      (obj) => obj.value === qualification.QualificationTypeId
                    )
                  }
                  isMulti={false}
                />
              </div>
            </div>

            <ul className='list-inline mt-2 mb-0 wizard'>
              <Link
                to='/qualifications'
                className='btn btn-danger waves-effect waves-light float-start'
              >
                <span className='btn-label'>
                  <i className='fe-arrow-left'></i>
                </span>
                {t("Discard")}
              </Link>
              <li className='next list-inline-item float-end'>
                <button
                  type='submit'
                  className='btn btn-success waves-effect waves-light'
                >
                  <span className='btn-label'>
                    <i className='fe-check'></i>
                  </span>
                  {t("Edit")}
                </button>
              </li>
            </ul>
          </form>
        </div>
      ) : (
        <div className='col-xxl-12 col-lg-12 col-sm-12 text-center'>
          <div
            className='spinner-border text-primary m-2 text-center'
            role='status'
          />
        </div>
      )}
    </div>
  );
}
