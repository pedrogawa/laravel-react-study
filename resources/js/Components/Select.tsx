interface SelectProps {
    side: "right" | "left";
    value: string;
    handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    name: string;
    children: React.ReactNode;
}

export default function Select({
    name,
    side,
    value,
    handleChange,
    children,
}: SelectProps) {
    const className =
        side === "right" ? "right-filter-input" : "left-filter-input";
    return (
        <select
            className={className}
            value={value}
            onChange={handleChange}
            id={name}
            name={name}
        >
            {children}
        </select>
    );
}
