

import { Table } from "antd";
import React, { useEffect, useState } from "react";

export default function DataTable(props) {
  const [data, setData] = useState(props.dataSource);
  const [searchInput, setSearchInput] = useState("");
  const [load, setLoad] = useState(false);
  let timeoutId;

  const filteredData = props.dataSource.filter((item) => {
    return Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchInput.toLowerCase())
    );
  });

useEffect(()=>{
  setData(props.dataSource)
},[props.dataSource])

  useEffect(() => {
    setData(filteredData);
  }, [searchInput]);

  const handleChange = (e) => {
    setLoad(true);
    const value = e.target.value;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setSearchInput(value);
      setLoad(false);
    }, 800 );
  };

  return (
    <div className="card card-body">
      <div className=" row align-items-center table-div">
        <div className="col-lg-12 col-xxl-12 col-md-12 col-sm-12 text-center">
          <h2 className="page-title-main">{props.title}</h2>
        </div>
        <div className="col-lg-3 col-md-3 col-xxl-3 mb-2 d-flex justify-content-start ">
          <label htmlFor="searchInput" className="form-label mt-1 pe-2">
            Kërko:
          </label>
          <input
            type="search"
            id="searchInput"
            className="form-control form-control-sm"
            placeholder="Kerko sipas emrit..."
            onChange={(e) => handleChange(e)}
            aria-controls="selection-datatable"
            style={{ width: "200px" }}
          />
        </div>

        {!load ? (
          <div className="table-container">
            <Table columns={props.columns} dataSource={data} />
          </div>
        ) : (
          <div className="col-xxl-12 col-lg-12 col-sm-12 text-center">
            <div
              className="spinner-border text-primary m-2 text-center"
              role="status"
            />
          </div>
        )}
      </div>
    </div>
  );
}