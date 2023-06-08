import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import CrudProvider from "../../provider/CrudProvider";

export default function EditDecisions() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [load, setLoad] = useState(false);
  const [decision, setDecision] = useState({});
  const [model, setModel] = useState({
    InstitutionId: id,
    Aktiv: "",
    Remark: "",
  });

  useEffect(() => {
    CrudProvider.getItemById("InstitutionDesicionAPI/GetById", id).then(
      (res) => {
        if (res) {
          if (res.statusCode === 200) {
            setDecision(res.result);
          }
        }
      }
    );
  }, [id]);

  console.log(decision);

  return (
    <div>
      {Object.values(decision).forEach((obj) => {
        return <p>obj</p>;
      })}
    </div>
  );
}
