import AddressInfo from "@/Components/Address/AddressInfo";
import Price from "@/Components/Address/Price";
import Box from "@/Components/Box";
import PaginationComponent from "@/Components/Pagination";
import Listing from "@/Interface/Listing";
import Pagination from "@/Interface/Pagination";
import { Link } from "@inertiajs/inertia-react";
import { useRoute } from "ziggy-js";
import RealtorFilters from "./Components/Filters";

interface RealtorProps {
    listings: Pagination<Listing>;
    filters: {
        by: string;
        deleted: boolean;
        order: string;
    };
}

export default function Realtor({ listings, filters }: RealtorProps) {
    const route = useRoute();

    return (
        <div className="flex flex-col gap-8">
            <RealtorFilters filters={filters} />
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                {listings.data.map((listing) => {
                    const opacity = listing.deleted_at ? "opacity-25" : "";

                    return (
                        <Box key={listing.id}>
                            <div className="flex flex-col md:flex-row gap-2 md:items-center justify-between">
                                <div className={opacity}>
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
                                    <a
                                        href={route("listing.show", {
                                            listing: listing.id,
                                        })}
                                        className={`btn-outline text-xs font-medium`}
                                        style={{
                                            pointerEvents: listing.deleted_at
                                                ? "none"
                                                : "all",
                                        }}
                                        target="_blank"
                                    >
                                        Preview
                                    </a>
                                    <Link
                                        href={route(
                                            "realtor.listing.edit",
                                            listing.id
                                        )}
                                        className="btn-outline text-xs font-medium"
                                    >
                                        Edit
                                    </Link>
                                    {!listing.deleted_at && (
                                        <Link
                                            href={route(
                                                "realtor.listing.destroy",
                                                {
                                                    listing: listing.id,
                                                }
                                            )}
                                            as="button"
                                            method="delete"
                                            className="btn-outline text-xs font-medium"
                                        >
                                            Delete
                                        </Link>
                                    )}
                                    {listing.deleted_at && (
                                        <Link
                                            href={route(
                                                "realtor.listing.restore",
                                                {
                                                    listing: listing.id,
                                                }
                                            )}
                                            method="put"
                                            as="button"
                                            className="btn-outline text-xs font-medium"
                                        >
                                            Restore
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </Box>
                    );
                })}
            </section>
            {listings.data.length > 0 && (
                <div className="w-full flex justify-center">
                    <PaginationComponent links={listings.links} />
                </div>
            )}
        </div>
    );
}
