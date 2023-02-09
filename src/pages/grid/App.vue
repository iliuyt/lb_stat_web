<template>
    <div class="container">
        <div class="title">网格地图</div>
        <div class="select-box">
            <el-select
                size="small"
                v-model="currentGrid"
                placeholder="请选择网格"
                remote
                filterable
                reserve-keyword
                :remote-method="searchGridList"
                :loading="loading"
                @change="changeGrid"
            >
                <el-option v-for="item in gridList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </div>

        <div class="grid-map">
            <img id="gridImg" src="/img/map1.png" alt="" srcset="" />
        </div>
        <div class="title">不同人员数量</div>
        <el-table
            size="mini"
            :data="difUserTable"
            style="width: 100%"
            :border="true"
            :header-cell-style="{ background: '#F5F7FA', color: '#909399' }"
        >
            <el-table-column align="center" prop="userType" label="类别"> </el-table-column>
            <el-table-column align="center" prop="userCount" label="数量"> </el-table-column>
        </el-table>
        <div class="title">网格人员信息</div>
        <el-table
            size="mini"
            :data="gridUserTable"
            style="width: 100%"
            :border="true"
            :header-cell-style="{ background: '#F5F7FA', color: '#909399' }"
        >
            <el-table-column align="center" prop="type" label="类别"> </el-table-column>
            <el-table-column align="center" prop="name" label="姓名"> </el-table-column>
            <el-table-column align="center" prop="phone" label="手机号"> </el-table-column>
        </el-table>
        <div style="height:100px;"></div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            currentGrid: "4",
            loading: false,
            gridList: [
                {
                    value: "4",
                    label: "疫情防控网格总控",
                },
            ],
            difUserTable: [],
            gridUserTable: [],
        };
    },
    created() {
        this.changeGrid();
    },
    methods: {
        async searchGridList(query) {
            if (query !== "") {
                this.loading = true;
                try {
                    let data = await this.$api.searchGrid({
                        name: query,
                    });
                    this.gridList = data.map((x) => {
                        return {
                            value: x.id,
                            label: x.name,
                            img: x.img,
                        };
                    });
                } catch (error) {
                    console.log(error);
                }
                this.loading = false;
            } else {
                this.gridList = [];
            }
        },
        async changeGrid() {
            let grid = this.gridList.find((x) => x.value == this.currentGrid);
            if (grid && grid.img) {
                this.getFile(grid.img);
            } else {
                this.setDefaultImg();
            }

            let data = await this.$api.getUserCountGrid({
                id: this.currentGrid,
            });
            this.difUserTable = data.countList;
            this.gridUserTable = data.adminList.concat(data.bgList);
        },
        async getFile(key) {
            try {
                let data = await this.$api.getFile({
                    key,
                });
                document.getElementById("gridImg").src = data;
            } catch (error) {
                this.setDefaultImg();
            }
        },
        setDefaultImg() {
            setTimeout(() => {
                document.getElementById("gridImg").src = "/img/map1.png";
            }, 1);
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
    .grid-map {
        width: 80%;
        margin: 15px auto;
        border: 1px solid #ddd;
        box-shadow: 3px 1px 11px 0px #b7b7b7;
        img {
            width: 100%;
        }
    }
    .select-box {
        width: 80%;
        margin: 0 auto;
        .el-select {
            width: 100%;
        }
    }
}
</style>
