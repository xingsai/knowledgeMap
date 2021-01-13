<template>
  <div class="container">
    <div class="flex-wrap btn-wrap">
      <div class="flex-wrap">
        基础节点：
        <div class="flex-wrap">
          <div
            class="btn-style orange-btn"
            @click="addNode('1')"
            draggable="true"
            @dragstart="drag($event, '1')"
          >
            根节点
          </div>
          <div
            class="btn-style purple-btn"
            @click="addNode('2')"
            draggable="true"
            @dragstart="drag($event, '2')"
          >
            判断节点
          </div>
          <div
            class="btn-style blue-btn"
            @click="addNode('3')"
            draggable="true"
            @dragstart="drag($event, '3')"
          >
            动作节点
          </div>
        </div>
      </div>
      <div class="flex-wrap">
        功能节点：
        <div>
          <div
            class="btn-style green-btn"
            @click="addNode('4')"
            draggable="true"
            @dragstart="drag($event, '4')"
          >
            http节点
          </div>
          <!-- <div class="btn-style">KG节点</div> -->
        </div>
      </div>
    </div>

    <div id="toolbar">
      <!-- <button
        @click="
          $refs.chart.add({
            id: +new Date(),
            x: 10,
            y: 10,
            name: 'New',
            type: 'operation',
            approvers: [],
          })
        "
      >
       新增(双击canvas)
      </button>
            <button
        @click="
          $refs.chart.add({
            id: +new Date(),
            x: 10,
            y: 10,
            name: 'New',
            type: 'operation',
            approvers: [],
          })
        "
      >
       新增(双击canvas)
      </button>
      <button @click="$refs.chart.remove()">删除</button>
      <button @click="$refs.chart.editCurrent()">
       编辑
      </button> -->
      <button @click="$refs.chart.save()" v-forbidclick>保存</button>
    </div>
    <!-- :render="render" -->
    <flowchart
      :internalNodes="nodes"
      :internalConnections="connections"
      @editnode="handleEditNode"
      :width="'100%'"
      :height="'80%'"
      :readonly="false"
      @dblclick="handleDblClick"
      @editconnection="handleEditConnection"
      @save="handleChartSave"
      :dragNode="dragNode"
      ref="chart"
    >
    </flowchart>
    <!-- <node-dialog
      :visible.sync="nodeDialogVisible"
      :node.sync="nodeForm"
      @hideDialog="hideDialog"
    ></node-dialog> -->
    <el-dialog
      :title="edittitle"
      :visible.sync="nodeDialogVisible"
      width="80%"
      :close-on-click-modal="false"
    >
      <div>
        <component
          :is="componentId"
          ref="form"
          :node="nodeForm"
          @sendFormInfo="sendFormInfo"
        ></component>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClickCancelSaveNode">取 消</el-button>
        <el-button type="primary" @click="submitForm" v-forbidclick
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <connection-dialog
      :visible.sync="connectionDialogVisible"
      :connection.sync="connectionForm.target"
      :operation="connectionForm.operation"
    >
    </connection-dialog>
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */

import ConnectionDialog from "@/views/plugin/svg/components/ConnectionDialog.vue";
import NodeDialog from "@/views/plugin/svg/components/NodeDialog.vue";
import Flowchart from "@/views/plugin/svg/components/flowchart/Flowchart.vue";
import * as d3 from "d3";
import { roundTo20 } from "@/views/plugin/svg/utils/math";

