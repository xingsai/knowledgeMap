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
        <el-input type="textarea" v-model="nodeForm.description" :rows="2" class="resizeNone"></el-input>
      </el-form-item>
      <el-form-item label="判断条件:" prop="other_info.intent">
        <el-select v-model="nodeForm.other_info.intent" placeholder="请选择" >
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
//一些公共的js方法混入
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

        'other_info.intent': [
          { required: true, message: "判断条件不能为空", trigger: "change" },
        ],
      },
      options: [
        {
          value: "户号查询",
          label: "户号查询",
        },
      ],
    };
  },
  mounted() {
  },
  methods: {
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
          this.$emit("sendFormInfo", '');
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
        console.log(val)
        this.nodeForm=Object.assign({},val)
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