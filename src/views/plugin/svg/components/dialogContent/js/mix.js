const mixinCommom = {
    data() {
      return {
        edittitle: "",
      }
    },
    filters: {
        filterType: function (value) {
          if (!value) return "";
          if (value == "root") {
            return "根节点";
          } else if (value == "switch") {
            return "判断节点";
          } else if (value == "operation") {
            return "动作节点";
          } else if (value == "http") {
            return "http节点";
          }
        },
      },
  
    methods: {
    }
  }
  
  export default mixinCommom;
  