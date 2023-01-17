<template>
    <div class="container">
        <van-search v-model="searchKey" placeholder="请输入姓名、身份证号、手机号查询" @search="onSearch" />

        <div v-if="dataList.length > 0">
            <van-cell-group>
                <van-field label="姓名" v-model="userInfo.name" readonly />
                <van-field label="身份证" v-model="userInfo.idCard" readonly />
                <van-field label="手机号" v-model="userInfo.phone" readonly />
            </van-cell-group>

            <div v-for="(item, index) in dataList" :key="index" class="item-box">
                <van-cell-group inset>
                    <van-cell title="针剂" :value="item.timeType" />
                    <van-cell title="日期" :value="item.inDate" />
                    <van-cell title="类型" :value="item.type" />
                    <van-cell title="企业" :value="item.enterprise" />
                    <van-cell title="地址" :value="item.address" />
                    <van-cell title="接种点" :value="item.groupText" />
                    <van-cell title="审核状态" :value="item.statusText" />
                </van-cell-group>
            </div>
        </div>
        <van-empty v-else description="没有查询到结果" />
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            searchKey: "",
            userInfo: null,
            dataList: [],
        };
    },
    created() {
    },
    methods: {
        async onSearch() {
            let statusMap = {
                "0": "驳回",
                "1": "审核中",
                "2": "审核通过",
            };
            let data = await this.$api.getVaccineList({
                searchKey: this.searchKey,
            });
            if (!data || !data.userInfo) {
                this.dataList = [];
                this.userInfo = null;
            }
            this.userInfo = data.userInfo;
            this.dataList = data.list.map((x) => {
                return {
                    inDate: x.inDate.replace(" 00:00:00", ""),
                    address: `${x.provinceText}${x.cityText}${x.countryText}`,
                    enterprise: x.enterprise,
                    type: x.type,
                    timeType: x.timeType,
                    groupText: x.groupText,
                    statusText: statusMap[x.status],
                };
            });
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
    height: 100%;
    background: #f2f2f2;
    padding: 0;
    margin: 0;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
<style lang="scss" scoped>
.container {
    .item-box {
        margin: 10px 0;
    }
}
</style>
