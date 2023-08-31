import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CrudProvider from "../../../provider/CrudProvider";
import CustomSelect from "../../custom/CustomSelect";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export default function AssignExperts({ applicationId, decodedToken }) {
  const { t } = useTranslation();
  const [experts, setExperts] = useState([]);
  const navigate = useNavigate();
  const [postLoad, setPostLoad] = useState(false);
  const [model, setModel] = useState({
    ApplicationId: applicationId,
    UserIds: [],
    ApplicationUserId: decodedToken.UserId,
  });
  useEffect(() => {
    CrudProvider.getAll("ApplicationAPI/GetExpertUsers").then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          setExperts(res.result);
        }
      }
    });
  }, []);

  async function checkExpertsList() {
    if (model.UserIds.length === 3) {
      return true;
    } else if (model.UserIds.length < 3) {
      toast.error("Duhet te zgjedhni se paku 3 eksperta");
      return false;
    } else if (model.UserIds.length > 3) {
      toast.error("Nuk munde te zgjedhni me shume se 3 eksperta");
      return false;
    }
  }
  async function SubmitExperts() {
    try {
      setPostLoad(true);
      var check = await checkExpertsList();
      if (check) {
        await CrudProvider.createItem(
          "ApplicationAPI/CreateApplicationExpert",
          model
        ).then((res) => {
          if (res) {
            switch (res.statusCode) {
              case 200:
                toast.success(t("DataUpdatedSuccessfully"));
                navigate("/applications");
                setPostLoad(false);
                break;
              default:
                toast.error(res.errorMessages[0]);
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

  const expertsList =
    experts &&
    experts.length > 0 &&
    experts.map((obj) => ({
      value: obj.userId,
      label: obj.nameSurname,
    }));

  async function changeExperts(e) {
    setModel((prev) => ({
      ...prev,
      UserIds: e,
    }));
  }

  return (
    <div className='col-xxl-12 col-lg-12 col-sm-12'>
      <div className='row'>
        <div className='col-xxl-11 col-lg-11 col-sm-12 d-flex justify-content-end'>
          <div className='col-xxl-4 col-lg-4 col-sm-12'>
            <label className='d-flex justify-content-start'>
              {t("Experts")}:
            </label>
            <CustomSelect
              optionsList={expertsList}
              isMulti={true}
              maxLength={3}
              hasDefaultValue={false}
              onChangeFunction={changeExperts}
            />
          </div>
        </div>
        <div className='col-xxl-1 col-lg-1 col-sm-12 mt-2'>
          {!postLoad ? (
            <button
              className='btn btn-soft-primary waves-effect'
              onClick={SubmitExperts}
              type='button'
            >
              {t("Save")}
            </button>
          ) : (
            <div
              className='spinner-border text-primary m-2 text-center'
              role='status'
            />
          )}
        </div>
      </div>
    </div>
  );
}
