import { Listing } from "@/Pages/Listing/Index";

interface AddressInfoProps {
    listing: Listing;
}

export default function AddressInfo({ listing }: AddressInfoProps) {
    return (
        <div>
            <span className="font-bold">{listing.beds}</span> beds{" "}
            <span className="text-gray-400">|</span>{" "}
            <span className="font-bold">{listing.baths}</span> baths{" "}
            <span className="text-gray-400">|</span>{" "}
            <span className="font-bold">{listing.area}</span> m
        </div>
    );
}