export default {
  components: {
    ConnectionDialog,
    NodeDialog,
    Flowchart,
  },
  data: function () {
    return {
      edittitle: "",
      componentId: "",
      dragNode: {},
      nodes: [
        // { id: 1, x: 50, y: 220, name: "root", type: "root" },
        // { id: 2, x: 630, y: 220, name: "End", type: "http" },
        // { id: 2, x: 60, y: 420, name: "End", type: "switch" },
        // {
        //   id: 3,
        //   x: 340,
        //   y: 130,
        //   name: "Custom size",
        //   type: "switch",
        //   list: 3,
        //   approvers: [{ id: 1, name: "Joyce" }],
        // },
        // {
        //   id: 4,
        //   x: 240,
        //   y: 220,
        //   name: "Operation",
        //   type: "switch",
        //   list: 9,
        //   approvers: [{ id: 2, name: "Allen" }],
        // },
        // {
        //   id: 5,
        //   x: 440,
        //   y: 220,
        //   name: "Operation",
        //   type: "operation",
        //   approvers: [{ id: 3, name: "Teresa" }],
        // },
      ],
      connections: [
        // {
        //   source: { id: 1, position: "right" },
        //   destination: { id: 4, position: "left" },
        //   id: 1,
        //   type: "pass",
        // },
        // {
        //   source: { id: 4, position: "right" },
        //   destination: { id: 5, position: "left" },
        //   id: 1,
        //   type: "pass",
        // },
        // {
        //   source: { id: 5, position: "right" },
        //   destination: { id: 2, position: "left" },
        //   id: 1,
        //   type: "pass",
        // },
        // {
        //   source: { id: 5, position: "right" },
        //   destination: { id: 4, position: "left" },
        //   id: 4,
        //   type: "reject",
        // },
        // {
        //   source: { id: 1, position: "right" },
        //   destination: { id: 3, position: "left" },
        //   id: 5,
        //   type: "pass",
        // },
        // {
        //   source: { id: 3, position: "right" },
        //   destination: { id: 2, position: "left" },
        //   id: 6,
        //   type: "pass",
        // },
      ],
      nodeForm: {},
      connectionForm: { target: null, operation: null },
      nodeDialogVisible: false,
      connectionDialogVisible: false,
    };
  },
  async mounted() {
    // this.nodes = sessionStorage.getItem("nodes")
    //   ? JSON.parse(sessionStorage.getItem("nodes"))
    //   : [
    //       {
    //         id: "ues6y",
    //         processId: "",
    //         name: "查天气111",
    //         description: "1111111",
    //         type: "root",
    //         x: 82,
    //         y: 233,
    //         wires: ["xj89u"],
    //         scene_name: "",
    //         view_name: "",
    //         other_info: {
    //           chineseName: "",
    //           intent: "查天气",
    //           entitiesForExtend: [],
    //         },
    //       },
    //       {
    //         id: "xj89u",
    //         processId: "",
    //         name: "输入城市名称",
    //         description: "11111",
    //         type: "operation",
    //         x: 228,
    //         y: 168,
    //         wires: ["c4usb"],
    //         scene_name: "",
    //         view_name: "",
    //         other_info: {
    //           chineseName: "",
    //           actionType: "",
    //           reply: "请输入1城市",
    //           entityName: "城市",
    //           variables: [
    //             {
    //               id: "",
    //               name: "测试1",
    //               value: "测试1",
    //               operator: "String",
    //             },
    //             {
    //               id: "",
    //               name: "测试2",
    //               value: "测试2",
    //               operator: "Expression",
    //             },
    //           ],
    //         },
    //       },
    //       {
    //         id: "c4usb",
    //         processId: "",
    //         name: "判断城市名称",
    //         description: "判断是否是天津",
    //         type: "switch",
    //         x: 372,
    //         y: 234,
    //         wires: ["6cyug"],
    //         scene_name: "",
    //         view_name: "",
    //         other_info: {
    //           chineseName: "",
    //           cases: [
    //             {
    //               type: "normal",
    //               rules: [
    //                 {
    //                   targetType: "entity",
    //                   entityName: "city",
    //                   httpResponseProperty: "",
    //                   customizedKey: "",
    //                   operator: "isNull",
    //                   value: "tianjin",
    //                 },
    //                 {
    //                   targetType: "entity",
    //                   entityName: "城市",
    //                   httpResponseProperty: "",
    //                   customizedKey: "",
    //                   operator: "equal",
    //                   value: "天津",
    //                 },
    //               ],
    //               relation: "and",
    //             },
    //             {
    //               type: "expression",
    //               rules: [
    //                 {
    //                   targetType: "entity",
    //                   entityName: "city",
    //                   httpResponseProperty: "",
    //                   customizedKey: "",
    //                   operator: "isNull",
    //                   value: "tianjin",
    //                 },
    //                 {
    //                   targetType: "entity",
    //                   entityName: "城市",
    //                   httpResponseProperty: "",
    //                   customizedKey: "",
    //                   operator: "equal",
    //                   value: "天津",
    //                 },
    //               ],
    //               relation: "and",
    //             },
    //             {
    //               type: "normal",
    //               rules: [
    //                 {
    //                   operator: "else",
    //                 },
    //               ],
    //             },
    //           ],
    //         },
    //       },
    //       {
    //         id: "ozep5",
    //         processId: "",
    //         name: "天津气温",
    //         description: "",
    //         type: "operation",
    //         x: 638,
    //         y: 193,
    //         wires: ["6cyug"],
    //         scene_name: "",
    //         view_name: "",
    //         other_info: {
    //           chineseName: "",
    //           actionType: "END_SESSION",
    //           reply: "天津气温10度",
    //           variables: [],
    //         },
    //       },
    //       {
    //         id: "6cyug",
    //         processId: "",
    //         name: "查询地点天气",
    //         description: "查询城市天气",
    //         type: "http",
    //         x: 489,
    //         y: 138,
    //         wires: ["ozep5"],
    //         scene_name: "",
    //         view_name: "",
    //         other_info: {
    //           action: "",
    //         },
    //       },
    //     ];
    // this.setInfoToCanuse();
    this.getagentInfo();
  },
  methods: {
    //获取agent信息
    getagentInfo() {
      this.$apiGet(
        this.$api.getAgentInfo + "?agentId=1b2340b9-2dbe-4df4-ae22-bc93a5601b60"
      ).then(({ data }) => {
        this.nodes = data.data.dialogNodes;
        this.setInfoToCanuse();
      });
    },
    //将获取到的信息转化为可展示用的信息
    setInfoToCanuse() {
      this.connections = [];
      this.nodes.forEach((item) => {
        item = Object.assign({ width: 120, height: 60 }, item);

        //this.nodes.push(item);

        if (item.wires && item.wires.length > 0) {
          item.wires.forEach((it, index) => {
            if (it) {
              this.connections.push({
                source: { id: item.id, position: "right", type: item.type },
                destination: { id: it, position: "left" },
                type: "pass",
                id: item.id + index,
              });
            }
          });
        }
      });
    },
    //设置标题
    setTitle() {
      if (this.nodeForm.type == "root") {
        this.edittitle = "编辑根节点";
      } else if (this.nodeForm.type == "operation") {
        this.edittitle = "编辑动作节点";
      } else if (this.nodeForm.type == "switch") {
        this.edittitle = "编辑判断节点";
      } else if (this.nodeForm.type == "http") {
        this.edittitle = "编辑http节点";
      } else {
        this.edittitle = "编辑";
      }
      this.componentId = require(`@/views/plugin/svg/components/dialogContent/${this.nodeForm.type}Detail.vue`).default;
    },
    hideDialog(data) {
      this.nodeDialogVisible = data;
    },
    //拖动添加元素
    drag(ev, num) {
      //num  1 根节点2，判断节点3，动作节点4.http节点
      switch (num) {
        case "1":
          this.dragNode = {
            id: +new Date(),
            x: 10,
            y: 10,
            processId: "",
            name: "根节点",
            description: "",
            type: "root",
            wires: [],
            scene_name: "",
            view_name: "",
            other_info: {
              chineseName: "",
              intent: "",
              entitiesForExtend: [],
            },
          };
          break;
        case "2":
          this.dragNode = {
            id: +new Date(),
            x: 10,
            y: 10,
            name: "判断节点",
            type: "switch",
            processId: "",
            description: "",
            wires: [],
            scene_name: "",
            view_name: "",
            other_info: {
              chineseName: "",
              cases: [
                {
                  type: "normal",
                  rules: [],
                  relation: "and",
                },
                {
                  type: "normal",
                  rules: [
                    {
                      operator: "else",
                    },
                  ],
                },
              ],
            },
          };

          break;
        case "3":
          this.dragNode = {
            id: +new Date(),
            x: 10,
            y: 10,
            name: "动作节点",
            type: "operation",
            processId: "",
            description: "",
            wires: [],
            scene_name: "",
            view_name: "",
            other_info: {
              chineseName: "",
              actionType: "",
              reply: "",
              entityName: "",
              variables: [],
            },
          };
          break;
        case "4":
          this.dragNode = {
            id: +new Date(),
            x: 10,
            y: 10,
            name: "http节点",
            type: "http",
            approvers: [],
            processId: "",
            description: "",
            wires: [],
            scene_name: "",
            view_name: "",
            other_info: {
              action: "",
            },
          };
          break;

        default:
          console.log("您的输入有误");
          break;
      }
    },
    addNode(num) {
      //num  1 根节点2，判断节点3，动作节点4.http节点
      // switch (num) {
      //   case "1":
      //     this.$refs.chart.add({
      //       id: +new Date(),
      //       x: 10,
      //       y: 10,
      //       name: "New",
      //       type: "root",
      //       approvers: [],
      //     });
      //     break;
      //   case "2":
      //     this.$refs.chart.add({
      //       id: +new Date(),
      //       x: 10,
      //       y: 10,
      //       name: "New",
      //       type: "switch",
      //       approvers: [],
      //     });
      //     break;
      //   case "3":
      //     this.$refs.chart.add({
      //       id: +new Date(),
      //       x: 10,
      //       y: 10,
      //       name: "New",
      //       type: "operation",
      //       approvers: [],
      //     });
      //     break;
      //   case "4":
      //     this.$refs.chart.add({
      //       id: +new Date(),
      //       x: 10,
      //       y: 10,
      //       name: "New",
      //       type: "http",
      //       approvers: [],
      //     });
      //     break;
      //   default:
      //     console.log("您的输入有误");
      //     break;
      // }
    },
    handleDblClick(position) {
      this.$refs.chart.add({
        id: +new Date(),
        x: position.x,
        y: position.y,
        name: "New",
        type: "operation",
        approvers: [],
      });
    },

    async handleChartSave(nodes, connections) {
      nodes.forEach((item) => {
        item.wires = [];
      });
      if (connections && connections.length > 0) {
        connections.forEach((item) => {
          if (item.source.position == "right") {
            let index = nodes.findIndex((it) => {
              return it.id == item.source.id;
            });
            nodes[index].wires.push(item.destination.id);
          } else {
            let index = nodes.findIndex((it) => {
              return it.id == item.destination.id;
            });
            nodes[index].wires.push(item.source.id);
          }
        });
      }
      nodes.forEach((item) => {
        this.$util.unique(item.wires);
      });
      //sessionStorage.setItem("nodes", JSON.stringify(nodes));
      console.log(nodes);
      console.log(connections);
      this.$apiPost(this.$api.getAgentInfo, {
        agent: {
          created_user_id: "2908174897", //创建人id
          description: "电费电量查询", //agent描述
          language: "zh-CN",
          industry: "4709e482-dda6-4011-8329-d875e6edd902", //行业类别
          type: 1, //类型
          delete: 0, //删除状态
          scene: "",
          public: 0,
          id: "1b2340b9-2dbe-4df4-ae22-bc93a5601b60",
          timestamp: 1562208854000,
          last_edit_username: "测试", //修改人
          match_threshold: 0.2,
          created: 1562208600000, //创建时间
          last_edit_id: "2908174897", //修改人id
          client_access_token: "64db12d8-02c4-45f4-b948-a0dda8dd6a65", //Client Token
          created_username: "测试", //创建人
          user_id: "2908174897", //登陆人
          match_mode: 0,
          name: "智能客服内网测通版agent(20190620)_agent", //agent名称
          online: 1,
          config: "",
          updated: 1562208854000, //修改时间
          developer_access_token: "ff40b19c-d10e-4c34-b47a", //Developer Token
          intent_model_version: "20170329092259",
          status: 0,
        },
        agentID: "MOCK-AGENT-ID",
        dialogNodes: nodes,
      }).then(({ data }) => {
        if (data.code == "200") {
          this.$message({
            message: data.msg,
            type: "success",
          });
        }
      });
      // axios.post(url, {nodes, connection}).then(resp => {
      //   this.nodes = resp.nodes;
      //   this.connections = resp.connections;
      //   // Flowchart will refresh after this.nodes and this.connections changed
      // });
    },
    sendFormInfo(data) {
      if (data == "") {
      } else {
        let index = this.nodes.findIndex((item) => {
          return item.id == data.id;
        });
        this.nodes[index] = Object.assign({}, data);
        this.setInfoToCanuse();
        sessionStorage.setItem("nodes", JSON.stringify(this.nodes));
        this.nodeDialogVisible = false;
      }
    },
    handleClickCancelSaveNode() {
      this.nodeDialogVisible = false;
      //this.$emit("update:visible", false);
    },
    submitForm() {
      let flag = this.$refs.form.submitForm();
    },
    //编辑node
    handleEditNode(node) {
      this.nodeForm = node;
      this.nodeDialogVisible = true;
      this.setTitle();
    },
    //编辑连线
    handleEditConnection(connection) {
      this.connectionForm.target = connection;
      this.connectionDialogVisible = true;
    },
    // render: function (g, node, isSelected) {
    //   node.width = node.width || 120;
    //   node.height = node.height || 60;
    //   let borderColor = isSelected ? "#666666" : "#bbbbbb";
    //   if (node.type !== "root" && node.type !== "end") {
    //     // title
    //     if (node.id !== 3) {
    //       g.append("rect")
    //         .attr("x", node.x)
    //         .attr("y", node.y)
    //         .attr("stroke", borderColor)
    //         .attr("class", "title")
    //         .style("height", "20px")
    //         .style("fill", "#f1f3f4")
    //         .style("stroke-width", "1px")
    //         .style("width", node.width + "px");
    //       g.append("text")
    //         .attr("x", node.x + 4)
    //         .attr("y", node.y + 15)
    //         .attr("class", "unselectable")
    //         .text(() => node.name)
    //         .each(function wrap() {
    //           let self = d3.select(this),
    //             textLength = self.node().getComputedTextLength(),
    //             text = self.text();
    //           while (textLength > node.width - 2 * 4 && text.length > 0) {
    //             text = text.slice(0, -1);
    //             self.text(text + "...");
    //             textLength = self.node().getComputedTextLength();
    //           }
    //         });
    //     }
    //   }
    //   // body
    //   if (node.id === 3) {
    //     let body = g.append("ellipse").attr("class", "body");
    //     body.attr("cx", node.x + node.width / 2);
    //     body.attr("cy", node.y + node.height / 2);
    //     body.attr("rx", node.width / 2);
    //     body.attr("ry", node.height / 2);
    //     body.style("fill", "white");
    //     body.style("stroke-width", "1px");
    //     body.classed(node.type, true);
    //     body.attr("stroke", borderColor);
    //   } else {
    //     let body = g.append("rect").attr("class", "body");
    //     body
    //       .style("width", node.width + "px")
    //       .style("fill", "white")
    //       .style("stroke-width", "1px");
    //     if (node.type !== "root" && node.type !== "end") {
    //       body.attr("x", node.x).attr("y", node.y + 20);
    //       body.style("height", roundTo20(node.height - 20) + "px");
    //     } else {
    //       body
    //         .attr("x", node.x)
    //         .attr("y", node.y)
    //         .classed(node.type, true)
    //         .attr("rx", 30);
    //       body.style("height", roundTo20(node.height) + "px");
    //     }
    //     body.attr("stroke", borderColor);
    //   }

    //   // body text
    //   let text =
    //     node.type === "root"
    //       ? "root"
    //       : node.type === "end"
    //       ? "End"
    //       : !node.approvers || node.approvers.length === 0
    //       ? "No approver"
    //       : node.approvers.length > 1
    //       ? `${node.approvers[0].name + "..."}`
    //       : node.approvers[0].name;
    //   let bodyTextY;
    //   if (node.type !== "root" && node.type !== "end") {
    //     if (node.id === 3) {
    //       bodyTextY = node.y + 25;
    //     } else {
    //       bodyTextY = node.y + 25 + roundTo20(node.height - 20) / 2;
    //     }
    //   } else {
    //     bodyTextY = node.y + 5 + roundTo20(node.height) / 2;
    //   }
    //   g.append("text")
    //     .attr("x", node.x + node.width / 2)
    //     .attr("y", bodyTextY)
    //     .attr("class", "unselectable")
    //     .attr("text-anchor", "middle")
    //     .text(function () {
    //       return text;
    //     })
    //     .each(function wrap() {
    //       let self = d3.select(this),
    //         textLength = self.node().getComputedTextLength(),
    //         text = self.text();
    //       while (textLength > node.width - 2 * 4 && text.length > 0) {
    //         text = text.slice(0, -1);
    //         self.text(text + "...");
    //         textLength = self.node().getComputedTextLength();
    //       }
    //     });
    // },
  },
};
</script>
<style scoped>
#toolbar {
  margin-bottom: 10px;
}

