import "./ListOfCards.css";

export const ListOfCards: React.FC= ({
    children
}) => {
    return (
        <div className="list">
            {children}
        </div>
    );
};
