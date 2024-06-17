import Price from "@/Components/Address/Price";
import Box from "@/Components/Box";
import FormInput from "@/Components/FormInput";
import { useForm, usePage } from "@inertiajs/inertia-react";
import React, { useState } from "react";
import { useRoute } from "ziggy-js";

interface MakeOfferProps {
    id: number;
    price: number;
    handlePriceChange: (newPrice: number) => void;
}

export default function MakeOffer({
    id,
    price,
    handlePriceChange,
}: MakeOfferProps) {
    const [difference, setDifference] = useState(0);
    const route = useRoute();

    const { data, errors, setData, post } = useForm({
        amount: price,
    });

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { value, name } = event.target;
        switch (name) {
            case "amount":
                setData(name, Number(value));
                let newDifference = Number(value) - price;
                setDifference(newDifference);
                handlePriceChange(Number(value));
                break;
        }
    }

    function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
        event.preventDefault();

        post(
            route("listing.offer.store", {
                listing: id,
            }),
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    }

    return (
        <Box title="Make an Offer">
            <div>
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                    <FormInput
                        handleChange={handleChange}
                        name="amount"
                        value={data.amount}
                        errors={errors.amount}
                    />
                    <input
                        type="range"
                        min={Math.floor(price / 2)}
                        max={Math.floor(price * 2)}
                        step="1000"
                        name="amount"
                        id="amount"
                        value={data.amount}
                        onChange={handleChange}
                        className="w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    />
                    <button
                        type="submit"
                        className="btn-outline w-full text-sm"
                    >
                        Make an Offer
                    </button>
                </form>
            </div>
            <div className="flex justify-between text-gray-500 mt-2">
                <div>Difference</div>
                <div>
                    <Price price={difference} size="medium" />
                </div>
            </div>
        </Box>
    );
}
