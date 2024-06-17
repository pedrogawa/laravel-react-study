import Box from "@/Components/Box";
import Image from "@/Interface/Image";
import Listing from "@/Interface/Listing";
import { Link, useForm } from "@inertiajs/inertia-react";
import React, { useState } from "react";
import { useRoute } from "ziggy-js";

type ListingWithImages = Listing & {
    images: Image[];
};

interface CreateProps {
    listing: ListingWithImages;
}

interface FormData {
    images: File[];
}

export default function Create({ listing }: CreateProps) {
    const [errorData, setErrorData] = useState<string[]>();

    const route = useRoute();
    const { data, post, setData, reset } = useForm<FormData>({
        images: [],
    });

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files) {
            const files = Array.from(event.target.files);
            setData("images", files);
        }
    }

    function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
        event.preventDefault();

        post(
            route("realtor.listing.image.store", {
                listing: listing.id,
            }),
            {
                forceFormData: true,
                onSuccess: () => {
                    reset("images");
                    (
                        document.getElementById("images") as HTMLInputElement
                    ).value = "";
                },
                onError: (errors) => {
                    let aux: string[] = [];
                    for (const error of Object.values(errors)) {
                        aux.push(error);
                    }
                    setErrorData(aux);
                },
            }
        );
    }

    function clearForm() {
        reset("images");

        (document.getElementById("images") as HTMLInputElement).value = "";
    }

    return (
        <div className="flex flex-col gap-4">
            <Box title="Upload new images">
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <div className="flex gap-2">
                        <input
                            type="file"
                            name="images"
                            className="border rounded-md file:px-4 file:py-2 cursor-pointer border-gray-200 dark:border-gray-700 file:text-gray-700 file:dark:text-gray-400 file:border-0 file:bg-gray-100 file:dark:bg-gray-800 file:font-medium file:hover:bg-gray-200 file:dark:hover:bg-gray-700 file:hover:cursor-pointer"
                            id="images"
                            multiple
                            onChange={handleChange}
                        />
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="btn-outline"
                                disabled={data.images.length === 0}
                            >
                                Upload
                            </button>
                            <button
                                type="button"
                                className="btn-outline"
                                onClick={clearForm}
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                    <div>
                        {errorData?.map((error, index) => {
                            return (
                                <div
                                    className="text-sm text-red-500 dark:text-red-400"
                                    key={index}
                                >
                                    {error}
                                </div>
                            );
                        })}
                    </div>
                </form>
            </Box>
            <Box title="Current Listing Images">
                <section className="mt-4 grid grid-cols-3 gap-4">
                    {listing.images.length === 0 && (
                        <div>No images uploaded</div>
                    )}
                    {listing.images.map((image) => {
                        return (
                            <div
                                key={image.id}
                                className="flex flex-col justify-between gap-2"
                            >
                                <img src={image.src} className="rounded-md" />
                                <Link
                                    href={route(
                                        "realtor.listing.image.destroy",
                                        {
                                            listing: listing.id,
                                            image: image.id,
                                        }
                                    )}
                                    method="delete"
                                    as="button"
                                    className="btn-outline text-xs"
                                >
                                    DELETE
                                </Link>
                            </div>
                        );
                    })}
                </section>
            </Box>
        </div>
    );
}
