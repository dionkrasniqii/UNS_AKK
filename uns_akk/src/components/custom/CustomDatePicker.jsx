import { DatePicker } from "antd";
import React from "react";

export default function CustomDatePicker({ onChangeFunction, disabled }) {
  const style = {
    width: "100%",
  };
  return (
    <DatePicker
      disabled={disabled ? true : false}
      type="date"
      autoComplete="off"
      style={style}
      onChange={onChangeFunction}
      placeholder="DD/MM/YYYY"
      format="DD/MM/YYYY"
      className="form-group"
    />
  );
}
