interface FormInputProps {
    className: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string | number;
    name: string;
    errors: string;
}

export default function FormInput({
    className,
    handleChange,
    value,
    name,
    errors,
}: FormInputProps) {
    function getLabel(name: string) {
        const label = {
            name: "Name",
            code: "Code",
            beds: "Beds",
            baths: "Baths",
            city: "City",
            area: "Area",
            price: "Price",
            street_nr: "Street Number",
            street: "Street",
            email: "E-mail",
            password: "Password",
            password_confirmation: "Confirm Password",
        };

        return label[name] ?? "Unnamed";
    }

    return (
        <div className={`${className} flex flex-col gap-1`}>
            <label className="label" htmlFor={name}>
                {getLabel(name)}
            </label>
            <input
                className="block w-full p-2 rounded-md shadow-sm border border-gray-300 dark:border-gray-600 text-gray-500"
                type={
                    name === "password" || name === "password_confirmation"
                        ? "password"
                        : "text"
                }
                name={name}
                id={name}
                onChange={handleChange}
                value={value}
            />
            {errors && (
                <div className="text-sm text-red-500 dark:text-red-400">
                    {errors}
                </div>
            )}
        </div>
    );
}
