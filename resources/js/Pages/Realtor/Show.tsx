import AddressInfo from "@/Components/Address/AddressInfo";
import Price from "@/Components/Address/Price";
import Box from "@/Components/Box";
import Listing from "@/Interface/Listing";
import Offer from "@/Interface/Offer";
import { Link } from "@inertiajs/inertia-react";
import { useRoute } from "ziggy-js";

type ListingWithOffers = Omit<Listing, "images"> & {
    offers: Offer[];
};

interface ShowProps {
    listing: ListingWithOffers;
}

export default function Show({ listing }: ShowProps) {
    console.log(listing.offers);
    const route = useRoute();
    return (
        <div className="flex flex-col gap-4">
            <Link href={route("realtor.listing.index")}>
                🔙 Back to Listings
            </Link>
            <section className="flex flex-col-reverse md:grid md:grid-cols-12 gap-4">
                <Box className="flex md:col-span-7 items-center">
                    {listing.offers.length > 0 ? (
                        <div>
                            <span>We have offers</span>
                        </div>
                    ) : (
                        <div className="w-full text-center font-medium text-gray-500">
                            No offers
                        </div>
                    )}
                </Box>
                <Box className="md:col-span-5" title="Basic Info">
                    <Price price={listing.price} size="medium" />
                    <AddressInfo listing={listing} />
                    <div className="text-gray-500">
                        {listing.street} {listing.street_nr}, {listing.city}
                    </div>
                </Box>
            </section>
        </div>
    );
}
