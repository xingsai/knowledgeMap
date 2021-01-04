<template>
  <div class="container">
    <div class="flex-wrap btn-wrap">
      <div class="flex-wrap">
      基础节点：
      <div class="flex-wrap">
        <div class="btn-style orange-btn" @click="addNode('1')" draggable="true" @dragstart="drag($event,'1')">
          根节点
        </div>
        <div class="btn-style purple-btn" @click="addNode('2')" draggable="true" @dragstart="drag($event,'2')">判断节点</div>
        <div class="btn-style blue-btn" @click="addNode('3')" draggable="true" @dragstart="drag($event,'3')">动作节点</div>
      </div>
    </div>
       <div class="flex-wrap">
      功能节点：
      <div>
        <div class="btn-style green-btn" @click="addNode('4')" draggable="true" @dragstart="drag($event,'4')">
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
      <button @click="$refs.chart.save()">保存</button>
    </div>
      <!-- :render="render" -->
    <flowchart
      :nodes="nodes"
      :connections="connections"
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
    <node-dialog
      :visible.sync="nodeDialogVisible"
      :node.sync="nodeForm.target"
    ></node-dialog>
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
      dragNode:{},
      nodes: [
        { id: 1, x: 50, y: 220, name: "Start", type: "start" },
        { id: 2, x: 630, y: 220, name: "End", type: "http" },
         { id: 2, x: 60, y: 420, name: "End", type: "judge" },
        {
          id: 3,
          x: 340,
          y: 130,
          name: "Custom size",
          type: "judge",
          list:3,
          approvers: [{ id: 1, name: "Joyce" }],
          width: 120,
          height: 40,
        },
        {
          id: 4,
          x: 240,
          y: 220,
          name: "Operation",
          type: "judge",
           list:9,
          approvers: [{ id: 2, name: "Allen" }],
        },
        {
          id: 5,
          x: 440,
          y: 220,
          name: "Operation",
          type: "operation",
          approvers: [{ id: 3, name: "Teresa" }],
        },
      ],
      connections: [
        {
          source: { id: 1, position: "right" },
          destination: { id: 4, position: "left" },
          id: 1,
          type: "pass",
        },
        {
          source: { id: 4, position: "right" },
          destination: { id: 5, position: "left" },
          id: 2,
          type: "pass",
        },
        {
          source: { id: 5, position: "right" },
          destination: { id: 2, position: "left" },
          id: 3,
          type: "pass",
        },
        {
          source: { id: 5, position: "right" },
          destination: { id: 4, position: "left" },
          id: 4,
          type: "reject",
        },
        {
          source: { id: 1, position: "right" },
          destination: { id: 3, position: "left" },
          id: 5,
          type: "pass",
        },
        {
          source: { id: 3, position: "right" },
          destination: { id: 2, position: "left" },
          id: 6,
          type: "pass",
        },
      ],
      nodeForm: { target: null },
      connectionForm: { target: null, operation: null },
      nodeDialogVisible: false,
      connectionDialogVisible: false,
    };
  },
  async mounted() {},
  methods: {
    drag(ev,num){
            //num  1 根节点2，判断节点3，动作节点4.http节点
       switch(num){
             case "1":
                  this.dragNode={
                    id: +new Date(),
                    x: 10,
                    y: 10,
                    name: 'New',
                    type: 'start',
                    approvers: [],
                  }
                break;
             case "2":
                 this.dragNode={
                    id: +new Date(),
                    x: 10,
                    y: 10,
                    name: 'New',
                    type: 'judge',
                    approvers: [],
                  }
               
                 break;
             case "3":
                this.dragNode={
                    id: +new Date(),
                    x: 10,
                    y: 10,
                    name: 'New',
                    type: 'operation',
                    approvers: [],
                  }
                             break;
             case"4":
               this.dragNode={
                    id: +new Date(),
                    x: 10,
                    y: 10,
                    name: 'New',
                    type: 'http',
                    approvers: [],
                  }
                 break;

             default:
                 console.log("您的输入有误");
                 break;
         } 
     

    },
    addNode(num){
      //num  1 根节点2，判断节点3，动作节点4.http节点
       switch(num){
             case "1":
                  this.$refs.chart.add({
                    id: +new Date(),
                    x: 10,
                    y: 10,
                    name: 'New',
                    type: 'start',
                    approvers: [],
                  })
                break;
             case "2":
                this.$refs.chart.add({
                    id: +new Date(),
                    x: 10,
                    y: 10,
                    name: 'New',
                    type: 'judge',
                    approvers: [],
                  })
               
                 break;
             case "3":
                this.$refs.chart.add({
                    id: +new Date(),
                    x: 10,
                    y: 10,
                    name: 'New',
                    type: 'operation',
                    approvers: [],
                  })
                             break;
             case"4":
              this.$refs.chart.add({
                    id: +new Date(),
                    x: 10,
                    y: 10,
                    name: 'New',
                    type: 'http',
                    approvers: [],
                  })
                 
                 break;

             default:
                 console.log("您的输入有误");
                 break;
         } 

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
        console.log(nodes)
        console.log(connections)
      // axios.post(url, {nodes, connection}).then(resp => {
      //   this.nodes = resp.nodes;
      //   this.connections = resp.connections;
      //   // Flowchart will refresh after this.nodes and this.connections changed
      // });
    },
    handleEditNode(node) {
      this.nodeForm.target = node;
      this.nodeDialogVisible = true;
    },
    handleEditConnection(connection) {
      this.connectionForm.target = connection;
      this.connectionDialogVisible = true;
    },
    // render: function (g, node, isSelected) {
    //   node.width = node.width || 120;
    //   node.height = node.height || 60;
    //   let borderColor = isSelected ? "#666666" : "#bbbbbb";
    //   if (node.type !== "start" && node.type !== "end") {
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
    //     if (node.type !== "start" && node.type !== "end") {
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
    //     node.type === "start"
    //       ? "Start"
    //       : node.type === "end"
    //       ? "End"
    //       : !node.approvers || node.approvers.length === 0
    //       ? "No approver"
    //       : node.approvers.length > 1
    //       ? `${node.approvers[0].name + "..."}`
    //       : node.approvers[0].name;
    //   let bodyTextY;
    //   if (node.type !== "start" && node.type !== "end") {
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
  height:100%;
  width:90%;
}
.btn-wrap{
  padding:10px;
}
.flex-wrap{
  display: flex;
}

