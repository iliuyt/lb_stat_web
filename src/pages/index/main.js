import Vue from "vue";
import App from "./App.vue";
import api from "@/api";
import "vant/lib/index.css";

Vue.use(api);

Vue.config.productionTip = false;

// 检查

const queryURLParams = () => {
    let url = location.href;
    let obj = {};
    url.replace(/([^?=&#]+)=([^?=&#]+)/g, (_, key, value) => (obj[key] = value));
    url.replace(/#([^?=&#]+)/g, (_, hash) => (obj["_hash"] = hash));
    return obj;
};

let query = queryURLParams();
// 设置token
if (query.token && query.token_time) {
    let tokenTime = localStorage.getItem("token_time");
    if (!tokenTime) {
        localStorage.setItem("token", query.token);
        localStorage.setItem("token_time", query.token_time);
    }
    if (query.token_time - tokenTime > 0) {
        localStorage.setItem("token", query.token);
        localStorage.setItem("token_time", query.token_time);
    }
}
let token = localStorage.getItem("token");
if (!token) {
    window.location.href = "/no_login.html";
} else {
    new Vue({
        render: (h) => h(App),
    }).$mount("#app");
}
