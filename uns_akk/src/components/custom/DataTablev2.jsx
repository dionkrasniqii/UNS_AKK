import React from "react";
import DataTable from "react-data-table-component";
import { useTranslation } from "react-i18next";
import "./datatablev2.css";
import Loading from "../loading/Loading";
import * as XLSX from "xlsx"; // Import the Excel export library

export default function DataTablev2({ dataSource, columns, title }) {
  const [data, setData] = React.useState(dataSource);
  const [searchInput, setSearchInput] = React.useState("");
  const [load, setLoad] = React.useState(false);
  let timeoutId;

  const { t } = useTranslation();

  const filteredData = dataSource.filter((item) => {
    return Object.values(item).some((value) => {
      if (value !== null && typeof value === "object") {
        return Object.values(value).some((item) => {
          return String(item).toLowerCase().includes(searchInput.toLowerCase());
        });
      } else if (typeof value === "string") {
        return value.toLowerCase().includes(searchInput.toLowerCase());
      }
      return false;
    });
  });

  React.useEffect(() => {
    setData(filteredData);
  }, [searchInput]);

  React.useEffect(() => {
    setData(dataSource);
  }, [dataSource]);

  const handleChange = (e) => {
    setLoad(true);
    const value = e.target.value;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setSearchInput(value);
      setLoad(false);
    }, 800);
  };

  // const handleExportClick = () => {
  //   // exportToExcel(dataSource, columns);
  //   console.log(columns);
  //   console.log(dataSource);

  //   const columnsSelector = columns
  //     .map((obj) => obj.selector)
  //     .map((filtered) => {
  //       console.log(filtered);
  //       if (filtered) {
  //         const parts = filtered.toString().split("row.");
  //         return parts[1];
  //       }
  //       return undefined;
  //     });

  //   console.log(columnsSelector);

  //   const dataToPrint = data.map((obj) => {
  //     const filteredData = {};
  //     Object.keys(obj).forEach((key) => {
  //       if (columnsSelector.includes(key)) {
  //         filteredData[key] = obj[key];
  //       }
  //     });
  //     return filteredData;
  //   });

  //   console.log(dataToPrint);
  // };

  // const exportToExcel = (data, columns) => {
  //   const headerNames = columns.map((obj) =>
  //     obj.name != t("Actions") ? obj.name : ""
  //   );
  //   console.log(data);

  //   const ws = XLSX.utils.json_to_sheet(data, { header: headerNames });
  //   const wb = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, "Data");
  //   XLSX.writeFile(wb, "exported-data.xlsx");
  // };

  return (
    <div className="card card-body">
      <div className=" row align-items-center table-div">
        <div className="col-lg-12 col-xxl-12 col-md-12 col-sm-12 text-center">
          <h2 className="page-title-main">{title}</h2>
        </div>
        <div className="col-lg-3 col-md-3 col-xxl-3 mb-2 d-flex justify-content-start ">
          <label htmlFor="searchInput" className="form-label mt-1 pe-2">
            {t("Search")}:
          </label>
          <input
            type="search"
            id="searchInput"
            className="form-control form-control-sm"
            placeholder={t("Search")}
            onChange={(e) => handleChange(e)}
            aria-controls="selection-datatable"
            style={{ width: "200px" }}
          />
        </div>

        {/* <div className="col-xxl-12 col-lg-12 col-sm-12 text-end mb-2">
          <button onClick={handleExportClick} className="btn btn-success">
            <i className="mdi mdi-file-excel-outline fs-4"></i>
          </button>
        </div> */}

        {!load ? (
          <div className="table-container">
            <DataTable
              direction="auto"
              highlightOnHover
              fixedHeaderScrollHeight="600px"
              pagination
              grow="no"
              responsive
              columns={columns}
              data={data}
              progressComponent={<Loading />}
              pointerOnHover="yes"
            />
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
