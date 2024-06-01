import Address from "@/Components/Address";
import Box from "@/Components/Box";
import Listing from "@/Interface/Listing";
import Pagination from "@/Interface/Pagination";
import PaginationComponent from "@/Components/Pagination";
import { Link } from "@inertiajs/inertia-react";
import { useRoute } from "ziggy-js";
import FiltersComponent from "./Components/Filters";
import Filters from "@/Interface/Filters";

interface IndexProps {
    listings: Pagination<Listing>;
    filters: Filters;
}

export default function Index({ listings, filters }: IndexProps) {
    const route = useRoute();
    return (
        <div className="flex flex-col gap-8">
            <FiltersComponent filters={filters} />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {listings.data.map((listing) => {
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
            {listings.data.length <= 0 && (
                <span className="text-center">No listings found</span>
            )}
            {listings.data.length > 0 && (
                <div className="w-full flex justify-center">
                    <PaginationComponent links={listings.links} />
                </div>
            )}
        </div>
    );
}