.btn-style{
  height:40px;
  width:100px;
  border-radius: 20px;
  border:1px solid #e3e3e3;
  text-align: center;
  line-height: 40px;
  position: relative;
  margin-right:15px;
}
.btn-style:before{
  content: "";
  display: block;
  position: absolute;
  top:50%;
  right:0;
  width:10px;
  height: 10px;
  background-color:#FDC188;
  border-radius: 5px;
  margin-right:-5px;
  margin-top:-5px;
  
}
.btn-style:after{
  content: "";
  display: block;
  position: absolute;
  top:50%;
  left:0;
  width:10px;
  height: 10px;
  background-color:#FDC188;
  border-radius: 5px;
  margin-left:-5px;
  margin-top:-5px;
  
}
.orange-btn{
  border-color: #FDC188;
  color: #FDC188;
  background-color:#FFF9F2;
}
.orange-btn:before{
   background-color:#FDC188;
}
.orange-btn:after{
  display: none;
}

.purple-btn{
   border-color: #8E63C4;
   color: #8E63C4;
  background-color:#F9F7FC;
}
.purple-btn:before{
   background-color:#8E63C4;
}
.purple-btn:after{
   background-color:#8E63C4;
}
.blue-btn{
   border-color: #1F8EEB;
   color: #1F8EEB;
  background-color:#F3F9FE;
}
.blue-btn:before{
   background-color:#1F8EEB;
}
.blue-btn:after{
   background-color:#1F8EEB;
}
.green-btn{
  border-color: #37CA37;
  color: #37CA37;
  background-color:#EEF8E9;
}
.green-btn:before{
   background-color:#37CA37;
}
.green-btn:after{
   background-color:#37CA37;
}


</style>
