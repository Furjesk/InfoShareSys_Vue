<template>
  <div class="newchannel-container">
    <div class="newchannel-main">
      <div class="main-title">新建频道</div>
      <el-select v-model="category1id" placeholder="请选择频道所属类别">
        <el-option v-for="item in category1List" :key="item.category1id" :label="item.category1name"
          :value="item.category1id">
        </el-option>
      </el-select>
      <el-input class="title" type="text" placeholder="请输入频道标题" v-model="text" maxlength="20" show-word-limit
        @blur="checkName()">
      </el-input>
      <div class="tip">{{ tip }}</div>
      <el-input class="brief" type="textarea" placeholder="请输入频道简介" v-model="textarea" maxlength="100" show-word-limit>
      </el-input>
      <div class="btn-line">
        <el-button type="primary" @click="createChannel()">创建</el-button>
        <el-button plain @click="cancel()">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "CreateChannel",
  data() {
    return {
      category1List: [],
      //频道所属类别
      category1id: '',
      //频道标题
      text: '',
      //频道简介
      textarea: '',
      //提示信息
      tip: '',
      //是否允许提交
      canSubmit: false
    }
  },
  mounted() {
    this.getCategory1List()
  },
  computed: {
    ...mapGetters(['userid'])
  },
  methods: {
    //获取一级分类列表
    async getCategory1List() {
      if (this.$store.state.category.category1List.length == 0) {
        await this.$store.dispatch("getCategory1List");
      }
      this.category1List = this.$store.state.category.category1List
    },
    //检查频道是否已存在
    async checkName() {
      console.log(123);
      if (this.category1id == '') {
        this.tip = '请选择频道所属类别'
        this.canSubmit = false
        return
      }
      let params = {
        category1id: this.category1id,
        category2name: this.text
      }
      let res = await this.$API.reqHasCategory2(params)
      if (res.status != 200) {
        this.canSubmit = false
        this.tip = res.message
      } else {
        this.canSubmit = true
        this.tip = ''
      }
    },
    //创建频道
    async createChannel() {
      if (this.category1id != '' && this.text != '' && this.textarea != '' && this.canSubmit) {
        let params = {
          category1id: this.category1id,
          category2name: this.text,
          category2brief: this.textarea,
          userid: this.userid
        }
        let res = await this.$API.reqCreateChannel(params)
        if(res.status == 200) {
          this.cancel()
          this.$message.success("创建成功")
        }else {
          alert(res.message)
        }
      }

    },
    cancel() {
      this.category1id = ''
      this.text = ''
      this.textarea = ''
      this.tip = ''
      this.canSubmit = false
    }
  },
}
</script>

<style lang="less" scoped>
.newchannel-container {
  display: flex;
  justify-content: center;

  .newchannel-main {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .main-title {
      font-size: 20px;
      font-weight: 600;
      display: flex;
      justify-content: center;
    }

    .el-select {
      margin-top: 20px;
    }

    .title {
      display: block;
      margin-top: 20px;
    }

    .tip {
      height: 20px;
      font-size: 14px;
      color: red;
      margin-left: 15px;
    }

    .brief {
      display: block;
      // margin-top: 20px;
    }

    .btn-line {
      margin-top: 20px;
      display: flex;
      justify-content: space-evenly;
    }
  }

}</style>