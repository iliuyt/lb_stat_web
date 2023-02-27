import axios from "axios";
import { Message } from "element-ui";

const fetch = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // api的base_url
    timeout: 60000, // 请求超时时间
});
fetch.interceptors.request.use(
    (config) => {
        let tid = localStorage.getItem("x_trace_id");
        let token = decodeURIComponent(localStorage.getItem("token"));
        if (token) {
            config.headers["authorization"] = token;
        }
        if (tid) {
            config.headers["x-trace-id"] = tid;
        }
        return config;
    },
    (error) => {
        // 错误处理
        Promise.reject(error);
    }
);

// respone interceptor
fetch.interceptors.response.use(
    async (res) => {
        if (res.status === 200) {
            if (res.headers["new-authorization"]) {
                localStorage.setItem("token", decodeURIComponent(res.headers["new-authorization"]));
                localStorage.setItem("token_time", Date.now());
            }
            if (res.headers["x-trace-id"]) {
                localStorage.setItem("x_trace_id", res.headers["x-trace-id"]);
            }
            let data = res.data;
            if (data.code === 200) {
                return Promise.resolve(data.data);
            } else if (data.code === 401) {
                location.href = "/no_login.html";
            } else if (res.headers["content-type"].includes("image")) {
                return Promise.resolve(
                    "data:image/png;base64," +
                        btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ""))
                );
            } else {
                // 业务失败
                Message.error("访问异常");
                return Promise.reject(data);
            }
        } else if (res.status === 204) {
            return Promise.resolve();
        } else {
            let errMsg = "服务异常:" + res.status;
            console.error(errMsg);
            Message.error(errMsg);
            return Promise.reject({
                code: res.status,
                message: errMsg,
            });
        }
    },
    async (error) => {
        console.error("服务错误", error);
        let code = 500;
        let errMsg = "服务错误:" + error.message;
        let netError = ["request:fail -105:net::ERR_NAME_NOT_RESOLVED", "request:fail timeout"];
        if (error && netError.includes(error.errMsg)) {
            errMsg = "网络繁忙请重试";
            code = 501;
        }
        Message.error(errMsg);
        return Promise.reject({
            code,
            message: errMsg,
        });
    }
);

export default fetch;
