<template>
    <div class="forget_pwd">
        <div class="forget_container">
            <div class="line">
                <span class="left">手机号或邮箱：</span>
                <el-input class="right" v-model="account" placeholder="请输入登录时的手机号或邮箱"></el-input>
            </div>
            <div class="line">
                <span class="left">验证码：</span>
                <div class="right">
                    <el-input v-model="code" placeholder="请输入验证码"></el-input>
                    <el-button type="primary" plain @click="getCode">获取验证码</el-button>
                </div>
            </div>
            <div class="line">
                <span class="left">新密码：</span>
                <el-input class="right" v-model="newPwd" placeholder="请输入新密码" show-password></el-input>
            </div>
            <div class="line">
                <span class="left">再次确认：</span>
                <el-input class="right" v-model="newPwd2" placeholder="请再次输入新密码" show-password></el-input>
            </div>
            <div class="last_line">
                <el-button @click="$router.go(-1)">取消</el-button>
                <el-button type="primary" @click="submitChangePwd">确认更改</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ForgetPwd',
    data() {
        return {
            account: '',
            code: '',
            newPwd: '',
            newPwd2: '',
        }
    },
    methods: {
        //获取验证码【发邮件实现后，由于后端sleep60s删除session，这里不要用await】
        // getCode(){
        //     if(this.account.trim()==''){
        //         alert("请正确输入登录账号")
        //         this.account=''
        //         return
        //     }
        //     let res = this.$API.reqGetForgetCode(this.account)
        // },
        //获取验证码【发邮件实现后，由于后端sleep60s删除session，这里不要用await】
        async getCode() {
            if (this.account.trim() == '') {
                alert("请正确输入登录账号")
                this.account = ''
                return
            }
            let res = await this.$API.reqGetForgetCode(this.account)
            if (res.status != 200)
            //     this.code = res.data
            // else
                alert("获取验证码失败")
        },
        //提交更改密码
        async submitChangePwd() {
            if (this.account == '' || this.code == '' || this.newPwd == '' || this.newPwd2 == '') {
                alert("请填写完整信息")
                return
            }
            if (this.newPwd != this.newPwd2) {
                alert("确认密码必须和密码一致")
                return
            }
            let user = {
                username: this.account,
                userpwd: this.newPwd
            }
            let res = await this.$API.reqChangePwd(user)
            if (res.status == 200) {
                this.$message({
                    message: res.data,
                    type: 'success'
                });
            } else {
                alert(res.message)
            }
            this.$router.push("/login")
        }
    },
}
</script>

<style scoped lang="less">
.forget_pwd {
    position: relative;
    width: 100%;
    height: 400px;

    .forget_container {
        position: absolute;
        width: 600px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        .line {
            display: flex;
            margin-bottom: 10px;

            .left {
                flex: 1;
            }

            .right {
                flex: 4;
                display: flex;
            }
        }

        .last_line {
            margin-top: 10px;
            display: flex;
            justify-content: space-around;
        }
    }
}
</style>