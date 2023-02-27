import Vue from "vue";
import App from "./App.vue";
import api from "@/api";

// 1. 引入你需要的组件
import { Button, Search, Empty, Cell, Field, CellGroup } from "vant";
// 2. 引入组件样式
import "vant/lib/index.css";

// 3. 注册你需要的组件
Vue.use(Button);
Vue.use(Search);
Vue.use(Empty);
Vue.use(Field);
Vue.use(Cell);
Vue.use(CellGroup);

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
