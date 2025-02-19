<template>
  <div class="moment-upload-container">

    <div class="moment-upload-subject">
      <el-select v-model="subjectid" filterable allow-create default-first-option clearable placeholder="话题（可选，可自定义）">
        <el-option v-for="item in subjectList" :key="item.subjectid" :label="item.subjectname" :value="item.subjectid">
        </el-option>
      </el-select>
    </div>

    <el-input type="textarea" placeholder="有什么想和大家分享的？" v-model="params.textarea" autosize maxlength="255"
      show-word-limit>
    </el-input>

    <div class="img-upload" v-show="uploadImgVisible">
      <el-upload action="#" ref="uploadMoment" list-type="picture-card" :auto-upload="false" :file-list="fileList"
        multiple :on-change="fileChange" :on-remove="fileRemove">
        <i slot="default" class="el-icon-plus"></i>
        <div slot="file" slot-scope="{file}">
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
          <span class="el-upload-list__item-actions">
            <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
              <i class="el-icon-zoom-in"></i>
            </span>
            <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
              <i class="el-icon-download"></i>
            </span>
            <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
              <i class="el-icon-delete"></i>
            </span>
          </span>
        </div>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>

    <div class="moment-upload-bottom">
      <div class="bottom-left">
        <i class="iconfont icon-biaoqing"></i>
        <i class="iconfont icon-tupian" @click="showUploadImg"></i>
        <i class="iconfont icon-aite"></i>
        <i class="iconfont icon-zu"></i>
        <i class="iconfont icon-zhibolive"></i>
      </div>
      <div class="bottom-right">
        <el-switch v-model="params.canComment" active-text="允许评论" active-color="#13ce66" inactive-color="#ff4949">
        </el-switch>
        <el-button type="primary" size="medium" @click="uploadMoment">发布</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "UploadMoment",
  data() {
    return {

      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,

      subjectList: [],
      subjectid: '',

      uploadImgVisible: false,

      fileList: [],

      //上传参数
      params: {
        textarea: '',
        //允许评论
        canComment: true,
      }
    }
  },
  computed: {
    ...mapGetters(['userid'])
  },
  mounted() {
    this.getSubjectList()
  },
  methods: {
    // 获取话题列表
    async getSubjectList() {
      let res = await this.$API.reqSubjectList();
      if (res.status == 200) {
        this.subjectList = res.data
      } else {
        this.$messageBox.confirm("获取服务器话题列表失败", "错误信息")
      }
    },
    //是否显示图片上传组件【自定义】
    showUploadImg() {
      if (this.uploadImgVisible == true && this.fileList.length != 0) {
        this.$messageBox.confirm("关闭将清除所有已添加图片，请确认", "图片上传", {
          confirmButtonText: '清除图片',
          cancelButtonText: '点错了',
        }).then(() => {
          this.fileList = []
          this.uploadImgVisible = !this.uploadImgVisible
        }).catch((action) => {

        })
      } else {
        this.uploadImgVisible = !this.uploadImgVisible
      }
    },

    /**
     * 图片上传部分
     * @param {*} file 
     */
    //删除文件
    handleRemove(file) {
      this.fileList.splice(this.fileList.indexOf(file), 1)
    },
    //预览图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //下载图片
    handleDownload(file) {
      console.log(file);
    },
    //检测文件变动获取文件
    fileChange(file, fileList) {
      this.fileList = fileList;
    },
    //检测文件删除
    fileRemove(file, fileList) {
      this.fileList = fileList;
    },
    //手动上传图片
    uploadMoment() {
      if (this.params.textarea.trim() == '') {
        this.$message({
          message: '动态文本内容不能为空！',
          type: 'info'
        })
        return
      }

      let formData = new FormData();  //  将文件封装进FormData
      this.fileList.forEach(file => {
        formData.append('file', file.raw)
      })
      formData.append("textarea", this.params.textarea) //附带数据
      formData.append("canComment", this.params.canComment ? 1 : 0)
      formData.append("userId", this.userid)
      if (typeof(this.subjectid)=='string' && this.subjectid.trim() != '') {
        formData.append("subjectName", this.subjectid)
      } else if(typeof(this.subjectid)=='number') {
        formData.append("subjectId", this.subjectid)
      }
      // 调用上传接口
      this.$API.reqUploadMoment(formData).then((res) => {
        //手动上传无法触发成功或失败的钩子函数，因此需要手动调用 
        this.$message({
          message: '上传动态成功，请勿重复提交，可以到“个人中心--内容管理”查看审核状态',
          type: 'success'
        });
        //初始化页面数据
        let temp = this.subjectList
        Object.assign(this.$data, this.$options.data())
        this.subjectList = temp
      }, (err) => {
        // this.upError(err)
      })
    },

  },
}
</script>

<style lang="less" scoped>
/**tag标签部分，官方css */
.el-tag+.el-tag {
  margin-left: 10px;
}

.moment-upload-container {
  padding: 20px 60px;

  .moment-upload-subject {
    // display: flex;
    margin-bottom: 10px;

    .left {
      color: #606266;
      font-size: 14px;
      width: 85px;
    }

    .right {
      .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
      }

      .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
      }
    }

  }

  .img-upload {
    margin-top: 10px;
  }

  .moment-upload-bottom {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;

    .bottom-left {
      display: flex;
      align-items: center;

      i {
        margin-right: 16px;
        font-size: 20px;
        color: #9499a0;
      }
    }

    .bottom-right {

      .el-button {
        margin-left: 15px;
      }
    }
  }
}
</style>