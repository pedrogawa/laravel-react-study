interface SelectProps {
    placeholder: string;
    side: "right" | "left";
    value: string;
    handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    name: string;
}

export default function Input({
    name,
    side,
    value,
    placeholder,
    handleChange,
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
            <option value="">{placeholder}</option>
            {[...Array(5)].map((_, index) => (
                <option value={index + 1} key={index}>
                    {index + 1}
                </option>
            ))}
            <option>6+</option>
        </select>
    );
}
