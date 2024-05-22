import { Link } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

interface MainLayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        let interval;
        setInterval(() => {
            interval = setTimer((prevState) => prevState + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <nav>
                <Link href="/">Main Page</Link>
                <Link href="/hello">Show Page</Link>
            </nav>
            {timer}
            <section>{children}</section>
        </div>
    );
}
