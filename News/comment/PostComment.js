export default {
  template: `
  <div class="pl-reply">
    <textarea v-model="content"></textarea>
    <button @click="postMessage">提交评论</button>
  </div>
  `,
  props: {
    parent: {
      type: Number,
      default: 0
    },
    remoteBaseUrl: {
      type: String,
      default: ""
    },
    newId: {
      type: Number,
      default: 0
    },
    commentatorId: {
      type: Number,
      default: 0
    },
    commentatorName: {
      type: String,
      default: 0
    },
    commentatorHeadUrl: {
      type: String,
      default: 0
    }
  },
  data() {
    return {
      content: ""
    }
  },
  methods: {
    postMessage() {
      let now = new Date();
      let message = {
          new_id: this.newId,
          content: this.content,
          create_time: now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' ' +
            now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds(),
          commentator_id: this.commentatorId,
          commentator_name: this.commentatorName,
          commentator_head_url: this.commentatorHeadUrl,
          parent_id: this.parent
          }
      if(!this.content) {
        alert("别TM发空的");
        this.$emit('success');
      }
      else {
        this.$emit('add',message);
        this.$emit('success');
        axios.get(this.remoteBaseUrl + "/addComment",{ params: message })
        .catch(err => {
          console.log(err);
        })
      }
    }
  }
}