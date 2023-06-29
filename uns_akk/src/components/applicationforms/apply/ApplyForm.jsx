import jwtDecode from "jwt-decode";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export default function ApplyForm({ authState }) {
  const { t } = useTranslation();
  const token = localStorage.getItem("akktoken");
  const decodedToken = token && jwtDecode(token);
  const navigate = useNavigate();
  const [model, setModel] = useState({});

  return (
    <div className='container card mt-5'>
      <div className='card-body'></div>
    </div>
  );
}
