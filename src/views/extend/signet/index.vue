<template>
  <div class="tem-container app-container">
    <el-button @click="print" class="signs print">打印</el-button>
    <el-button @click="showlip" v-if="showBtn" class="signs">盖章</el-button>
    <div ref="print">
      <div class="tem_list">
        <div class="tem_main">
          <h1>宏安四维科技有限公司</h1>
          <h2>报 价 单</h2>
          <h4>TO：</h4>
          <p class="title"> 感谢惠顾，现将贵公司所需配件报价如下：</p>
          <p class="lip">一、产品价格</p>
          <div style="padding: 0 1px 0 0">
            <el-table :data="tableData" border>
              <el-table-column prop="order" label="序号" width="50"></el-table-column>
              <el-table-column prop="name" label="品名" width="150"></el-table-column>
              <el-table-column prop="standards" label="规格" width="100"></el-table-column>
              <el-table-column prop="num" label="数量" width="60"></el-table-column>
              <el-table-column prop="unit" label="单位" width="60"></el-table-column>
              <el-table-column prop="unitprice" label="单价"></el-table-column>
              <el-table-column prop="total" label="金额"></el-table-column>
              <el-table-column prop="remarks" label="备注"></el-table-column>
            </el-table>
          </div>
          <p class="lip">二、通讯联络</p>
          <div class="content1">
            <div class="item">
              <span>需方联系人员：</span>
              <span>丰梦琪</span>
            </div>
            <div class="item">
              <span>供方联系人员：</span>
              <span>应白梦</span>
            </div>
            <div class="item">
              <span>需方联系电话：</span>
              <span>13802141322</span>
            </div>
            <div class="item">
              <span>供方联系电话：</span>
              <span>13802141322</span>
            </div>
            <div class="item">
              <span>需方传真号码：</span>
              <span>010-88888888</span>
            </div>
            <div class="item">
              <span>供方传真号码：</span>
              <span>021-88888888</span>
            </div>
            <div class="item">
              <span>供方地址：</span>
              <span>北京市海淀区西直门北大街42号</span>
            </div>
            <div class="item">
              <span>供方地址：</span>
              <span>上海市青浦区</span>
            </div>
            <div class="item">
              <span>供方邮编：</span>
              <span>100000</span>
            </div>
            <div class="item">
              <span>供方邮编：</span>
              <span>201799</span>
            </div>
          </div>
          <div class="temdate">日 期：2017-11-29</div>
          <div class="seal">盖章：</div>
        </div>
        <VueDragResize :isDraggable="showBtn" :w="150" :h="150" :isResizable='false' v-if="showsin">
          <img
            src="data:image/png;base64,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"
            alt="">
          <div class="signBtn">
            <el-button @click="signclick" v-if="showBtn">确认</el-button>
            <el-button @click="cancelSign" v-if="showBtn">取消</el-button>
          </div>
        </VueDragResize>
      </div>
    </div>
  </div>
</template>
<script>
import VueDragResize from 'vue-drag-resize'
import printStyle from '../printData/printStyle'

export default {
  name: 'extend-signet',
  data() {
    return {
      showSign: true,
      showBtn: true,
      showsin: false,
      key: '',
      labelPosition: 'right',
      connect: {
        user: '丰梦琪',
        supply: '应白梦',
        userPhone: '13802141322',
        supplyPhone: '13004363886',
        useremail: '010-88888888',
        supplyemail: '021-88888888',
        useraddress: '北京市海淀区西直门北大街42号',
        supplyaddress: '上海市青浦 区',
        userPostcode: '100000',
        suPostcode: '201799'
      },
      tableData: [{
        order: '1',
        name: '服务器硬件',
        standards: '联想',
        num: '5',
        unit: '台',
        unitprice: '20000.00',
        total: '100000.00',
        remarks: ''
      }, {
        order: '2',
        name: '数据库正版',
        standards: 'SQLServer',
        num: '5',
        unit: '套',
        unitprice: '9998.00',
        total: '49990.00',
        remarks: ''
      }, {
        order: '3',
        name: 'OA内部管理系统',
        standards: '定制',
        num: '5',
        unit: '套',
        unitprice: '	390000.00',
        total: '	390000.00',
        remarks: ''
      }, {
        order: '4',
        name: '进销存管理系统',
        standards: '定制',
        num: '5',
        unit: '套',
        unitprice: '260000.00',
        total: '260000.00',
        remarks: ''
      }, {
        order: '5',
        name: '	服务费',
        standards: '',
        num: '5',
        unit: '年',
        unitprice: '80000.00',
        total: '80000.00',
        remarks: ''
      }, {
        order: '6',
        name: '差旅费用',
        standards: '',
        num: '5',
        unit: '年',
        unitprice: '60000.00',
        total: '80000.00',
        remarks: ''
      }]
    }
  },
  components: { VueDragResize },
  methods: {
    print() {
      let print = this.$refs.print.innerHTML
      let printPart = print + printStyle;
      let newTab = window.open('_blank');
      newTab.document.body.innerHTML = printPart;
      newTab.print();
      newTab.close();
    },
    showlip() {
      this.showsin = true
    },
    signclick() {
      this.showSign = false
      this.showBtn = false
    },
    cancelSign() {
      this.showsin = false
    }
  }
}
</script>

<style lang="scss" scoped>
.tem-container {
  background: #ebeef5 !important;
  overflow: auto;
  position: relative;
  padding: 0;
  .signs {
    position: absolute;
    right: 10px;
    top: 70px;
    &.print {
      top: 20px;
    }
  }
  .signBtn {
    display: flex;
    justify-content: space-between;
  }
  .tem_list {
    width: 800px;
    margin: 0 auto;
    background: #fff;
    // box-shadow: rgb(189, 189, 189) 0px 0px 10px;
    color: #606266;
    position: relative;
    .tem_main {
      width: 90%;
      margin: 0 auto;
      font-size: 12px;
      padding-bottom: 15px;
      h1 {
        padding-top: 36px;
      }
      h1,
      h2 {
        text-align: center;
        color: #475059;
      }
      .title {
        border-bottom: 2px dashed #000;
        padding-left: 30px;
        line-height: 30px;
        font-size: 12px;
      }
      .lip {
        padding: 20px 0;
      }

      .demo-form-inline {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }
      .el-form-item--mini.el-form-item,
      .el-form-item--small.el-form-item {
        border-bottom: 1px solid #ebeef5;
        width: 48%;
        margin: 0;
        >>> .el-input__inner {
          border: 0 !important;
          padding: 0;
          width: 220px;
          font-size: 12px;
        }
        >>> .el-form-item__label {
          font-size: 12px;
        }
      }
      .temdate {
        text-align: right;
        margin: 20px 60px;
      }
      .seal {
        text-align: right;
        margin: 10px 120px;
        padding-bottom: 40px;
      }
    }
  }
  .vdr.active:before {
    outline: 0;
  }
  .vdr.active {
    img {
      width: 100%;
      height: 100%;
    }
  }
  >>> .el-table thead tr th {
    background: #fff !important;
  }
  .el-table td,
  .el-table th.is-leaf {
    background: #fff !important;
  }
  .content1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    .item {
      width: 345px;
      padding: 8px 0;
      border-bottom: 1px solid #ebeef5;
      span {
        font-size: 12px;
        padding: 10px 0;
        color: #606266;
      }
    }
  }
}
</style>