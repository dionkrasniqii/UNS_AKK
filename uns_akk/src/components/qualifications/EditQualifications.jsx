import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CustomSelect from "../custom/CustomSelect";
import { useTranslation } from "react-i18next";
import CrudProvider from "../../provider/CrudProvider";
import { toast } from "react-toastify";
import CustomDatePicker from "../custom/CustomDatePicker";

export default function EditQualifications() {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const langId = localStorage.getItem("i18nextLng");
  const [qualificationTypes, setQualificationTypes] = useState([]);
  const [qualificationStatus, setQualificationStatus] = useState([]);
  const [qualification, setQualification] = useState({
    QualificationId: id,
    LevelKKKId: "",
    Code: "",
    Credits: "",
    QualificationName: "",
    QualificationTypeId: "",
    QualificationStatusId: "",
    AccreditedProvider: "",
    EntryRequirements: "",
    ExpiryDate: "",
    ExternalQualityAssurance: "",
    FurtherInformationOnQualification: "",
    LanguageOfProvision: "",
    LearningOutcomesKnowledge: "",
    LinkToRelevantSupplements: "",
    OfficialLengthOfQualification: "",
    Other: "",
    RecognitionOfPriorLearning: "",
    SectorField: "",
    OccupationalStandartCode: "",
    InsertedQualificationStandardsIds: [],
    DeletedQualificationStandardsIds: [],
  });
  const [levels, setLevels] = useState([]);
  const [subQualification, setSubQualification] = useState([]);
  const [qualificationStandarts, setQualificationStandarts] = useState([]);

  async function GetQualificationStandartsWithLang() {
    await CrudProvider.getAllWithLang("QualificationStandartAPI/GetAll").then(
      (res) => {
        if (res) {
          if (res.statusCode === 200) {
            setQualificationStandarts(res.result);
          }
        }
      }
    );
  }

  async function getAllLevelsWithLang() {
    CrudProvider.getAllWithLang("GeneralAPI/GetAllLevels").then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          setLevels(res.result);
        } else if (res.statusCode === 204) {
          toast.error(t("NoDataInThisLanguageForLevel"));
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

  async function GetQualificationStatusWithLang() {
    await CrudProvider.getAllWithLang(
      "QualificationAPI/GetQualificationStatus"
    ).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          setQualificationStatus(res.result);
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
            const qualificationStandartIds =
              obj[0].qualification?.qualificationStandartRelate.map(
                (item) => item.qualificationStandart.qualificationStandartId
              );
            setQualification({
              ...qualification,
              LevelKKKId: obj[0].qualification.levelKKK.levelKKKId,
              Code: obj[0].qualification.code,
              Credits: obj[0].qualification.credits,
              QualificationName: obj[0].qualificationName,
              QualificationTypeId:
                obj[0].qualification.qualificationType?.qualificationTypeId,
              QualificationStatusId:
                obj[0].qualification.qualificationStatus?.qualificationStatusId,
              AccreditedProvider: obj[0].accreditedProvider,
              EntryRequirements: obj[0].entryRequirements,
              ExpiryDate: obj[0].expiryDate,
              ExternalQualityAssurance: obj[0].externalQualityAssurance,
              FurtherInformationOnQualification:
                obj[0].furtherInformationOnQualification,
              LanguageOfProvision: obj[0].languageOfProvision,
              LearningOutcomesKnowledge: obj[0].learningOutcomesKnowledge,
              LinkToRelevantSupplements: obj[0].linkToRelevantSupplements,
              OfficialLengthOfQualification:
                obj[0].officialLengthOfQualification,
              Other: obj[0].other,
              RecognitionOfPriorLearning: obj[0].recognitionOfPriorLearning,
              SectorField: obj[0].sectorField,
              OccupationalStandartCode:
                obj[0].qualification.occupationalStandartCode,
              InsertedQualificationStandardsIds: qualificationStandartIds,
              DeletedQualificationStandardsIds: [],
            });
          } else {
            toast.error(res.errorMessages[0]);
            navigate("/qualifications");
          }
        }
      }),
      getAllLevelsWithLang(),
      GetQualificationStandartsWithLang(),
      getAllSubQualificationsWithLang(),
      GetQualificationTypesWithLang(),
      GetQualificationStatusWithLang(),
    ]).then((res) => {
      setLoad(false);
    });
  }, [id]);

  useEffect(() => {
    Promise.all([
      getAllLevelsWithLang(),
      GetQualificationTypesWithLang(),
      getAllSubQualificationsWithLang(),
      GetQualificationStandartsWithLang(),
      GetQualificationStatusWithLang(),
    ]);
  }, [langId]);

  const qualificationStandartList =
    qualificationStandarts &&
    qualificationStandarts.length > 0 &&
    qualificationStandarts.map((obj) => {
      return {
        value: obj.qualificationStandartId,
        label: obj.qualificationStandartName,
      };
    });

  const defaultSelectValues = qualificationStandarts.filter((obj) =>
    qualification?.InsertedQualificationStandardsIds.includes(
      obj.qualificationStandartId
    )
  );

  const defaultOption = defaultSelectValues.map((obj) => ({
    label: obj.qualificationStandartName,
    value: obj.qualificationStandartId,
  }));

  function changeQualificationStandarts(e) {
    const newInsertedIds = [
      ...new Set(
        e.filter(
          (id) => !qualification.DeletedQualificationStandardsIds.includes(id)
        )
      ),
    ];
    const removedIds = [
      ...new Set(
        qualification.InsertedQualificationStandardsIds.filter(
          (id) => !e.includes(id)
        )
      ),
    ];

    setQualification({
      ...qualification,
      InsertedQualificationStandardsIds: newInsertedIds,
      DeletedQualificationStandardsIds: [
        ...new Set([
          ...qualification.DeletedQualificationStandardsIds,
          ...removedIds,
        ]),
      ],
    });
  }

  const qualificationTypeList =
    qualificationTypes &&
    qualificationTypes.length > 0 &&
    qualificationTypes.map((obj) => {
      return {
        value: obj.qualificationType?.qualificationTypeId,
        label: obj.qualificationTypeName,
      };
    });

  const qualificationStatusList =
    qualificationStatus &&
    qualificationStatus.length > 0 &&
    qualificationStatus.map((obj) => {
      return {
        value: obj.qualificationStatus?.qualificationStatusId,
        label: obj.description,
      };
    });

  const levelList =
    levels &&
    levels.length > 0 &&
    levels.map((obj) => {
      return {
        value: obj.levelKKK?.levelKKKId,
        label: obj.levelKKKDescription,
      };
    });

  function changeLevel(e) {
    setQualification({
      ...qualification,
      LevelKKKId: e,
    });
  }

  const dateString3 = qualification.ExpiryDate;
  const date3 = new Date(dateString3);
  const year3 = date3.getFullYear();
  const month3 = String(date3.getMonth() + 1).padStart(2, "0");
  const day3 = String(date3.getDate()).padStart(2, "0");
  const expiryDate = `${year3}-${month3}-${day3}`;

  const defaultSelectValue =
    levels.length > 0 &&
    levels.find((obj) => obj.levelKKK.levelKKKId === qualification?.LevelKKKId);
  const defaultLevelValue = defaultSelectValue && {
    label: defaultSelectValue.levelKKKDescription,
    value: defaultSelectValue.levelKKK.levelKKKId,
  };

  const defaultSelectValueType =
    qualificationTypes.length > 0 &&
    qualificationTypes.find(
      (obj) =>
        obj.qualificationType.qualificationTypeId ===
        qualification.QualificationTypeId
    );

  const defaultLabelType = defaultSelectValueType?.qualificationTypeName ?? "";
  const defaultValueType =
    defaultSelectValueType?.qualificationType?.qualificationTypeId ?? "";

  const defaultOptionType = {
    label: defaultLabelType,
    value: defaultValueType,
  };

  const defaultSelectValueStatus =
    qualificationStatus.length > 0 &&
    qualificationStatus.find(
      (obj) =>
        obj.qualificationStatus.qualificationStatusId ===
        qualification.QualificationStatusId
    );

  const defaultLabelStatus = defaultSelectValueStatus?.description ?? "";
  const defaultValueStatus =
    defaultSelectValueStatus?.qualificationStatus?.qualificationStatusId ?? "";

  const defaultOptionStatus = {
    label: defaultLabelStatus,
    value: defaultValueStatus,
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

  function changeStatus(e) {
    setQualification({
      ...qualification,
      QualificationStatusId: e,
    });
  }

  function formatedDate(date) {
    const [day, month, year] = date.split("/");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
  function changeExpiryDate(date, dateString) {
    setQualification({
      ...qualification,
      ExpiryDate: formatedDate(dateString),
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
    <div className="card">
      {!load ? (
        <div className="card-body">
          <h3 className="mb-3">{t("ModifyQualification")}</h3>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-xxl-2 col-lg-2 col-sm-12 mb-3">
                <label>{t("Code")}</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={qualification.Code}
                  onChange={(e) => {
                    setQualification({
                      ...qualification,
                      Code: e.target.value,
                    });
                  }}
                />
              </div>

              <div className="col-xxl-3 col-lg-3 col-sm-12 mb-3">
                <label>{t("QualificationType")}</label>
                <CustomSelect
                  hasDefaultValue={true}
                  defaultValue={defaultOptionType}
                  onChangeFunction={changeType}
                  optionsList={qualificationTypeList}
                  isMulti={false}
                />
              </div>

              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("QualificationStandarts")}</label>
                <CustomSelect
                  onChangeFunction={changeQualificationStandarts}
                  optionsList={qualificationStandartList}
                  isMulti={true}
                  hasDefaultValue={true}
                  defaultValue={defaultOption}
                />
              </div>

              <div className="col-xxl-3 col-lg-3 col-sm-12 mb-3">
                <label>{t("Level")}</label>
                <CustomSelect
                  hasDefaultValue={true}
                  defaultValue={defaultLevelValue}
                  onChangeFunction={changeLevel}
                  optionsList={levelList}
                  isMulti={false}
                />
              </div>

              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("QualificationName")}</label>
                <textarea
                  type="text"
                  rows={3}
                  defaultValue={qualification.QualificationName}
                  className="form-control"
                  onChange={(e) => {
                    setQualification({
                      ...qualification,
                      QualificationName: e.target.value,
                    });
                  }}
                />
              </div>

              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("AccreditedProvider")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  defaultValue={qualification.AccreditedProvider}
                  onChange={(e) => {
                    setQualification({
                      ...qualification,
                      AccreditedProvider: e.target.value,
                    });
                  }}
                />
              </div>

              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("EntryRequirements")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  defaultValue={qualification.EntryRequirements}
                  onChange={(e) => {
                    setQualification({
                      ...qualification,
                      EntryRequirements: e.target.value,
                    });
                  }}
                />
              </div>

              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("ExternalQualityAssurance")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  defaultValue={qualification.ExternalQualityAssurance}
                  onChange={(e) => {
                    setQualification({
                      ...qualification,
                      ExternalQualityAssurance: e.target.value,
                    });
                  }}
                />
              </div>

              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("FurtherInformationOnQualification")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  defaultValue={qualification.FurtherInformationOnQualification}
                  onChange={(e) => {
                    setQualification({
                      ...qualification,
                      FurtherInformationOnQualification: e.target.value,
                    });
                  }}
                />
              </div>

              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("LanguageOfProvision")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  defaultValue={qualification.LanguageOfProvision}
                  onChange={(e) => {
                    setQualification({
                      ...qualification,
                      LanguageOfProvision: e.target.value,
                    });
                  }}
                />
              </div>

              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("LearningOutcomesKnowledge")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  defaultValue={qualification.LearningOutcomesKnowledge}
                  onChange={(e) => {
                    setQualification({
                      ...qualification,
                      LearningOutcomesKnowledge: e.target.value,
                    });
                  }}
                />
              </div>

              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("LinkToRelevantSupplements")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  defaultValue={qualification.LinkToRelevantSupplements}
                  onChange={(e) => {
                    setQualification({
                      ...qualification,
                      LinkToRelevantSupplements: e.target.value,
                    });
                  }}
                />
              </div>

              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("OfficialLengthOfQualification")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  defaultValue={qualification.OfficialLengthOfQualification}
                  onChange={(e) => {
                    setQualification({
                      ...qualification,
                      OfficialLengthOfQualification: e.target.value,
                    });
                  }}
                />
              </div>

              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("Other")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  defaultValue={qualification.Other}
                  onChange={(e) => {
                    setQualification({
                      ...qualification,
                      Other: e.target.value,
                    });
                  }}
                />
              </div>

              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("RecognitionOfPriorLearning")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  defaultValue={qualification.RecognitionOfPriorLearning}
                  onChange={(e) => {
                    setQualification({
                      ...qualification,
                      RecognitionOfPriorLearning: e.target.value,
                    });
                  }}
                />
              </div>

              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("SectorField")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  defaultValue={qualification.SectorField}
                  onChange={(e) => {
                    setQualification({
                      ...qualification,
                      SectorField: e.target.value,
                    });
                  }}
                />
              </div>

              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("OccupationalStandartCode")}</label>
                <textarea
                  type="text"
                  rows={3}
                  className="form-control"
                  defaultValue={qualification.OccupationalStandartCode}
                  onChange={(e) => {
                    setQualification({
                      ...qualification,
                      OccupationalStandartCode: e.target.value,
                    });
                  }}
                />
              </div>

              <div className="col-xxl-2 col-lg-2 col-sm-12 mb-3">
                <label>{t("ExpiryDate")}:</label>
                <input
                  type="date"
                  autoComplete="off"
                  id="basic-datepicker"
                  className="form-control flatpickr-input active"
                  value={expiryDate}
                  onChange={(e) => {
                    setQualification({
                      ...qualification,
                      ExpiryDate: e.target.value,
                    });
                  }}
                />
              </div>

              <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                <label>{t("QualificationStatus")}</label>
                <CustomSelect
                  hasDefaultValue={true}
                  defaultValue={defaultOptionStatus}
                  onChangeFunction={changeStatus}
                  optionsList={qualificationStatusList}
                  isMulti={false}
                />
              </div>

              <div className="col-xxl-2 col-lg-2 col-sm-12 mb-3">
                <label>{t("Credits")}</label>
                <input
                  type="number"
                  className="form-control"
                  defaultValue={qualification.Credits}
                  onChange={(e) => {
                    setQualification({
                      ...qualification,
                      Credits: e.target.value,
                    });
                  }}
                />
              </div>
            </div>

            <ul className="list-inline mt-2 mb-0 wizard">
              <Link
                to="/qualifications"
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
  );
}
