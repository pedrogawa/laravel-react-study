import FormInput from "@/Components/FormInput";
import { useForm, Link } from "@inertiajs/inertia-react";
import { useRoute } from "ziggy-js";

export default function Create() {
    const route = useRoute();

    const { data, setData, post, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        switch (name) {
            case "name":
            case "email":
            case "password":
            case "password_confirmation":
                setData(name, value);
        }
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        post(route("user-account.store"));
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 w-1/2 mx-auto">
                <FormInput
                    className=""
                    errors={errors.name}
                    handleChange={handleChange}
                    name="name"
                    value={data.name}
                />
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
                <FormInput
                    className=""
                    errors={errors.password_confirmation}
                    handleChange={handleChange}
                    name="password_confirmation"
                    value={data.password_confirmation}
                />
                <button type="submit" className="btn-primary">
                    Create Account
                </button>
                <Link
                    href={route("login")}
                    className="text-sm text-center text-gray-500"
                >
                    Already have an account? Click here
                </Link>
            </div>
        </form>
    );
}
