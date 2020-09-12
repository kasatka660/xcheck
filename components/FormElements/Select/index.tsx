import React, { useState } from "react";
import { Select } from "antd";
import { task, user } from "../../../data/data";

type PropsSelect = {
  menuType: any[];
};

export const SelectMenu: React.FC<PropsSelect> = ({ menuType }) => {
  const { Option } = Select;

  function onChange(value) {
    console.log(`selected ${value}`);
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
      style={{ width: 200 }}
      // placeholder={selectName}
      optionFilterProp="children"
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onSearch={onSearch}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {menuType.map((name, key) => (
        <Option value={key}>{name}</Option>
      ))}
    </Select>
  );
};

export default SelectMenu;
