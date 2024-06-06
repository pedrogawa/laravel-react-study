import Checkbox from "@/Components/Checkbox";
import Select from "@/Components/Select";
import debounce from "@/Utils/debounce";
import updateFormData from "@/Utils/updateFormData";
import { useForm } from "@inertiajs/inertia-react";
import React, { useEffect } from "react";
import { useRoute } from "ziggy-js";

interface RealtorFiltersProps {
    filters: {
        by: string;
        deleted: boolean;
        order: string;
    };
}

const sortLabels = [
    {
        value: "created_at",
        label: "Added",
    },
    {
        value: "area",
        label: "Area",
    },
    {
        value: "price",
        label: "Price",
    },
    {
        value: "baths",
        label: "Baths",
    },
    {
        value: "beds",
        label: "Beds",
    },
];

export default function RealtorFilters({ filters }: RealtorFiltersProps) {
    const route = useRoute();

    const { data, get, setData } = useForm({
        deleted: filters.deleted,
        by: filters.by,
        order: filters.order,
    });

    const debouncedGet = debounce(() => {
        get(route("realtor.listing.index"), {
            preserveState: true,
            preserveScroll: true,
        });
    }, 500);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, checked } = event.target;
        updateFormData(name, checked, setData, data);

        debouncedGet();
    }

    function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
        const { name, value } = event.target;
        updateFormData(name, value, setData, data);
        debouncedGet();
    }

    return (
        <form className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
                <div className="flex flex-nowrap items-center gap-4">
                    <Checkbox
                        name="deleted"
                        checked={data.deleted}
                        handleChange={handleChange}
                    />
                    <div>
                        <Select
                            side="left"
                            value={data.by}
                            handleChange={handleSelect}
                            name="by"
                        >
                            {sortLabels.map((label, index) => (
                                <option key={index} value={label.value}>
                                    {label.label}
                                </option>
                            ))}
                        </Select>
                        <Select
                            side="right"
                            value={data.order}
                            handleChange={handleSelect}
                            name="order"
                        >
                            <option value="asc">Asc</option>
                            <option value="desc">Desc</option>
                        </Select>
                    </div>
                </div>
            </div>
        </form>
    );
}
