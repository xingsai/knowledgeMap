import * as d3 from 'd3';
import {roundTo20} from '../../utils/math';
let colorArr={
  start:{'fill':'#FFF9F2','stroke':"#FDC188"},
  judge:{'fill':'#F9F7FC','stroke':"#8E63C4"},
  operation:{'fill':'#F3F9FE','stroke':"#1F8EEB"},
  http:{'fill':'#EEF8E9','stroke':"#37CA37"},
}

function render(g, node, isSelected) {

  node.width = node.width || 120;
  node.height = 40+node.list*10 || 60;
  let borderColor = isSelected ? '#666666' : '#bbbbbb';
  // if (node.type !== 'start' && node.type !== 'end') {
  //   // title
  //   g.append('rect').
  //       attr('x', node.x).
  //       attr('y', node.y).
  //       attr('stroke', borderColor).
  //       attr('class', 'title').
  //       style('height', '20px').
  //       style('fill', '#f1f3f4').
  //       style('stroke-width', '1px').
  //       style('width', node.width + 'px');
  //   g.append('text').
  //       attr('x', node.x + 4).
  //       attr('y', node.y + 15).
  //       attr('class', 'unselectable').
  //       text(() => node.name).
  //       each(function wrap() {
  //         let self = d3.select(this),
  //             textLength = self.node().getComputedTextLength(),
  //             text = self.text();
  //         while (textLength > (node.width - 2 * 4) && text.length > 0) {
  //           text = text.slice(0, -1);
  //           self.text(text + '...');
  //           textLength = self.node().getComputedTextLength();
  //         }
  //       });
  // }
  // body
  let body = g.append('rect').attr('class', 'body');
  body.style('width', node.width + 'px').
     
      style('stroke-width', '1px');
    
      body. style('fill',isSelected ? '#D99C7E' : colorArr[node.type].fill).
      style('stroke', isSelected ? 'red' : colorArr[node.type].stroke);
      // if(node.type == 'start'){
      //   body. style('fill', colorArr[node.type].fill).
      //   style('stroke', colorArr[node.type].stroke);

      // }else if(node.type == 'judge'){
       

      // } else if(node.type == 'operation'){
      //   body. style('fill', colorArr[node.type].fill).
      //   style('stroke', colorArr[node.type].stroke);
        
      // }
      // else if(node.type == 'http'){
      //   body. style('fill', colorArr[node.type].fill).
      //   style('stroke', colorArr[node.type].stroke);
        
      // }
  // if (node.type !== 'start' && node.type !== 'end') {
  //   body.attr('x', node.x).attr('y', node.y + 20);
  //   body.style('height', roundTo20(node.height - 20) + 'px');
  // } else {
  //   body.attr('x', node.x).
  //       attr('y', node.y).
  //       classed(node.type, true).
  //       attr('rx', 30);
  //   body.style('height', roundTo20(node.height) + 'px');
  // }
  // body.attr('stroke', borderColor);
  body.attr('x', node.x).
  attr('y', node.y).
  classed(node.type, true).
  attr('rx', 30);
body.style('height', roundTo20(node.height) + 'px');
let connectorPosition = getConnectorPosition(node);
for (let i=0;i<connectorPosition.length;i++ ) {
  let positionElement = connectorPosition[i];
  let connector = g
    .append("circle")
    .attr("cx", positionElement.x)
    .attr("cy", positionElement.y)
    .attr("r", 4)
    . style('fill', colorArr[node.type].stroke)
    //.attr("class", "connector");
}

  // body text
  let text = node.type === 'start'
      ? 'Start'
      : (node.type === 'end' ? 'End' : (
              (!node.approvers || node.approvers.length === 0)
                  ? 'No approver'
                  : (
                      node.approvers.length > 1
                          ? `${node.approvers[0].name + '...'}`
                          : node.approvers[0].name
                  )
          )
      );
  let bodyTextY;
  // if (node.type !== 'start' && node.type !== 'end') {
  //   bodyTextY = node.y + 25 + roundTo20(node.height - 20) / 2;
  // } else {
  //   bodyTextY = node.y + 5 + roundTo20(node.height) / 2;
  // }
  bodyTextY = node.y + 5 + roundTo20(node.height) / 2;
  g.append('text').
      attr('x', node.x + node.width / 2).
      attr('y', bodyTextY).
      attr('class', 'unselectable').
      attr('text-anchor', 'middle').
      text(function() {return text;}).each(function wrap() {
    let self = d3.select(this),
        textLength = self.node().getComputedTextLength(),
        text = self.text();
    while (textLength > (node.width - 2 * 4) && text.length > 0) {
      text = text.slice(0, -1);
      self.text(text + '...');
      textLength = self.node().getComputedTextLength();
    }
  });
}
    //获取位置信息 上下左右 1,start 只有右边的点，2,operation http 左右各一个，3.judge 左侧一个，右侧可以多个
    function getConnectorPosition(node) {
      let halfWidth = node.width / 2;
      let halfHeight = node.height / 2;
      let left = { x: node.x, y: node.y + halfHeight };
      let right;
      let arr=[]
      if(node.type=="judge"){
        if(node.list&&node.list>1){
          for(let i=0;i<node.list;i++){
            let halfHeight = node.height / (node.list+1);
            let right = { x: node.x + node.width, y: node.y + halfHeight*(i+1) };
            arr.push(right)
          }
        }else{
          right = { x: node.x + node.width, y: node.y + halfHeight };
          arr.push(right)
        }
      }else{
         right = { x: node.x + node.width, y: node.y + halfHeight };
      }
      if(node.type=="start"){
        return [right]  ;
      }else if(node.type=="judge"){
        return [left ].concat(arr) ;
      }else {
        return [left, right ] ;
      }
      
    }

export default render;