interface IndexProps {
    message: string;
}

export default function Index({ message }: IndexProps) {
    return <div>{message}</div>;
}
