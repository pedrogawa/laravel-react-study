import Image from "./Image";

export default interface Listing {
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
    deleted_at: Date;
    sold_at: Date;
}
