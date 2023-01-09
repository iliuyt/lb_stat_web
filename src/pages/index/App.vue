<template>
    <div class="container">
        <div class="header">
            <div class="header_title">"小"网格展现"大"作为</div>
            <div class="header_desc">
                灵宝市以“居住地为维度”创新社会治理新模,整合搭建六级网格体系，构筑起了，底子清、责任明、落实快、效果好的社会治理新模式
            </div>
        </div>
        <div class="user_count">
            <div class="user_count_box">
                <div class="user_count_icon"></div>
                <div class="user_count_text">入网格人数</div>
                <div class="user_count_count">{{ countData.userGridCount || 0 }}</div>
            </div>
            <div class="border"></div>
            <div class="user_count_box">
                <div class="user_count_icon"></div>
                <div class="user_count_text">注册总人数</div>
                <div class="user_count_count">{{ countData.userCount || 0 }}</div>
            </div>
        </div>
        <div class="stat_count">
            <div class="stat_count_box">
                <div class="stat_count_text">驿站</div>
                <div class="stat_count_count">{{ countData.yzCount || 0 }}</div>
            </div>
            <div class="stat_count_box">
                <div class="stat_count_text">酒店</div>
                <div class="stat_count_count">{{ countData.jdCount || 0 }}</div>
            </div>
            <div class="stat_count_box">
                <div class="stat_count_text">其他</div>
                <div class="stat_count_count">{{ countData.qtCount || 0 }}</div>
            </div>
        </div>
        <div class="grid_title">网格数量</div>
        <div class="grid_gap"></div>

        <div class="grid_count">
            <div class="grid_count_box">
                <div class="grid_count_icon"></div>
                <div class="grid_count_text">一级网格</div>
                <div class="grid_count_count">{{ levelMap["一级网格"] || 0 }}</div>
            </div>
            <div class="grid_count_box">
                <div class="grid_count_icon"></div>
                <div class="grid_count_text">二级网格</div>
                <div class="grid_count_count">{{ levelMap["二级网格"] || 0 }}</div>
            </div>
            <div class="grid_count_box">
                <div class="grid_count_icon"></div>
                <div class="grid_count_text">三级网格</div>
                <div class="grid_count_count">{{ levelMap["三级网格"] || 0 }}</div>
            </div>
        </div>
        <div class="grid_count">
            <div class="grid_count_box">
                <div class="grid_count_icon"></div>
                <div class="grid_count_text">四级网格</div>
                <div class="grid_count_count">{{ levelMap["四级网格"] || 0 }}</div>
            </div>
            <div class="grid_count_box">
                <div class="grid_count_icon"></div>
                <div class="grid_count_text">五级网格</div>
                <div class="grid_count_count">{{ levelMap["五级网格"] || 0 }}</div>
            </div>
            <div class="grid_count_box">
                <div class="grid_count_icon"></div>
                <div class="grid_count_text">六级网格</div>
                <div class="grid_count_count">{{ levelMap["六级网格"] || 0 }}</div>
            </div>
        </div>

        <div class="btn_group">
            <div class="btn" @click="openPage('/user_list')">
                <div class="btn1 btn_icon"></div>
                人员信息查询
            </div>
            <div class="btn" @click="openPage('/user_list')">
                <div class="btn2 btn_icon"></div>
                六级网格查询
            </div>
        </div>
        <div class="btn_group">
            <div class="btn" @click="openPage('/user_list')">
                <div class="btn1 btn_icon"></div>
                疫苗接种查询
            </div>
            <div class="btn" @click="openPage('/user_list')">
                <div class="btn2 btn_icon"></div>
                数据统计
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            levelMap: {},
            countData: {},
        };
    },
    created() {
        this.setRem();
        window.onresize = function() {
            this.setRem();
        };
        this.getStatData();
    },
    computed: {},
    methods: {
        setRem() {
            // 当前页面宽度相对于 1920宽的缩放比例，可根据自己需要修改。
            const scale = document.documentElement.clientWidth / 750;
            // 设置页面根节点字体大小（“Math.min(scale, 2)” 指最高放大比例为2，可根据实际业务需求调整）
            document.documentElement.style.fontSize = 7.5 * Math.min(scale, 2) + "px";
        },
        async getStatData() {
            let data = await this.$api.getStatData();
            console.log(data);
            for (const item of data.levelCount) {
                if (item.level) {
                    this.levelMap[item.level] = item.sum || 0;
                }
            }
            delete data.level;
            this.countData = data;
        },
        openPage(path) {
            location.href = path;
        },
    },
};
</script>

