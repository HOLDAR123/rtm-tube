import {Bounce, toast, ToastOptions} from "react-toastify";
import React from "react";
import SuccessIcon from "../assets/icons/SuccessIcon";
import ErrorIcon from "../assets/icons/ErrorIcon";

class Toasts {
    private defaultSettings: ToastOptions = {
        position: "bottom-left",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
    }

    success(text: string) {
        toast.success(text, {
            ...this.defaultSettings,
            icon: <SuccessIcon/>
        });
    }

    error(text: string) {
        toast.error(text, {
            ...this.defaultSettings,
            icon: <ErrorIcon/>
        });
    }

    warn(text: string) {
        toast.warn(text, {
            ...this.defaultSettings,
            icon: <ErrorIcon/>
        });
    }

    info(text: string) {
        toast.info(text, {
            ...this.defaultSettings,
            icon: undefined
        });
    }
}

export default new Toasts();