import { Modal } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CustomModal from "../../../../custom/CustomModal";

export default function EditFirstApplicationFormB({
  setData,
  data,
  handleRemoveDocument,
}) {
  const { t } = useTranslation();

  async function changeManagementOfQualityDocs(files) {
    const newArray = data.docs.filter(
      (file) => file.Type != "ManagementOfQualityDocs"
    );
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "ManagementOfQualityDocs",
      Doc: file,
    }));
    setData({
      ...data,
      applicationDTO: {
        ...data.applicationDTO,
        Docs: [...newArray, ...updatedDocs],
      },
    });
  }
  async function changeDataOfAssuranceDocs(files) {
    const newArray = data.applicationDTO.Docs.filter(
      (file) => file.Type != "DataOfAssurance"
    );
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "DataOfAssurance",
      Doc: file,
    }));
    setData({
      ...data,
      applicationDTO: {
        ...data.applicationDTO,
        Docs: [...newArray, ...updatedDocs],
      },
    });
  }
  async function changeManagementQualityCertificationDocs(files) {
    const newArray = data.applicationDTO.Docs.filter(
      (file) => file.Type != "ManagementQualityCertification"
    );
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "ManagementQualityCertification",
      Doc: file,
    }));
    setData({
      ...data,
      applicationDTO: {
        ...data.applicationDTO,
        Docs: [...newArray, ...updatedDocs],
      },
    });
  }
  async function changePoliticsAndProcedures(files) {
    const newArray = data.applicationDTO.Docs.filter(
      (file) => file.Type != "PoliticsAndProcedures"
    );
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "PoliticsAndProcedures",
      Doc: file,
    }));
    setData({
      ...data,
      applicationDTO: {
        ...data.applicationDTO,
        Docs: [...newArray, ...updatedDocs],
      },
    });
  }
  async function changeHandicapDocs(files) {
    const newArray = data.applicationDTO.Docs.filter(
      (file) => file.Type != "HandicapDocs"
    );
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "HandicapDocs",
      Doc: file,
    }));
    setData({
      ...data,
      applicationDTO: {
        ...data.applicationDTO,
        Docs: [...newArray, ...updatedDocs],
      },
    });
  }
  async function changePoliProcsDocs(files) {
    const newArray = data.applicationDTO.Docs.filter(
      (file) => file.Type != "PoliticsProceduresDocs"
    );
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "PoliticsProceduresDocs",
      Doc: file,
    }));
    setData({
      ...data,
      applicationDTO: {
        ...data.applicationDTO,
        Docs: [...newArray, ...updatedDocs],
      },
    });
  }
  async function changeSystemCreditsDocs(files) {
    const newArray = data.applicationDTO.Docs.filter(
      (file) => file.Type != "SystemCreditsDocs"
    );
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "SystemCreditsDocs",
      Doc: file,
    }));
    setData({
      ...data,
      applicationDTO: {
        ...data.applicationDTO,
        Docs: [...newArray, ...updatedDocs],
      },
    });
  }
  async function changeEnviromentDocs(files) {
    const newArray = data.applicationDTO.Docs.filter(
      (file) => file.Type != "EnviromentDocs"
    );
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "EnviromentDocs",
      Doc: file,
    }));
    setData({
      ...data,
      applicationDTO: {
        ...data.applicationDTO,
        Docs: [...newArray, ...updatedDocs],
      },
    });
  }
  async function changeCertificateDoc(files) {
    const newArray = data.applicationDTO.Docs.filter(
      (file) => file.Type != "CertificateDoc"
    );
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "CertificateDoc",
      Doc: file,
    }));
    setData({
      ...data,
      applicationDTO: {
        ...data.applicationDTO,
        Docs: [...newArray, ...updatedDocs],
      },
    });
  }
  async function changeFormatOfModuleDoc(files) {
    const newArray = data.applicationDTO.Docs.filter(
      (file) => file.Type != "FormatOfModuleDoc"
    );
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "FormatOfModuleDoc",
      Doc: file,
    }));
    setData({
      ...data,
      applicationDTO: {
        ...data.applicationDTO,
        Docs: [...newArray, ...updatedDocs],
      },
    });
  }
  async function changeReportRVVDoc(files) {
    const newArray = data.applicationDTO.Docs.filter(
      (file) => file.Type != "ReportRVVDoc"
    );
    const updatedDocs = Array.from(files).map((file) => ({
      Type: "ReportRVVDoc",
      Doc: file,
    }));
    setData({
      ...data,
      applicationDTO: {
        ...data.applicationDTO,
        Docs: [...newArray, ...updatedDocs],
      },
    });
  }
  return (
    <div className='row '>
      <h4 className='card-title'>{t("PartB")}</h4>
      <hr />
      <CustomModal showUpload={true} 
        docs={data.docs}
        placeHolder={` B.1.2 ${t("ManagementOfQuality")}`}
        typeToFilter={"ManagementOfQualityDocs"}
        removeDoc={handleRemoveDocument}
        onChangeFunction={changeManagementOfQualityDocs}
      />
      <CustomModal showUpload={true} 
        docs={data.docs}
        placeHolder={` B.1.2 ${t("DataOfAssurance")}`}
        typeToFilter={"DataOfAssurance"}
        removeDoc={handleRemoveDocument}
        onChangeFunction={changeDataOfAssuranceDocs}
      />
      <CustomModal showUpload={true} 
        docs={data.docs}
        placeHolder={` B.1.3 ${t("ManagementQualityCertification")}`}
        typeToFilter={"ManagementQualityCertification"}
        removeDoc={handleRemoveDocument}
        onChangeFunction={changeManagementQualityCertificationDocs}
      />
      <CustomModal showUpload={true} 
        docs={data.docs}
        placeHolder={` B.1.4 ${t("PoliticsB14")}`}
        typeToFilter={"PoliticsAndProcedures"}
        removeDoc={handleRemoveDocument}
        onChangeFunction={changePoliticsAndProcedures}
      />
      <CustomModal showUpload={true} 
        docs={data.docs}
        placeHolder={` B.1.5 ${t("HandicapesPolitics")}`}
        typeToFilter={"HandicapDocs"}
        removeDoc={handleRemoveDocument}
        onChangeFunction={changeHandicapDocs}
      />
      <CustomModal showUpload={true} 
        docs={data.docs}
        placeHolder={`B.1.6 ${t("PoliticsProcedures")}`}
        typeToFilter={"PoliticsProceduresDocs"}
        removeDoc={handleRemoveDocument}
        onChangeFunction={changePoliProcsDocs}
      />
      <CustomModal showUpload={true} 
        docs={data.docs}
        placeHolder={`B.1.7 ${t("SystemCredits")}`}
        typeToFilter={"SystemCreditsDocs"}
        removeDoc={handleRemoveDocument}
        onChangeFunction={changeSystemCreditsDocs}
      />
      <CustomModal showUpload={true} 
        docs={data.docs}
        placeHolder={`B.1.8 ${t("SafeEnviroment")}`}
        typeToFilter={"EnviromentDocs"}
        removeDoc={handleRemoveDocument}
        onChangeFunction={changeEnviromentDocs}
      />
      <CustomModal showUpload={true} 
        docs={data.docs}
        placeHolder={`B.1.9 ${t("ModelOfCertificate")}`}
        typeToFilter={"CertificateDoc"}
        removeDoc={handleRemoveDocument}
        onChangeFunction={changeCertificateDoc}
      />
      <CustomModal showUpload={true} 
        docs={data.docs}
        placeHolder={`${t("ReportRVV")}`}
        typeToFilter={"ReportRVVDoc"}
        removeDoc={handleRemoveDocument}
        onChangeFunction={changeReportRVVDoc}
      />
      <CustomModal showUpload={true} 
        docs={data.docs}
        placeHolder={`${t("FormatOfModule")}`}
        typeToFilter={"FormatOfModuleDoc"}
        removeDoc={handleRemoveDocument}
        onChangeFunction={changeFormatOfModuleDoc}
      />
    </div>
  );
}
