import { Link } from "@inertiajs/inertia-react";
import { useRoute } from "ziggy-js";

export default function VerifyEmail() {
    const route = useRoute();

    return (
        <div>
            You need to be verified to see this page.
            <div>
                <Link
                    href={route("verification.send")}
                    method="post"
                    as="button"
                    className="text-indigo-600 dark:text-indigo-400"
                >
                    Resend Verification Email
                </Link>
            </div>
        </div>
    );
}
