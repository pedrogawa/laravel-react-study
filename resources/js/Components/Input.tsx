interface InputProps {
    placeholder: string;
    side: "right" | "left";
    value: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
}

export default function Input({
    name,
    placeholder,
    side,
    value,
    handleChange,
}: InputProps) {
    const className =
        side === "right" ? "right-filter-input w-28" : "left-filter-input w-28";
    return (
        <input
            type="text"
            placeholder={placeholder}
            className={className}
            value={value}
            onChange={handleChange}
            id={name}
            name={name}
        />
    );
}
