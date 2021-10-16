import "./Card.css";

export interface CardProps {
    onClick: () => void;
    selected: boolean;
}

export const Card: React.FC<CardProps> = ({
    children,
    onClick,
    selected,
}) => {
    return (
        <div
            className={`card ${selected && "selected"}`}
            onClick={onClick}
        >
          {children}
        </div>
    );
};
