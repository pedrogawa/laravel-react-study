import { Formik, Form } from "formik";
import { Inertia } from "@inertiajs/inertia";

interface FormValues {
    beds: number;
    baths: number;
    area: number;
    city: string;
    street: string;
    street_nr: string;
    code: string;
    price: number;
}

export default function Create() {
    const initialValues: FormValues = {
        beds: 0,
        baths: 0,
        area: 0,
        city: "",
        street: "",
        street_nr: "",
        code: "",
        price: 0,
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async (values: FormValues) => {
                Inertia.post(
                    "/listing",
                    { ...values },
                    {
                        onError: (errors) => {
                            console.error(errors);
                        },
                        onSuccess: (page) => {
                            console.log(page);
                        },
                    }
                );
            }}
        >
            {({ values, handleChange, handleBlur }) => (
                <Form>
                    <div>
                        <label htmlFor="beds">Beds</label>
                        <input
                            type="number"
                            name="beds"
                            id="beds"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.beds}
                        />
                    </div>
                    <div>
                        <label htmlFor="baths">Baths</label>
                        <input
                            type="number"
                            name="baths"
                            id="baths"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.baths}
                        />
                    </div>
                    <div>
                        <label htmlFor="area">Area</label>
                        <input
                            type="number"
                            name="area"
                            id="area"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.area}
                        />
                    </div>
                    <div>
                        <label htmlFor="area">City</label>
                        <input
                            type="text"
                            name="city"
                            id="city"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.city}
                        />
                    </div>
                    <div>
                        <label htmlFor="street">Street</label>
                        <input
                            type="text"
                            name="street"
                            id="street"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.street}
                        />
                    </div>
                    <div>
                        <label htmlFor="street_nr">Street Number</label>
                        <input
                            type="text"
                            name="street_nr"
                            id="street_nr"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.street_nr}
                        />
                    </div>
                    <div>
                        <label htmlFor="Street">Code</label>
                        <input
                            type="text"
                            name="code"
                            id="code"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.code}
                        />
                    </div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.price}
                        />
                    </div>
                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    );
}
