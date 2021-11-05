import React from "react";
import { Dropdown } from "../../../components/molecules/dropdown/Dropdown";

export const ProductsDropdown:React.FC = ({children}) => (
    <Dropdown label="Select product">
       {children}
    </Dropdown>
);