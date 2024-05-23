import Address from "@/Components/Address";
import { Listing } from "./Index";

interface ShowProps {
    listing: Listing;
}

export default function Show({ listing }: ShowProps) {
    return (
        <div>
            <Address listing={listing} />
        </div>
    );
}
