import PostComment from "./PostComment.js";
export default {
  template: `
  <div class="pl-message">
    <div class="pl-bar">
      <div style="display: flex; align-items: center;">
        <img class="comment-user-head" :src="headUrl" alt="用户头像">
        <span>{{ name }}</span>
        <span style="margin-left: 10px">{{ createTime ? createTime : '时间'}}</span>
      </div>
      <button @click="flag = !flag">回复</button>
    </div>
    <span style="margin-left: 10px">{{ content ? content : "评论内容"}}</span>
    <post-comment
      v-show="flag"
      :parent="id"
      :remoteBaseUrl="remoteBaseUrl"
      :new-id="newId"
      :commentator-id="commentatorId"
      :commentator-name="commentatorName"
      :commentator-head-url="commentatorHeadUrl"
      @add="addMessage"
      @success="flag = !flag"
    ></post-comment>
    <div v-if="son.length != 0">
      <message v-for="(item,index) in son" :key="index"
        :id="item.id"
        :content="item.content"
        :createTime="item.create_time"
        :son="item.son"
        :remote-base-url="remoteBaseUrl"
        :name="item.commentator_name"
        :head-url="item.commentator_head_url"
        :new-id="newId"
        :commentator-id="userId"
        :commentator-name="userName"
        :commentator-head-url="userHeadUrl"
      ></message>
    </div>
  </div>
  `,
  name: "Message",
  props: {
    id: {
      type: Number,
      default: 0,
    },
    content: {
      type: String,
      default: "",
    },
    createTime: {
      type: String,
      default: "",
    },
    son: {
      type: Array,
      default: function() {
        return [];
      },
    },
    remoteBaseUrl: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    headUrl: {
      type: String,
      default: "",
    },
    newId: {
      type: Number,
      default: 0,
    },
    commentatorId: {
      type: Number,
      default: 0,
    },
    commentatorName: {
      type: String,
      default: 0,
    },
    commentatorHeadUrl: {
      type: String,
      default: 0,
    },
  },
  components: {
    PostComment,
  },
  data() {
    return {
      flag: false,
    };
  },
  methods: {
    addMessage(e) {
      // console.log(e);
      this.son.push(e);
    },
  },
};
