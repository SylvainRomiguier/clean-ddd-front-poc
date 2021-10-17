export const ActionsMenu: React.FC = ({ children }) => (
    <div className="actionsMenuContainer">{children}</div>
);

export interface ActionProps {
    onClick: () => void;
}
export const Action: React.FC<ActionProps> = ({ onClick, children }) => (
    <div className="action" onClick={onClick}>
        {children}
    </div>
);
