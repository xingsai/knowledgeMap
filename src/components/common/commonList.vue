<script>
export default {
  data() {
    return {
      // column:[
      //   {prop:'selection',type:"selection",width:'55'},
      //   {prop:'name', label:"姓名", width:'180'},
      //   {prop:'date', label:"日期", width:'180'},
      //   {prop:'address', label:"地址"},
      //   {prop:'action', label:"操作", width:'200',
      //     component:(props)=>{
      //       // <el-button onClick={() => this.callback(props)} type="text" size="small">查看</el-button>
      //       // <el-button type="text" size="small">编辑</el-button>
      //       return (
      //         <div> 
      //         <el-tooltip
      //             effect="dark"
      //             content="修改"
      //             placement="bottom"
      //           >
      //             <el-button
      //               type="text"
      //               onClick={() => this.callback(props)} 
      //               style="cursor:pointer"
      //             >
      //               <i class="el-icon-fa-clipboard"></i>
      //             </el-button>
      //           </el-tooltip>
      //         </div>
      //       )
      //     },
      //   },
      // ],
      props:{
        config:{
          type:Object,
          required:true
        },
        // column:{
        //   type:Array,
        //   required:true
        // },
        // data:{
        //   type:Array,
        //   required:true
        // },
      },
      // data: [
      //   {
      //     index:0,
      //     date: "2016-05-02",
      //     name: "王小虎",
      //     address: "上海市普陀区金沙江路 1518 弄"
      //   },
      //   {
      //     index:1,
      //     date: "2016-05-04",
      //     name: "王小虎",
      //     address: "上海市普陀区金沙江路 1517 弄"
      //   },
      //   {
      //     index:2,
      //     date: "2016-05-01",
      //     name: "王小虎",
      //     address: "上海市普陀区金沙江路 1519 弄"
      //   },
      //   {
      //     index:3,
      //     date: "2016-05-03",
      //     name: "王小虎",
      //     address: "上海市普陀区金沙江路 1516 弄"
      //   }
      // ]
    };
  },
  methods:{
    callback(val){
      console.log('tag',val)
    },
    handleSelectionChange(val){
      console.log(val);
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex % 2 === 0) {
        if (columnIndex === 1) {
          return [1, 2];
        } else if (columnIndex === 1) {
          return [0, 0];
        }
      }
    }
  },
  render() {
    // console.log(crateElmentFn(),context);
    // {...{on: {'selection-change':this.handleSelectionChange}}}
    // data={this.$attrs.data}
    return(
      <div>
       <el-table stripe={this.$attrs.config.stripe} data={this.$attrs.config.data} on-selection-change = {this.$attrs.config.handleSelectionChange?this.$attrs.config.handleSelectionChange : function() {} } >
        {this.$attrs.config.column.map((item, index) => {
          return item.component? (
          <el-table-column
            key={index}
            label={item.label}
            width={item.width}
            fixed={item.fixed}
            {...{
              scopedSlots: {
                default: props => {
                  return (
                    {...item.component(props.row)}
                  )
                }
              }
            }}
        ></el-table-column>):(<el-table-column fixed={item.fixed} type={item.type}  prop={item.prop} label={item.label} width={item.width} ></el-table-column>)
        })}
        </el-table>
      </div>
    )
  }
};
</script>


