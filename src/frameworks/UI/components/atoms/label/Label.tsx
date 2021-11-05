export const Label: React.FC<{ color?: string; size?: number }> = ({
    children,
    color = "black",
    size = 12,
}) => <div style={{ color, fontSize: `${size}px` }}>{children}</div>;
