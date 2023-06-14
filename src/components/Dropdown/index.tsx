import { FC } from "react";
import DropdownProps  from "./types";
import "./styles.css";
import { capitalizeWords } from "../../utils";

export const Dropdown: FC<DropdownProps> = ({handleChange, options, placeholderText, multiple}) => {
  return (
    <select className={`dropdown ${multiple && "multiple"}`} onChange={multiple ? (e) => handleChange(e, true) : (e) => handleChange(e, false)} multiple={multiple && multiple}>
      <option className="dropdown-option" value="">{placeholderText}</option>
      {options.map((option, index) => {
        if (typeof option === "object") {
          return (
          <option className="dropdown-option" key={`${option.id}-${index}`} value={option.id}>
            {option.name ? capitalizeWords(option.name) : option.text && capitalizeWords(option.text)}
          </option>
          )
        }
        return ( 
        <option key={`${option}-${index}`} value={option}>
          {capitalizeWords(option.toString())}
        </option>)
      })}
    </select>
  );
}