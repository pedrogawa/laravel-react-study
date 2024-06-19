import Price from "@/Components/Address/Price";
import EmptyState from "@/Components/EmptyState";
import PaginationComponent from "@/Components/Pagination";
import Notification from "@/Interface/Notification";
import Pagination from "@/Interface/Pagination";
import { Link } from "@inertiajs/inertia-react";
import { useRoute } from "ziggy-js";

interface NotificationProps {
    notifications: Pagination<Notification>;
}

export default function Index({ notifications }: NotificationProps) {
    const route = useRoute();

    return (
        <div>
            <h1 className="text-3xl mb-4">Your Notifications!</h1>
            {notifications.data.length > 0 ? (
                <section className="text-gray-700 dark:text-gray-400">
                    {notifications.data.map((notification) => {
                        const { amount, listing_id } = notification.data;
                        return (
                            <div
                                key={notification.id}
                                className="border-b border-gray-200 dark:border-gray-800 py-4 flex justify-between items-center"
                            >
                                <div>
                                    {notification.type ===
                                        "App\\Notifications\\OfferMade" && (
                                        <span>
                                            Offer{" "}
                                            <Price price={amount} size="" /> for{" "}
                                            <Link
                                                href={route(
                                                    "realtor.listing.show",
                                                    {
                                                        listing: listing_id,
                                                    }
                                                )}
                                                className="text-indigo-600 dark:text-indigo-400"
                                            >
                                                listing
                                            </Link>
                                        </span>
                                    )}
                                </div>
                                <div>
                                    {!notification.read_at && (
                                        <Link
                                            href={route("notification.seen", {
                                                notification: notification.id,
                                            })}
                                            as="button"
                                            method="put"
                                            className="btn-outline text-xs font-medium uppercase"
                                        >
                                            Mark as read
                                        </Link>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </section>
            ) : (
                <EmptyState>No notifications yet!</EmptyState>
            )}
            {notifications.data.length > 0 && (
                <section className="w-full flex justify-center mt-8 mb-8">
                    <PaginationComponent links={notifications.links} />
                </section>
            )}
        </div>
    );
}
