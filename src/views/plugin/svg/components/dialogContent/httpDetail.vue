<template>
  <div>
    <el-form
      :model="nodeForm"
      status-icon
      :rules="rules"
      ref="nodeForm"
      label-width="120px"
      class="demo-nodeForm"
    >
      <el-form-item label="节点名称:" prop="name">
        <el-input v-model="nodeForm.name"></el-input>
      </el-form-item>
      <el-form-item label="节点类型:" prop="type">
        <div>
          {{ nodeForm.type | filterType }}
        </div>
      </el-form-item>
      <el-form-item label="节点描述:" prop="description">
        <el-input
          type="textarea"
          v-model="nodeForm.description"
          :rows="2"
          class="resizeNone"
        ></el-input>
      </el-form-item>
      <el-form-item label="方法名称:" prop="other_info.action">
        <el-select
          v-model="nodeForm.other_info.action"
          @change="setswitchConditions"
          placeholder="请选择"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import mixinCommom from "./js/mix";
export default {
  mixins: [mixinCommom],
  props: {
    node: {
      type: Object,
      default: null,
    },
  },
  data: function () {
    return {
      nodeForm: {
      
      },
      rules: {
         name: [
          { required: true, message: "节点名称不能为空", trigger: "blur" },
        ],
        "other_info.action": [
          { required: true, message: "方法名不能为空", trigger: "change" },
        ],
      },
     options: [
        {
          value:"consMatch",// "dc2fd7b7-669b-4ea2-aaea-83ac34c4b001 ",
          label: "consMatch",//户号信息判断
        },
        {
          value: "phoneMatch",//"dc2fd7b7-669b-4ea2-aaea-83ac34c4b002 ",
          label: "phoneMatch",//手机号研判
        },
        {
          value:"personMatch",// "dc2fd7b7-669b-4ea2-aaea-83ac34c4b003 ",
          label: "personMatch",//客户信息判断
        },
      ],
    };
  },
  mounted() {},

  methods: {
    setswitchConditions(val) {
     // this.nodeForm.other_info.action = val;
    },
    //重置
    resetForm() {
      this.$refs.nodeForm.resetFields();
    },
    //提交
    submitForm() {
      this.$refs.nodeForm.validate((valid) => {
        if (valid) {
          this.$emit("sendFormInfo", this.nodeForm);
        } else {
          this.$emit("sendFormInfo", "");
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
        this.nodeForm = Object.assign({}, val);
      },
    },
  },
};
</script>
<style lang="less" scoped>
.resizeNone /deep/ .el-textarea__inner {
  resize: none;
}
</style>