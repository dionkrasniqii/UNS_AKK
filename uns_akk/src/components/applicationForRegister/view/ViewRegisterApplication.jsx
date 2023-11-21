import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import CrudProvider from "../../../provider/CrudProvider";
import { toast } from "react-toastify";
import ViewQualificationDetails from "./ViewQualificationDetails";
import Loading from "../../loading/Loading";
import ViewQualificationStandartsDetails from "./ViewQualificationStandartsDetails";
import ViewCompetencesDetails from "./ViewCompetencesDetails";
import jwtDecode from "jwt-decode";
import { Checkbox } from "antd";
import CustomModal from "../../custom/CustomModal";

export default function ViewRegisterApplication() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [data, setData] = useState();
  const [load, setLoad] = useState(true);
  const [statuses, setStatuses] = useState([]);
  const [isSelected, setIsSelected] = useState("");
  const [postLoad, setPostLoad] = useState(false);
  const token = localStorage.getItem("akktoken");
  const decodedToken = token && jwtDecode(token);
  const [model, setModel] = useState({
    ApplicationForRegisterId: "",
    StatusId: "",
    Step: "",
    Comment: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    CrudProvider.getItemById(
      "ApplicationAPI/GetRegisterApplicationById",
      id
    ).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          setData(res.result);
          setModel((prev) => ({
            ...model,
            ApplicationForRegisterId: res.result.applicationForRegisterId,
          }));
          setLoad(false);
        } else {
          toast.error(res.errorMessages[0]);
          navigate("/register-applications-list");
        }
      }
    });

    CrudProvider.getAll("GeneralAPI/GetStatuses").then((res) => {
      if (res) {
        switch (res.statusCode) {
          case 200:
            setStatuses(res.result);
            break;
          case "ERR_NETWORK":
            toast.error(t("ServerProblems"));
            break;
          default:
            break;
        }
      }
    });
  }, [id]);

  async function checkModel(model) {
    if (model.Step === 13) {
      if (model.Comment) {
        return true;
      } else {
        toast.error("Plotësoni vërejtjen");
        return false;
      }
    } else {
      return true;
    }
  }
  async function SubmitApplication() {
    try {
      setPostLoad(true);
      var check = await checkModel(model);
      if (check) {
        await CrudProvider.createItem(
          "ApplicationAPI/UpdateApplicationForRegister",
          model
        ).then((res) => {
          if (res) {
            switch (res.statusCode) {
              case 200:
                toast.success(t("DataUpdatedSuccessfully"));
                navigate("/applications-register-list");
                setPostLoad(false);
                break;
              default:
                setPostLoad(false);
                break;
            }
          }
        });
      }
    } finally {
      setPostLoad(false);
    }
  }
  const statusesList =
    statuses.length > 0 &&
    decodedToken &&
    statuses
      .filter((status) => {
        if (status.step === 13 || status.step === 12) {
          return status;
        }
        return false;
      })
      .sort((a, b) => b.description.localeCompare(a.description));

  const onChange = (e) => {
    if (e.target.checked) {
      !isSelected && setIsSelected(e.target.name);
      setModel({
        ...model,
        StatusId: e.target.value,
        Step: e.target.name,
      });
    } else {
      setIsSelected(null);
      setModel({
        ...model,
        StatusId: "",
        Comment: "",
        Step: "",
      });
    }
  };
  return !load ? (
    <div className="row">
      <div className="col-xxl-12 col-lg-12 col-sm-12 mb-2">
        <CustomModal
          docs={data.docs}
          typeToFilter={"RegisterApplicationDocs"}
          placeHolder={"Dokumenetet e akredimit"}
          showUpload={false}
          dontShowDocsNames={true}
        />
      </div>
      <ViewQualificationDetails model={data} />
      <ViewQualificationStandartsDetails model={data.qualificationStandarts} />
      <ViewCompetencesDetails model={data.competences} />
      <div className="col-xxl-12 col-lg-12 col-sm-12 text-end">
        <div className="card">
          <div className=" card-body">
            {isSelected === 13 && (
              <div className="col-xxl-12 col-lg-12 col-sm-12 text-start">
                <div className="form-group">
                  <label className="form-label">{t("Remark")}</label>
                  <textarea
                    rows={4}
                    className="mt-1"
                    onInput={(e) => {
                      setModel((prev) => ({
                        ...prev,
                        Comment: e.target.value,
                      }));
                    }}
                  />
                </div>
              </div>
            )}
            {statusesList.map((item) => (
              <Checkbox
                disabled={isSelected ? isSelected !== item.step : false}
                value={item.statusId}
                name={item.step}
                key={item.statusId}
                onChange={onChange}
              >
                {item.description}
              </Checkbox>
            ))}

            {isSelected &&
              (postLoad ? (
                <div className="col-xxl-12 col-lg-12 col-sm-12 text-center">
                  <div
                    className="spinner-border text-primary m-2 text-center"
                    role="status"
                  />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={SubmitApplication}
                  className="btn btn-soft-primary waves-effect "
                >
                  {t("Save")}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
