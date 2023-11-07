import React from "react";
import { useTranslation } from "react-i18next";

export default function ViewCompetencesDetails({ model }) {
  const { t } = useTranslation();
  return (
    <form id="form3" className="animation animation-bot-top">
      <div className="card">
        <div className="card-body">
          <h4 className="mb-3 text-uppercase">Te dhenat e kompetences</h4>
          <div className="row">
            <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
              <label>{t("CompetenceName")}</label>
              <textarea
                type="text"
                rows={3}
                className="form-control"
                readOnly
                defaultValue={model.competenceName}
              />
            </div>

            <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
              <label>{t("TypeOfCompetence")}</label>
              <textarea
                type="text"
                rows={3}
                className="form-control"
                readOnly
                defaultValue={model.typeOfCompetence}
              />
            </div>

            <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
              <label>{t("PerformanceIndicators")}</label>
              <textarea
                type="text"
                rows={3}
                className="form-control"
                readOnly
                defaultValue={model.performanceIndicators}
              />
            </div>

            <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
              <label>{t("SuppoirtingKnowledge")}</label>
              <textarea
                type="text"
                rows={3}
                className="form-control"
                readOnly
                defaultValue={model.suppoirtingKnowledge}
              />
            </div>

            <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
              <label>{t("AssessmentMethods")}</label>
              <textarea
                type="text"
                rows={3}
                className="form-control"
                readOnly
                defaultValue={model.assessmentMethods}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
