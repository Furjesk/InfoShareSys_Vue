<template>
    <div>
        <div class="upload-area">
            <el-upload class="" ref="uploadVidoes" drag action="#" multiple :on-preview="handlePreview"
                :on-remove="handleRemove" :file-list="fileList" :auto-upload="false" :on-success="uploadVidoesSuccess"
                :on-change="videoChange">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                    将文件（支持多文件）拖到此处，或<em>点击选择</em>
                </div>
                <div class="el-upload__text">当前审核队列（快速）</div>
                <div class="el-upload__tip" slot="tip">
                    只能上传视频文件，且不超过500Mb
                </div>
            </el-upload>
            <!-- 全填完才能点击上传 -->
            <el-button style="margin-top: 10px" size="small" type="success" @click="submitUploadvideos"
                :disabled="disabled">上传到服务器</el-button>
        </div>

        <!-- 【抽屉】修改文件名，作为每个视频选集的标题 -->
        <!-- <el-drawer title="我是标题" :visible.sync="drawer" :direction="direction" :before-close="handleCloseDrawer" v-for="(file,index) in fileList" :key="index">
            <el-input placeholder="请输入内容" v-model="file" clearable></el-input>
        </el-drawer> -->


        <!-- 表单区域 -->
        <el-form ref="form" label-width="80px" class="set-area" :model="headers" v-show="disabled">
            <el-form-item label="* 封面" prop="setimg">
                <div class="right">
                    <el-upload class="avatar-uploader" action="#" :show-file-list="false" :file-list="setimgList"
                        ref="uploadSetImg" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload"
                        :auto-upload="false" :on-change="setImgChange" :headers="headers">
                        <img v-if="headers.setimg" :src="headers.setimg" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <span style="font-size: 14px; color: #9499a0;">上传封面图片只能是 JPG或PNG 格式，大小不超过2MB</span>
                </div>
            </el-form-item>

            <el-form-item label="* 标题" prop="setname">
                <el-input class="right" type="text" placeholder="清晰明了表明内容亮点的标题会更受观众欢迎哟！" v-model="headers.setname"
                    maxlength="80" show-word-limit></el-input>
            </el-form-item>

            <el-form-item label="* 类型" prop="videotype">
                <div class="right">
                    <el-radio v-model="headers.videotype" label="1">自制</el-radio>
                    <el-radio v-model="headers.videotype" label="2">转载</el-radio>
                </div>
            </el-form-item>

            <el-form-item label="* 分区" prop="category">
                <el-cascader class="right" v-model="category" :options="categoryList"
                    :props="{ expandTrigger: 'hover' }"></el-cascader>
            </el-form-item>

            <el-form-item label="* 标签" prop="labelInput">
                <div class="right">
                    <el-tag :key="index" v-for="(label, index) in labelList" closable :disable-transitions="false"
                        @close="handleClose(label)">
                        {{ label.labelname }}
                    </el-tag>
                    <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
                        @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                    <span style="font-size: 14px; color: #9499a0;">&nbsp;&nbsp;此为参考标签，可自行添加删除，最多10个</span>
                </div>
            </el-form-item>

            <el-form-item label="简介">
                <el-input class="right" type="textarea" rows="8" placeholder="填写更全面的相关信息，让更多的人能找到你的视频吧(:"
                    v-model="headers.setbrief" maxlength="255" show-word-limit>
                </el-input>
            </el-form-item>

            <el-form-item label="自制声明">
                <el-checkbox class="right" v-model="cannotforward">未经作者授权&nbsp;禁止转载</el-checkbox>
            </el-form-item>

            <el-button type="primary" @click="submitUploadSetImg">确认</el-button>
        </el-form>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: "UploadVideo",
    data() {
        return {
            test: [],
            //抽屉
            // drawer: false,
            // direction: 'rtl',
            //是否显示表单区域
            disabled: false,
            //上传文件列表
            fileList: [],
            setimgList: [],
            //上传文件请求头[这里的属性传到后端全是String,并且驼峰会变成全小写!!!]
            headers: {
                setid: '',
                //创建者，可以改进为token/uuid
                userid: "",
                //封面
                setimg: "",
                //视频时长
                // setlong: "",
                //标题（新建，已有视频集再增加删除视频是“稿件管理”页面的功能）
                setname: "",
                //简介
                setbrief: "",
                //一级分类id
                category1id: -1,
                //二级分类id
                category2id: -1,
                //自制vs转载
                videotype: "1",
                //未经作者授权 禁止转载
                cannotforward: 1,
                //标签列表
                labellist: "",
            },
            // 记录选择的分类【这里设置默认值，可考虑设置推荐值，参照b站】
            category: [2, 11],

            //未经作者授权 禁止转载
            cannotforward: true,

            /**标签tag数据 */
            labelList: [],
            inputVisible: false,
            inputValue: '',

        };
    },
    mounted() {
        if (this.$store.state.manage.originCategoryList.length == 0) {
            this.$store.dispatch("getCategoryList");
        }
        this.$messageBox.alert('若上传单个视频，只展示视频集标题；若上传多个视频做成合集，上传视频文件名最好先行修改为选集名称再上传，也可在 内容管理->稿件管理 页面修改', '上传需知', {
            confirmButtonText: '确定'
        });
    },
    computed: {
        //获取分类数据
        ...mapGetters({
            categoryList: "categoryList",
            userId: "userid",
        })
    },
    watch: {
        userId: {
            immediate: true,
            handler(newValue) {
                this.headers.userid = newValue;
            }
        },
        category: {
            immediate: true,
            async handler(newValue) {
                this.headers.category1id = newValue[0];
                this.headers.category2id = newValue[1];
                //这里必须res接一下，再赋值，可能是await还没等到数据返回吧，会加载不出来
                let res = await this.$API.reqLabelListByC2Id(newValue[1])
                this.labelList = res.data
            }
        },
    },
    methods: {
        /**
         * 上传文件部分
         */
        //手动上传视频
        submitUploadvideos() {
            let formData = new FormData();  //  将文件封装进FormData
            this.fileList.forEach(file => {
                formData.append('file', file.raw)
            })
            formData.append("userid", this.userId) //附带数据
            // 调用上传接口
            this.$API.reqUploadVideos(formData).then((res) => {
                //手动上传无法触发成功或失败的钩子函数，因此需要手动调用 
                this.uploadVidoesSuccess(res)
            }, (err) => {
                this.$messageBox.confirm(`上传视频失败，失败信息：${err}`, "错误")
            })
        },
        uploadVidoesSuccess(response) {
            this.headers.setid = response.data
            this.disabled = true
            this.$message({
                message: '上传视频成功',
                type: 'success'
            });
        },
        //手动上传视频集封面和剩余部分
        submitUploadSetImg() {
            //表单验证
            if (this.headers.setname.trim() == '' || this.headers.setimg.trim() == '' || this.labelList.length == 0) {
                this.$message({
                    showClose: true,
                    message: '请完善上传信息的必填项',
                    type: 'warning'
                })
                return
            }

            //设置请求参数
            let formData = new FormData();  //  将文件封装进FormData
            let list = []
            for (let i = 0; i < this.labelList.length; i++) {
                list[i] = this.labelList[i].category2id + "-" + this.labelList[i].labelname + "-" + (this.labelList[i].labelid == '' ? "null" : this.labelList[i].labelid)
            }
            this.setimgList.forEach(file => {
                formData.append('file', file.raw)
            })
            formData.append("existedSetId", this.headers.setid) //附带数据
            formData.append("category1id", this.category[0])
            formData.append("category2id", this.category[1])
            formData.append("cannotforward", this.cannotforward ? 1 : 0)
            formData.append("videotype", this.headers.videotype)
            formData.append("setname", this.headers.setname)
            formData.append("setbrief", this.headers.setbrief)
            formData.append("labellist", list.toString())
            // 调用上传接口
            this.$API.reqUploadVideos(formData).then((res) => {
                this.$message({
                    message: '上传视频集剩余部分成功',
                    type: 'success'
                });
                //初始化页面数据(不会清除computed仓库拿来的数据)
                Object.assign(this.$data, this.$options.data())
            }, (err) => {
                this.$messageBox.confirm(`上传视频集剩余信息失败，失败信息：${err}`, "错误")
            })
        },
        handleRemove(file, fileList) {
            //这个再上传之前点击删除，可以取消那个文件的上传
            //可以增加功能上传成功后点击，也能从服务器删除
            console.log("可以增加功能上传成功后点击，也能从服务器删除【非必须】", file, fileList);
        },
        handlePreview(file) {
            //点击文件列表中已上传的文件时的钩子
            //实现修改文件名的功能
            //【elementui的upload组件不支持动态修改fileList，只能在onRemove和onSuccess手动修改，很鸡肋，实现麻烦，改为上传后在修改页面实现】
            // this.drawer = true
            console.log("可以增加功能，点击预览视频【非必须】", file);
        },
        //检测文件变动获取文件
        videoChange(file, fileList) {
            this.fileList = fileList;
        },

        /**
         * 封面上传部分
         */
        setImgChange(file, fileList) {
            //回显图片
            this.headers.setimg = URL.createObjectURL(file.raw);
            this.setimgList = fileList
        },
        handleAvatarSuccess() {
            // console.log("success", res,file);
            //封面上传成功
            this.$messageBox.confirm("上传成功，请勿重复提交，可以到“个人中心--内容管理”查看审核状态", "上传提示")
            //初始化页面数据
            Object.assign(this.$data, this.$options.data())
        },
        beforeAvatarUpload(file) {
            // console.log("beforeupload,", file);
            //上传之前检查格式
            const isJPGorPNG = file.type === "image/jpeg" || file.type === "image/png";
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPGorPNG) {
                this.$message.error("上传头像图片只能是 JPG或PNG 格式!");
            }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return isJPGorPNG && isLt2M;
        },

        /**
         * 标签tag部分
         */
        handleClose(tag) {
            this.labelList.splice(this.labelList.indexOf(tag), 1);
        },
        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        //添加自定义标签
        handleInputConfirm() {
            let labelList = this.labelList
            let inputValue = this.inputValue;
            if (labelList.length < 10) {
                //不能重复
                for (var i = 0; i < labelList.length; i++) {
                    if (labelList[i].labelname == inputValue) {
                        alert("标签不能重复")
                        this.inputVisible = false;
                        this.inputValue = '';
                        return
                    }
                }

                if (inputValue) {
                    let label = {
                        category2id: this.headers.category2id,
                        labelid: '',
                        labelname: inputValue
                    }
                    this.labelList.push(label);
                }
            } else {
                alert("最多只能添加10个标签哦")
            }
            this.inputVisible = false;
            this.inputValue = '';
        },

    },
}
</script>

<style lang="less" scoped>
/**上传区域 */
.upload-area {
    margin-top: 20px;
    text-align: center;
}

/**表单区域 */
/**封面上传element-ui官方代码 */
.avatar-uploader ::v-deep .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 170px;
    height: 106px;
    line-height: 106px;
    text-align: center;
}

.avatar {
    width: 170px;
    height: 106px;
    display: block;
}

//上面是封面上传element-ui官方代码
//剩余部分
.set-area {
    margin: 20px 60px;

    .right {
        // margin-left: 30px;
    }
}

/**tag标签部分，官方css */
.el-tag+.el-tag {
    margin-left: 10px;
}

.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}

.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
</style>