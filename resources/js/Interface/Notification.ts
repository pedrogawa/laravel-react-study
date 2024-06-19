export default interface Notification {
    created_at: Date;
    data: {
        amount: number;
        bidder_id: number;
        offer_id: number;
        listing_id: number;
    };
    id: string;
    notifiable_id: number;
    notifiable_type: string;
    read_at: Date;
    type: string;
    updated_at: Date;
}
