<template>
	<div class="editor-container">
		<quill-editor
			ref="myQuillEditor"
			v-model="editorContent"
			:options="editorOption"
			@blur="onEditorBlur($event)"
			@focus="onEditorFocus($event)"
			@change="onEditorChange($event)">
      	</quill-editor>
		<!-- 结合elementUI上传组件实现 -->
		<el-upload
			class="img-uploader"
			:accept="acept"
			action="/file/upload/image"
			:http-request="imgRequest"
			:before-upload="beforeUpload"
		/>
		<el-upload
			class="video-uploader"
			:accept="acct"
			action="/file/upload/video"
			:http-request="videoRequest"
			:before-upload="beforeUpload1"
		/>
	</div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
	name: 'textEditor',
	components: {
		quillEditor
	},
	props: {
		content: {
			type: String,
			default: ''
		},
		aa: {
			type: String,
			default: ''
		}
	},
	computed: {
		editorContent: {
			get () {
				return this.content
			},
			set () {}
		}
	},
	data () {
		return {
			editorOption: {
				modules: {
					toolbar: {
						container: [
							["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
							//["blockquote", "code-block"], // 引用  代码块
							//[{ header: 1 }, { header: 2 }], // 1、2 级标题
							//[{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
							//[{ script: "sub" }, { script: "super" }], // 上标/下标
							//[{ indent: "-1" }, { indent: "+1" }], // 缩进
							//[{'direction': 'rtl'}],                         // 文本方向
							//[{ size: ["small", false, "large", "huge"] }], // 字体大小
							[{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
							[{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
							[{ font: [] }], // 字体种类
							//[{ align: [] }], // 对齐方式
							["clean"], // 清除文本格式
							["image", "video"] // 链接、图片、视频
						], //工具菜单栏配置
						handlers: {
							// 重写图片上传方法
							image: function(value) {
								if (value) {
									// 触发input框选择图片文件
									document.querySelector(".img-uploader input").click();//自定义元素的点击事件
								} else {
									this.quill.format('image', false);
								}
							},
							// 重写视频上传方法
							video: function(value) {
								if (value) {
									// 触发input框选择图片文件
									document.querySelector(".video-uploader input").click();//自定义元素的点击事件
								}
							}
						}
					}
				},
				placeholder: '', //提示
				readyOnly: false, //是否只读
				theme: 'snow', //主题 snow/bubble
			},
			acept: '.png,.jpg,.jpeg,.PNG,.JPG,.JPEG', //文件上传格式
			completeContent: '',
      		acct: '.mp4,.MP4,', //视频上传格式
		}
	},
	computed: {
		editor() {
			return this.$refs.myTextEditor.quillEditor;
		}
	},
	methods: {
		// 失去焦点
		onEditorBlur(editor) {},
		// 获得焦点
		onEditorFocus(editor) {},
		// 值发生变化
		onEditorChange(editor) {
			this.completeContent = editor
		},
		// 图片文件上传
		imgRequest(config) {
			let { file } = config
			// 获取文件大小
			let fileSize = this.$util.wxc_countFileSize(file.size)
			// 限制文件大小的工具方法
			this.$http.author.upLoadFileMaxsize(fileSize, 15) &&
			this.$http.author
				.uploadFile2(config.file, '/file/upload/image/richtext')
				.then((data) => {
					let filePath = data.data.filePath
					let quill = this.$refs.myQuillEditor.quill
					let length = quill.getSelection().index
					// 插入图片
					quill.insertEmbed(length, "image", filePath);
					// 调整光标到最后
					quill.setSelection(length + 1);
				}).catch(() => {
					this.$message.error('图片插入失败！')
				})
		},
		// 视频
		videoRequest(config) {
			let { file } = config
			// 获取文件大小
			let fileSize = this.$util.wxc_countFileSize(file.size)
			// 限制文件大小的工具方法
			this.$http.author.upLoadFileMaxsize(fileSize, 100) &&
				this.$http.author
				.uploadFile1(config.file, '/file/upload/video/richtext')
				.then((data) => {
					let filePath = data.data.video.filePath
					let quill = this.$refs.myQuillEditor.quill;
					let length = quill.getSelection().index;
					// 插入图片 
					quill.insertEmbed(length, "video", filePath);
					// 调整光标到最后
					quill.setSelection(length + 1);
				}).catch(() => {
					this.$message.error('视频插入失败！')
				})
		},
		beforeUpload(file) {
			return this.$util.checkFileType(file, this.acept)
		},
		beforeUpload1(file) {
			return this.$util.checkFileType(file, this.acct)
		},
		getInfo (type) {
			return type === 'html' ? this.completeContent.html : this.completeContent.text
		}
	}
}
</script>

<style lang="less" scoped>
.editor-container {
	width: 900px;
	height: 200px;
	.quill-editor {
		height: 200px;
		/deep/.ql-container {
			height: 156px!important;
		}
		/deep/.ql-snow .ql-picker-label::before {
			vertical-align: super;
		}
	}
}
.img-uploader {
	display: none;
}
.video-uploader {
	display: none;
}
</style>