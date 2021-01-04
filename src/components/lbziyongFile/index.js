var regId = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
var email = /^(\w+\.?)*\w+@(?:\w+\.)\w+$/;
var tel = /^1[3456789]\d{9}$/;
var phone = /0\d{2}-\d{7,8}/;
var fax = /^(\d{3,4}-)?\d{7,8}$/;
var positiveInteger = /^[0-9]+$/;
var userName = /^[a-zA-Z]\\w{4,19}$/;
var zipCode = /\\d{6}$/;

var lbFormValidate = (function() {
  function lbFormValidate() {}
  // From表单验证规则  可用于公用的校验部分
  lbFormValidate.Form = function() {
    return {
      // 邮编的验证规则
      ZipCode: function(rule, value, callback) {
        if (!value) {
          return callback(new Error('邮编不能为空'))
        }
        if (!zipCode.test(value)) {
          callback(new Error('请输入正确的邮编!'))
        } else {
          callback()
        }
      },
      // 用户名的验证规则
      UserName: function(rule, value, callback) {
        if (!value) {
          return callback(new Error('用户名不能为空'))
        }
        if (!userName.test(value)) {
          callback(new Error('请输入正确的用户名!'))
        } else {
          callback()
        }
      },
      // 邮箱的验证规则
      Email: function(rule, value, callback) {
        if (!value) {
          return callback(new Error('邮箱不能为空'))
        }
        if (!email.test(value)) {
          callback(new Error('请输入正确的邮箱!'))
        } else {
          callback()
        }
      },
      // 身份证的验证规则
      ID: function(rule, value, callback) {
        if (!value) {
          return callback(new Error('身份证不能为空'))
        }
        if (!regId.test(value)) {
          callback(new Error('请输入正确的二代身份证号码'))
        } else {
          callback()
        }
      },
      // 电话号码和座机共同验证
      TelAndPhone: (rule, value, callback) => {
        if (!value) {
          return callback(new Error('电话不能为空'))
        }
        if (tel.test(value)||phone.test(value)) {
          callback()
        } else {
          callback(new Error('请正确填写电话号码'))
        }
      },
      // 电话号码验证
      Tel: (rule, value, callback) => {
        if (!value) {
          return callback(new Error('电话不能为空'))
        }
        if (tel.test(value)) {
          callback()
        } else {
          callback(new Error('请正确填写电话号码'))
        }
      },
      // 座机验证
      Phone: (rule, value, callback) => {
        if (!value) {
          return callback(new Error('电话不能为空'))
        }
        if (phone.test(value)) {
          callback()
        } else {
          callback(new Error('请正确填写电话号码'))
        }
      },
      //非必填项正整数校验
      positiveInteger: (rule, value, callback) => {
        if(positiveInteger.test(value)||value == ''){
            callback();
        }else{
          return callback(new Error('请输入正整数'));
        }
      },
    }
  }



  return lbFormValidate
}())
exports.lbFormValidate = lbFormValidate
