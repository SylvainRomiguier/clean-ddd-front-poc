import "./Button.css";

export interface ButtonProps {
    onClick: () => void;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick }) => (
    <div
        onClick={(e) => {
            e.stopPropagation();
            onClick();
        }}
        className="button"
    >
        {children}
    </div>
);
