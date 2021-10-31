import "./NumberField.css";
export const NumberField: React.FC<{
    label: string;
    value: number | undefined;
    onChange: (newValue: number) => void;
}> = ({ label, value, onChange }) => (
    <div className="numberField">
        <label htmlFor="number-field" className="label">
            {label}
        </label>
        <input
            type="number"
            name="number-field"
            className="input"
            value={value || 0}
            onChange={(e) => onChange(parseInt(e.target.value) || 0)}
        />
    </div>
);
