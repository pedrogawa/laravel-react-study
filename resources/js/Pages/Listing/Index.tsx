import Address from "@/Components/Address";
import { Link } from "@inertiajs/react";

export interface Listing {
    id: number;
    area: number;
    baths: number;
    beds: number;
    city: string;
    code: string;
    created_at: Date;
    price: number;
    street: string;
    street_nr: string;
    updated_at: Date;
}

interface IndexProps {
    listings: Listing[];
}

export default function Index({ listings }: IndexProps) {
    return (
        <div>
            <span>Listings Page!</span>
            {listings.map((listing) => {
                return (
                    <div key={listing.id}>
                        <Link href={`/listing/${listing.id}`}>
                            <Address listing={listing} />
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}
