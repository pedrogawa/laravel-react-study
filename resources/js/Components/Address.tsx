import { Listing } from "@/Pages/Listing/Index";

interface AddressProps {
    listing: Listing;
}

export default function Address({ listing }: AddressProps) {
    return (
        <div>
            {listing.street} {listing.street_nr}, {listing.city}, for{" "}
            {listing.price}
        </div>
    );
}
