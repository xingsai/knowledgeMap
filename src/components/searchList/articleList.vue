<template>
  <div class="wrap">
    <div class="group_center">
      <div class="center_keyword">
        <span class="keyword_span">文章</span>
        <p class="keyword_p1"></p>
      </div>
    </div>
    <div class="type-wrap">
      <div
        class="list-one"
        v-for="(item,index) in typeList"
        :key="index"
        :class="{'activeStyle':(activeType==item.value?true:false)}"
        @click="changeType(item,index)"
      >{{item.name}}</div>
    </div>
    <div class="article-wrap" v-if="infoList&&infoList.length>0">
      <div
        class="list-one-article"
        v-for="(item,index) in infoList"
        :key="index"
        @click="goDetail(item)"
      >
        <div class="article-title textOverflow">{{index+1}}.{{item.materialTittle}}</div>
        <div class="article-time">{{item.createTime}}</div>
      </div>
    </div>
    <div v-else>无</div>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
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
    tapName: [String, Number],
    moduleCode: [String, Number], ////类型：String  必有字段  备注：党建模块(01：支部组织架构；02：支部规范动作；03：党建理论；04：支部成果展示；05：做法创新；06：廉政文化馆；07：典型引路；08：支部共建共享)
    typeList: {
      type: Array,
      default: function () {
        return [];
      },
    },
     activeType: {
      type: [String, Number],
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
    //获取分类
    // getType() {
    //   this.$http.author
    //     .post("/party/materialCenter/getBusinessTypeList", {
    //       moduleCode: this.moduleCode,
    //     })
    //     .then(({ data }) => {
    //       if (data.success === true) {
    //         this.typeList = data.data.businessTypeList;
    //       } else {
    //         console.log("接口调用出错");
    //       }
    //     });
    // },
    changeType(item) {
      if( this.activeType ==item.value){
          this.activeType=''
      }else{
        this.activeType = item.value;
      }
      
      this.getInfolist();
    },
    //获取对应type  下的列表
    getInfolist(item, index) {
      this.$http.author
        .post("/party/materialCenter/getMaterialArticleList", {
          moduleCode: this.moduleCode, //类型：String  必有字段  备注：党建模块(01：支部组织架构；02：支部规范动作；03：党建理论；04：支部成果展示；05：做法创新；06：廉政文化馆；07：典型引路；08：支部共建共享)
          businessType: this.activeType, //类型：String  可有字段  备注：业务类型（即文章视频图片分类）
          currentPage: this.tableInfo.page, //类型：String  必有字段  备注：文章当前所在页码
          pageSize: this.tableInfo.pageSize, //类型：String  必有字段  备注：文章每页记录数
        })
        .then(({ data }) => {
          if (data.success === true) {
            this.infoList = data.data.articleList;
            this.tableInfo.totalCount=data.data.articleTotal
          } else {
            console.log("接口调用出错");
          }
        });
    },
    goDetail(item) {
       this.$router.push({ name: "articleDetail" ,params: { id:item.id,name:this.tapName }});
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
    margin-bottom: 20px;
    margin-top:20px;

    .list-one {
      margin-right: 10px;
      background-color: #ffd7e2;
      color: #e77291;
      font-size: 14px;
      padding: 9px 15px;
      box-sizing: border-box;
      cursor: pointer;
      border-radius: 2px;
    }
    .activeStyle {
      color: #fff;
      background-color: #e8466d;
    }
  }
  .article-wrap {
    .list-one-article {
      margin: 20px 0;
      display: flex;
       cursor: pointer;
      .article-title {
        margin-right: 100px;
        flex: 1;
      }

      .article-time {
        float: right;
        color: #999;
        flex: 0 0 80px;
      }
    }
  }
}
</style>