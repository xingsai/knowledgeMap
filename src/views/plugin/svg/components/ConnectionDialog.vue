<template>
  <div>
    <!-- <div class="modal" v-if="visible" style="width: 320px">
            <div class="header">
                <span>Edit1</span>
            </div>
            <div class="body">
                <label for="name">Name</label>
                <input id="name" class="form-control" v-model="connectionForm.name"/>
                <label for="type">Type</label>
                <select id="type" class="form-control" v-model="connectionForm.type">
                    <option :key="'connection-type-' + item.id"
                            v-for="item in [ { name: 'Pass', id: 'pass' }, { name: 'Reject', id: 'reject' } ]"
                            :value="item.id">
                        {{item.name}}
                    </option>
                </select>
            </div>
            <div class="footer">
                <button @click="handleClickCancelSaveConnection">Cancel</button>
                <button @click="handleClickSaveConnection">Ok</button>
            </div>
        </div> -->
    <el-dialog
      title="case选择"
      :visible.sync="visible"
      width="50%"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <div>
        <el-form
          :model="nodeForm"
          status-icon
          :rules="rules"
          ref="nodeForm"
          label-width="60px"
          class="demo-nodeForm"
        >
          <el-form-item label="case:" prop="case">
            <el-select v-model="nodeForm.case" placeholder="请选择">
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelSaveconnection">取 消</el-button>
        <el-button type="primary" @click="saveEditConnection" v-forbidclick
          >确 定</el-button
        >
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
    connection: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      connectionForm: {
        type: null,
        sourceId: null,
        sourcePosition: null,
        destinationId: null,
        destinationPosition: null,
        name: null,
        expression: null,
      },
      nodeForm: {},
      rules: {
        case: [{ required: true, message: "case不能为空", trigger: "blur" }],
      },
      options: [],
    };
  },
  methods: {

    //取消保存连接线的信息
    cancelSaveconnection() {
      this.$emit("update:visible", false);
    },
    //保存连接线的信息
    async saveEditConnection() {
      this.$emit("update:visible", false);
      this.$emit(
        "update:connection",
        Object.assign(this.connection, {
         case:this.nodeForm.case
        })
      );
    },
  
  },
  watch: {
    connection: {
      immediate: true,
      handler(val) {
        if (!val) {
          return;
        }
        this.nodeForm = val;
        console.log(val);
        this.options = [];
        let arr = this.nodeForm.source.allInfo.other_info.cases;
        if (arr && arr.length > 0) {
          arr.forEach((element,index) => {
            this.options.push({
              value: (index),
              label: "case"+(index+1),
            });
          });
        }
      },
    },
  },
};
</script>
