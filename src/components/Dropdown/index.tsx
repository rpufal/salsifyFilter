import { FC } from "react";
import DropdownProps from "./types";
import "./styles.css";

export const Dropdown: FC<DropdownProps> = ({handleChange, options, placeholderText}) => {
    return (
    <select className="dropdown" onChange={handleChange}>
      <option value="">{placeholderText}</option>
      {options.map((option, index) => {
        if (typeof option === "object") {
          return (
          <option key={`${option.id}-${index}`} value={option.id}>
            {option.name || option.text}
          </option>
          )
        }
        return ( 
        <option key={`${option}-${index}`} value={option}>
          {option}
        </option>)
      })}
    </select>
    )
}