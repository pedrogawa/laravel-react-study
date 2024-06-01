import Links from "@/Interface/Links";
import { Link } from "@inertiajs/inertia-react";

interface PaginationProps {
    links: Links[];
}

export default function PaginationComponent({ links }: PaginationProps) {
    function decodeHtmlEntities(text: string) {
        const txt = document.createElement("textarea");
        txt.innerHTML = text;
        return txt.value;
    }

    return (
        <div className="flex gap-1">
            {links.map((link, index) => {
                const isActiveClass = link.active
                    ? "py-2 px-4 rounded-md bg-indigo-500 dark:bg-indigo-800 text-gray-300"
                    : "py-2 px-4 rounded-md";

                return (
                    <Link
                        href={link.url || ""}
                        key={index}
                        className={isActiveClass}
                    >
                        {decodeHtmlEntities(link.label)}
                    </Link>
                );
            })}
        </div>
    );
}
