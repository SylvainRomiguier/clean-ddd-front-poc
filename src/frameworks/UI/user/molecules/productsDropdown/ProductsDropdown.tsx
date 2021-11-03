import React from "react";
import { Dropdown } from "../../../components/atoms/dropdown/Dropdown";

export const ProductsDropdown:React.FC = ({children}) => (
    <Dropdown label="Add product">
       {children}
    </Dropdown>
);