<template>
    <div class="container">
        <div class="title">疫苗接种统计</div>
        <el-table size="mini" :data="tableData" style="width: 100%">
            <el-table-column align="center" prop="name" label="地址" width="80px"> </el-table-column>
            <el-table-column align="center" prop="sum" label="总人数" width="80px"> </el-table-column>
            <el-table-column align="center" label="第一针">
                <el-table-column align="center" prop="v1" label="人数" width="70px"> </el-table-column>
                <el-table-column align="center" prop="vp1" label="比率" width="70px"> </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="第二针">
                <el-table-column align="center" prop="v2" label="人数" width="70px"> </el-table-column>
                <el-table-column align="center" prop="vp2" label="比率" width="70px"> </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="第三针">
                <el-table-column align="center" prop="v3" label="人数" width="70px"> </el-table-column>
                <el-table-column align="center" prop="vp3" label="比率" width="70px"> </el-table-column>
            </el-table-column>
            <!-- <el-table-column align="center" label="第四针">
                <el-table-column align="center" prop="v4" label="人数" width="70px"> </el-table-column>
                <el-table-column align="center" prop="vp4" label="比率" width="70px"> </el-table-column>
            </el-table-column> -->
        </el-table>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            tableData: [],
        };
    },
    created() {
        this.initData();
    },
    methods: {
        async initData() {
            let data = await this.$api.getVaccineCount();
            this.tableData = data.list;
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
