import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Table, Input, Alert, Row, Col } from "antd";
import DataTable from "../datatable/DataTable";

export default function Agencies() {
  const data = [
    {
      agencyId: "1",
      title: "Test",
      uniqueNumber: "2",
      city: "Prishtine",
      address: "Prishtine",
      postalCode: "42000",
      phoneNumber: "+38345963258",
      email: "example@gmail.com",
      web: "wwww.google.com",
    },
    {
      agencyId: "2",
      title: "Test",
      uniqueNumber: "2",
      city: "Prishtine",
      address: "Prishtine",
      postalCode: "42000",
      phoneNumber: "+38345963258",
      email: "example@gmail.com",
      web: "wwww.google.com",
    },
    {
      agencyId: "3",
      title: "Dion",
      uniqueNumber: "2",
      city: "Malisheve",
      address: "Malisheve",
      postalCode: "42000",
      phoneNumber: "+3223",
      email: "example@asas.com",
      web: "wwww.gooasdasdgle.com",
    },
    {
      agencyId: "4",
      title: "Test",
      uniqueNumber: "2",
      city: "Prishtine",
      address: "Prishtine",
      postalCode: "42000",
      phoneNumber: "+38345963258",
      email: "example@gmail.com",
      web: "wwww.google.com",
    },
  ];

  const columns = [
    {
      title: "Emri i Institucionit",
      dataIndex: ["title"],
      key: "agencyId",
      responsive: ["sm"],
    },
    {
      title: "Numri Unik",
      dataIndex: ["uniqueNumber"],
      key: "agencyId",
      responsive: ["sm"],
    },
    {
      title: "Qyteti",
      dataIndex: ["city"],
      key: "agencyId",
      responsive: ["sm"],
    },
    {
      title: "Adresa",
      dataIndex: ["address"],
      key: "agencyId",
      responsive: ["sm"],
    },
    {
      title: "Kodi Postal",
      dataIndex: ["postalCode"],
      key: "agencyId",
      responsive: ["sm"],
    },
    {
      title: "Numri i telefonit",
      dataIndex: ["phoneNumber"],
      key: "agencyId",
      responsive: ["sm"],
    },
    {
      title: "Email",
      dataIndex: ["email"],
      key: "agencyId",
      responsive: ["sm"],
    },
    {
      title: "Faqja e Internetit",
      dataIndex: ["web"],
      key: "agencyId",
      responsive: ["sm"],
    },
  ];

  return (
    <div className="col-xxl-12">
      <div className="col-xxl-12 text-end"></div>
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-12">
              <div className="col-12 d-flex justify-content-end">
                <Link
                  className="btn btn-info waves-effect waves-light"
                  to="/createagencies"
                >
                  <span className="btn-label">
                    <i className="fe-plus-circle"></i>
                  </span>
                  Shto
                </Link>
              </div>
            </div>
          </div>
          <div className="p-2 mt-2">
            <DataTable
              columns={columns}
              dataSource={data}
              title={"Lista e institucioneve"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
