import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import CrudProvider from "../../provider/CrudProvider";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import CustomSelect from "../custom/CustomSelect";

export default function EditCompetences() {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const langId = localStorage.getItem("i18nextLng");
  const [qualificationStandarts, setQualificationStandarts] = useState([]);
  const [competence, setCompetence] = useState({
    CompetencesId: id,
    EstQFLevel: "",
    CompetenceName: "",
    TypeOfCompetence: "",
    PerformanceIndicators: "",
    SuppoirtingKnowledge: "",
    AssessmentMethods: "",
    InsertedCompetenceStandartIds: [],
    DeletedCompetenceStandartIds: [],
  });

  async function GetQualificationsStandartsWithLang() {
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

  useEffect(() => {
    setLoad(true);
    Promise.all([
      CrudProvider.getItemByIdLang(
        "CompetencesAPI/GetCompetencesById",
        id
      ).then((res) => {
        if (res) {
          if (res.statusCode === 200) {
            const obj = res.result;
            const competenceStandartIds = obj[0].competenceStandartList.map(
              (item) => item.qualificationStandartId
            );
            setCompetence({
              ...competence,
              CompetencesId: obj[0].competencesId,
              EstQFLevel: obj[0].estQFLevel,
              CompetenceName: obj[0].competenceName,
              TypeOfCompetence: obj[0].typeOfCompetence,
              PerformanceIndicators: obj[0].performanceIndicators,
              SuppoirtingKnowledge: obj[0].suppoirtingKnowledge,
              AssessmentMethods: obj[0].assessmentMethods,
              InsertedCompetenceStandartIds: competenceStandartIds,
              DeletedCompetenceStandartIds: [],
            });
          } else {
            toast.error(res.errorMessages[0]);
            navigate("/competences");
          }
        }
      }),
      GetQualificationsStandartsWithLang(),
    ]).then((res) => {
      setLoad(false);
    });
  }, [id]);

  useEffect(() => {
    Promise.all([GetQualificationsStandartsWithLang()]);
  }, [langId]);

  const qualificationStandartList =
    qualificationStandarts &&
    qualificationStandarts.length > 0 &&
    qualificationStandarts.map((obj) => {
      return {
        value: obj.qualificationStandart.qualificationStandartId,
        label: obj.name,
      };
    });

  const defaultSelectValues = qualificationStandarts.filter((obj) =>
    competence.InsertedCompetenceStandartIds.includes(
      obj.qualificationStandart.qualificationStandartId
    )
  );

  const defaultOption = defaultSelectValues.map((obj) => ({
    label: obj.name,
    value: obj.qualificationStandart.qualificationStandartId,
  }));

  function changeQualificationStandarts(e) {
    const newInsertedIds = [
      ...new Set(
        e.filter((id) => !competence.DeletedCompetenceStandartIds.includes(id))
      ),
    ];
    const removedIds = [
      ...new Set(
        competence.InsertedCompetenceStandartIds.filter((id) => !e.includes(id))
      ),
    ];

    setCompetence({
      ...competence,
      InsertedCompetenceStandartIds: newInsertedIds,
      DeletedCompetenceStandartIds: [
        ...new Set([...competence.DeletedCompetenceStandartIds, ...removedIds]),
      ],
    });
  }

  console.log(competence);

  async function handleSubmit() {
    try {
      setLoad(true);
      await CrudProvider.updateItem(
        "CompetencesAPI/UpdateCompetence",
        competence
      ).then((res) => {
        if (res) {
          if (res.statusCode === 200) {
            toast.success(t("DataUpdatedSuccessfully"));
            navigate("/competences");
          } else {
            toast.error(res.errorMessages[0]);
          }
        }
      });
    } finally {
      setLoad(false);
    }
  }

  const formik = useFormik({
    initialValues: {},
    validateOnBlur: false,
    validateOnMount: false,
    onSubmit: async () => handleSubmit(),
  });

  return (
    <div className="col-xl-12">
      <div className="card">
        {!load ? (
          <div className="card-body">
            <h3 className="mb-3">{t("ModifyCompetence")}</h3>
            <form onSubmit={formik.handleSubmit}>
              <div className="row">
                <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
                  <label>{t("QualificationStandarts")}</label>
                  <CustomSelect
                    onChangeFunction={changeQualificationStandarts}
                    isMulti={true}
                    hasDefaultValue={true}
                    defaultValue={defaultOption}
                    optionsList={qualificationStandartList}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-xxl-6 col-lg-6 col-sm-12 mb-3">
                  <label>{t("CompetenceName")}</label>
                  <textarea
                    type="text"
                    className="form-control"
                    defaultValue={competence.CompetenceName}
                    rows={3}
                    onChange={(e) => {
                      setCompetence({
                        ...competence,
                        CompetenceName: e.target.value,
                      });
                      formik.setFieldValue("CompetenceName", e.target.value);
                    }}
                  />
                  {formik.errors.CompetenceName && (
                    <span className="text-danger">
                      {formik.errors.CompetenceName}
                    </span>
                  )}
                </div>

                <div className="col-xxl-6 col-lg-6 col-sm-12 mb-3">
                  <label>{t("EstQFLevel")}</label>
                  <textarea
                    type="text"
                    rows={3}
                    className="form-control"
                    defaultValue={competence.EstQFLevel}
                    onChange={(e) => {
                      setCompetence({
                        ...competence,
                        EstQFLevel: e.target.value,
                      });
                      formik.setFieldValue("EstQFLevel", e.target.value);
                    }}
                  />
                  {formik.errors.EstQFLevel && (
                    <span className="text-danger">
                      {formik.errors.EstQFLevel}
                    </span>
                  )}
                </div>

                <div className="col-xxl-6 col-lg-6 col-sm-12 mb-3">
                  <label>{t("TypeOfCompetence")}</label>
                  <textarea
                    type="text"
                    className="form-control"
                    defaultValue={competence.TypeOfCompetence}
                    rows={3}
                    onChange={(e) => {
                      setCompetence({
                        ...competence,
                        TypeOfCompetence: e.target.value,
                      });
                      formik.setFieldValue("TypeOfCompetence", e.target.value);
                    }}
                  />
                  {formik.errors.TypeOfCompetence && (
                    <span className="text-danger">
                      {formik.errors.TypeOfCompetence}
                    </span>
                  )}
                </div>

                <div className="col-xxl-6 col-lg-6 col-sm-12 mb-3">
                  <label>{t("PerformanceIndicators")}</label>
                  <textarea
                    type="text"
                    className="form-control"
                    defaultValue={competence.PerformanceIndicators}
                    rows={3}
                    onChange={(e) => {
                      setCompetence({
                        ...competence,
                        PerformanceIndicators: e.target.value,
                      });
                      formik.setFieldValue(
                        "PerformanceIndicators",
                        e.target.value
                      );
                    }}
                  />
                  {formik.errors.PerformanceIndicators && (
                    <span className="text-danger">
                      {formik.errors.PerformanceIndicators}
                    </span>
                  )}
                </div>

                <div className="col-xxl-6 col-lg-6 col-sm-12 mb-3">
                  <label>{t("SuppoirtingKnowledge")}</label>
                  <textarea
                    type="text"
                    rows={3}
                    className="form-control"
                    defaultValue={competence.SuppoirtingKnowledge}
                    onChange={(e) => {
                      setCompetence({
                        ...competence,
                        SuppoirtingKnowledge: e.target.value,
                      });
                      formik.setFieldValue(
                        "SuppoirtingKnowledge",
                        e.target.value
                      );
                    }}
                  />
                  {formik.errors.SuppoirtingKnowledge && (
                    <span className="text-danger">
                      {formik.errors.SuppoirtingKnowledge}
                    </span>
                  )}
                </div>

                <div className="col-xxl-6 col-lg-6 col-sm-12 mb-3">
                  <label>{t("AssessmentMethods")}</label>
                  <textarea
                    type="text"
                    rows={3}
                    className="form-control"
                    defaultValue={competence.AssessmentMethods}
                    onChange={(e) => {
                      setCompetence({
                        ...competence,
                        AssessmentMethods: e.target.value,
                      });
                      formik.setFieldValue("AssessmentMethods", e.target.value);
                    }}
                  />
                  {formik.errors.AssessmentMethods && (
                    <span className="text-danger">
                      {formik.errors.AssessmentMethods}
                    </span>
                  )}
                </div>
              </div>

              <ul className="list-inline mt-3 wizard">
                <Link
                  to="/competences"
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
    </div>
  );
}
