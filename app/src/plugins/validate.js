//vee-validate插件：表单验证
import Vue from 'vue'
import VeeValidate from 'vee-validate'

// 使用vee-validate（会报冲突， 因为elmentui中fields属性已使用）
const config = {
    errorBagName: 'errorBags', // change if property conflicts.
    fieldsBagName: 'fieldBags',
};
//中文提示信息
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate, config)

//表单验证
VeeValidate.Validator.localize('zh_CN', {
    messages: {
        ...zh_CN.messages,
        is: (field) => `${field}必须与密码相同` //修改内置规则的message，让确认密码和密码相同
    },
    attributes: {
        phone: '手机号',
        code: '验证码',
        password: '密码',
        password1: '确认密码',
        agree: '协议'
    }
})

//自定义校验规则
VeeValidate.Validator.extend("isCheck", {
    validate:(value)=>{
        return value
    },
    getMessage:(field)=>field+"必须同意"
})