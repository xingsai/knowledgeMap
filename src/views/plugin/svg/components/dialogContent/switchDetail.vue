<template>
  <div>
    <el-form
      :model="nodeForm"
      status-icon
      ref="nodeForm"
      :rules="rules"
      label-width="0px"
      class="demo-nodeForm"
    >
     <!-- <el-form-item label="节点名称:" prop="name" label-width="100px">
        <el-input v-model="nodeForm.name"></el-input>
      </el-form-item>
      <el-form-item label="节点类型:" prop="type" label-width="100px">
        <div>
          {{ nodeForm.type | filterType }}
        </div>
      </el-form-item>
      <el-form-item label="节点描述:" prop="description" label-width="100px">
        <el-input type="textarea" v-model="nodeForm.description" :rows="2" class="resizeNone"></el-input>
      </el-form-item> -->
      <div class="">
        <span class="title-wrap">判别条件</span>
      </div>
      <div v-for="(item, index) in nodeForm.conditionsList" :key="index">
        <div v-if="index + 1 < conditionsList.length">
          <div class="case-wrap">
            case{{ index + 1 }}
            <span class="del-btn" @click="delListOne(index)">删除</span>
            <div style="width:80px;margin-left:10px;">
              <el-select v-model="item.relation"   placeholder="请选择">
                <el-option
                  v-for="item in relationOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <span class="btn-change-type" @click="changeType(item)">{{item.type=="normal"?"切换高级模式":'切换普通模式'}}</span>
          </div>
          <div v-for="(it, ind) in item.rules" :key="ind">
            <div class="flex-wrap" v-if="item.type == 'normal'">
              <el-form-item
                :prop="
                  'conditionsList.' + index + '.rules.' + ind + '.cascader'
                "
                :rules="{
                  required: true,
                  message: '判别条件值不能为空',
                  trigger: ['blur', 'change'],
                }"
              >
                <el-cascader
                  class="margin-right10"
                  v-model="it.cascader"
                  :options="options1"
                  @change="handleChange"
                >
                </el-cascader>
              </el-form-item>

              <el-form-item
                class="margin-right10"
                :prop="
                  'conditionsList.' + index + '.rules.' + ind + '.operator'
                "
                :rules="{
                  required: true,
                  message: '操作值不能为空',
                  trigger: ['blur', 'change'],
                }"
              >
                <el-select v-model="it.operator" placeholder="请选择">
                  <el-option
                    v-for="item2 in operatorOptions"
                    :key="item2.value"
                    :label="item2.label"
                    :value="item2.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                class="margin-right10"
                :prop="'conditionsList.' + index + '.rules.' + ind + '.value'"
                :rules="{
                  required: true,
                  message: '判断值不能为空',
                  trigger: ['blur', 'change'],
                }"
              >
                <el-select v-model="it.value" placeholder="请选择">
                  <el-option
                    v-for="item1 in options"
                    :key="item1.value"
                    :label="item1.label"
                    :value="item1.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <div
                class="del-btn-conditions"
                @click="delConditionsListOne(item.rules, ind)"
              >
                删除
              </div>
            </div>
            <div v-if="item.type != 'normal'" class="flex-wrap">
              <el-form-item
                class="margin-right10"
                :prop="'conditionsList.' + index + '.rules.' + ind + '.value'"
                :rules="{
                  required: true,
                  message: '值不能为空',
                  trigger: ['blur', 'change'],
                }"
                label="表达式"
                label-width="70px"
              >
                <el-input v-model="it.value"></el-input>
       
              </el-form-item>
              <div
                class="del-btn-conditions"
                @click="delConditionsListOne(item.rules, ind)"
              >
                删除
              </div>
            </div>
          </div>
          <div class="add-btn" @click="addConditionsList(item.rules)">
            +添加条件
          </div>
        </div>
        <div class="case-wrap" v-else>
          <div>case{{ index + 1 }} else</div>
        </div>
      </div>
      <div class="btn-add-case" @click="addCase">+ 新增case</div>
      <!-- <el-form-item label="自动继承到会话:" prop="age">
        <el-input v-model="nodeForm.age"></el-input>
      </el-form-item> -->
    </el-form>
  </div>
