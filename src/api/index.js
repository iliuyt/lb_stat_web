// prop-types 使用文档 https://react.docschina.org/docs/typechecking-with-proptypes.html

import * as ApiConfig from "./config";
import fetch from "./fetch";

let Api = {};

// 设置api属性，遍历方法名和方法
Object.entries(ApiConfig).forEach(([name, defination]) => {
    Object.defineProperty(Api, name, {
        enumerable: true,
        configurable: false,
        get: () => {
            return async function(args) {
                let { method, path, option } = defination;
                // 设置默认值
                method = method || "GET";
                path = path.toLowerCase();

                // 请求参数
                let fetchData = Object.assign(
                    {
                        url: path,
                        method,
                    },
                    option
                );

                // 默认参数为对象
                args = args || {};

                // 参数检查并组装请求
                if (method.toUpperCase() === "GET") {
                    fetchData.params = args;
                } else {
                    fetchData.data = args;
                }

                // 发生请求
                let data = await fetch(fetchData);
                return Promise.resolve(data);
            };
        },
    });
});

const install = function(Vue) {
    if (install.installed) return;
    install.installed = true;

    //定义属性到Vue原型中
    Object.defineProperties(Vue.prototype, {
        $api: {
            get() {
                return Api;
            },
        },
    });
};

export default {
    Api,
    install,
};
