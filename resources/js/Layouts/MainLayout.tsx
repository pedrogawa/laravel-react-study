import useNotify from "@/Hooks/useNotify";
import { Link, usePage } from "@inertiajs/inertia-react";
import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRoute } from "ziggy-js";

interface MainLayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    const route = useRoute();
    const { flash, user } = usePage().props as any;
    useNotify(flash);

    return (
        <main>
            <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 w-full">
                <div className="container mx-auto">
                    <nav className="p-4 flex items-center justify-between">
                        <Link
                            href={route("listing.index")}
                            className="text-lg font-medium"
                        >
                            Listings
                        </Link>
                        <Link
                            href={route("listing.index")}
                            className="text-xl text-indigo-600 dark:text-indigo-300 font-bold text-center"
                        >
                            LaraZillow
                        </Link>
                        {user && (
                            <div className="flex items-center gap-4">
                                <Link
                                    href={route("notification.index")}
                                    className="text-gray-500 cursor-pointer relative pr-2 py-2 text-lg"
                                >
                                    🔔
                                    {!!user.notificationCount && (
                                        <div className="absolute right-0 top-0 w-5 h-5 bg-red-700 dark:bg-red-400 text-white font-medium border border-white dark:border-gray-900 rounded-full text-xs text-center">
                                            {Math.min(
                                                user.notificationCount,
                                                9
                                            )}
                                        </div>
                                    )}
                                </Link>
                                <Link
                                    href={route("realtor.listing.index")}
                                    className="text-gray-500 dark:text-gray-400"
                                >
                                    {user.name}
                                </Link>

                                <Link
                                    href={route("realtor.listing.create")}
                                    className="btn-primary"
                                >
                                    + New Listing
                                </Link>
                                <Link
                                    href={route("logout")}
                                    method="delete"
                                    as="button"
                                >
                                    Logout
                                </Link>
                            </div>
                        )}
                        {!user && (
                            <div className="flex items-center gap-6">
                                <Link href={route("user-account.create")}>
                                    Register
                                </Link>
                                <Link href={route("login")}>Sign-In</Link>
                            </div>
                        )}
                    </nav>
                </div>
            </header>
            <ToastContainer />
            <section className="container mx-auto p-4">{children}</section>
        </main>
    );
}
