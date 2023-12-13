import axios from "axios";
import { toast } from "react-toastify";

const REACT_APP_BASE_URL = process.env.BASE_URL;

let instance = axios.create({
    baseURL: REACT_APP_BASE_URL,
});

const contentTypeEnum = {
    json: "application/json",
    file: "multipart/form-data",
};

// request header
instance.interceptors.request.use(
    async (config) => {
        config.headers = {
            ...config.headers,
            Accept: "application/json",
            "Content-Type": config.contentType || contentTypeEnum.json,
        };
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// response parse
instance.interceptors.response.use(
    (response) => {
        return {
            status: response.status,
            data: response.data,
        };
    },
    async (error) => {
        const { config } = error;
        try {
            if (error.response) {
                const { status, data } = error.response;
                switch (status) {
                    case 404: {
                        toast.error(
                            `${error.response.status} ${error.response.statusText}`
                        );
                        break;
                    }
                    case 500: {
                        toast.error(
                            `${error.response.status} ${error.response.statusText}`
                        );
                        break;
                    }
                }
                if (config?.rejectLog !== true && status) {
                    if (
                        config?.showErrorMessage === undefined ||
                        config?.showErrorMessage === true
                    ) {
                        if (
                            error.response.status !== 404 &&
                            error.response.status !== 500
                        ) {
                            toast.error(
                                `${error.response.status} ${error.response.statusText}`
                            );
                        }
                    }
                }
                if (error.response) {
                    return {
                        status,
                        data,
                    };
                } else {
                    return Promise.reject(error);
                }
            } else {
                toast.error("Network Error");
            }
        } catch (exception) {
            if (exception === "NetworkError") {
                console.log(exception, "exception");
            }
            return Promise.reject(error);
        }
    }
);

const http = instance;

export { http, contentTypeEnum };
