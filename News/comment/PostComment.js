export default {
  template: `
  <div class="pl-reply">
    <textarea v-model="content" @click="reply" :placeholder="placeholder" @blur="cancel"></textarea>
    <button @click="postMessage">发送</button>
  </div>
  `,
  props: {
    parent: {
      type: Number,
      default: 0,
    },
    remoteBaseUrl: {
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
    rid: {
      type: Number,
      default: 0,
    },
    rname: {
      type: String,
      default: "",
    },
    commentatorName: {
      type: String,
      default: "",
    },
    commentatorHeadUrl: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
    },
  },
  data() {
    return {
      content: "",
    };
  },
  methods: {
    postMessage() {
      let now = new Date();
      let message = {
        new_id: this.newId,
        content: this.content,
        create_time:
          now.getFullYear() +
          "-" +
          (now.getMonth() + 1) +
          "-" +
          now.getDate() +
          " " +
          now.getHours() +
          ":" +
          now.getMinutes() +
          ":" +
          now.getSeconds(),
        commentator_id: this.commentatorId,
        commentator_name: this.commentatorName,
        commentator_head_url: this.commentatorHeadUrl,
        parent_id: this.parent,
        rid: this.rid,
        rname: this.rname,
      };
      if (!this.content) {
        alert("别TM发空的");
        this.$emit("success");
      } else {
        this.$emit("add", message);
        this.$emit("success");
        console.log(message);
        axios
          .get(this.remoteBaseUrl + "/addComment", { params: message })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    cancel() {
      this.$emit("cancel");
    },
    reply() {
      this.$emit("reply");
    },
  },
};
