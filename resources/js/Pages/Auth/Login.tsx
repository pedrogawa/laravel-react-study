import FormInput from "@/Components/FormInput";
import { useForm } from "@inertiajs/inertia-react";
import { useRoute } from "ziggy-js";

export default function Login() {
    const route = useRoute();

    const { data, setData, post, errors } = useForm({
        email: "",
        password: "",
    });

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        switch (name) {
            case "email":
            case "password":
                setData(name, value);
        }
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
            </div>
        </form>
    );
}
