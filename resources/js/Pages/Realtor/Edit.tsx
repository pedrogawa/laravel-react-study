import { useForm } from "@inertiajs/inertia-react";
import React from "react";
import { useRoute } from "ziggy-js";
import FormInput from "@/Components/FormInput";
import Listing from "@/Interface/Listing";

interface EditProps {
    listing: Listing;
}

export default function Edit({ listing }: EditProps) {
    const route = useRoute();

    const { data, setData, put, errors } = useForm({
        beds: listing.beds,
        baths: listing.baths,
        area: listing.area,
        city: listing.city,
        street: listing.street,
        street_nr: listing.street_nr,
        code: listing.code,
        price: listing.price,
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
        put(route("realtor.listing.update", listing.id));
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-6 gap-4">
                <FormInput
                    className="col-span-2 gap-1"
                    name="beds"
                    value={data.beds}
                    errors={errors.beds}
                    handleChange={handleChange}
                />
                <FormInput
                    className="col-span-2 gap-1"
                    name="baths"
                    value={data.baths}
                    errors={errors.baths}
                    handleChange={handleChange}
                />
                <FormInput
                    className="col-span-2 gap-1"
                    name="area"
                    value={data.area}
                    errors={errors.area}
                    handleChange={handleChange}
                />
                <FormInput
                    className="col-span-4 gap-1"
                    name="city"
                    value={data.city}
                    errors={errors.city}
                    handleChange={handleChange}
                />
                <FormInput
                    className="col-span-2 gap-1"
                    name="code"
                    value={data.code}
                    errors={errors.code}
                    handleChange={handleChange}
                />
                <FormInput
                    className="col-span-4 gap-1"
                    name="street"
                    value={data.street}
                    errors={errors.street}
                    handleChange={handleChange}
                />
                <FormInput
                    className="col-span-2 gap-1"
                    name="street_nr"
                    value={data.street_nr}
                    errors={errors.street_nr}
                    handleChange={handleChange}
                />

                <FormInput
                    className="col-span-2 gap-1"
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
