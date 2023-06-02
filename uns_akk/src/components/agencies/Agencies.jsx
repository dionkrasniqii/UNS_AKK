import React from "react";
import { Link } from "react-router-dom";
import DataTable from "../../datatable/DataTable";

export default function Agencies() {
  return (
    <div className="col-xxl-12">
      <div className="col-xxl-12 text-end">
        <Link
          class="btn btn-info waves-effect waves-light"
          to="/createagencies"
        >
          <span class="btn-label">
            <i class="mdi mdi-alert-circle-outline"></i>
          </span>
          Shto
        </Link>
      </div>
      <DataTable />
    </div>
  );
}
