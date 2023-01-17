<template>
    <div class="container">
        <div class="title">场所码统计</div>
        <el-table
            size="mini"
            :data="qrTable"
            style="width: 100%"
            :border="true"
            :header-cell-style="{ background: '#F5F7FA', color: '#909399' }"
        >
            <el-table-column align="center" prop="qrCount" label="场所码总数"> </el-table-column>
            <el-table-column align="center" prop="scanQrCount" label="扫码次数"> </el-table-column>
            <el-table-column align="center" prop="noScanQrCount" label="场所码‘零扫码’"> </el-table-column>
        </el-table>
        <div class="title">在外人员统计</div>
        <el-table
            size="mini"
            :data="lbTableData"
            style="width: 100%"
            :border="true"
            :header-cell-style="{ background: '#F5F7FA', color: '#909399' }"
        >
            <el-table-column align="center" prop="name" label="地址"> </el-table-column>
            <el-table-column align="center" prop="lb1" label="在灵人员"> </el-table-column>
            <el-table-column align="center" prop="lb2" label="群众标记"> </el-table-column>
            <el-table-column align="center" prop="lb3" label="乡镇核查"> </el-table-column>
        </el-table>

        <div class="title">矿巡码</div>
        <el-table
            size="mini"
            :data="kkTableData"
            style="width: 100%"
            :border="true"
            :header-cell-style="{ background: '#F5F7FA', color: '#909399' }"
        >
            <el-table-column align="center" prop="name" label="地址"> </el-table-column>
            <el-table-column align="center" prop="num" label="坑口数"> </el-table-column>
            <el-table-column align="center" prop="clockIn" label="已打卡"> </el-table-column>
            <el-table-column align="center" prop="clockNo" label="未打卡"> </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            qrTable: [
                {
                    qrCount: 0,
                    scanQrCount: 0,
                    noScanQrCount: 0,
                },
            ],
            lbTableData: [],
            kkTableData: [
                {
                    name: "灵宝市",
                    num: "0",
                    clockIn: "0",
                    clockNo: "0",
                },
            ],
        };
    },
    created() {
        this.initData();
    },
    methods: {
        async initData() {
            let data = await this.$api.getOtherCount();
            this.qrTable[0].qrCount = data.qrCount[0] || 0;
            this.qrTable[0].scanQrCount = data.qrCount[1] || 0;
            this.qrTable[0].noScanQrCount = data.qrCount[2] || 0;

            this.kkTableData[0].num = data.qrCount[3] || 0;
            this.kkTableData[0].clockIn = data.qrCount[4] || 0;
            this.kkTableData[0].clockNo = (data.qrCount[3] || 0) - (data.qrCount[4] || 0);

            this.lbTableData = data.lbCount;
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
    padding: 0;
    margin: 0;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.el-table .cell {
    padding-left: 0px !important;
    padding-right: 0px !important;
    font-size: 10px !important;
}
.el-table--mini .el-table__cell {
    padding: 0px 0 !important;
}
.el-table table {
    width: unset !important;
}
</style>
<style lang="scss" scoped>
.container {
    .title {
        text-align: center;
        font-size: 20px;
        margin: 20px 0px;
    }
}
</style>
