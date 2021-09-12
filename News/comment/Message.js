export default {
  template: `
  <div class="pl-message">
    <div class="pl-bar">
      <div style="display: flex; align-items: center;">
        <img class="comment-user-head" :src="headUrl" alt="用户头像">
        <span>{{ name }}</span>
        <span style="margin-left: 10px">{{ createTime ? createTime : '时间'}}</span>
      </div>
      <button @click="reply">回复</button>
    </div>
    <span style="margin-left: 10px">{{ content ? content : "评论内容"}}</span>
    <div v-if="son.length != 0">
      <message v-for="(item,index) in son" :key="index"
        :id="item.id"
        :content="item.content"
        :createTime="item.create_time"
        :son="item.son"
        :remote-base-url="remoteBaseUrl"
        :name="item.commentator_name"
        :head-url="item.commentator_head_url"
        @add="childReply"
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
    name: {
      type: String,
      default: "",
    },
    headUrl: {
      type: String,
      default: "",
    }
  },
  methods: {
    reply() {
      this.$emit("add", { id: this.id, name: this.name, arr: this.son });
    },
    childReply(e) {
      this.$emit("add", e);
    },
  },
};
