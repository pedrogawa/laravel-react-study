interface PriceProps {
    price: number | string;
    size: "small" | "medium" | "large";
}
export default function Price({ price, size }: PriceProps) {
    function getTextSize() {
        const fontSize = {
            small: "text-xs",
            medium: "text-2xl",
            large: "text-3xl",
        };

        return fontSize[size] ?? "text-2xl";
    }

    const formattedPrice = Number(price).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    });

    return (
        <span className={`${getTextSize()} font-bold`}>{formattedPrice}</span>
    );
}
