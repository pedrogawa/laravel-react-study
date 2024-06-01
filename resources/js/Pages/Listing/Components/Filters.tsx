import Input from "@/Components/Input";
import Select from "@/Components/Select";
import { useRoute } from "ziggy-js";

import { useForm } from "@inertiajs/inertia-react";
import Filters from "@/Interface/Filters";

interface FiltersProps {
    filters: Filters;
}

function convertToEmptyString<T>(value: T) {
    return value !== null && value !== undefined ? String(value) : "";
}

export default function FiltersComponent({ filters }: FiltersProps) {
    const route = useRoute();

    const { data, setData, get } = useForm({
        beds: convertToEmptyString(filters.beds),
        baths: convertToEmptyString(filters.baths),
        priceFrom: convertToEmptyString(filters.priceFrom),
        priceTo: convertToEmptyString(filters.priceTo),
        areaFrom: convertToEmptyString(filters.areaFrom),
        areaTo: convertToEmptyString(filters.areaTo),
    });

    function handleChange(
        event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLSelectElement>
    ) {
        const { name, value } = event.target;

        switch (name) {
            case "beds":
            case "baths":
            case "priceFrom":
            case "priceTo":
            case "areaFrom":
            case "areaTo":
                setData(name, value);
                break;
        }
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        get(route("listing.index"), {
            preserveState: true,
            preserveScroll: true,
        });
    }

    function clearForm() {
        for (const field of Object.keys(filters)) {
            data[field] = "";
        }

        get(route("listing.index"), {
            preserveState: true,
            preserveScroll: true,
        });
    }

    return (
        <form className="flex gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-wrap gap-2">
                <div className="flex flex-nowrap items-center">
                    <Input
                        placeholder="Price from"
                        side="left"
                        value={data.priceFrom}
                        handleChange={handleChange}
                        name="priceFrom"
                    />
                    <Input
                        placeholder="Price to"
                        side="right"
                        value={data.priceTo}
                        handleChange={handleChange}
                        name="priceTo"
                    />
                </div>
                <div className="flex flex-nowrap items-center">
                    <Select
                        handleChange={handleChange}
                        placeholder="Beds"
                        side="left"
                        value={data.beds}
                        name="beds"
                    />
                    <Select
                        handleChange={handleChange}
                        placeholder="Baths"
                        side="right"
                        value={data.baths}
                        name="baths"
                    />
                </div>
                <div className="flex flex-nowrap items-center">
                    <Input
                        handleChange={handleChange}
                        placeholder="Area from"
                        side="left"
                        value={data.areaFrom}
                        name="areaFrom"
                    />
                    <Input
                        handleChange={handleChange}
                        placeholder="Area to"
                        side="right"
                        value={data.areaTo}
                        name="areaTo"
                    />
                </div>
            </div>

            <div className="flex gap-8">
                <button type="submit" className="btn-submit px-4">
                    Filter
                </button>
                <button onClick={clearForm}>Clear</button>
            </div>
        </form>
    );
}
