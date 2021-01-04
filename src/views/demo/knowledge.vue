<template>
  <div @click="hideTip">
    <!-- <div id="main" style="width: 100%; height: 500px"></div> -->
    <div id="body"></div>
    <div class="tip-wrap" ref="tip" v-if="flagTip">我是{{ currentInfo }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentInfo: "",
      flagTip: false,
    };
  },
  methods: {
    init() {
      var that = this;
      var margin = {
          top: 20,
          right: 120,
          bottom: 20,
          left: 120,
        },
        width = 960 - margin.right - margin.left,
        height = 500 - margin.top - margin.bottom;

      var root = {
        name: "flare",
        children: [
          {
            name: "analytics",
            children: [
              {
                name: "cluster",
                children: [
                  {
                    name: "AgglomerativeCluster",
                    size: 3938,
                  },
                  {
                    name: "CommunityStructure",
                    size: 3812,
                  },
                  {
                    name: "HierarchicalCluster",
                    size: 6714,
                  },
                  {
                    name: "MergeEdge",
                    size: 743,
                  },
                ],
              },
              {
                name: "graph",
                children: [
                  {
                    name: "BetweennessCentrality",
                    size: 3534,
                  },
                  {
                    name: "LinkDistance",
                    size: 5731,
                  },
                  {
                    name: "MaxFlowMinCut",
                    size: 7840,
                  },
                  {
                    name: "ShortestPaths",
                    size: 5914,
                  },
                  {
                    name: "SpanningTree",
                    size: 3416,
                  },
                ],
              },
              {
                name: "optimization",
                children: [
                  {
                    name: "AspectRatioBanker",
                    size: 7074,
                  },
                ],
              },
            ],
          },
          {
            name: "animate",
            children: [
              {
                name: "Easing",
                size: 17010,
              },
              {
                name: "FunctionSequence",
                size: 5842,
              },
              {
                name: "interpolate",
                children: [
                  {
                    name: "ArrayInterpolator",
                    size: 1983,
                  },
                  {
                    name: "ColorInterpolator",
                    size: 2047,
                  },
                  {
                    name: "DateInterpolator",
                    size: 1375,
                  },
                  {
                    name: "Interpolator",
                    size: 8746,
                  },
                  {
                    name: "MatrixInterpolator",
                    size: 2202,
                  },
                  {
                    name: "NumberInterpolator",
                    size: 1382,
                  },
                  {
                    name: "ObjectInterpolator",
                    size: 1629,
                  },
                  {
                    name: "PointInterpolator",
                    size: 1675,
                  },
                  {
                    name: "RectangleInterpolator",
                    size: 2042,
                  },
                ],
              },
              {
                name: "ISchedulable",
                size: 1041,
              },
              {
                name: "Parallel",
                size: 5176,
              },
              {
                name: "Pause",
                size: 449,
              },
              {
                name: "Scheduler",
                size: 5593,
              },
              {
                name: "Sequence",
                size: 5534,
              },
              {
                name: "Transition",
                size: 9201,
              },
              {
                name: "Transitioner",
                size: 19975,
              },
              {
                name: "TransitionEvent",
                size: 1116,
              },
              {
                name: "Tween",
                size: 6006,
              },
            ],
          },
          {
            name: "data",
            children: [
              {
                name: "converters",
                children: [
                  {
                    name: "Converters",
                    size: 721,
                  },
                  {
                    name: "DelimitedTextConverter",
                    size: 4294,
                  },
                  {
                    name: "GraphMLConverter",
                    size: 9800,
                  },
                  {
                    name: "IDataConverter",
                    size: 1314,
                  },
                  {
                    name: "JSONConverter",
                    size: 2220,
                  },
                ],
              },
              {
                name: "DataField",
                size: 1759,
              },
              {
                name: "DataSchema",
                size: 2165,
              },
              {
                name: "DataSet",
                size: 586,
              },
              {
                name: "DataSource",
                size: 3331,
              },
              {
                name: "DataTable",
                size: 772,
              },
              {
                name: "DataUtil",
                size: 3322,
              },
            ],
          },
          {
            name: "display",
            children: [
              {
                name: "DirtySprite",
                size: 8833,
              },
              {
                name: "LineSprite",
                size: 1732,
              },
              {
                name: "RectSprite",
                size: 3623,
              },
              {
                name: "TextSprite",
                size: 10066,
              },
            ],
          },
          {
            name: "flex",
            children: [
              {
                name: "FlareVis",
                size: 4116,
              },
            ],
          },
          {
            name: "physics",
            children: [
              {
                name: "DragForce",
                size: 1082,
              },
              {
                name: "GravityForce",
                size: 1336,
              },
              {
                name: "IForce",
                size: 319,
              },
              {
                name: "NBodyForce",
                size: 10498,
              },
              {
                name: "Particle",
                size: 2822,
              },
              {
                name: "Simulation",
                size: 9983,
              },
              {
                name: "Spring",
                size: 2213,
              },
              {
                name: "SpringForce",
                size: 1681,
              },
            ],
          },
          {
            name: "query",
            children: [
              {
                name: "AggregateExpression",
                size: 1616,
              },
              {
                name: "And",
                size: 1027,
              },
              {
                name: "Arithmetic",
                size: 3891,
              },
              {
                name: "Average",
                size: 891,
              },
              {
                name: "BinaryExpression",
                size: 2893,
              },
              {
                name: "Comparison",
                size: 5103,
              },
              {
                name: "CompositeExpression",
                size: 3677,
              },
              {
                name: "Count",
                size: 781,
              },
              {
                name: "DateUtil",
                size: 4141,
              },
              {
                name: "Distinct",
                size: 933,
              },
              {
                name: "Expression",
                size: 5130,
              },
              {
                name: "ExpressionIterator",
                size: 3617,
              },
              {
                name: "Fn",
                size: 3240,
              },
              {
                name: "If",
                size: 2732,
              },
              {
                name: "IsA",
                size: 2039,
              },
              {
                name: "Literal",
                size: 1214,
              },
              {
                name: "Match",
                size: 3748,
              },
              {
                name: "Maximum",
                size: 843,
              },
              {
                name: "methods",
                children: [
                  {
                    name: "add",
                    size: 593,
                  },
                  {
                    name: "and",
                    size: 330,
                  },
                  {
                    name: "average",
                    size: 287,
                  },
                  {
                    name: "count",
                    size: 277,
                  },
                  {
                    name: "distinct",
                    size: 292,
                  },
                  {
                    name: "div",
                    size: 595,
                  },
                  {
                    name: "eq",
                    size: 594,
                  },
                  {
                    name: "fn",
                    size: 460,
                  },
                  {
                    name: "gt",
                    size: 603,
                  },
                  {
                    name: "gte",
                    size: 625,
                  },
                  {
                    name: "iff",
                    size: 748,
                  },
                  {
                    name: "isa",
                    size: 461,
                  },
                  {
                    name: "lt",
                    size: 597,
                  },
                  {
                    name: "lte",
                    size: 619,
                  },
                  {
                    name: "max",
                    size: 283,
                  },
                  {
                    name: "min",
                    size: 283,
                  },
                  {
                    name: "mod",
                    size: 591,
                  },
                  {
                    name: "mul",
                    size: 603,
                  },
                  {
                    name: "neq",
                    size: 599,
                  },
                  {
                    name: "not",
                    size: 386,
                  },
                  {
                    name: "or",
                    size: 323,
                  },
                  {
                    name: "orderby",
                    size: 307,
                  },
                  {
                    name: "range",
                    size: 772,
                  },
                  {
                    name: "select",
                    size: 296,
                  },
                  {
                    name: "stddev",
                    size: 363,
                  },
                  {
                    name: "sub",
                    size: 600,
                  },
                  {
                    name: "sum",
                    size: 280,
                  },
                  {
                    name: "update",
                    size: 307,
                  },
                  {
                    name: "variance",
                    size: 335,
                  },
                  {
                    name: "where",
                    size: 299,
                  },
                  {
                    name: "xor",
                    size: 354,
                  },
                  {
                    name: "_",
                    size: 264,
                  },
                ],
              },
              {
                name: "Minimum",
                size: 843,
              },
              {
                name: "Not",
                size: 1554,
              },
              {
                name: "Or",
                size: 970,
              },
              {
                name: "Query",
                size: 13896,
              },
              {
                name: "Range",
                size: 1594,
              },
              {
                name: "StringUtil",
                size: 4130,
              },
              {
                name: "Sum",
                size: 791,
              },
              {
                name: "Variable",
                size: 1124,
              },
              {
                name: "Variance",
                size: 1876,
              },
              {
                name: "Xor",
                size: 1101,
              },
            ],
          },
          {
            name: "scale",
            children: [
              {
                name: "IScaleMap",
                size: 2105,
              },
              {
                name: "LinearScale",
                size: 1316,
              },
              {
                name: "LogScale",
                size: 3151,
              },
              {
                name: "OrdinalScale",
                size: 3770,
              },
              {
                name: "QuantileScale",
                size: 2435,
              },
              {
                name: "QuantitativeScale",
                size: 4839,
              },
              {
                name: "RootScale",
                size: 1756,
              },
              {
                name: "Scale",
                size: 4268,
              },
              {
                name: "ScaleType",
                size: 1821,
              },
              {
                name: "TimeScale",
                size: 5833,
              },
            ],
          },
          {
            name: "util",
            children: [
              {
                name: "Arrays",
                size: 8258,
              },
              {
                name: "Colors",
                size: 10001,
              },
              {
                name: "Dates",
                size: 8217,
              },
              {
                name: "Displays",
                size: 12555,
              },
              {
                name: "Filter",
                size: 2324,
              },
              {
                name: "Geometry",
                size: 10993,
              },
              {
                name: "heap",
                children: [
                  {
                    name: "FibonacciHeap",
                    size: 9354,
                  },
                  {
                    name: "HeapNode",
                    size: 1233,
                  },
                ],
              },
              {
                name: "IEvaluable",
                size: 335,
              },
              {
                name: "IPredicate",
                size: 383,
              },
              {
                name: "IValueProxy",
                size: 874,
              },
              {
                name: "math",
                children: [
                  {
                    name: "DenseMatrix",
                    size: 3165,
                  },
                  {
                    name: "IMatrix",
                    size: 2815,
                  },
                  {
                    name: "SparseMatrix",
                    size: 3366,
                  },
                ],
              },
              {
                name: "Maths",
                size: 17705,
              },
              {
                name: "Orientation",
                size: 1486,
              },
              {
                name: "palette",
                children: [
                  {
                    name: "ColorPalette",
                    size: 6367,
                  },
                  {
                    name: "Palette",
                    size: 1229,
                  },
                  {
                    name: "ShapePalette",
                    size: 2059,
                  },
                  {
                    name: "SizePalette",
                    size: 2291,
                  },
                ],
              },
              {
                name: "Property",
                size: 5559,
              },
              {
                name: "Shapes",
                size: 19118,
              },
              {
                name: "Sort",
                size: 6887,
              },
              {
                name: "Stats",
                size: 6557,
              },
              {
                name: "Strings",
                size: 22026,
              },
            ],
          },
          {
            name: "vis",
            children: [
              {
                name: "axis",
                children: [
                  {
                    name: "Axes",
                    size: 1302,
                  },
                  {
                    name: "Axis",
                    size: 24593,
                  },
                  {
                    name: "AxisGridLine",
                    size: 652,
                  },
                  {
                    name: "AxisLabel",
                    size: 636,
                  },
                  {
                    name: "CartesianAxes",
                    size: 6703,
                  },
                ],
              },
              {
                name: "controls",
                children: [
                  {
                    name: "AnchorControl",
                    size: 2138,
                  },
                  {
                    name: "ClickControl",
                    size: 3824,
                  },
                  {
                    name: "Control",
                    size: 1353,
                  },
                  {
                    name: "ControlList",
                    size: 4665,
                  },
                  {
                    name: "DragControl",
                    size: 2649,
                  },
                  {
                    name: "ExpandControl",
                    size: 2832,
                  },
                  {
                    name: "HoverControl",
                    size: 4896,
                  },
                  {
                    name: "IControl",
                    size: 763,
                  },
                  {
                    name: "PanZoomControl",
                    size: 5222,
                  },
                  {
                    name: "SelectionControl",
                    size: 7862,
                  },
                  {
                    name: "TooltipControl",
                    size: 8435,
                  },
                ],
              },
              {
                name: "data",
                children: [
                  {
                    name: "Data",
                    size: 20544,
                  },
                  {
                    name: "DataList",
                    size: 19788,
                  },
                  {
                    name: "DataSprite",
                    size: 10349,
                  },
                  {
                    name: "EdgeSprite",
                    size: 3301,
                  },
                  {
                    name: "NodeSprite",
                    size: 19382,
                  },
                  {
                    name: "render",
                    children: [
                      {
                        name: "ArrowType",
                        size: 698,
                      },
                      {
                        name: "EdgeRenderer",
                        size: 5569,
                      },
                      {
                        name: "IRenderer",
                        size: 353,
                      },
                      {
                        name: "ShapeRenderer",
                        size: 2247,
                      },
                    ],
                  },
                  {
                    name: "ScaleBinding",
                    size: 11275,
                  },
                  {
                    name: "Tree",
                    size: 7147,
                  },
                  {
                    name: "TreeBuilder",
                    size: 9930,
                  },
                ],
              },
              {
                name: "events",
                children: [
                  {
                    name: "DataEvent",
                    size: 2313,
                  },
                  {
                    name: "SelectionEvent",
                    size: 1880,
                  },
                  {
                    name: "TooltipEvent",
                    size: 1701,
                  },
                  {
                    name: "VisualizationEvent",
                    size: 1117,
                  },
                ],
              },
              {
                name: "legend",
                children: [
                  {
                    name: "Legend",
                    size: 20859,
                  },
                  {
                    name: "LegendItem",
                    size: 4614,
                  },
                  {
                    name: "LegendRange",
                    size: 10530,
                  },
                ],
              },
              {
                name: "operator",
                children: [
                  {
                    name: "distortion",
                    children: [
                      {
                        name: "BifocalDistortion",
                        size: 4461,
                      },
                      {
                        name: "Distortion",
                        size: 6314,
                      },
                      {
                        name: "FisheyeDistortion",
                        size: 3444,
                      },
                    ],
                  },
                  {
                    name: "encoder",
                    children: [
                      {
                        name: "ColorEncoder",
                        size: 3179,
                      },
                      {
                        name: "Encoder",
                        size: 4060,
                      },
                      {
                        name: "PropertyEncoder",
                        size: 4138,
                      },
                      {
                        name: "ShapeEncoder",
                        size: 1690,
                      },
                      {
                        name: "SizeEncoder",
                        size: 1830,
                      },
                    ],
                  },
                  {
                    name: "filter",
                    children: [
                      {
                        name: "FisheyeTreeFilter",
                        size: 5219,
                      },
                      {
                        name: "GraphDistanceFilter",
                        size: 3165,
                      },
                      {
                        name: "VisibilityFilter",
                        size: 3509,
                      },
                    ],
                  },
                  {
                    name: "IOperator",
                    size: 1286,
                  },
                  {
                    name: "label",
                    children: [
                      {
                        name: "Labeler",
                        size: 9956,
                      },
                      {
                        name: "RadialLabeler",
                        size: 3899,
                      },
                      {
                        name: "StackedAreaLabeler",
                        size: 3202,
                      },
                    ],
                  },
                  {
                    name: "layout",
                    children: [
                      {
                        name: "AxisLayout",
                        size: 6725,
                      },
                      {
                        name: "BundledEdgeRouter",
                        size: 3727,
                      },
                      {
                        name: "CircleLayout",
                        size: 9317,
                      },
                      {
                        name: "CirclePackingLayout",
                        size: 12003,
                      },
                      {
                        name: "DendrogramLayout",
                        size: 4853,
                      },
                      {
                        name: "ForceDirectedLayout",
                        size: 8411,
                      },
                      {
                        name: "IcicleTreeLayout",
                        size: 4864,
                      },
                      {
                        name: "IndentedTreeLayout",
                        size: 3174,
                      },
                      {
                        name: "Layout",
                        size: 7881,
                      },
                      {
                        name: "NodeLinkTreeLayout",
                        size: 12870,
                      },
                      {
                        name: "PieLayout",
                        size: 2728,
                      },
                      {
                        name: "RadialTreeLayout",
                        size: 12348,
                      },
                      {
                        name: "RandomLayout",
                        size: 870,
                      },
                      {
                        name: "StackedAreaLayout",
                        size: 9121,
                      },
                      {
                        name: "TreeMapLayout",
                        size: 9191,
                      },
                    ],
                  },
                  {
                    name: "Operator",
                    size: 2490,
                  },
                  {
                    name: "OperatorList",
                    size: 5248,
                  },
                  {
                    name: "OperatorSequence",
                    size: 4190,
                  },
                  {
                    name: "OperatorSwitch",
                    size: 2581,
                  },
                  {
                    name: "SortOperator",
                    size: 2023,
                  },
                ],
              },
              {
                name: "Visualization",
                size: 16540,
              },
            ],
          },
        ],
      };

      var i = 0,
        duration = 750,
        rectW = 60,
        rectH = 30;
      var zm;
      //创建树
      var tree = this.$d3.layout.tree().nodeSize([170, 40]);//tree.nodeSize - 设置节点尺寸.
      //绘制曲线 //svg.diagonal新建一个对角线生成器//diagonal.projection - 设置或获取一个可选的点转换。
      var diagonal = this.$d3.svg.diagonal().projection(function (d) {
        return [d.x + rectW / 2, d.y + rectH / 2];
      });

      var svg = this.$d3
        .select("#body")
        .append("svg")
        .attr("width", 1000)
        .attr("height", 1000)
        .call(
          (zm = this.$d3.behavior.zoom().scaleExtent([1, 3]).on("zoom", redraw))
        )
        .append("g")
        .attr("transform", "translate(" + 350 + "," + 20 + ")");

      //necessary so that zoom knows where to zoom and unzoom from
      zm.translate([350, 20]);

      root.x0 = 0;
      root.y0 = height / 2;

      function collapse(d) {
        if (d.children) {
          d._children = d.children;
          d._children.forEach(collapse);
          d.children = null;
        }
      }

      root.children.forEach(collapse);
      update(root);

      this.$d3.select("#body").style("height", "800px");

      function update(source) {
        console.log("update")
        // Compute the new tree layout.
        //(2-1)计算新树的布局
        var nodes = tree.nodes(root).reverse(),
          links = tree.links(nodes);

        // Normalize for fixed-depth.
        //(2-2)树的深度这里树d.y。树的宽度最大720，要分四层，所以每层就乘180
        nodes.forEach(function (d) {
          d.y = d.depth * 180; //// 树的x,y倒置了，所以这里Y其实是横向的
        });

        // Update the nodes…
        //(2-3)数据连接，根据id绑定数据
        var node = svg.selectAll("g.node").data(nodes, function (d) {
          return d.id || (d.id = ++i);
        });
           console.log("update1")
        // Enter any new nodes at the parent's previous position.
        //(2-4)点击时增加新的子节点
        var nodeEnter = node
          .enter()
          .append("g")
          .attr("class", "node")
          .attr("transform", function (d) {
            return "translate(" + source.x0 + "," + source.y0 + ")";
          });
        nodeEnter
          .append("rect")
          .attr("width", rectW)
          .attr("height", rectH)
          .attr("stroke", "black")
          .attr("stroke-width", 1)
          .style("fill", function (d) {
                console.log(d)
            return d._children ? "lightsteelblue" : "#fff";
          })
          .on("click", showtip);
          console.log("update2")

        nodeEnter
          .append("rect")
          .attr("width", 25)
          .attr("height", 25)
          .attr("class", "toggleBtn")
          .attr("class", function (d) {
            return d._children || d.name == "flare"
              ? "fillimgge"
              : "disPlayNone";
          }) 
          .style("fill", function (d) {
                console.log(d)
            return d._children ? "lightsteelblue" : "#fff";
          })

          .attr("stroke", "black")
          .attr("stroke-width", 1)
         // .style("fill", "#fff")
          .attr("x", 15)
          .attr("y", 25)
          .attr("rx", 25)
          .attr("ry", 25)
          .on("click", click)
           console.log("update3")

          nodeEnter.append('use')
          .attr("class", "toggle-btn-text")
        .attr("class", function (d) {
            return d._children || d.name == "flare"
              ? ""
              : "disPlayNone";
          })
          .attr("width", "24")
          .attr("pointer-events", "none")
          .attr("height", "24")
          .attr("x", "15")
          .attr("y", '25')
          .attr("href", "#fold")
          .append('svg')

           .attr("xmlns", "http://www.w3.org/2000/svg")
            .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
             .attr("viewBox", "0 0 16 16")
             .attr("id", "fold")
            .attr("width", "24")
          .attr("height", "24")
          .append('path')
          

         // transform="translate(8.000000, 7.825641) scale(1, -1) translate(-8.000000, -7.825641)
          .attr("d", "M8.35355339,7.70850834 L12.0826855,11.4376404 C12.231385,11.58634 12.231385,11.8274296 12.0826855,11.9761292 C12.082049,11.9767657 12.0814102,11.9773999 12.0807692,11.9780319 C11.9296407,12.1270318 11.6865996,12.12617 11.5365316,11.976102 L8,8.43957034 L4.46346836,11.976102 C4.31340038,12.12617 4.07035925,12.1270318 3.91923077,11.9780319 C3.76948037,11.8303906 3.76777056,11.5893071 3.9154118,11.4395567 L3.91731451,11.4376404 L7.45384615,7.9011088 L7.64644661,7.70850834 C7.84170876,7.5132462 8.15829124,7.5132462 8.35355339,7.70850834 Z M8.35355339,3.70850834 L12.0826855,7.43764044 C12.231385,7.58634 12.231385,7.82742961 12.0826855,7.97612916 C12.082049,7.97676566 12.0814102,7.97739991 12.0807692,7.97803188 C11.9296407,8.12703179 11.6865996,8.12616995 11.5365316,7.97610198 L8,4.43957034 L4.46346836,7.97610198 C4.31340038,8.12616995 4.07035925,8.12703179 3.91923077,7.97803188 C3.76948037,7.83039064 3.76777056,7.58930709 3.9154118,7.4395567 L3.91731451,7.43764044 L7.45384615,3.9011088 L7.64644661,3.70850834 C7.84170876,3.5132462 8.15829124,3.5132462 8.35355339,3.70850834 Z")
            .attr("transform", function (d) {
               // console.log(d)
            return d._children || d.name == "flare"
              ?  ""
              : " translate(-8.000000, -7.825641)  scale(1, -1) translate(8.000000, 7.825641)";
              
          })
           console.log("update4")

        nodeEnter
          .append("text")
          .attr("x", rectW / 2)
          .attr("y", rectH / 2)
          .attr("dy", ".35em")
          .attr("text-anchor", "middle")
          .text(function (d) {
            return d.name;
          });

        // Transition nodes to their new position.
        // (2-5)原有节点更新到新位置
        var nodeUpdate = node
          .transition()
          .duration(duration)
          .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
          });

        nodeUpdate
          .select("rect")
          .attr("width", rectW)
          .attr("height", rectH)
          .attr("stroke", "black")
          .attr("stroke-width", 1)
          .style("fill", function (d) {
            return d._children ? "lightsteelblue" : "#fff";
          });

        nodeUpdate.select("text").style("fill-opacity", 1);

        // Transition exiting nodes to the parent's new position.
        //(2-6) 折叠节点的子节点收缩回来
        var nodeExit = node
          .exit()
          .transition()
          .duration(duration)
          .attr("transform", function (d) {
            return "translate(" + source.x + "," + source.y + ")";
          })
          .remove();

        nodeExit
          .select("rect")
          .attr("width", rectW)
          .attr("height", rectH)
          //.attr("width", bbox.getBBox().width)""
          //.attr("height", bbox.getBBox().height)
          .attr("stroke", "black")
          .attr("stroke-width", 1);

        nodeExit.select("text");

        // Update the links…
        //(2-7)数据连接，根据目标节点的id绑定数据
        var link = svg.selectAll("path.link").data(links, function (d) {
          return d.target.id;
        });

        // Enter any new links at the parent's previous position.
        // (2-8) 增加新连接
        link
          .enter()
          .insert("path", "g")
          .attr("class", "link")
          .attr("x", rectW / 2)
          .attr("y", rectH / 2)
          .attr("d", function (d) {
            var o = {
              x: source.x0,
              y: source.y0,
            };
            return diagonal({
              source: o,
              target: o,
            });
          });

        // Transition links to their new position.
        // (2-9) 原有连接更新位置
        link.transition().duration(duration).attr("d", diagonal);

        // Transition exiting nodes to the parent's new position.
        // (2-10) 折叠的链接，收缩到源节点处
        link
          .exit()
          .transition()
          .duration(duration)
          .attr("d", function (d) {
            var o = {
              x: source.x,
              y: source.y,
            };
            return diagonal({
              source: o,
              target: o,
            });
          })
          .remove();

        // Stash the old positions for transition.
        // 把旧位置存下来，用以过渡
        nodes.forEach(function (d) {
          d.x0 = d.x;
          d.y0 = d.y;
        });
      }

      // Toggle children on click.
      //(3) 切换折叠与否
      function click(d) {
        if (d.children) {
          d._children = d.children;
          d.children = null;
        } else {
          d.children = d._children;
          d._children = null;
        }
        update(d);
      }
      function showtip(d) {
        event.stopPropagation();
        that.flagTip = true;
        that.currentInfo = d.name;
        let x = event.clientX;
        let y = event.clientY;

        that.$nextTick(() => {
          console.log(that.$refs.tip.style.top);
          that.$refs.tip.style.top = y - 50 + "px";
          that.$refs.tip.style.left = x + "px";
        });

        //.
        console.log(d);
        console.log(event.clientX);
        console.log(event.clientY);
      }

      //Redraw for zoom
      //缩放重绘
      function redraw() {
        //console.log("here", that.$d3);
        svg.attr(
          "transform",
          "translate(" +
            that.$d3.event.translate +
            ")" +
            " scale(" +
            that.$d3.event.scale +
            ")"
        );
      }
    },
    /* 绘制图表 */
    hideTip() {
      this.flagTip = false;
    },
  },
  mounted() {
    this.init();
    //  this.drawChart()
  },
};
</script>

<style >
.node {
  font: 12px sans-serif;
}

.link {
  fill: none;
  stroke: #ccc;
  stroke-width: 1.5px;
}
.node {
  cursor: pointer;
}
.node circle {
  fill: #fff;
  stroke: steelblue;
  stroke-width: 1.5px;
}
.node text {
  font: 10px sans-serif;
}
.link {
  fill: none;
  stroke: #ccc;
  stroke-width: 1.5px;
}

body {
  overflow: hidden;
}
.tip-wrap {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  border: 1px solid #333333;
  padding: 20px;
}
.disPlayNone {
  display: none;
}
.fillimgge {
  /* background: url("./../../assets/logo.png"); */
  background-size: 25px 25px;
}
</style>
