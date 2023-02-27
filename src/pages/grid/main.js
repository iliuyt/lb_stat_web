import Vue from "vue";
import App from "./App.vue";
import api from "@/api";

import { Table, TableColumn, Select, Option } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.prototype.$ELEMENT = { size: "min", zIndex: 3000 };
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Select);
Vue.use(Option);
Vue.use(api);

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
        localStorage.setItem("token", decodeURIComponent(query.token));
        localStorage.setItem("token_time", query.token_time);
    }
    if (query.token_time - tokenTime > 0) {
        localStorage.setItem("token", decodeURIComponent(query.token));
        localStorage.setItem("token_time", query.token_time);
    }
    location.replace(window.location.origin + window.location.pathname);
} else {
    let token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "/no_login.html";
    } else {
        new Vue({
            render: (h) => h(App),
        }).$mount("#app");
    }
}
