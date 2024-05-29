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

    console.log(user);

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
                                <div className="text-gray-500 dark:text-gray-400">
                                    {user.name}
                                </div>

                                <Link
                                    href={route("listing.create")}
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
                        {!user && <Link href={route("login")}>Sign-In</Link>}
                    </nav>
                </div>
            </header>
            <ToastContainer />
            <section className="container mx-auto p-4">{children}</section>
        </main>
    );
}
