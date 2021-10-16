import "./TextField.css";
export const TextField: React.FC<{
    label: string;
    value: string | undefined;
    onChange: (newValue: string) => void;
    password?: boolean;
}> = ({ label, value, onChange, password = false }) => (
    <div className="textField">
        <label htmlFor="textfield" className="label">
            {label}
        </label>
        <input
            type={password ? "password" : "text"}
            name="textfield"
            className="input"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
);
