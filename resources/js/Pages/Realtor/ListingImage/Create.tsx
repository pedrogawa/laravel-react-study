import Box from "@/Components/Box";
import Listing from "@/Interface/Listing";
import { useForm } from "@inertiajs/inertia-react";
import React from "react";
import { useRoute } from "ziggy-js";

interface CreateProps {
    listing: Listing;
}

interface FormData {
    images: File[];
}

export default function Create({ listing }: CreateProps) {
    const route = useRoute();
    const { data, post, setData, reset } = useForm<FormData>({
        images: [],
    });

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        console.log(event.target.value);
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
            }
        );
    }

    function clearForm() {
        reset("images");

        (document.getElementById("images") as HTMLInputElement).value = "";
    }

    const filesNames = data.images.map((file) => file.name).join(", ");

    console.log(filesNames);

    return (
        <Box title="Upload new images">
            <form onSubmit={handleSubmit} className="flex">
                <input
                    type="file"
                    name="images"
                    className="none"
                    id="images"
                    multiple
                    onChange={handleChange}
                />
                <div className="flex gap-4">
                    <button type="submit" className="btn-outline">
                        Upload
                    </button>
                    <button className="btn-outline" onClick={clearForm}>
                        Reset
                    </button>
                </div>
            </form>
        </Box>
    );
}