</template>
<script>
//一些公共的js方法混入
import mixinCommom from "./js/mix";
export default {
  mixins: [mixinCommom],
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    node: {
      type: Object,
      default: null,
    },
  },
  data: function () {
    return {
      cascader: [],
      conditionsList: [
        // {
        //   rules: [
        //     {
        //       targetType: "entity", //判断类型
        //       entityName: "city", //实体名称
        //       httpResponseProperty: "",
        //       customizedKey: "",
        //       operator: "isNull", //操作：>,>=,<,<=,==equal),!=,isNull,isNotNull,contains,regex
        //       value: "", //判断值
        //     },
        //     {
        //       targetType: "entity",
        //       entityName: "城市",
        //       httpResponseProperty: "",
        //       customizedKey: "",
        //       operator: "equal",
        //       value: "天津",
        //     },
        //   ],
        //   relation: "and", //条件关系（单独一个默认为 and）
        // },
        // {
        //   rules: [
        //     {
        //       operator: "else",
        //     },
        //   ],
        // },
      ],
      nodeForm: {},
      rules: {
        name: [
          { required: true, message: "节点名称不能为空", trigger: "blur" },
        ],
      },
      relationOptions: [
        {
          value: "and",
          label: "and",
        },
        {
          value: "or",
          label: "or",
        },
      ],
      edittitle: "",
      options: [
        {
          value: "1",
          label: "查天气",
        },
        {
          value: "2",
          label: "查电费",
        },
      ],
      options1: [
        {
          value: "entity",
          label: "entity",
          children: [
            {
              value: "city",
              label: "city",
            },
            {
              value: "城市",
              label: "城市",
            },
          ],
        },
        // {
        //   value: "11",
        //   label: "entity",
        //   children: [
        //     {
        //       value: "zhinan11",
        //       label: "指南1",
        //     },
        //     {
        //       value: "zhinan21",
        //       label: "指南2",
        //     },
        //   ],
        // },
      ],
      operatorOptions: [
        {
          value: ">",
          label: ">",
        },
        {
          value: ">=",
          label: ">=",
        },
        {
          value: "<",
          label: "<",
        },
        {
          value: "<=",
          label: "<=",
        },
        {
          value: "==",
          label: "==",
        },
        {
          value: "!=",
          label: "!=",
        },
        {
          value: "isNull",
          label: "isNull",
        },
        {
          value: "isNotNull",
          label: "isNotNull",
        },
        {
          value: "contains",
          label: "contains",
        },
        {
          value: "regex",
          label: "regex",
        },
      ],
    };
  },
  mounted() {
    console.log(this.visible);
  },

  methods: {
    changeType(item){
      if(item.type=="normal"){
         this.$set(item,"type","expression")
         this.$set(item,"rules",[
          {
            targetType: "",
            entityName: "",
            httpResponseProperty: "",
            customizedKey: "",
            operator: "",
            value: "",
          },
        ])
      }else{
         this.$set(item,"type","normal")
         this.$set(item,"rules",[
          {
            targetType: "",
            entityName: "",
            httpResponseProperty: "",
            customizedKey: "",
            operator: "",
            value: "",
          },
        ])
      }
    },
    handleChange() {},
    delListOne(index) {
      this.conditionsList.splice(index, 1);
    },
    addCase() {
      this.conditionsList.splice(this.conditionsList.length - 1, 0, {
        rules: [
          {
            targetType: "",
            entityName: "",
            httpResponseProperty: "",
            customizedKey: "",
            operator: "",
            value: "",
          },
        ],
        relation: "and", //条件关系（单独一个默认为 and）
      });
    },
    delConditionsListOne(data, index) {
      data.splice(index, 1);
    },
    addConditionsList(data) {
      data.push({
        targetType: "",
        entityName: "",
        httpResponseProperty: "",
        customizedKey: "",
        operator: "",
        value: "",
      });
    },
    //重置
    resetForm() {
      this.$refs.nodeForm.resetFields();
    },
    //提交
    submitForm() {
      this.$refs.nodeForm.validate((valid) => {
        console.log("验证" + valid);
        if (valid) {
          this.nodeForm.conditionsList.forEach((item) => {
            if (item.rules && item.rules.length > 0) {
              if (item.type == "normal") {
                item.rules.forEach((nextItem, nextIndex) => {
                  this.$set(nextItem, "targetType", nextItem.cascader[0]);
                  this.$set(nextItem, "entityName", nextItem.cascader[1]);
                  //this.$set(this.conditionsList[index].rules[nextIndex], "cascader", (arr));
                });
              } else {
              }
            }
          });

          this.$set(
            this.node.other_info,
            "cases",
            this.nodeForm.conditionsList
          );
          this.$emit("sendFormInfo", this.node);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  watch: {
    node: {
      immediate: true,
      handler(val) {
        if (!val) {val
          return;
        }
        this.nodeForm=val
        if (val.other_info.cases && val.other_info.cases.length > 0) {
          this.conditionsList = val.other_info.cases;
          this.conditionsList.forEach((item, index) => {
            if (item.rules && item.rules.length > 0) {
              item.rules.forEach((nextItem, nextIndex) => {
                console.log(nextItem.targetType);
                let arr = [nextItem.targetType, nextItem.entityName];
                this.$set(nextItem, "cascader", arr);
                //this.$set(this.conditionsList[index].rules[nextIndex], "cascader", (arr));
              });
            }
          });
        } else {
        }
        this.$set(this.nodeForm, "conditionsList", this.conditionsList);
      },
    },
  },
};
</script>
<style lang="less" scoped>
@blue: #108cee;
.flex-wrap {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.case-wrap {
  padding: 10px 0;
  display: flex;
  align-items: center;
}
.margin-right10 {
  margin-right: 10px;
}
.title-wrap {
  border-left: 5px solid @blue;
  padding: 3px 10px 3px 10px;
  margin-bottom: 15px;
  line-height: 18px;
}
.add-btn {
  color: @blue;
}
.del-btn {
  color: @blue;
  margin:0 10px;
}
.del-btn-conditions {
  width: 50px;
  flex: 0 0 50px;
  color: @blue;
  line-height: 32px;
  margin-bottom: 18px;
}
.btn-add-case {
  padding: 10px 15px;
  color: @blue;
  display: inline-block;
  background-color: #eaf6fe;
}
.btn-change-type{
  border: 1px solid @blue;
  padding:5px;
  display: inline-block;
  color:@blue;
  margin-left:20px;
  box-sizing: border-box;
}
</style>