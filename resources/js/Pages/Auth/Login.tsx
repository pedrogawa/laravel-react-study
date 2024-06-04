import FormInput from "@/Components/FormInput";
import updateFormData from "@/Utils/updateFormData";
import { useForm, Link } from "@inertiajs/inertia-react";
import { useRoute } from "ziggy-js";

export default function Login() {
    const route = useRoute();

    const { data, setData, post, errors } = useForm({
        email: "",
        password: "",
    });

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        updateFormData(name, value, setData, data);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        post(route("login.store"));
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 w-1/2 mx-auto">
                <FormInput
                    className=""
                    errors={errors.email}
                    handleChange={handleChange}
                    name="email"
                    value={data.email}
                />
                <FormInput
                    className=""
                    errors={errors.password}
                    handleChange={handleChange}
                    name="password"
                    value={data.password}
                />
                <button type="submit" className="btn-primary">
                    Login
                </button>
                <Link
                    href={route("user-account.create")}
                    className="text-sm text-center text-gray-500"
                >
                    Need an account? Click here
                </Link>
            </div>
        </form>
    );
}
