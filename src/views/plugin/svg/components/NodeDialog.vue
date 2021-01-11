<template>
  <div>
    <!-- <div class="modal" v-if="visible" style="width: 320px">
            <div class="header">
                <span>Edit2</span>
            </div>
            <div class="body">
                <label for="name">Name</label>
                <input class="form-control" id="name" v-model="nodeForm.name"/>
                <label for="type">Type</label>
                <select class="form-control" id="type" v-model="nodeForm.type">
                    <option :key="'node-type-' + item.id" :value="item.id"
                            v-for="item in [ { name: 'Start', id: 'start' }, { name: 'End', id: 'end' }, { name: 'Operation', id: 'operation' } ]"
                    >
                        {{item.name}}
                    </option>
                </select>
                <label for="approver">Approver</label>
                <select class="form-control" id="approver" :value="nodeForm.approver.id"
                        @change="handleChangeApprover($event)">
                    <option :value="item.id" :key="'approver-' + item.id" v-for="item in approvers">
                        {{item.name}}
                    </option>
                </select>
            </div>
            <div class="footer">
                <button @click="handleClickCancelSaveNode">Cancel</button>
                <button @click="handleClickSaveNode">Ok</button>
            </div>
        </div> -->
    <el-dialog
      :title="edittitle"
      :visible.sync="visible"
      width="80%"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <div >
          <component
          :is="componentId"
          ref="form"   
          :node="node"
          @submitRootForm="submitRootForm"
        ></component>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClickCancelSaveNode">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import "../assets/modal.css";

export default {
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
     var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
            var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
    return {
             ruleForm: {
          pass: '',
          checkPass: '',
          age: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
         
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        },
      nodeForm: { name: null, id: null, type: null, approver: [] },
      edittitle: "",
      approvers: [
        { id: 1, name: "Joyce" },
        { id: 2, name: "Allen" },
        { id: 3, name: "Teresa" },
      ],
      componentId:'',
    };
  },
  mounted() {
    console.log(this.visible);
  },
  methods: {
    submitForm(){
      this.$refs.form.submitForm()

    },
    //     setTypeCode(val) {
    //   //plugin\svg\components\dialogContent
    //   if ()
       
    // },
    setTitle() {
      if (this.node.type == "root") {
        this.edittitle = "编辑根节点";
       
      } else if (this.node.type == "operation") {
        this.edittitle = "编辑动作节点";
      
      } else if (this.node.type == "switch") {
        this.edittitle = "编辑判断节点";
         
      } else if (this.node.type == "http") {
        this.edittitle = "编辑http节点";
        
      } else {
        this.edittitle = "编辑";
      }
       this.componentId = require(`@/views/plugin/svg/components/dialogContent/${this.node.type}Detail.vue`).default;
    },
    submitRootForm(data){
      console.log(data)
      this.$emit("hideDialog",false)

    },
    handleClickSaveNode() {
      this.$emit(
        "update:node",
        Object.assign(this.node, {
          name: this.nodeForm.name,
          type: this.nodeForm.type,
          approvers: [Object.assign({}, this.nodeForm.approver)],
        })
      );
      this.$emit("update:visible", false);
    },
    handleClickCancelSaveNode() {
      this.$emit("update:visible", false);
    },
    handleChangeApprover(e) {
      this.nodeForm.approver = this.approvers.filter(
        (i) => i.id === parseInt(e.target.value)
      )[0];
    },
  },
  watch: {
    visible:{
      immediate: false,
      handler(val) {
        if (!val) {
          this.$nextTick(()=>{
             this.$refs.form.resetForm()
          })
        }
      },

    },
    node: {
      immediate: false,
      handler(val) {
        if (!val) {
          return;
        }
        this.setTitle();
      },
    },
  },
};
</script>