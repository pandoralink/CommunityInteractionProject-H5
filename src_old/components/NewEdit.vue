<template>
  <div class="home">
    <input
      class="article-title"
      type="text"
      v-model="title"
      placeholder="标题"
    />
    <div class="edit-info" v-if="infoFlag">
      <span>移动端不支持添加图片，可前往 PC 端布局 </span>
      <span @click="closeInfo">❌</span>
    </div>
    <div id="demo1"></div>
    <button class="article-post" @click="articlePost">发表</button>
  </div>
</template>

<script>
// 引入 wangEditor
import wangEditor from "wangeditor";
import axios from "axios";
import config from "../config/config.js";
/**
 * coverUrl 默认为空，暂不考虑编辑器
 * 编辑图片
 */
export default {
  data() {
    return {
      editor: null,
      editorData: "",
      infoFlag: true,
      title: "",
      coverUrl: "",
      uid: 0,
      articleName: "",
      aid: 0,
    };
  },
  created() {
    this.initData();
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
    editor.$textElem.css("text-align", "left");
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
    articlePost() {
      if (this.articleName && this.aid) {
        this.articleUpdate();
        return;
      }
      const content = {
        uid: this.uid,
        title: this.title,
        coverUrl: this.coverUrl,
        html: this.editor.txt.html(),
      };
      axios
        .get(config.baseUrl + "/addArticle", { params: content })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      this.title = "";
      this.editor.txt.clear();
    },
    articleUpdate() {
      const content = {
        title: this.title,
        articleName: this.articleName,
        coverUrl: this.coverUrl,
        aid: this.aid,
        html: this.editor.txt.html(),
      };
      axios
        .get(config.baseUrl + "/updateArticle", { params: content })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    initData() {
      this.uid = config.getQueryVariable("uid")
        ? config.getQueryVariable("uid")
        : 0;
      this.articleName = config.getQueryVariable("articleName")
        ? config.getQueryVariable("articleName")
        : "";
      this.articleName = /\/([0-9]+\.html)/.exec(this.articleName)[1];
      this.aid = config.getQueryVariable("aid")
        ? config.getQueryVariable("aid")
        : 0;
      this.title = config.getQueryVariable("title")
        ? decodeURI(config.getQueryVariable("title"))
        : "";
      if (this.articleName && this.aid && this.title) {
        const content = {
          articleName: this.articleName,
        };
        axios
          .get(config.baseUrl + "/getArticleHtml", { params: content })
          .then((res) => {
            if (this.editor) {
              // 如果这时候 wangeditor 已经创建
              this.editor.txt.html(res.data.content);
            } else {
              const defaultDom = document.querySelector("#demo1");
              defaultDom.innerHTML = res.data.content;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
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
  display: flex;
  flex-wrap: wrap;
}
#demo1 {
  width: 100%;
  padding-top: 10px;
}
.edit-info {
  display: none;
}
.article-title {
  width: 100%;
  line-height: 24px;
  border-radius: 20px;
  border: 1px solid var(--infoColor);
  padding: 0px 10px;
  min-height: 38px;
  font-size: 17px;
  caret-color: var(--selectColor);
}
.article-title:focus {
  outline: none;
}
.article-post {
  display: flex;
  position: fixed;
  right: 10px;
  bottom: 20%;
  background: var(--selectColor);
  color: white;
  /* wangeditor 的 z-index 是 10000 */
  z-index: 10001;
  padding: 0px 16px;
  border: 0px;
  height: 32px;
  align-items: center;
}
button {
  height: 3em;
  align-self: flex-end;
  border: 3px solid black;
  border-radius: 10px;
  padding: 5px 10px;
  margin: 5px;
  font-weight: 500;
  font-size: 14px;
  background-color: #ffffff;
  cursor: pointer;
  background: #fff;
  text-align: center;
  outline: 0;
}
button:active {
  /* 主要面向移动端，无需设置 hover */
  color: var(--infoColor);
  box-shadow: 1px 1px 4px 2px rgba(0, 0, 0, 0.1);
  outline: 0;
}
@media screen and (max-width: 900px) {
  .edit-info {
    display: block;
    width: 100%;
    line-height: 40px;
    margin: 0;
    margin-top: 10px;
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
