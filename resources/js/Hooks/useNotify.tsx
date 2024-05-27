import { useEffect } from "react";
import { toast } from "react-toastify";

function useNotify(flash: { success?: string; error?: string }) {
    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success, {
                pauseOnHover: false,
                theme: "dark",
            });
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);
}

export default useNotify;
