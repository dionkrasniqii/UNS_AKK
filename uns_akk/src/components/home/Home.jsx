import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import CrudProvider from "../../provider/CrudProvider";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className='container-fluid'>
      <div className='row'>
     
      </div>
    </div>
  );
}
