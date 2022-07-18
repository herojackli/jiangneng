<template>
  <div>
    <div class="title">
      <p>制度操作流程</p>
    </div>

    <div class="header">
      <div class="header_title">江能智能运维</div>
      <div class="time">
        <span><i class="el-icon-time"></i></span>
        <span>最近更新时间</span>2021:15:20
      </div>
      <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="公司简介" name="first">
            <div class="tableheader">
              <span>数据表格</span>
              <span></span>
              <el-button type="primary" icon="el-icon-edit">编辑</el-button>
            
            </div>
            <div class="sheet">
              <el-table :data="tableData" border style="width: 100%" stripe header-align="center">
                <el-table-column prop="date" label="序号" width="120">
                </el-table-column>
                <el-table-column prop="name" label="公司名称" width="180">
                </el-table-column>
                <el-table-column prop="province" label="公司地址" width="180">
                </el-table-column>
                <el-table-column prop="city" label="公司简介">
                </el-table-column>
                <el-table-column prop="address" label="相关附件" width="300">
                </el-table-column>

                <el-table-column fixed="right" label="操作" width="100">
                  <template slot-scope="scope">
                    <el-button type="text" size="small">编辑</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100"
                layout="total, sizes, prev, pager, next, jumper" :total="400">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="制度管理" name="second">
            <div class="tableheader">
              <span>数据表格</span>
              <span>
                <span class="filename"> 文件名称：</span>
                <el-input v-model="input" placeholder="请输入关键字"></el-input>
                <el-button type="success" icon="el-icon-plus">新增</el-button>
              </span>
            </div>
            <div class="tablelist">
              <div class="table_box">
                <div>
                  <el-image :src="src"></el-image>
                  
                </div>
                <div class="table_content">
                  <div>名称名称</div>
                  <div>2022-03-25</div>
                </div>
                <div class="tool">
                  <div class="toolItem" @click="handleDel(item.id)">
                    <i class="el-icon-delete"></i>
                    <span class="name">删除</span>
                  </div>
                  <div class="toolItem" @click="look(item)">
                    <i class="el-icon-download"></i>
                    <span class="name">查看下载</span>
                  </div>
                  <div class="toolItem" @click="addOrUpdateHandle(item.id)">
                    <i class="el-icon-edit"></i>
                    <span class="name">编辑</span>
                  </div>
                </div>
              </div>
            </div>

          </el-tab-pane>
          <el-tab-pane label="操作手册" name="third">   <div class="tableheader">
              <span>数据表格</span>
              <span>
                <span class="filename"> 文件名称：</span>
                <el-input v-model="input" placeholder="请输入关键字"></el-input>
                <el-button type="success" icon="el-icon-plus">新增</el-button>
              </span>
            </div>
            <div class="tablelist">
              <div class="table_box">
                <div>
                  <el-image :src="src"></el-image>
                  
                </div>
                <div class="table_content">
                  <div>名称名称</div>
                  <div>2022-03-25</div>
                </div>
                <div class="tool">
                  <div class="toolItem" @click="handleDel(item.id)">
                    <i class="el-icon-delete"></i>
                    <span class="name">删除</span>
                  </div>
                  <div class="toolItem" @click="look(item)">
                    <i class="el-icon-download"></i>
                    <span class="name">查看下载</span>
                  </div>
                  <div class="toolItem" @click="addOrUpdateHandle()">
                    <i class="el-icon-edit"></i>
                    <span class="name">编辑</span>
                  </div>
                </div>
              </div>
            </div></el-tab-pane>
          <el-tab-pane label="泵站运行规程" name="fourth">泵站运行规程</el-tab-pane>
          <el-tab-pane label="标志标牌" name="fifth">标志标牌</el-tab-pane>
          <el-tab-pane label="规范管理" name="sixth">规范管理</el-tab-pane>
          <el-tab-pane label="工作标准" name="seventh">工作标准</el-tab-pane>
        </el-tabs>
      </div>
    </div>
     <HONGAN4D-Form v-if="formVisible" ref="HONGAN4DForm" @refresh="refresh" />
        <ExportBox v-if="exportBoxVisible" ref="ExportBox" @download="download" />
        <Detail v-if="detailVisible" ref="Detail" @refresh="detailVisible = false" />
        
        <!-- 浏览文件组件 -->
        <Preview :visible.sync="previewVisible" :file="activeFile" />
  </div>
