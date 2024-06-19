import AddressInfo from "@/Components/Address/AddressInfo";
import Price from "@/Components/Address/Price";
import Box from "@/Components/Box";
import Listing from "@/Interface/Listing";
import Offer from "@/Interface/Offer";
import User from "@/Interface/User";
import { Link } from "@inertiajs/inertia-react";
import { useRoute } from "ziggy-js";
import OfferMade from "./Components/OfferMade";

type OfferWithBidder = Offer & {
    bidder: User;
};

type ListingWithOffers = Omit<Listing, "images"> & {
    offers: OfferWithBidder[];
};

interface ShowProps {
    listing: ListingWithOffers;
}

export default function Show({ listing }: ShowProps) {
    const route = useRoute();
    return (
        <div className="flex flex-col gap-4">
            <Link href={route("realtor.listing.index")}>
                🔙 Back to Listings
            </Link>
            <section className="flex flex-col-reverse md:grid md:grid-cols-12 gap-4">
                <div className="flex flex-col gap-4 md:col-span-7">
                    {listing.offers.length > 0 ? (
                        <>
                            {listing.offers.map((offer) => {
                                return (
                                    <OfferMade
                                        key={offer.id}
                                        offer={offer}
                                        listingPrice={listing.price}
                                        isSold={!listing.sold_at}
                                    />
                                );
                            })}
                        </>
                    ) : (
                        <div className="w-full text-center font-medium text-gray-500">
                            No offers
                        </div>
                    )}
                </div>
                <div className="md:col-span-5">
                    <Box title="Basic Info">
                        <Price price={listing.price} size="medium" />
                        <AddressInfo listing={listing} />
                        <div className="text-gray-500">
                            {listing.street} {listing.street_nr}, {listing.city}
                        </div>
                    </Box>
                </div>
            </section>
        </div>
    );
}
