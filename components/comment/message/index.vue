<template>
  <div class="pl-message" :class="{ 'child' : isChild }">
    <div class="pl-message-content">
      <div class="pl-bar" @click.stop="reply">
        <div
          style="display: flex; align-items: center; width: 100%; margin: 4px 0px"
        >
          <img class="comment-user-head" :src="headUrl" alt="用户头像" @click.stop="toUserPageByAndroid">
          <span style="width: 100%; color: #48d597">{{ name + replyName }}</span>
        </div>
        <span style="color: #cccccc; margin: 4px 0px 4px 10px;">{{ timeConvert }}</span>
      </div>
      <span style="margin: 4px 0px 4px 10px;">{{ content ? content : "评论内容" }}</span>
    </div>
    <div v-if="son.length != 0">
      <message
        v-for="(item,index) in currentList"
        :id="item.id"
        :key="index"
        :content="item.content"
        :create-time="item.create_time"
        :son="item.son"
        :pid="item.parent_id"
        :uid="item.commentator_id"
        :name="item.commentator_name"
        :head-url="item.commentator_head_url"
        is-child
        :rname="item.rname"
        @add="childReply"
        @click.stop="reply"
      />
    </div>
    <span v-show="isShow" class="show-comment-text-button" @click="showMoreComment">展开更多回复</span>
  </div>
</template>
<script>
import dayjs from 'dayjs';

export default {
  name: 'Message',
  props: {
    id: {
      type: Number,
      default: 0
    },
    uid: {
      type: Number,
      default: 0
    },
    pid: {
      type: Number,
      default: 0
    },
    content: {
      type: String,
      default: ''
    },
    createTime: {
      type: String,
      default: ''
    },
    son: {
      type: Array,
      default () {
        return [];
      }
    },
    name: {
      type: String,
      default: ''
    },
    headUrl: {
      type: String,
      default: ''
    },
    isChild: {
      type: Boolean,
      default: false
    },
    rname: {
      type: String,
      default: ''
    },
    first: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showItemNum: 0,
      firstFlag: this.first
    };
  },
  computed: {
    replyName () {
      return this.rname ? ' \u261B ' + this.rname : '';
    },
    currentList () {
      // TODO: 解决副作用
      // 为避免渲染过多评论，设置动态展示数组
      // 只有 1 级评论具有动态展示数组功能，因此对于 2 - n 级评论做特殊处理
      if (this.isChild) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.showItemNum = 2021;
        return this.son;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      } else if (this.son.length > 0 && this.showItemNum === 0) { this.showItemNum = 1; }
      const showItemNum = this.showItemNum;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      if (showItemNum >= this.son.length) { this.firstFlag = false; }
      return this.son.filter((item, index) => {
        return index < showItemNum;
      });
    },
    isShow () {
      if (this.firstFlag && this.son.length > 1) {
        return true;
      } else { return false; }
    },
    timeConvert () {
      return dayjs(this.createTime).format('MM-DD');
    }
  },
  watch: {
    son: {
      handler (newValue, oldValue) {
        this.showItemNum++;
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    reply () {
      this.$emit('add', {
        id: this.id,
        name: this.name,
        arr: this.son,
        uid: this.uid
      });
    },
    childReply (e) {
      this.$emit('add', e);
    },
    showMoreComment () {
      this.showItemNum += 10;
    },
    toUserPageByAndroid () {
      const ob = {
        uid: this.uid,
        uname: this.name,
        uheadUrl: this.headUrl
      };
      window.JsToUserPage.startFunction(JSON.stringify(ob));
    }
  }
};
</script>
<style scoped>
@import "./index.css";
</style>
