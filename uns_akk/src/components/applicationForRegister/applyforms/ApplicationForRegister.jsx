import { useFormik } from "formik";
import jwtDecode from "jwt-decode";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import * as Yup from "yup";
import FirstApplyFormRegister from "./FirstApplyFormRegister";
import CustomFileInput from "../../custom/CustomFileInput";

export default function ApplicationForRegister() {
  const { IsAccreditatedBefore } = useParams();
  const token = localStorage.getItem("akktoken");
  const decodedToken = token && jwtDecode(token);
  const [model, setModel] = useState({
    Docs: [],
    LevelKKKId: "",
    EQFLevel: "",
    Code: "",
    QualificationName: "",
    QualificationTypeId: "",
    Credits: "",
    QualificationStatusId: "",
    AccreditedProvider: "",
    EntryRequirements: "",
    ExpiryDate: "",
    ExternalQualityAssurance: "",
    FurtherInformationOnQualification: "",
    InstitutionId: decodedToken.groupsid,
    LanguageOfProvision: "",
    LearningOutcomesKnowledge: "",
    LinkToRelevantSupplements: "",
    OfficialLengthOfQualification: "",
    Other: "",
    RecognitionOfPriorLearning: "",
    SectorField: "",
    OccupationalStandartCode: "",
    LangId: "",
    QualificationStandardsId: [],
    QualificationChilds: [],
    IsAccreditatedBefore: IsAccreditatedBefore,
    QualificationStandarts: {},
    Competences: {},
  });

  async function setFiles(files) {
    const newArray = model.Docs.filter(
      (file) => file.Type != "RegisterApplicationDocs"
    );
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "RegisterApplicationDocs",
      Doc: file,
    }));
    setModel({
      ...model,
      Docs: [...newArray, ...updatedDocs],
    });
  }
  //   return <div>{IsAccreditatedBefore}</div>;
  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title text-center text-uppercase">
            Aplikimi për regjister
          </h4>
          {IsAccreditatedBefore == 1 && (
            <div className="row">
              <div className="col-xxl-12 col-lg-12 col-sm-12">
                <div
                  className="alert alert-warning text-dark border-1 shadow"
                  role="alert"
                >
                  Këtu aplikoni vetëm nëse keni akreditim valid të lëshuar nga
                  institucioni përkates
                </div>
              </div>
              <div className="col-xxl-12 col-lg-12 col-sm-12">
                <CustomFileInput
                  acceptType={"pdf"}
                  isMultiple={true}
                  onChangeFunction={setFiles}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <FirstApplyFormRegister
        model={model}
        setModel={setModel}
        IsAccreditatedBefore={IsAccreditatedBefore}
      />
    </div>
  );
}
