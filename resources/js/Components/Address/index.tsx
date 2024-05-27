import { Listing } from "@/Pages/Listing/Index";
import calculateMonthlyPayment from "@/Utils/calculateMonthlyPayment";
import AddressInfo from "./AddressInfo";
import Price from "./Price";

interface AddressProps {
    listing: Listing;
    isCard: boolean;
}

export default function AddressCard({ listing, isCard }: AddressProps) {
    const monthlyPayment = calculateMonthlyPayment(2.5, listing.price, 20);

    return (
        <div>
            <div className="flex items-center gap-2">
                <Price price={listing.price} size="medium" />
                {isCard && (
                    <div className="text-xs text-gray-500">
                        <Price price={monthlyPayment} size="small" /> monthly
                    </div>
                )}
            </div>
            <AddressInfo listing={listing} />
            {listing.street} {listing.street_nr}, {listing.city}
        </div>
    );
}
