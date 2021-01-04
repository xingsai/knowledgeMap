<template>
  <el-container class="login" @keyup.native.enter="login">
    <div class="row">
      <div class="loginBox">
        <!-- <div class="logo"><img src="../../static/images/logo_1.png" alt=""></div> -->
        <!-- <div class="logoTxt"><img src="../../static/images/slogan.png" alt=""></div> -->
        <h1 class="title">车联网全渠道服务支撑系统</h1>
        <el-form :rules="loginRule" ref="loginForm" :model="user">
          <el-form-item prop="userName" size="medium" style="margin-bottom:20px;">
            <el-input type="text" :clearable="true" v-model="user.userName" value="用户名">
              <i class="icon icon-user" slot="prepend"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password" size="medium" style="margin-bottom:40px;">
            <el-input type="password" :clearable="true" v-model="user.password" value="密码">
              <i class="icon icon-lock" slot="prepend"></i>
            </el-input>
          </el-form-item>
          <el-form-item size="large">
            <el-button style="color:#fff;width:100%;" @click="login" :loading="loginLoading">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      user: {
        userName: "",
        password: ""
      },
      loginRule: {
        userName: [
          {
            required: true,
            message: "必填",
            trigger: ["blur", "change"]
          }
        ],
        password: [
          {
            required: true,
            message: "必填",
            trigger: ["blur", "change"]
          }
        ]
      },
      loginLoading: false
    };
  },
  methods: {
    login() {
      this.$refs["loginForm"].validate(valid => {
        if (valid) {
          this.loginLoading = true;
          // this.user.password = this.$crypt.encrypt(
          //   this.$crypt.key,
          //   this.user.password
          // );
          this.$http.unauth.post(
            "/system/loginCtrl/login",{
              name:this.user.userName,
              password:this.user.password
            }
          )
          // this.$http.unauth
          //   .post("/UTRY/iscintegrate/rest/common/loginuser/validate", {
          //     params: this.user
          //   })
          //   .then(({ data }) => {
          //     if (data.successful === true) {
          //       return this.$http.unauth.post(
          //         "/system/loginCtrl/login",
          //         data.resultValue
          //       );
          //     } else {
          //       throw new Error(data.resultHint);
          //     }
          //   })
            .then(({ data }) => {
              if (data.meta.code === "100") {
                this.$store.commit("login", {
                  token: data.data.accessToken,
                  // projectList: data.data.projectList
                });
                return this.$http.author.post(
                  "/system/loginCtrl/getUserInfo"
                );
              } else {
                throw new Error(data.meta.message);
              }
            })
            .then(({ data }) => {
              if (data.meta.code === "100") {
                this.$store.commit("setUser", {
                  userInfo: data.data
                });
                this.$router.replace({ name: "overview" });
              }
            })
            .catch(err => {
              this.user.password = "";
              this.loginLoading = false;
              this.$message.error(`登陆失败，${err.message}`);
              console.error(err);
            });
        }
      });
    }
  }
};
</script>

<style>
.login {
  width: 100%;
  height: 100%;
  background: url(../../public/images/bg_1.png) no-repeat;
  background-position: center;
  background-size: cover;
}
.login .row {
    right: -65%;
    /* width: 900px; */
    position: relative;
    /* margin: 0 auto; */
    transform: translateY(-30%);
    top: 50%;
    /* left: 20px; */
    height: 350px;
    margin-top: -175px;
}
.login .el-input-group__prepend,
.login .el-input__inner {
  border-radius: 0;
}

.login i.icon {
  display: block;
  width: 17px;
  height: 20px;
}
.login i.icon-user {
  background: url(../../public/images/userNew.png) no-repeat;
  background-size: contain;
}
.login i.icon-lock {
  background: url(../../public/images/lockNew.png) no-repeat;
  background-size: contain;
}
.login .el-button {
  border-radius: 0;
  background: transparent;
  height: 48px;
  border: 0;
  background: #43c5bd;
  font-size: 16px;
}
.login .el-button:hover {
  background: #4cddd4;
}
.login .el-input-group__prepend {
  background-color: #fff;
  padding: 0 12px;
  border: none;
  font-size: 24px;
}
.loginBox {
  width: 380px;
  float: left;
}
.logoTxt {
  margin-bottom: 40px;
}
.loginBox .title {
  color: #43c5bd;
  font-size: 31px;
  font-weight: bold;
  margin: 30px 0;
}
.loginBox .logo {
  height: 85px;
  text-align: left;
  margin-bottom: 30px;
}
.logoL {
  width: 500px;
  height: 500px;
  position: absolute;
  top: 50%;
  right: 0;
  margin-top: -250px;
}
.login .el-form-item__content .el-input-group {
  vertical-align: top;
  background-color: transparent;
  z-index: 10;
}
.login .el-form-item--medium .el-form-item__content {
  background-color: #fff;
}
.login .el-input__inner {
  border: 0;
}
.login .el-input--medium .el-input__inner {
  background-color: #fff;
  height: 48px;
  line-height: 48px;
  font-size: 18px;
}

.login .el-form-item__error {
  top: 50%;
  left: 50px;
  transform: translateY(-50%);
  z-index: 1;
}
.login .el-form-item.is-error .el-input__inner {
  background-color: rgba(255, 65, 65, 0.1);
}
.login .el-form-item.is-success,
.login .el-form-item.is-required {
  background-color: #fff !important;
}
</style>
