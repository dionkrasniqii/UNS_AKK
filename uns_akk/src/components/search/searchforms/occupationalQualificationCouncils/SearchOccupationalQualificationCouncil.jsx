import React from "react";
import CustomSelect from "../../../custom/CustomSelect";

export default function SearchOccupationalQualificationCouncil() {
  return (
    <div className="container mt-5 bg-light-subtle ">
      <div className="card ">
        <div className="card-body">
          <div className="row">
            <div className="col-xxl-4 col-lg-6 col-sm-12">
              <h5 className="card-title">Emri në anglisht</h5>
              <CustomSelect />
            </div>
            <div className="col-xxl-4 col-lg-6 col-sm-12">
              <h5 className="card-title">Status</h5>
              <CustomSelect />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