</template>

<script>
import request from '@/utils/request'
import { getDictionaryDataSelector } from '@/api/systemData/dictionary'
import HONGAN4DForm from './Form'
import Preview from "@/components/Generator/components/Upload/Preview"
import ExportBox from './ExportBox'
import { getDataInterfaceRes } from '@/api/systemData/dataInterface'
import Detail from './Detail'
export default {
   components: { HONGAN4DForm, ExportBox, Detail, Preview },
  name: "systemMangement",
  data() {
    return {
      activeName: "second",
      input: "",
      //  图片
      src: "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
      // 公司简介
      tableData: [
        {
          date: "01",
          name: "浙江江能集团",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
      ],
      // 分页
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
       that:this,
            detailVisible: false,
            previewVisible: false,
            activeFile: {},
            query: {
                contractname: undefined,
                creationtime: undefined,
            },
            treeProps: {
                children: 'children',
                label: 'fullName',
                value: 'id'
            },
            list: [],
            listLoading: true,
            total: 0,
            listQuery: {
                currentPage: 1,
                pageSize: 20,
                sort: "desc",
                sidx: "",
            },
            formVisible: false,
            exportBoxVisible: false,
            columnList: [
                { prop: 'creationtime', label: '创建时间' },
                { prop: 'contractname', label: '合同名称' },
            ],
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 公司简介
    handleClick(row) {
      console.log(row);
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 编辑
         addOrUpdateHandle(id, isDetail) {
            this.formVisible = true
            this.$nextTick(() => {
                this.$refs.HONGAN4DForm.init(id, isDetail)
            })
        },
    // 删除列表
        handleDel(id) {
            console.log(id, "id")
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                type: 'warning'
            }).then(() => {
                request({
                    url: `/api/example/ProInfo_Contract/${id}`,
                    method: 'DELETE'
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: res.msg,
                        onClose: () => {
                            this.initData()
                        }
                    });
                })
            }).catch(() => {
            });
        },
        // 下载
          download(data) {
            let query = { ...data, ...this.listQuery, ...this.query, menuId: this.menuId }
            request({
                url: `/api/example/ProInfo_Contract/Actions/Export`,
                method: 'GET',
                data: query
            }).then(res => {
                if (!res.data.url) return
                window.location.href = this.define.comUrl + res.data.url
                this.$refs.ExportBox.visible = false
                this.exportBoxVisible = false
            })
        },
  },
};
</script>

<style lang="scss" scoped>
.title {
  background-color: #fff;
  width: 100%;
  height: 80px;

  p {
    font-size: 20px;
    padding: 30px;
  }
}

.header {
  background-color: #fff;
  width: 100%;
  margin-top: 20px;
  padding: 10px;

  .header_title {
    margin: 10px;
    font-size: 20px;
    color: #666;
  }

  .time {
    margin: 10px;
    color: #888;
    font-size: 14px;

    span {
      padding-right: 10px;
    }
  }
}

.sheet {
  margin-top: 20px;

  .pagination {
    float: right;
    margin-top: 30px;
  }
}

.tableheader {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid RGB(228, 231, 237);
}

// 制度管理
.el-input {
  width: 200px;
  padding-right: 15px;
}

.filename {
  margin-top: 5px;
  color: RGB(192, 196, 204);
}


.table_box {
   padding: 10px;
    float: left;
}
.tablelist {
    display: inline-block;
    width: calc(16.66% - 10px);
    margin-right: 10px;
    margin-bottom: 10px;
  margin-top: 20px;
  border-radius: 5px;
   box-shadow: 0px 1px 4px 0px rgba(2, 22, 41, 0.1);
}



.table_content {
  padding: 15px;
  border-bottom: 1px solid RGB(192, 196, 204);

  div:first-child {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  div:last-child {
    font-size: 13px;
    color: #888;
  }
}

.tool {
  display: flex;
  align-items: center;
  height: 32px;

  .toolItem {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    font-size: 12px;
    color: #999999;
    cursor: pointer;
  }

  .name {
    margin-left: 5px;
  }

}
</style>