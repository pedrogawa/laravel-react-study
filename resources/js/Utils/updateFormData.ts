export type FormData<T> = Record<keyof T, any>;

export default function updateFormData<T>(
    name: string,
    value: any,
    setData: (field: keyof T, value: T[keyof T]) => void,
    formData: FormData<T>
) {
    if (name in formData) {
        setData(name as keyof T, value);
    } else {
        throw new Error(`Invalid key: ${name}`);
    }
}
