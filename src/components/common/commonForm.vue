<template>
  <div>
    <el-form
      class="common-edit-wxc dynamic-component"
      ref="commonForm"
      labelPosition="top"
      inline
      :model="modelConfig.rulesForm"
    >
      <el-row :gutter="20" style="flex-wrap: wrap;">
        <el-col v-for="(item,index) in modelConfig.formItems" :key="index" :span="Number(item.column)">
          <el-form-item v-if="item.type=='text'" :label="item.label" :prop="item.model">
            <span>{{modelConfig.rulesForm[Object.keys(modelConfig.rulesForm)[index]] | dash}}</span>
          </el-form-item>
          <el-form-item
            v-if="item.type=='input'"
            :rules="item.rules"
            :label="item.label"
            :prop="item.model"
          >
            <el-input
              :disabled="item.disabled"
              v-model="modelConfig.rulesForm[Object.keys(modelConfig.rulesForm)[index]]"
              clearable
              :maxlength="item.maxlength||'20'"
              class="common-len"
              :placeholder="item.placeholder || '请输入'"
            ></el-input>
          </el-form-item>
          <el-form-item
            v-if="item.type=='select'"
            :rules="item.rules"
            :label="item.label"
            :prop="item.model"
            :placeholder="item.placeholder || '请选择'"
          >
            <el-select
              v-model="modelConfig.rulesForm[Object.keys(modelConfig.rulesForm)[index]]"
              placeholder="请选择"
              clearable
              :filterable="item.filterable || false"
              :multiple="item.multiple || false"
              :collapse-tags="item.multiple || false"
              class="common-len"
            >
              <el-option
                v-for="itemOpts in item.options"
                :key="itemOpts.value"
                :label="itemOpts.name"
                :value="itemOpts.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="item.type=='cascader'"
            :rules="item.rules"
            :label="item.label"
            :prop="item.model"
          >
            <el-cascader
              v-model="modelConfig.rulesForm[Object.keys(modelConfig.rulesForm)[index]]"
              :options="item.options"
              :props="{ value:'value',label:'name',children:'children'}"
              style="width:100%"
            ></el-cascader>
          </el-form-item>
          <el-form-item
            v-if="item.type=='datepick'"
            :rules="item.rules"
            :label="item.label"
            :prop="item.model"
          >
             <el-date-picker
              style="width:100%"
              v-model="modelConfig.rulesForm[Object.keys(modelConfig.rulesForm)[index]]"
              :type="item.dateType"
              :disabled="item.disabled"
              range-separator="-"
              :value-format="item.format ? item.format :'yyyy-MM-dd HH:mm:ss'"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
           <el-form-item
            class="radio-item"
            v-if="item.type=='radio'"
            :rules="item.rules"
            :label="item.label"
            :prop="item.model"
          >
             <el-radio-group v-model="modelConfig.rulesForm[Object.keys(modelConfig.rulesForm)[index]]">
              <el-radio v-for="(itemOpts,itemIndex) in item.options" :key="itemIndex" :label="itemOpts.value">{{itemOpts.name}}</el-radio>
            </el-radio-group>
          </el-form-item>
           <el-form-item
            v-if="item.type=='checkbox'"
            :rules="item.rules"
            :label="item.label"
            :prop="item.model"
          >
            <el-checkbox-group v-model="modelConfig.rulesForm[Object.keys(modelConfig.rulesForm)[index]]">
              <el-checkbox 
                v-for="(itemOpts,itemIndex) in item.options"
                :key="itemOpts.value + itemIndex"
                :label="itemOpts.value">
                {{itemOpts.name}}
              </el-checkbox>
             </el-checkbox-group>
          </el-form-item>
           <el-form-item
            v-if="item.type=='textarea'"
            :rules="item.rules"
            :label="item.label"
            :prop="item.model"
            style="position:relative"
          >
            <el-input
              type="textarea"
              :rows="item.rows"
              maxlength="500"
              placeholder="请输入内容"
              v-model="modelConfig.rulesForm[Object.keys(modelConfig.rulesForm)[index]]"></el-input>
              <span class="pos-desc">可输入500个汉字</span>
          </el-form-item>
          <el-form-item
            v-if="item.type=='selecttree'"
            :rules="item.rules"
            :label="item.label"
            :prop="item.model"
            style="position:relative"
          >
            <treeselect
              placeholder="请选择"
              :normalizer="normalizer"
              :options="item.options"
              v-model="modelConfig.rulesForm[Object.keys(modelConfig.rulesForm)[index]]">
            </treeselect> 
            <i class="icon-tree-pos el-icon-fa-sitemap"></i>
          </el-form-item>
          <el-form-item
            v-if="item.type=='component'"
            :label="item.label"
            :prop="item.model"
            style="position:relative"
          >
            <template type="text/x-template">
             <component :ref="item.comRef" :is="item.components" :attachPath="item.props.attachPath" :url="item.props.url"></component>
            </template>
          </el-form-item>

        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  props:['modelConfig'],
  data() {
    let that = this;
    return {
      normalizer(node) {
        //treeSelect方法
        return {
          id: node.value,
          label: node.name,
          children: node.children
        };
      },
      // modelConfig: {
      //   rulesForm: {
      //     appNo:"",
      //     username: "",
      //     password: "",
      //     dept: [],
      //     createTime:"",
      //     flag:"",
      //     checkboxDept:[],
      //     content:'',
      //     org:null
      //   },
      //   formItems: [
      //     {
      //       column: 6,
      //       label: "员工编号", //做测描述
      //       model: "appNo", //字段名
      //       value: "嘻嘻哈哈", //初始话数据
      //       type: "text", //类型（input||,text,textarea,select,radio,cheackbox,cascader,date）
      //       rules: [
      //         {
      //           required: true,
      //           message: "请输入用户名"
      //         }
      //       ]
      //     },
      //     {
      //       column: 6,
      //       label: "用户名", //做测描述
      //       model: "username", //字段名
      //       value: "嘻嘻哈哈", //初始话数据
      //       type: "input", //类型（inpu||t，textarea,select,radio,cheackbox,cascader,date）
      //       rules: [
      //         {
      //           required: true,
      //           message: "请输入用户名"
      //         }
      //       ]
      //     },
      //     {
      //       column: 6,
      //       label: "下拉框", //做测描述
      //       model: "password", //字段名
      //       value: "", //初始话数据
      //       type: "select", //类型（input ||,textarea,select,radio,cheackbox,cascader,date）
      //       filterable:false,  // 是否可搜索 true  可搜索  false 不可搜索
      //       multiple:false,  // 是否可多选 true  可多选  false 不可搜索
      //       limit:1,
      //       options: [
      //         {name: "单位",value: "01"},
      //         {name: "部门",value: "02"}
      //       ],
      //       components: "",
      //       rules: [
      //         {
      //           required: true,
      //           message: "请先择",
      //           trigger: "change"
      //         }
      //       ]
      //     },
      //     {
      //       column: 6,
      //       label: "单位部门", //做测描述
      //       model: "dept", //字段名
      //       value: "", //初始话数据
      //       type: "cascader", //类型（input ||,textarea,select,radio,cheackbox,cascader,date）
      //       options: [
      //         {
      //           value: "zhinan",
      //           name: "指南",
      //           children: [
      //             {
      //               value: "shejiyuanze",
      //               name: "设计原则",
      //               children: [
      //                 {
      //                   value: "yizhi",
      //                   name: "一致"
      //                 },
      //                 {
      //                   value: "fankui",
      //                   name: "反馈"
      //                 },
      //                 {
      //                   value: "xiaolv",
      //                   name: "效率"
      //                 },
      //                 {
      //                   value: "kekong",
      //                   name: "可控"
      //                 }
      //               ]
      //             }
      //           ]
      //         }
      //       ],
      //       components: "",
      //       rules: [
      //         {
      //           required: true,
      //           message: "请先择",
      //           trigger: "change"
      //         }
      //       ]
      //     },
      //     {
      //       column: '6',
      //       label: "创建时间", //做测描述
      //       model: "createTime", //字段名
      //       value: "", //初始话数据
      //       type: "datepick", //类型（inpu||t，textarea,select,radio,cheackbox,cascader,date）
      //       dateType:'datetimerange',
      //       rules: [
      //         {
      //           required: true,
      //           message: "请选择创建时间",
      //           trigger: "change"
      //         }
      //       ]
      //     },
      //     {
      //       column: '6',
      //       label: "是否参与面试", //做测描述
      //       model: "flag", //字段名
      //       value: "", //初始话数据
      //       type: "radio", //类型（inpu||t，textarea,select,radio,cheackbox,cascader,date）
      //       options: [
      //         {
      //           name: "是",
      //           value: "01"
      //         },

      //         {
      //           name: "否",
      //           value: "02"
      //         }
      //       ],
      //       rules: [
      //         {
      //           required: true,
      //           message: "请选择",
      //           trigger: "change"
      //         }
      //       ]
      //     },
      //     {
      //       column: '6',
      //       label: "可选类型", //做测描述
      //       model: "checkboxDept", //字段名
      //       value: "", //初始话数据
      //       type: "checkbox", //类型（inpu||t，textarea,select,radio,cheackbox,cascader,date）
      //       options: [
      //         {name: "单位",value: "01"},
      //         {name: "部门",value: "02"},
      //         {name: "班组",value: "03"},
      //       ],
      //       rules: [
      //         {
      //           required: true,
      //           message: "请选择",
      //           trigger: "change"
      //         }
      //       ]
      //     },
      //     {
      //       column: 12,
      //       label: "详情描述", //做测描述
      //       model: "content", //字段名
      //       value: "", //初始话数据
      //       rows:'5', // 显示几行数据的高度
      //       type: "textarea", //类型（input||,text,textarea,select,radio,cheackbox,cascader,date）
      //       rules: [
      //         {
      //           required: true,
      //           message: "请输入详情描述",
      //         }
      //       ]
      //     },
      //     {
      //       column: 6,
      //       label: "组织机构", //做测描述
      //       model: "org", //字段名
      //       value: "", //初始话数据
      //       type: "selecttree", //类型（input ||,textarea,select,radio,cheackbox,cascader,date）
      //       options: [
      //         {
      //           value: "zhinan",
      //           name: "指南",
      //           children: [
      //             {
      //               value: "shejiyuanze",
      //               name: "设计原则",
      //               children: [
      //                 {
      //                   value: "yizhi",
      //                   name: "一致"
      //                 },
      //                 {
      //                   value: "fankui",
      //                   name: "反馈"
      //                 },
      //                 {
      //                   value: "xiaolv",
      //                   name: "效率"
      //                 },
      //                 {
      //                   value: "kekong",
      //                   name: "可控"
      //                 }
      //               ]
      //             }
      //           ]
      //         }
      //       ],
      //       components: "",
      //       rules: [
      //         {
      //           required: true,
      //           message: "请先择",
      //           trigger: "change"
      //         }
      //       ]
      //     },
      //   ]
      // },
    }
  },
  methods: {
    // 删除空children
    delEmptyChildren(arr) {
      arr &&
        arr.forEach(item => {
          if (!item.children || item.children.length < 1) {
            this.$delete(item, "children");
          } else {
            this.delEmptyChildren.call(this, item.children);
          }
        });
    },
    // 'system/orgCtrl/getOrgTree'
    getOptions(url,params,options,index){
      this.$http.author.post(url,{...params}).then(res => {
        let needData = res.data;
        if(needData.meta.code === '100'){
         this.delEmptyChildren(needData.data.list)
         this.$set(
          this.modelConfig.formItems[index],
          "options",
          needData.data.list
        );
        }
      })
    }
  },
  mounted(){
    // 获取数据
    this.modelConfig.formItems.forEach((item,index) => {
      if(item.url){
        this.getOptions(item.url,item.params,item.options,index)
      }
    })
  }
};
</script>
<style lang="less" scoped>
.icon-tree-pos{
  position: absolute;
  right: 8px;
  top: 6px;
  display: block;
  width: 20px;
  color: rgb(66, 197, 190);
  height: 20px;
  background: #fff;
  text-align: center;
  line-height: 20px;
}
.pos-desc{
  position: absolute;
  bottom: 0px;
  right: 10px;
  color: #AFAFAF;
  font-size: 14px;
}
</style>

