import axios from "axios";

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
                    case 401: {
                        break;
                    }
                    case 403: {
                        break;
                    }
                    case 404: {
                        break;
                    }
                    case 500:
                    case 504: {
                        break;
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
                throw "NetworkError";
            }
        } catch (exception) {
            console.log(exception, "exception");
            if (exception === "NetworkError") {
                window.location.replace("/");
                console.log(exception, "exception");
            }
            return Promise.reject(error);
        }
    }
);

const http = instance;
export { http, contentTypeEnum };
