import Address from "@/Components/Address";
import Price from "@/Components/Address/Price";
import Box from "@/Components/Box";
import Listing from "@/Interface/Listing";
import calculateMonthlyPayment from "@/Utils/calculateMonthlyPayment";
import React, { useState } from "react";

interface ShowProps {
    listing: Listing;
}

export default function Show({ listing }: ShowProps) {
    const [interestSlider, setInterestSlider] = useState(2.5);
    const [durationSlider, setDurationSlider] = useState(25);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { value, name } = event.target;
        switch (name) {
            case "interest":
                setInterestSlider(parseFloat(value));
                break;
            case "duration":
                setDurationSlider(parseFloat(value));
                break;
        }
    }

    const { monthlyPayment, totalPaid, totalInterest } =
        calculateMonthlyPayment(interestSlider, listing.price, durationSlider);

    return (
        <div className="flex flex-col-reverse md:grid md:grid-cols-12 gap-4">
            <Box className="md:col-span-7 flex items-center w-full">
                <div className="w-full text-center font-medium text-gray-500">
                    No images
                </div>
            </Box>
            <div className="md:col-span-5 flex flex-col gap-4">
                <Box title="Basic info">
                    <Address listing={listing} isCard={false} />
                </Box>
                <Box className="flex flex-col gap-1" title="Monthly Payment">
                    <div className="flex flex-col gap-2">
                        <div>
                            <label htmlFor="" className="label">
                                Interest rate ({interestSlider}%)
                            </label>
                            <input
                                type="range"
                                min="0.1"
                                max="30"
                                step="0.1"
                                name="interest"
                                id="interest"
                                value={interestSlider}
                                onChange={handleChange}
                                className="w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                            />
                            <label htmlFor="" className="label">
                                Duration ({durationSlider} years)
                            </label>
                            <input
                                type="range"
                                min="3"
                                max="35"
                                step="1"
                                name="duration"
                                id="duration"
                                value={durationSlider}
                                onChange={handleChange}
                                className="w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                            />
                        </div>

                        <div className="text-gray-600 dark:text-gray-300">
                            <div className="text-gray-400">
                                Your monthly payment
                            </div>
                            <Price price={monthlyPayment} size="large" />
                        </div>

                        <div className="text-gray-500">
                            <div className="flex justify-between">
                                <div>Total paid</div>
                                <div>
                                    <Price price={totalPaid} size="small" />
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div>Principal paid</div>
                                <div>
                                    <Price price={listing.price} size="small" />
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div>Interest paid</div>
                                <div>
                                    <Price price={totalInterest} size="small" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </div>
        </div>
    );
}
