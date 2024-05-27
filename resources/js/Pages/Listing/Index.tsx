import Address from "@/Components/Address";
import Box from "@/Components/Box";
import { Link } from "@inertiajs/inertia-react";
import { useRoute } from "ziggy-js";

export interface Listing {
    id: number;
    area: number;
    baths: number;
    beds: number;
    city: string;
    code: string;
    created_at: Date;
    price: number;
    street: string;
    street_nr: string;
    updated_at: Date;
}

interface IndexProps {
    listings: Listing[];
}

export default function Index({ listings }: IndexProps) {
    const route = useRoute();
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {listings.map((listing) => {
                return (
                    <Box key={listing.id}>
                        <Link href={route("listing.show", listing.id)}>
                            <Address listing={listing} isCard />
                        </Link>
                        <Link href={route("listing.edit", listing.id)}>
                            Edit
                        </Link>
                        <div>
                            <Link
                                href={route("listing.destroy", listing.id)}
                                method="delete"
                                as="button"
                            >
                                Delete
                            </Link>
                        </div>
                    </Box>
                );
            })}
        </div>
    );
}
