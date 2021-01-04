var user = {
  state: {
    token: window.sessionStorage.getItem("token") || "",
    // projectId: window.localStorage.getItem("projectId") || "",
    // projectName: window.localStorage.getItem("projectName") || "",
    // projectList: JSON.parse(window.localStorage.getItem("projectList")) || [],
    menuList: [],
    userInfo: JSON.parse(window.localStorage.getItem("userInfo")) || {}
  },
  mutations: {
    login(state, payload) {
      state.token = payload.token;
      // state.projectList = payload.projectList;
      // payload.projectList.forEach(item => {
      //   if (item.isDefault === "1") {
      //     state.projectId = item.projectId;
      //     state.projectName = item.projectName;
      //     window.localStorage.setItem("projectId", item.projectId);
      //     window.localStorage.setItem("projectName", item.projectName);
      //     return;
      //   }
      // });
      window.sessionStorage.setItem("token", payload.token);
      // window.localStorage.setItem(
      //   "projectList",
      //   JSON.stringify(payload.projectList)
      // );
    },
    setUser(state, payload) {
      state.userInfo = payload.userInfo;
      window.localStorage.setItem("userInfo", JSON.stringify(payload.userInfo));
    },
    setMenuList(state, payload) {
      state.menuList = payload.menuList;
    },
    logout(state, payload) {
      window.sessionStorage.clear();
      window.localStorage.clear();
      state.token = "";
      state.projectId = "";
      state.projectName = "";
      state.projectList = [];
      state.menuList = [];
    }
  },
  getters: {
    // getProjectId(state) {
    //   return state.projectId;
    // },
    // getProjectName(state) {
    //   return state.projectName;
    // },
    // getProjectList(state) {
    //   return state.projectList;
    // },
    getMenuList(state) {
      return state.menuList;
    },
    getUserName(state) {
      return state.userInfo.userName;
    },
    getUserInfo(state) {
      return state.userInfo;
    }
  }
};
export default user;
