<template>
  <div>
    <el-form
      :model="nodeForm"
      status-icon
       :rules="rules"
      ref="nodeForm"
      label-width="100px"
      class="demo-nodeForm"
    >
     <!-- <el-form-item label="节点名称:" prop="name">
        <el-input v-model="nodeForm.name"></el-input>
      </el-form-item>
      <el-form-item label="节点类型:" prop="type">
        <div>
          {{ nodeForm.type | filterType }}
        </div>
      </el-form-item>
      <el-form-item label="节点描述:" prop="description">
        <el-input type="textarea" v-model="nodeForm.description" :rows="2" class="resizeNone"></el-input>
      </el-form-item> -->
      <div class="">
        <div class="title-wrap">执行动作</div>
      </div>
      <div class="flex-wrap">
        <el-form-item label="动作类型:" >
          <el-checkbox-group
            v-model="isChecked"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox label="REQUEST_INPUT">回复话术</el-checkbox>
          </el-checkbox-group>
          <!-- <el-checkbox v-model=" ? checked : disChecked">回复话术</el-checkbox> -->
        </el-form-item>
        <el-form-item label="" >
          <el-input
            type="textarea"
            v-model="nodeForm.other_info.reply"
            :disabled="!isChecked"
            :rows="3"
            placeholder="请输入内容"
            class="resizeNone"
            style="width: 300px"
          ></el-input>
        </el-form-item>
      </div>
      <div class="">
        <div class="title-wrap">设置项</div>
      </div>
      <el-form-item
        label-width="0px"
        prop="other_info.actionType"
        :rules="[
          { required: true, message: '请选择设置项', trigger: 'change' },
        ]"
      >
        <el-radio-group v-model="nodeForm.other_info.actionType">
          <el-radio label="REQUEST_INPUT">要求用户输入</el-radio>
          <el-radio label="END_SESSION">会话在此节点终结</el-radio>
          <el-radio label="TO_MANUAL">转接人工</el-radio>
          <el-radio label="NONE">均不选择</el-radio>
        </el-radio-group>
      </el-form-item>

      <div class="">
        <div class="title-wrap">判别条件</div>
      </div>
      <el-form-item
        v-for="(item, index) in nodeForm.other_info.variables"
        :key="index"
        label-width="0"
      >
        <div class="flex-wrap">
          <el-form-item
           class="margin-right10"
            :prop="'other_info.variables.' + index + '.name'"
            :rules="{
              required: true,
              message: '判别条件值不能为空',
              trigger: ['blur', 'change'],
            }"
          >
            <el-select v-model="item.name" placeholder="请选择">
              <el-option
                v-for="item2 in nameOptions"
                :key="item2.value"
                :label="item2.label"
                :value="item2.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            class="margin-right10"
            :prop="'other_info.variables.' + index + '.operator'"
            :rules="{
              required: true,
              message: '操作值不能为空',
              trigger: ['blur', 'change'],
            }"
          >
            <el-select v-model="item.operator" placeholder="请选择">
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
            :prop="'other_info.variables.' + index + '.value'"
            :rules="{
              required: true,
              message: '判断值不能为空',
              trigger: ['blur', 'change'],
            }"
          >
            <el-select v-model="item.value" placeholder="请选择">
              <el-option
                v-for="item1 in valueOptions"
                :key="item1.value"
                :label="item1.label"
                :value="item1.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <div
            class="del-btn-conditions"
            @click="delConditionsListOne(index)"
          >
            删除
          </div>
        </div>
      </el-form-item>
      <div class="add-btn" @click="addConditionsList()">+添加条件</div>
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
      isChecked: false,
      radio: "",
      conditionsList: [],
      nodeForm: {},
      rules: {
        name: [
          { required: true, message: "节点名称不能为空", trigger: "blur" },
        ],
      },
      edittitle: "",
      valueOptions: [
        {
          value: "测试1",
          label: "测试1",
        },
        {
          value: "测试2",
          label: "测试2",
        },
      ],


     
      nameOptions:[
         {
          value: "测试1",
          label: "测试1",
        },
         {
          value: "测试2",
          label: "测试2",
        },
        
      ],
      operatorOptions: [
       
         {
          value: "String",
          label: "=字符串",
        },
        {
          value: "Number",
          label: "=数字",
        },
        {
          value: "Entity",
          label: "=实体值",
        },
        {
          value: "null",
          label: "=null",
        },
        {
          value: "Expression",
          label: "=表达式",
        },
        
      ],
    };
  },
  mounted() {
    console.log(this.visible);
  },

  methods: {
    handleCheckedCitiesChange(val) {
      if (val) {
        this.isChecked = true;
        this.$set(this.nodeForm.other_info, "reply", "");
      } else {
        this.isChecked = false;
        this.$set(this.nodeForm.other_info, "reply", "");
      }
    },
    handleChange() {},
    delConditionsListOne(index) {
      this.nodeForm.other_info.variables.splice(index, 1);
    },
    addConditionsList(data) {
      this.nodeForm.other_info.variables.push({
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
        console.log("校验" + valid);
        if (valid) {
          this.$emit("sendFormInfo", this.nodeForm);
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
        if (!val) {
          return;
        }
        this.nodeForm = val;
        if (this.nodeForm.other_info.reply) {
          this.isChecked = true;
        } else {
          this.isChecked = false;
        }
      },
    },
  },
};
</script>
<style lang="less" scoped>
.resizeNone /deep/ .el-textarea__inner {
  resize: none;
}
@blue: #108cee;
.flex-wrap {
  display: flex;
  align-items: flex-start;
}
.radio-wrap {
  padding: 10px;
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
}
.del-btn-conditions {
  width: 40px;
  flex: 0 0 40px;
  color: @blue;
}
.btn-add-case {
  padding: 10px 15px;
  color: @blue;
  display: inline-block;
  background-color: #eaf6fe;
}
</style>