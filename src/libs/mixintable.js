export const tableMethods = {
  data(){
    return{
      pageSizeOpts: this.$store.state.app.tableInfo.pageSizeOpts,
      tableData: [],
      totalCount: 0,
      page:1,
      pageSize:10,
      //tableHeight:auto,
      loading:true,
      showMore:false,
    }
  },
  mounted() {
    //重新计算table的高度
    this.$nextTick(()=>{
      this.resizeTabeleHeight()
    })
  },
  watch:{
    showMore(){
      this.resizeTabeleHeight()
    },
  },
  methods: {
    resizeTabeleHeight(){
      this.$nextTick(function () {
        //重新计算table的高度
       // let topHeight=this.$refs.headerWrap?this.$refs.headerWrap.clientHeight:0;
       // let bottomHeight=this.$refs.bottomWrap?this.$refs.bottomWrap.clientHeight:0;
       // this.tableHeight=this.$refs.tableBox.clientHeight-topHeight-5-bottomHeight;
      })
    },
    //点击查询需要初始化页码，
    researchTableInfo(){
      this.page=1;
      this.searchTableInfo();
    },
    //修改页码 ，重新加载数据
    changePage (row) {
      this.page = row;
      this.searchTableInfo();
    },
    //修改每页展示的数据条数
    changeSize(size){
      this.pageSize=size
      this.page=1
      this.searchTableInfo();
    },
    //导出数据
    exportInfo(){
      console.log(111)
      this.$Modal.confirm({
        title: '提示',
        content: `确定导出吗？`,
        onOk: ()=>{
          this.exportOk()
        }
      })
    },
  }

}
