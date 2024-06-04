import React from "react";

interface CheckboxProps {
    name: string;
    checked: boolean;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Checkbox({
    name,
    checked = false,
    handleChange,
}: CheckboxProps) {
    function getLabelName() {
        const label = {
            deleted: "Deleted",
            drafts: "Drafts",
        };

        return label[name] ?? "Unnamed";
    }

    return (
        <div className="flex flex-nowrap items-center gap-2">
            <input
                type="checkbox"
                name={name}
                id={name}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                checked={checked}
                onChange={handleChange}
            />
            <label htmlFor="deleted">{getLabelName()}</label>
        </div>
    );
}
