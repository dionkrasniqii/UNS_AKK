import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useTranslation } from "react-i18next";
import "./datatablev2.css";
export default function DataTablev2(props) {
  const [data, setData] = useState(props.dataSource);
  const [searchInput, setSearchInput] = useState("");
  const [load, setLoad] = useState(false);
  let timeoutId;

  const { t } = useTranslation();
  const filteredData = props.dataSource.filter((item) => {
    return Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchInput.toLowerCase())
    );
  });

  useEffect(() => {
    setData(props.dataSource);
  }, [props.dataSource]);

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
    }, 800);
  };
  // Column shabllon
  //   const columns = [
  //     {
  //       name: "Name",
  //       selector: (row) => row.firstname,
  //       sortable: true,
  //       filterable: true,
  //     },
  //     {
  //       name: "Surname",
  //       selector: (row) => row.lastname,
  //       sortable: true,
  //       filterable: true,
  //     },
  // {
  //       name: "Action",
  //       selector: (row) => row.action,
  //       cell: (row) => (
  //         <Link to={`/checkApplications/${row.id}`}>
  //           <button className='btn btn-outline-warning btn-lg'>
  //             {t("check")}
  //           </button>
  //         </Link>
  //       ),
  //       ignoreRowClick: true,
  //       allowOverflow: true,
  //       button: true,
  //     },
  // ]

  return !load ? (
    <div className='table-container'>
      <DataTable
        direction='auto'
        highlightOnHover
        fixedHeaderScrollHeight='600px'
        pagination
        grow='no'
        responsive
        columns={props.columns}
        data={data}
        pointerOnHover='yes'
      />
    </div>
  ) : (
    <div className='col-xxl-12 col-lg-12 col-sm-12 text-center'>
      <div
        className='spinner-border text-primary m-2 text-center'
        role='status'
      />
    </div>
  );
}
