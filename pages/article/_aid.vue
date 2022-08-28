<template>
  <div>
    <div class="head" />
    <!-- TODO: 解决 v-html XSS 攻击问题 -->
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="main" v-html="content" />
    <div class="footer">
      <span class="footer-info" @click="getTime">全部评论</span>
      <div class="comment">
        <post-comment
          ref="comment"
          :remote-base-url="remoteBaseUrl"
          :new-id="parseInt(newId)"
          :commentator-id="parseInt(userId)"
          :commentator-name="userName"
          :commentator-head-url="userHeadUrl"
          :rid="parseInt(currentReplyUserId)"
          :pid="parseInt(currentReplyId)"
          :rname="currentReplyUserName"
          :content-url="articleUrl"
          placeholder="回复文章"
          @add="addMessage"
          @reply="replyArticle"
          @cancel="cancel"
        />
        <div class="main">
          <message
            v-for="(item,index) in list"
            :id="item.id"
            :key="index"
            :content="item.content"
            :create-time="item.create_time"
            :son="item.son"
            :uid="item.commentator_id"
            :name="item.commentator_name"
            :head-url="item.commentator_head_url"
            first
            @add="reply"
          />
          <div
            alt="空块，避免回复框挡住评论"
            style="width: 100%; height: 60px"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from '@/utils/config';
import Message from '@/components/comment/message/index.vue';
import PostComment from '@/components/comment/PostComment.vue';

export default {
  components: {
    Message,
    PostComment
  },
  async asyncData ({ $axios, params }) {
    // TODO: 后期封装 base_url，避免魔法值
    const { data } = await $axios.$get(`http://localhost:3001/getArticleDetail?aid=${params.aid}`)
    return { content: data.detail };
  },
  data () {
    /**
     * currentReplyId 是当前回复的 <message> 在 comment 表中的 id
     * currentChildArr 是当前回复的 <message> 的 son: Array
     * currentReplyUserId 是当前回复的 <message> 的用户 id
     */
    return {
      content: '',
      userName: '',
      remoteBaseUrl: '',
      list: [],
      newId: 0,
      userId: 0,
      userHeadUrl: '',
      replayUserFlag: false,
      currentReplyId: 0,
      currentReplyUserId: 0,
      currentChildArr: [],
      currentReplyUserName: '',
      articleUrl: '',
      time: Date.now()
    }
  },
  created () {
    if (process.browser) {
      this.initData();
      this.initCommentData();
    }
  },
  methods: {
    getTime () {
      alert((Date.now() - this.time) / 1000);
    },
    initData () {
      this.userName = config.getQueryVariable('userName')
        ? decodeURI(config.getQueryVariable('userName'))
        : null;
      this.userId = config.getQueryVariable('userId')
        ? config.getQueryVariable('userId')
        : null;
      this.userHeadUrl = config.getQueryVariable('userHeadUrl')
        ? config.getQueryVariable('userHeadUrl')
        : '';
      this.newId = this.$route.params.aid;
      this.articleUrl = window.location.href.split('?')[0];
      this.remoteBaseUrl = config.baseUrl ? config.baseUrl : '';
    },
    initCommentData () {
      this.$axios
        .$get(config.baseUrl + '/getCommentData' + '?new_id=' + this.newId)
        .then((res) => {
          this.list = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addMessage (e) {
      if (e.parent_id === 0) {
        this.list.push(e);
      } else {
        e.rname = this.currentReplyUserName;
        this.currentChildArr.push(e);
      }
      this.currentReplyId = 0;
      this.$refs.comment.content = '';
    },
    reply (e) {
      this.$refs.comment.content = '';
      this.replayUserFlag = true;
      this.currentChildArr = e.arr;
      this.currentReplyId = e.id;
      this.currentReplyUserId = e.uid;
      this.currentReplyUserName = e.name;
      const commentTextAreaDom = this.$refs.comment.$el.querySelector(
        'textarea'
      );
      commentTextAreaDom.select();
      commentTextAreaDom.placeholder = '回复' + e.name;
    },
    replyArticle () {
      if (!this.replayUserFlag) {
        this.postCommentEmpty();
        this.$refs.comment.$el.querySelector('textarea').placeholder =
              '回复文章';
      }
    },
    cancel () {
      this.replayUserFlag = false;
      // 操作 Dom 元素是因为修改直接修改 placeholder 元素更新失败
      this.$refs.comment.$el.querySelector('textarea').placeholder =
            '回复文章';
    },
    postCommentEmpty () {
      // 重置 <post-comment> 中相应数据
      this.currentChildArr = [];
      this.currentReplyUserId = 0;
      this.currentReplyUserName = '';
      this.currentReplyId = 0;
    }
  }
}
</script>

<style>
@import "./styles.css";
</style>
