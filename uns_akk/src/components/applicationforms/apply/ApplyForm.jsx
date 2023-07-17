import jwtDecode from "jwt-decode";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import FirstForm from "./FirstForm";
import ProgressBar from "../../custom/ProgressBar";
import SecondForm from "./SecondForm";
import ThirdForm from "./ThirdForm";
import FourthForm from "./FourthForm";
import FifthForm from "./FifthForm";
import CrudProvider from "../../../provider/CrudProvider";
import { toast } from "react-toastify";

export default function ApplyForm({ authState }) {
  const { t } = useTranslation();
  const token = localStorage.getItem("akktoken");
  const decodedToken = token && jwtDecode(token);
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [showSecondForm, setShowSecondForm] = useState(false);
  const [showThirdForm, setShowThirdForm] = useState(false);
  const [showFourthForm, setShowFourthForm] = useState(false);
  const [showFifthForm, setShowFifthForm] = useState(false);
  const [model, setModel] = useState({
    InstitutionId: authState ? decodedToken.groupsid : null,
    InstitutionName: "",
    UniqueNumber: "",
    MunicipalityName: "",
    MunicipalityId: "",
    Address: "",
    PhoneNum: "",
    PostalCode: "",
    Email: "",
    Web: "",
    InstitutionLogo: "",
    QualificationId: "",
    InstitutionActivityId: "",
    QualificationPeriodA17: "",
    MASHTLicenseA16: "",
    OfferNoValidationCertificationA18: false,
    ValidationCertificationNotOfferA18: false,
    OfferValidationCertificationA18: false,
    EquipmentMaterialsQualificationA22: "",
    TextA18: "",
    TargetNumberOfCandidatesA24: "",
    NumOfGroupsA24: "",
    CertificateRegisterDocA15: "",
    RegisterNrA15: "",
    FiscalNrA15: "",
    InstitutionStatusId: "",
    Docs: [],
    IsLoggedIn: authState,
  });
  async function SubmitApplication() {
    try {
      setLoad(true);
      await CrudProvider.createItemWithFile(
        "ApplicationAPI/ApplicationPost",
        model
      ).then((res) => {
        if (res) {
          switch (res.statusCode) {
            case 200:
              toast.success("Aplikimi u regjistrua me sukses");
              return navigate("/");
            default:
              toast.error(res.errorMessages[0]);
              break;
          }
        }
      });
    } finally {
      setLoad(false);
    }
  }
  return (
    <div className='container mt-5'>
      <div className='card'>
        <div className='card-body'>
          <h4 className='card-title text-center'>
            {t("FirstApplicationName")}
          </h4>
          <hr />
          <FirstForm
            authState={authState}
            model={model}
            setModel={setModel}
            setShowSecondForm={setShowSecondForm}
            showSecondForm={showSecondForm}
          />
          {!showSecondForm && (
            <SecondForm
              model={model}
              setModel={setModel}
              setShowThirdForm={setShowThirdForm}
              showThirdForm={showThirdForm}
            />
          )}
          {!showThirdForm && (
            <ThirdForm
              model={model}
              setModel={setModel}
              setShowFourthForm={setShowFourthForm}
              showFourthForm={showFourthForm}
            />
          )}
          {!showFourthForm && (
            <FourthForm
              model={model}
              setModel={setModel}
              showFifthForm={showFifthForm}
              setShowFifthForm={setShowFifthForm}
            />
          )}
          {!showFifthForm && (
            <FifthForm
              model={model}
              setModel={setModel}
              submit={SubmitApplication}
              load={load}
            />
          )}
        </div>
      </div>
    </div>
  );
}
