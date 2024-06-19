interface BoxProps {
    children: React.ReactNode;
    title?: string;
    className?: string;
    badge?: boolean;
}

export default function Box({ children, className, title, badge }: BoxProps) {
    const name = className
        ? `border border-gray-200 dark:border-gray-800 rounded-md p-4 shadow-sm dark:text-gray-300 ${className}`
        : "border border-gray-200 dark:border-gray-800 rounded-md p-4 shadow-sm dark:text-gray-300";

    return (
        <div className={name}>
            {title && (
                <div className="text-gray-500 font-medium">
                    {title}
                    {badge && (
                        <span className="dark:bg-green-900 dark:text-green-200 bg-green-200 text-green-900 p-1 rounded-md uppercase ml-2">
                            Accepted
                        </span>
                    )}
                </div>
            )}
            {children}
        </div>
    );
}
