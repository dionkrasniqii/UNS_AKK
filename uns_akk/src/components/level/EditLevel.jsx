import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import CrudProvider from "../../provider/CrudProvider";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import CustomSelect from "../custom/CustomSelect";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function EditInstitution() {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [level, setLevel] = useState({});

  useEffect(() => {
    setLoad(true);
    Promise.all([
      CrudProvider.getItemById("LevelAPI/GetLevelById", id).then(
        (res) => {
          if (res) {
            if (res.statusCode === 200) {
              setLevel(res.result);
            } else {
              toast.error(res.errorMessages[0]);
              navigate("/level");
            }
          }
        }
      ),
    ]).then((res) => {
      setLoad(false);
    });
  }, [id]);
  
  async function handleSubmit() {
    await CrudProvider.updateItem(
      "LevelAPI/UpdateLeveli",
      level
    ).then((res) => {
      if (res) {
        if (res.statusCode === 200) {
          toast.success(t("DataUpdatedSuccessfully"));
          navigate("/institutions");
        } else {
          toast.error(res.errorMessages[0]);
        }
      }
    });
  }

  const formik = useFormik({
    initialValues: {},
    validateOnBlur: false,
    validateOnMount: false,
    onSubmit: () => handleSubmit(),
  });


}

