import FormInput from "@/Components/FormInput";
import { useForm } from "@inertiajs/inertia-react";
import React from "react";
import { useRoute } from "ziggy-js";

export default function Create() {
    const route = useRoute();
    const { data, setData, post, errors } = useForm({
        beds: "",
        baths: "",
        area: "",
        city: "",
        street: "",
        street_nr: "",
        code: "",
        price: 0,
    });

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        switch (name) {
            case "beds":
            case "baths":
            case "area":
            case "price":
                setData(name, Number(value) || 0);
                break;
            case "city":
            case "street":
            case "street_nr":
            case "code":
                setData(name, value);
                break;
        }
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        post(route("realtor.listing.store"));
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-6 gap-4">
                <FormInput
                    className="col-span-2"
                    name="beds"
                    value={data.beds}
                    errors={errors.beds}
                    handleChange={handleChange}
                />
                <FormInput
                    className="col-span-2"
                    name="baths"
                    value={data.baths}
                    errors={errors.baths}
                    handleChange={handleChange}
                />
                <FormInput
                    className="col-span-2"
                    name="area"
                    value={data.area}
                    errors={errors.area}
                    handleChange={handleChange}
                />
                <FormInput
                    className="col-span-4"
                    name="city"
                    value={data.city}
                    errors={errors.city}
                    handleChange={handleChange}
                />
                <FormInput
                    className="col-span-2"
                    name="code"
                    value={data.code}
                    errors={errors.code}
                    handleChange={handleChange}
                />
                <FormInput
                    className="col-span-4"
                    name="street"
                    value={data.street}
                    errors={errors.street}
                    handleChange={handleChange}
                />
                <FormInput
                    className="col-span-2"
                    name="street_nr"
                    value={data.street_nr}
                    errors={errors.street_nr}
                    handleChange={handleChange}
                />

                <FormInput
                    className="col-span-2"
                    name="price"
                    value={data.price}
                    errors={errors.price}
                    handleChange={handleChange}
                />
                <div className="col-span-6">
                    <button type="submit" className="btn-primary">
                        Submit
                    </button>
                </div>
            </div>
        </form>
    );
}
