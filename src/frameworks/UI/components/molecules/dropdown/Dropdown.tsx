import { useEffect, useState } from "react";
import { Button } from "../../atoms/button/Button";
import "./Dropdown.css";

export const Dropdown:React.FC<{label:string}> = ({children, label}) => {
    const [open, setOpen] = useState(false);

    // onClickAway ... close the dropdown
    useEffect(() => {
        const closeDropDown = () => setOpen(false);
        window.addEventListener("click", closeDropDown);
        return () => {window.removeEventListener("click", closeDropDown)}
    }, []);
    
return (
    <div className="dropdown">
        <Button onClick={() => setOpen(!open)}>{label}</Button>
        <div className={!open ? "dropdown-content" : "dropdown-open dropdown-content"}>
        {children}
        </div>
    </div>
);
}