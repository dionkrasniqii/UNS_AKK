import React from "react";
import { useTranslation } from "react-i18next";
import CustomModal from "../../custom/CustomModal";

export default function ViewQualificationDetails({ model }) {
  const { t } = useTranslation();

  return (
    <form id="form1" className="animation animation-bot-top">
      <div className="card">
        <div className="card-body">
          <h4 className="mb-3 text-uppercase">Te dhenat e kualifikimit</h4>
          <div className="row">
            <div className="col-xxl-1 col-lg-2 col-sm-12 mb-3">
              <div className="form-group">
                <label>{t("Language")}</label>
                <input type="text" readOnly defaultValue={model.langName} />
              </div>
            </div>
            <div className="col-xxl-2 col-lg-2 col-sm-12 mb-3">
              <div className="form-group">
                <label>{t("Code")}</label>
                <input type="text" readOnly defaultValue={model.code} />
              </div>
            </div>
            <div className="col-xxl-1 col-lg-2 col-sm-12 mb-3">
              <div className="form-group">
                <label>{t("Credits")}</label>
                <input type="text" readOnly defaultValue={model.credits} />
              </div>
            </div>
            <div className="col-xxl-2 col-lg-2 col-sm-12 mb-3">
              <div className="form-group">
                <label>{t("ExpiryDate")}:</label>
                <input
                  type="text"
                  readOnly
                  defaultValue={new Date(model.expiryDate).toLocaleDateString(
                    "en-GB"
                  )}
                />
              </div>
            </div>
            <div className="col-xxl-3 col-lg-4 col-sm-12 mb-3">
              <div className="form-group">
                <label>{t("QualificationStatus")}</label>
                <input
                  type="text"
                  readOnly
                  defaultValue={model.qualificationStatusName}
                />
              </div>
            </div>
            <div className="col-xxl-3 col-lg-4 col-sm-12 mb-3">
              <div className="form-group">
                <label>{t("QualificationType")}</label>
                <input
                  type="text"
                  readOnly
                  defaultValue={model.qualificationTypeName}
                />
              </div>
            </div>

            <div className="col-xxl-3 col-lg-4 col-sm-12 mb-3">
              <div className="form-group">
                <label>{t("Level")} KKK</label>
                <input type="text" readOnly defaultValue={model.levelKKKName} />
              </div>
            </div>
            <div className="col-xxl-3 col-lg-4 col-sm-12 mb-3">
              <div className="form-group">
                <label>{t("Level")} KEK</label>
                <input type="text" readOnly defaultValue={model.eqfLevelName} />
              </div>
            </div>
            <div className="col-xxl-12 col-lg-12 col-sm-12 mt-2">
              <div className="form-group">
                <label className="form-label">{t("QualificationName")}</label>
                <textarea
                  rows={5}
                  className="mt-1"
                  readOnly
                  defaultValue={model.qualificationName}
                />
              </div>
            </div>
            <div className="col-xxl-12 col-lg-12 col-sm-12 mt-2">
              <div className="form-group">
                <label className="form-label">{t("AccreditedProvider")}</label>
                <textarea
                  rows={5}
                  className="mt-1"
                  readOnly
                  defaultValue={model.accreditedProvider}
                />
              </div>
            </div>
            <div className="col-xxl-12 col-lg-12 col-sm-12 mt-2">
              <div className="form-group">
                <label className="form-label">{t("EntryRequirements")}</label>
                <textarea
                  rows={5}
                  className="mt-1"
                  readOnly
                  defaultValue={model.entryRequirements}
                />
              </div>
            </div>
            <div className="col-xxl-12 col-lg-12 col-sm-12 mt-2">
              <div className="form-group">
                <label className="form-label">
                  {t("ExternalQualityAssurance")}
                </label>
                <textarea
                  rows={5}
                  className="mt-1"
                  readOnly
                  defaultValue={model.externalQualityAssurance}
                />
              </div>
            </div>
            <div className="col-xxl-12 col-lg-12 col-sm-12 mt-2">
              <div className="form-group">
                <label className="form-label">
                  {t("FurtherInformationOnQualification")}
                </label>
                <textarea
                  rows={5}
                  className="mt-1"
                  readOnly
                  defaultValue={model.furtherInformationOnQualification}
                />
              </div>
            </div>

            <div className="col-xxl-12 col-lg-12 col-sm-12 mt-2">
              <div className="form-group">
                <label className="form-label">{t("LanguageOfProvision")}</label>
                <textarea
                  rows={5}
                  className="mt-1"
                  readOnly
                  defaultValue={model.languageOfProvision}
                />
              </div>
            </div>

            <div className="col-xxl-12 col-lg-12 col-sm-12 mt-2">
              <div className="form-group">
                <label className="form-label">
                  {t("LearningOutcomesKnowledge")}
                </label>
                <textarea
                  rows={5}
                  className="mt-1"
                  readOnly
                  defaultValue={model.learningOutcomesKnowledge}
                />
              </div>
            </div>
            <div className="col-xxl-12 col-lg-12 col-sm-12 mt-2">
              <div className="form-group">
                <label className="form-label">
                  {t("LinkToRelevantSupplements")}
                </label>
                <textarea
                  rows={5}
                  className="mt-1"
                  readOnly
                  defaultValue={model.linkToRelevantSupplements}
                />
              </div>
            </div>

            <div className="col-xxl-12 col-lg-12 col-sm-12 mt-2">
              <div className="form-group">
                <label className="form-label">
                  {t("OfficialLengthOfQualification")}
                </label>
                <textarea
                  rows={5}
                  className="mt-1"
                  readOnly
                  defaultValue={model.officialLengthOfQualification}
                />
              </div>
            </div>
            <div className="col-xxl-12 col-lg-12 col-sm-12 mt-2">
              <div className="form-group">
                <label className="form-label">
                  {t("RecognitionOfPriorLearning")}
                </label>
                <textarea
                  rows={5}
                  className="mt-1"
                  readOnly
                  defaultValue={model.recognitionOfPriorLearning}
                />
              </div>
            </div>
            <div className="col-xxl-12 col-lg-12 col-sm-12 mt-2">
              <div className="form-group">
                <label className="form-label">{t("SectorField")}</label>
                <textarea
                  rows={5}
                  className="mt-1"
                  readOnly
                  defaultValue={model.sectorField}
                />
              </div>
            </div>

            <div className="col-xxl-12 col-lg-12 col-sm-12 mt-2">
              <div className="form-group">
                <label className="form-label">
                  {t("OccupationalStandartCode")}
                </label>
                <textarea
                  rows={5}
                  className="mt-1"
                  readOnly
                  defaultValue={model.occupationalStandartCode}
                />
              </div>
            </div>
            <div className="col-xxl-12 col-lg-12 col-sm-12 mt-2">
              <div className="form-group">
                <label className="form-label">{t("Other")}</label>
                <textarea
                  rows={5}
                  className="mt-1"
                  readOnly
                  defaultValue={model.other}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
