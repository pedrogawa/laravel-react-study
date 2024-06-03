import AddressInfo from "@/Components/Address/AddressInfo";
import Price from "@/Components/Address/Price";
import Box from "@/Components/Box";
import Listing from "@/Interface/Listing";
import { Link } from "@inertiajs/inertia-react";
import { useRoute } from "ziggy-js";

interface RealtorProps {
    listings: Listing[];
}

export default function Realtor({ listings }: RealtorProps) {
    const route = useRoute();

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl">Your Listings</h1>
                <section className="">Filters</section>
            </div>
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                {listings.map((listing) => (
                    <Box key={listing.id}>
                        <div className="flex flex-col md:flex-row gap-2 md:items-center justify-between">
                            <div>
                                <div className="xl:flex items-center gap-2">
                                    <Price
                                        price={listing.price}
                                        size="medium"
                                    />
                                    <AddressInfo listing={listing} />
                                </div>
                                <div className="text-gray-500 text-sm">
                                    {listing.street} {listing.street_nr},{" "}
                                    {listing.city}
                                </div>
                            </div>
                            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                                <Link
                                    href=""
                                    className="btn-outline text-xs font-medium"
                                >
                                    Preview
                                </Link>
                                <Link
                                    href=""
                                    className="btn-outline text-xs font-medium"
                                >
                                    Edit
                                </Link>
                                <Link
                                    href=""
                                    className="btn-outline text-xs font-medium"
                                >
                                    Delete
                                </Link>
                            </div>
                        </div>
                    </Box>
                ))}
            </section>
        </div>
    );
}
