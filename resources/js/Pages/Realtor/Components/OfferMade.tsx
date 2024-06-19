import Price from "@/Components/Address/Price";
import Box from "@/Components/Box";
import Offer from "@/Interface/Offer";
import User from "@/Interface/User";
import formatDate from "@/Utils/formatDate";
import { Link } from "@inertiajs/inertia-react";
import { useRoute } from "ziggy-js";

type OfferWithBidder = Offer & {
    bidder: User;
};

interface OfferMadeProps {
    offer: OfferWithBidder;
    listingPrice: number;
    isSold: boolean;
}

export default function OfferMade({
    offer,
    listingPrice,
    isSold,
}: OfferMadeProps) {
    const route = useRoute();

    return (
        <Box
            title={`Offer #${offer.id}`}
            className="w-full"
            badge={!!offer.accepted_at}
        >
            <section className="flex items-center justify-between">
                <div>
                    <Price price={offer.amount} size="normal" />
                    <div className="text-gray-500">
                        Difference:{" "}
                        <Price
                            price={offer.amount - listingPrice}
                            size="normal"
                        />
                    </div>

                    <div className="text-gray-500 text-sm">
                        Made by {offer.bidder.name}
                    </div>

                    <div className="text-gray-500 text-sm">
                        Made on {formatDate(offer.created_at)}
                    </div>
                </div>
                <div>
                    {isSold && (
                        <Link
                            href={route("realtor.offer.accept", {
                                offer: offer.id,
                            })}
                            className="btn-outline text-xs font-medium"
                            as="button"
                            method="put"
                        >
                            Accept
                        </Link>
                    )}
                </div>
            </section>
        </Box>
    );
}
