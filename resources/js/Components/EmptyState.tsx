import Box from "./Box";

interface EmptyStateProps {
    children: React.ReactNode;
}

export default function EmptyState({ children }: EmptyStateProps) {
    return (
        <Box className="md:col-span-7 flex items-center w-full">
            <div className="w-full text-center font-medium text-gray-500">
                {children}
            </div>
        </Box>
    );
}
