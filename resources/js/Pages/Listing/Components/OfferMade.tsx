import Price from "@/Components/Address/Price";
import Box from "@/Components/Box";
import Offer from "@/Interface/Offer";
import formatDate from "@/Utils/formatDate";

interface OfferMadeProps {
    offer: Offer;
}

export default function OfferMade({ offer }: OfferMadeProps) {
    return (
        <Box title="Offer Made">
            <Price price={offer.amount} size="large" />

            <section className="mt-2 flex flex-col md:flex-row justify-between text-gray-500">
                <div>Made on</div>
                <div className="font-medium">
                    {formatDate(offer.created_at)}
                </div>
            </section>
        </Box>
    );
}