.title {
  margin-top: 10px;
  margin-bottom: 0;
}

.subtitle {
  margin-bottom: 10px;
}

#toolbar > button {
  margin-right: 4px;
}

.container {
  margin: auto;
  height: 100%;
  width: 90%;
}
.btn-wrap {
  padding: 10px;
}
.flex-wrap {
  display: flex;
}

.btn-style {
  height: 40px;
  width: 100px;
  border-radius: 20px;
  border: 1px solid #e3e3e3;
  text-align: center;
  line-height: 40px;
  position: relative;
  margin-right: 15px;
}
.btn-style:before {
  content: "";
  display: block;
  position: absolute;
  top: 50%;
  right: 0;
  width: 10px;
  height: 10px;
  background-color: #fdc188;
  border-radius: 5px;
  margin-right: -5px;
  margin-top: -5px;
}
.btn-style:after {
  content: "";
  display: block;
  position: absolute;
  top: 50%;
  left: 0;
  width: 10px;
  height: 10px;
  background-color: #fdc188;
  border-radius: 5px;
  margin-left: -5px;
  margin-top: -5px;
}
.orange-btn {
  border-color: #fdc188;
  color: #fdc188;
  background-color: #fff9f2;
}
.orange-btn:before {
  background-color: #fdc188;
}
.orange-btn:after {
  display: none;
}

.purple-btn {
  border-color: #8e63c4;
  color: #8e63c4;
  background-color: #f9f7fc;
}
.purple-btn:before {
  background-color: #8e63c4;
}
.purple-btn:after {
  background-color: #8e63c4;
}
.blue-btn {
  border-color: #1f8eeb;
  color: #1f8eeb;
  background-color: #f3f9fe;
}
.blue-btn:before {
  background-color: #1f8eeb;
}
.blue-btn:after {
  background-color: #1f8eeb;
}
.green-btn {
  border-color: #37ca37;
  color: #37ca37;
  background-color: #eef8e9;
}
.green-btn:before {
  background-color: #37ca37;
}
.green-btn:after {
  background-color: #37ca37;
}
</style>
