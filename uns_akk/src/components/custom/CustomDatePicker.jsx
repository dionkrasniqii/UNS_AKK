import { DatePicker } from "antd";
import React from "react";

export default function CustomDatePicker({ onChangeFunction }) {
  const style = {
    width: "100%",
  };
  return (
    <DatePicker
      type='date'
      autoComplete='off'
      style={style}
      onChange={onChangeFunction}
      placeholder='DD/MM/YYYY'
      format='DD/MM/YYYY'
      // format='DD/MM/YYYY'
      className='form-group'
    />
  );
}
