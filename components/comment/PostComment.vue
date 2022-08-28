<template>
  <div class="pl-reply">
    <textarea
      ref="textarea"
      v-model="content"
      rows="1"
      :placeholder="placeholder"
      @click="reply"
      @blur="cancel"
      @input="adjustHeight"
    />
    <button @click="postMessage">
      发送
    </button>
  </div>
</template>
<script>
export default {
  name: 'PostComment',
  props: {
    remoteBaseUrl: {
      type: String,
      default: ''
    },
    newId: {
      type: Number,
      default: 0
    },
    commentatorId: {
      type: Number,
      default: 0
    },
    rid: {
      type: Number,
      default: 0
    },
    pid: {
      type: Number,
      default: 0
    },
    rname: {
      type: String,
      default: ''
    },
    commentatorName: {
      type: String,
      default: ''
    },
    commentatorHeadUrl: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    contentUrl: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      content: '',
      el: {},
      defaultInputHeight: 0
    };
  },
  mounted () {
    this.el = this.$refs.textarea;
    this.defaultInputHeight = parseInt(window.getComputedStyle(this.el).height, 10);
  },
  methods: {
    postMessage () {
      this.el.style.height = this.defaultInputHeight + 'px';
      const now = new Date();
      const message = {
        new_id: this.newId,
        content: this.content,
        create_time:
          now.getFullYear() +
          '-' +
          (now.getMonth() + 1) +
          '-' +
          now.getDate() +
          ' ' +
          now.getHours() +
          ':' +
          now.getMinutes() +
          ':' +
          now.getSeconds(),
        commentator_id: this.commentatorId,
        commentator_name: this.commentatorName,
        commentator_head_url: this.commentatorHeadUrl,
        parent_id: this.pid,
        rname: this.rname,
        contentUrl: this.contentUrl,
        rid: this.rid
      };
      if (!this.content) {
        alert('别TM发空的');
        this.$emit('success');
      } else {
        this.$emit('success');
        console.log(message);
        this.$axios
          .$get(this.remoteBaseUrl + '/addComment', { params: message })
          .then((res) => {
            message.id = res.data.data;
            this.$emit('add', message);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    cancel () {
      this.$emit('cancel');
    },
    reply () {
      this.$emit('reply');
    },
    adjustHeight () {
      const el = this.el;
      const outerHeight = parseInt(window.getComputedStyle(el).height, 10);
      const diff = outerHeight - el.clientHeight;
      el.style.height = 0;
      el.style.height = Math.max(el.scrollHeight + diff) + 'px';
    }
  }
};
</script>
