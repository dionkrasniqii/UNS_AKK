import React from "react";
import ViewQualificationDetails from "./ViewQualificationDetails";
import { useTranslation } from "react-i18next";

export default function ViewQualificationStandartsDetails({ model }) {
  const { t } = useTranslation();
  return (
    <form id="form2" className="animation animation-bot-top">
      <div className="card">
        <div className="card-body">
          <h4 className="mb-3 text-uppercase">
            Te dhenat e standardit te kualifikimit
          </h4>
          <div className="row">
            <div className="col-xxl-2 col-lg-2 col-sm-12 mb-3">
              <label>{t("ValidFrom")}:</label>
              <input
                type="text"
                className="form-control"
                readOnly
                defaultValue={new Date(
                  model.validFrom.split("T")[0]
                ).toLocaleDateString("en-GB")}
              />
            </div>
            <div className="col-xxl-2 col-lg-2 col-sm-12 mb-3">
              <label>{t("ValidTo")}:</label>
              <input
                type="text"
                className="form-control"
                readOnly
                defaultValue={new Date(
                  model.validTo.split("T")[0]
                ).toLocaleDateString("en-GB")}
              />
            </div>
            <div className="col-xxl-3 col-lg-5 col-sm-12 mb-3">
              <label className="text-nowrap">
                {t("DateOfDecisionOfOccupationalQualificationCouncil")}:
              </label>
              <input
                type="text"
                readOnly
                className="form-control"
                defaultValue={new Date(
                  model.dateOfDecisionOfOccupationalQualificationCouncil.split(
                    "T"
                  )[0]
                ).toLocaleDateString("en-GB")}
              />
            </div>
            <div className="col-xxl-6 col-lg-6 col-sm-12 mb-3">
              <label>{t("Field")}</label>
              <input
                type="text"
                className="form-control"
                readOnly
                defaultValue={model.field}
              />
            </div>
            <div className="col-xxl-6 col-lg-6 col-sm-12 mb-3">
              <label>{t("SubField")}</label>
              <input
                type="text"
                className="form-control"
                readOnly
                defaultValue={model.subField}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
              <label>{t("QualificationStandartName")}</label>
              <textarea
                type="text"
                rows={3}
                className="form-control"
                readOnly
                defaultValue={model.qualificationStandartName}
              />
            </div>

            <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
              <label>{t("ReferenceToEuropanQualificationFramework")}</label>
              <textarea
                type="text"
                rows={3}
                className="form-control"
                readOnly
                defaultValue={model.referenceToEuropanQualificationFramework}
              />
            </div>

            <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
              <label>{t("OccupationalQualificationStandartVersion")}</label>
              <textarea
                type="text"
                rows={3}
                className="form-control"
                readOnly
                defaultValue={model.occupationalQualificationStandartVersion}
              />
            </div>

            <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
              <label>{t("Specialisation")}</label>
              <textarea
                type="text"
                rows={3}
                className="form-control"
                readOnly
                defaultValue={model.specialisation}
              />
            </div>

            <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
              <label>{t("PartialOccupationalQualifications")}</label>
              <textarea
                type="text"
                rows={3}
                className="form-control"
                readOnly
                defaultValue={model.partialOccupationalQualifications}
              />
            </div>

            <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
              <label>{t("DescriptionOfWork")}</label>
              <textarea
                type="text"
                rows={3}
                className="form-control"
                readOnly
                defaultValue={model.descriptionOfWork}
              />
            </div>

            <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
              <label>{t("WorkUnits")}</label>
              <textarea
                type="text"
                rows={3}
                className="form-control"
                readOnly
                defaultValue={model.workUnits}
              />
            </div>

            <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
              <label>{t("WorkEnvironmentAndSpecificNatureOfWork")}</label>
              <textarea
                type="text"
                rows={3}
                className="form-control"
                readOnly
                defaultValue={model.workEnvironmentAndSpecificNatureOfWork}
              />
            </div>

            <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
              <label>{t("Tools")}</label>
              <textarea
                type="text"
                rows={3}
                className="form-control"
                readOnly
                defaultValue={model.tools}
              />
            </div>

            <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
              <label>{t("PersonalQualities")}</label>
              <textarea
                type="text"
                rows={3}
                className="form-control"
                readOnly
                defaultValue={model.personalQualities}
              />
            </div>

            <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
              <label>{t("ProfessionalPreparation")}</label>
              <textarea
                type="text"
                rows={3}
                className="form-control"
                readOnly
                defaultValue={model.professionalPreparation}
              />
            </div>

            <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
              <label>{t("MostCommonOccupationalTitles")}</label>
              <textarea
                type="text"
                rows={3}
                className="form-control"
                readOnly
                defaultValue={model.mostCommonOccupationalTitles}
              />
            </div>
            <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
              <label>{t("RegulationsGoverningProfession")}</label>
              <textarea
                type="text"
                rows={3}
                className="form-control"
                readOnly
                defaultValue={model.regulationsGoverningProfession}
              />
            </div>
            <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
              <label>{t("CompetencyRequirements")}</label>
              <textarea
                type="text"
                rows={3}
                className="form-control"
                readOnly
                defaultValue={model.competencyRequirements}
              />
            </div>
            <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
              <label>{t("DesignationInRegister")}</label>
              <textarea
                type="text"
                rows={3}
                className="form-control"
                readOnly
                defaultValue={model.designationInRegister}
              />
            </div>
            {/* <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
              <label>{t("FieldOfOccupational")}</label>
              <textarea
                type="text"
                rows={3}
                className="form-control"
                readOnly
                defaultValue={model.fieldOfOccupational}
              />
            </div> */}
            <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
              <label>{t("OccupationalQualificationCouncil")}</label>
              <textarea
                type="text"
                rows={3}
                className="form-control"
                readOnly
                defaultValue={model.occupationalQualificationCouncil}
              />
            </div>
            <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
              <label>
                {t("NoOfdecisionOfOccupationalQualificationCouncil")}
              </label>
              <textarea
                type="text"
                rows={3}
                className="form-control"
                readOnly
                defaultValue={
                  model.noOfdecisionOfOccupationalQualificationCouncil
                }
              />
            </div>

            {/* <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
              <label>{t("Occupation")}</label>
              <textarea
                type="text"
                rows={3}
                className="form-control"
                readOnly
                defaultValue={model.occupation}
              />
            </div> */}
            <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
              <label>{t("ISCO")}</label>
              <textarea
                type="text"
                rows={3}
                className="form-control"
                readOnly
                defaultValue={model.isco}
              />
            </div>
            <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
              <label>{t("ISCED")}</label>
              <textarea
                type="text"
                rows={3}
                className="form-control"
                readOnly
                defaultValue={model.isced}
              />
            </div>

            <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
              <label>{t("NACE")}</label>
              <textarea
                type="text"
                rows={3}
                className="form-control"
                readOnly
                defaultValue={model.nace}
              />
            </div>
            <div className="col-xxl-4 col-lg-4 col-sm-12 mb-3">
              <label>{t("Status")}</label>
              <textarea
                type="text"
                rows={3}
                className="form-control"
                readOnly
                defaultValue={model.status}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