<style>
html,
body,
div {
    box-sizing: border-box;
}
html,
body,
.container {
    width: 100%;
    height: 100%;
}
</style>

<style lang="scss" scoped>
.container {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    padding: 0;
    margin: 0;
    background: #060627;
    .header {
        width: 100%;
        height: 40rem;
        background: url("/img/head.png") no-repeat;
        background-size: 100% 100%;
        color: #fff;
        .header_title {
            font-size: 4.6rem;
            font-weight: bold;
            width: 100%;
            padding-top: 12rem;
            text-align: center;
        }
        .header_desc {
            font-size: 2.6rem;
            width: 70%;
            text-align: center;
            margin: 12rem auto;
        }
    }
    .border {
        height: 13.1rem;
        width: 0.1rem;
        background: linear-gradient(243deg, #020931 0%, #0048ff 51%, #011a6a 100%);
    }
    .user_count {
        color: #fff;
        display: flex;
        margin: 5rem 8rem 2rem 8rem;
        .user_count_box {
            width: 50%;
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            .user_count_icon {
                background: url("/img/icon1.png") no-repeat;
                background-size: 100% 100%;
                height: 7rem;
                width: 8rem;
            }
            .user_count_text {
                background: #002cff;
                font-size: 2rem;
                padding: 0.5rem 1.5rem;
                margin-top: -1.5rem;
            }
            .user_count_count {
                font-size: 4rem;
            }
        }
    }
    .stat_count {
        color: #fff;
        display: flex;
        margin: 2rem 8rem 2rem 8rem;
        .stat_count_box {
            width: 50%;
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;

            border: 0.2rem solid transparent;
            background-clip: padding-box, border-box;
            background-origin: padding-box, border-box;
            background-image: linear-gradient(180deg, #0431a2, #060627), linear-gradient(0deg, #223f9d, #00a5ff);
            padding: 1.5rem 0rem;
            .stat_count_text {
                font-size: 2.6rem;
            }
            .stat_count_count {
                font-size: 4rem;
            }
        }
    }
    .grid_title {
        color: #fff;
        font-size: 4rem;
        text-align: center;
        margin-top: 6rem;
    }
    .grid_gap {
        width: 20.2rem;
        height: 1rem;
        margin: 1.2rem auto;
        background: repeating-linear-gradient(
            55deg,
            #002cff 25%,
            #060627 0,
            #060627 50%,
            #002cff 0,
            #002cff 75%,
            #060627 0
        );
        background-size: 1.8rem 1.8rem;
    }
    .grid_count {
        color: #fff;
        display: flex;
        margin: 0rem 7rem;
        .grid_count_box {
            width: 50%;
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;

            border: 0.2rem solid transparent;
            background-clip: padding-box, border-box;
            background-origin: padding-box, border-box;
            background-image: linear-gradient(180deg, #060627, #060627), linear-gradient(0deg, #223f9d, #00a5ff);
            padding: 1.5rem 0rem;
            margin: 1rem;
            .grid_count_icon {
                background: url("/img/grid2.png") no-repeat;
                background-size: 100% 100%;
                height: 4.4rem;
                width: 4.4rem;
                margin: 1rem;
            }
            .grid_count_text {
                font-size: 2.6rem;
            }
            .grid_count_count {
                font-size: 4rem;
            }
        }
    }

    .btn_group {
        color: #fff;
        display: flex;
        margin: 7rem 7.7rem 0 7.7rem;
        justify-content: space-between;
        .btn {
            background: url("/img/btn1.png") no-repeat;
            background-size: 100% 100%;
            height: 7rem;
            width: 40%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.2rem;
            .btn_icon {
                background-size: 100% 100%;
                height: 3rem;
                width: 3rem;
                margin-right: 0.5rem;
            }
            .btn1 {
                background: url("/img/grid1.png") no-repeat;
                background-size: 100% 100%;
            }
            .btn2 {
                background: url("/img/grid3.png") no-repeat;
                background-size: 100% 100%;
            }
            .btn_text {
                font-size: 2.2rem;
            }
        }
    }
}
</style>
