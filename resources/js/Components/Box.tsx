interface BoxProps {
    children: React.ReactNode;
    title?: string;
    className?: string;
}

export default function Box({ children, className, title }: BoxProps) {
    const name = className
        ? `border border-gray-200 dark:border-gray-800 rounded-md p-4 shadow-sm dark:text-gray-300 ${className}`
        : "border border-gray-200 dark:border-gray-800 rounded-md p-4 shadow-sm dark:text-gray-300";

    return (
        <div className={name}>
            {title && <div className="text-gray-500 font-medium">{title}</div>}
            {children}
        </div>
    );
}
