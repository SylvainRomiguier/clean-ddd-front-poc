import { CSSProperties } from "react";
import "./Card.css";

export interface CardProps {
    onClick: () => void;
    selected: boolean;
    color?: string;
}

export const Card: React.FC<CardProps> = ({
    children,
    onClick,
    selected,
    color = "lightCoral"
}) => {

    const selectedStyle = {backgroundColor: color,
    color: "white",
    fontWeight: "bolder"
} as CSSProperties;

const notSelectedStyle = {
    border: `1px solid ${color}`,
    backgroundColor: "white",
    color,
} as CSSProperties;


    return (
        <div
            className="card"
            onClick={onClick}
            style={selected ? selectedStyle : notSelectedStyle}
        >
          {children}
        </div>
    );
};
