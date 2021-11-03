export const DateFormat: React.FC<{ date?: Date }> = ({ date }) => (
    <div>
        {date?.toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        })}
    </div>
);
