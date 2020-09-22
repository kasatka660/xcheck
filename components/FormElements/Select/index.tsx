import React, { useState } from "react";
import { Select } from "antd";

type PropsSelect = {
  selectOptions: SelectOption[];
  placeholder: string;
  onSelect: (val) => void;
};

export interface SelectOption {
  id: string;
  name: string;
}

export const SelectMenu: React.FC<PropsSelect> = ({
  selectOptions,
  placeholder,
  onSelect,
}) => {
  const { Option } = Select;

  function onChange(value) {
    onSelect(value);
  }

  function onBlur() {
    console.log("blur");
  }

  function onFocus() {
    console.log("focus");
  }

  function onSearch(val) {
    console.log("search:", val);
  }

  return (
    <Select
      showSearch
      style={{ width: 200, margin: "30px 0" }}
      placeholder={placeholder}
      optionFilterProp="children"
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onSearch={onSearch}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {selectOptions.map((option, key) => (
        <Option key={key} value={option.id}>
          {option.name}
        </Option>
      ))}
    </Select>
  );
};

export default SelectMenu;
