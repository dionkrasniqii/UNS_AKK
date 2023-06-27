import { Select } from "antd";
import React from "react";

export default function CustomSelect({
  onChangeFunction,
  optionsList,
  isMulti,
  hasDefaultValue,
  defaultValue,
}) {
  const selectStyle = {
    // borderRadius: '4px',
    // border: '1px solid #d9d9d9',
    // backgroundColor: '#f5f5f5',
    // color: '#333333',
    width: "100%",
  };

  // const dropdownStyle = {
  //   borderRadius: '4px',
  //   border: '1px solid #d9d9d9',
  //   backgroundColor: '#ffffff',
  //   boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
  // };

  // const optionStyle = {
  //   color: '#333333',
  // };
  return hasDefaultValue && defaultValue !== null ? (
    <Select
      key={defaultValue}
      style={selectStyle}
      allowClear
      showSearch
      defaultValue={defaultValue}
      onChange={onChangeFunction}
      options={optionsList}
      mode={isMulti ? "multiple" : "single"}
      maxTagCount='responsive'
      optionFilterProp='children'
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
    />
  ) : (
    <Select
      style={selectStyle}
      allowClear
      showSearch
      maxTagCount='responsive'
      onChange={onChangeFunction}
      options={optionsList}
      mode={isMulti ? "multiple" : "single"}
      optionFilterProp='children'
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
    />
  );
}
