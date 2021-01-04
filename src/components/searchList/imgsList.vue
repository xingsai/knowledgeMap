<template>
  <div class="wrap">
    <div class="group_center">
      <div class="center_keyword">
        <span class="keyword_span">图片</span>
        <p class="keyword_p1"></p>
      </div>
    </div>
    <div class="article-wrap">
      <div class="center_html">
        <div class="flex-wrap video-wrap" v-if="infoList&&infoList.length>0">
           <div v-for="(item,index) in  infoList" :key="index" class="video-list-one">
            <div class="img-wrap-all" @click="imgShow(item)">
              <img :src="item.imageUrl" alt class="img-style" />
            </div>
             <div style="overflow:hidden;"  class="name-tip">
              <div class=" textOverflow2">{{item.materialTittle}}</div>
            </div> 
          </div> 
        </div>
        <div v-else>无</div>
      </div>
    </div>
    <div class="clearfix" ref="bottomWrap">
      <el-pagination
        style="float:right;"
        @current-change="changePage"
        @size-change="changeSize"
        :current-page.sync="tableInfo.page"
        :page-sizes="tableInfo.pageSizeOpts"
        :page-size="tableInfo.pageSize"
        layout="total,  prev, pager, next, sizes"
        :total="Number(tableInfo.totalCount)"
      ></el-pagination>
    </div>
    <el-dialog :visible.sync="dialogVisible" :width="'500px'">
      <div>
        <img class="img-style" :src="currentImg" alt />
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      currentImg: "",
      
      tableInfo: {
        page: 1,
        pageSize: 10,
        pageSizeOpts: this.$store.state.app.tableInfo.pageSizeOpts,
        totalCount: 0,
      },
      infoList: [
    
      ],
    };
  },
  mounted() {},
  props: {
     moduleCode: [String, Number], ////类型：String  必有字段  备注：党建模块(01：支部组织架构；02：支部规范动作；03：党建理论；04：支部成果展示；05：做法创新；06：廉政文化馆；07：典型引路；08：支部共建共享)
    activeType: {
      type:  [String, Number],
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return '';
      },
    },
  },
  watch: {
    activeType: function (newQuestion, oldQuestion) {
      this.getInfolist();
    },
  },
  computed: {},
  created() {
     this.getInfolist();
  },
  mounted() {},
  methods: {
    //修改页码 ，重新加载数据
    changePage(row) {
      this.tableInfo.page = row;
      this.getInfolist();
    },
    //修改每页展示的数据条数
    changeSize(size) {
      this.tableInfo.pageSize = size;
      this.tableInfo.page = 1;
      this.getInfolist();
    },
    //获取对应type  下的列表
    getInfolist(item, index) {
      this.$http.author
        .post("/party/materialCenter/getMaterialImageList", {
          moduleCode: this.moduleCode, //类型：String  必有字段  备注：党建模块(01：支部组织架构；02：支部规范动作；03：党建理论；04：支部成果展示；05：做法创新；06：廉政文化馆；07：典型引路；08：支部共建共享)
          businessType: this.activeType, //类型：String  可有字段  备注：业务类型（即文章视频图片分类）
          currentPage: this.tableInfo.page, //类型：String  必有字段  备注：文章当前所在页码
          pageSize: this.tableInfo.pageSize, //类型：String  必有字段  备注：文章每页记录数
        })
        .then(({ data }) => {
          if (data.success === true) {
             this.infoList = data.data.imageList;
            this.tableInfo.totalCount=data.data.imageTotal
          } else {
            console.log("接口调用出错");
          }
        });
    },

    //图片展示
    imgShow(data) {
      this.dialogVisible = true;
      this.currentImg = data.imageUrl;
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/css/color.less";
.wrap {
  .group_center {
    margin: 20px 0;
    .center_html {
      margin-top: 30px;
      div {
        line-height: 20px;
      }
    }
  }
  .center_keyword {
    line-height: 20px;
    .keyword_span {
      float: left;
      font-weight: 700;
    }
    .keyword_p1 {
      border-bottom: 1px solid #ccc;
      margin-left: 60px;
      padding-top: 10px;
    }
  }
  .type-wrap {
    display: flex;
    margin-bottom: 10px;

    .list-one {
      margin-right: 10px;
      background-color: #ffd7e2;
      color: #e77291;
      font-size: 12px;
      padding: 5px 10px;
      box-sizing: border-box;
    }
    .activeStyle {
      color: #fff;
      background-color: #e8466d;
    }
  }
  .article-wrap {
    .video-wrap {
      flex-wrap: wrap;
    }
  }
  .img-wrap-all {
    height: 120px;
    width: 150px;
    margin-right: 20px;
    position: relative;
    margin-bottom: 20px;
    cursor: pointer;
  }
  .video-img-wrap {
    position: absolute;
    height: 40px;
    width: 40px;
    left: 50%;
    top: 50%;
    margin-left: -20px;
    margin-top: -20px;
  }
    .name-tip {
    line-height: 18px;
    width:150px;
    height:36px;
  }
}
.flex-wrap {
  display: flex;
  align-items: center;
}
.flex1 {
  flex: 1;
}
.img-style {
  height: 100%;
  width: 100%;
}
</style>