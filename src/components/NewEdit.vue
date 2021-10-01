<template>
  <div class="home">
    <div class="edit-info" v-if="infoFlag">
      <span>移动端不支持添加图片，可前往 PC 端布局 </span>
      <span @click="closeInfo">❌</span>
    </div>
    <div id="demo1"></div>
  </div>
</template>

<script>
// 引入 wangEditor
import wangEditor from "wangeditor";
export default {
  data() {
    return {
      editor: null,
      editorData: "",
      infoFlag: true,
    };
  },
  mounted() {
    const editor = new wangEditor(`#demo1`);
    // 配置 onchange 回调函数，将数据同步到 vue 中
    editor.config.onchange = (newHtml) => {
      this.editorData = newHtml;
    };
    editor.config.height = 500;
    editor.config.placeholder = "请输入文章内容";

    editor.config.menus = [
      "head",
      "bold",
      "fontSize",
      "foreColor",
      "justify",
      "quote",
      "splitLine",
      "undo",
      "redo",
    ];
    // 创建编辑器
    editor.create();
    this.editor = editor;
  },
  methods: {
    getEditorData() {
      // 通过代码获取编辑器内容
      // let data = this.editor.txt.html();
    },
    closeInfo() {
      this.infoFlag = false;
    },
  },
  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy();
    this.editor = null;
  },
};
</script>
<style>
:root {
  --infoColor: #bfbfc1;
  --selectColor: #48d597;
}
.home {
  width: 100%;
  margin: auto;
  position: relative;
}
#demo1 {
  padding-top: 10px;
}
@media screen and (max-width: 900px) {
  .edit-info {
    width: 100%;
    line-height: 40px;
    margin: 0;
    position: relative;
    border: 1px solid #f1f1f1;
    border-radius: 10px;
    border-bottom: 0;
    color: white;
    background: var(--selectColor);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    justify-content: space-around;
  }
}
</style>
