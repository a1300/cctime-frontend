<template>
  <li class="root_list">
    <div class="count_wrapper">
      <span class="readcount">
        <!--阅读计数器 / reading counter-->
        {{index +1}}
      </span>
    </div>
    <div class="list_container">
        <span class="title">
          <router-link :to="'articles/' + item.id">{{item.title}}</router-link>
          <div class="titlesuffix" @click="jumpTo" :title="item.url" v-show="item.url !== ''">{{this.getUrl}}</div>
        </span>
        <br/>
          <span class="meta">
          <span class="author meta_info">
            <img :src="'data:image/png;base64,' + item.photo">
            <span to="user/" v-if="this.item.nickname !== undefined" :title='item.nickname'>{{item.nickname}}</span>
            <span to="user/" v-if="this.item.nickname === undefined" :title='item.authorId'>{{item.authorId}}</span>
          </span>
        <span class="timestamp meta_info">
            <img src="/static/img/time.png">
            {{this.realT}}
        </span>
        <span class="comment meta_info">
            <img src="/static/img/comments.png">
            <router-link :to="'articles/'+item.id">{{item.comments}} {{$t('COMMENT')}}</router-link>
        </span>
        <!--尝试加入投票窗口 / Try to join the voting window-->
          <div class="award_c_tool"  v-show="this.deToggle">
            <input type="number" v-model="awardNum" v-bind:placeholder="$t('ENTER_REWARD_AMOUNT')">
            <div class="award_confirm" @click="voteForA(item.id)">{{$t('CONFIRM')}}</div>
          </div>
        <span class="vote meta_info" @click.stop.prevent="voteBtn">
          <img src="/static/img/up.png">
          {{item.votes}}{{$t('TICKET')}}
        </span>
      </span>
    </div>
    <div class="reportIn" @click="reportBtn" v-if="this.$store.state.userInfo.info.isDelegate === true">{{$t('REPORT_ARTICLE')}}</div>
  </li>
</template>

<script>
export default {
  name: 'topList',
  props: ['item', 'that', 'index'],
  data: function () {
    return {
      awardNum: undefined,
      deToggle: false
    }
  },
  methods: {
    // 跳转URL / Jump URL
    jumpTo: function () {
      window.open(this.item.url)
    },
    toggleAward: function (item) {
      this.deToggle = !this.deToggle
    },
    // 组织打赏arg / The organization enjoys arg
    pushAward: function (id, amount) {
      let arr = []
      arr.push(id)
      arr.push(amount)
      return arr
    },
    // 文章打赏 / article reward
    voteBtn: function () {
      let that = this
      if (that.$store.state.isLogin === false) {
        that.$store.commit('callToast', {msgHeader: this.$t('NOTE'), msgContent: this.$t('CAN_REWARD_FEATURE_ONLY_WHEN_LOGGED_IN'), _confirmfunc: this.$t('GO_TO_LOGIN'), _cancelfunc: this.$t('SHUTDOWN'), deals: undefined, contract: 3})
        return
      }
      this.$store.commit('callInputToast', {msgHeader: this.$t('REWARD'), msgContent: this.$t('ENTER_NUMBER_OF_TICKETS'), _confirmfunc: null, _cancelfunc: null, deals: that.item.id, contract: 2})
      // 无反馈强制刷新 / No feedback forced refresh
      setTimeout(function () {
        that.$emit('reFresh')
      }, 20000)
    },
    // 举报文章 / report article
    reportBtn: function () {
      let that = this
      if (that.$store.state.isLogin === false) {
        that.$store.commit('callToast', {msgHeader: this.$t('NOTE'), msgContent: this.$t('REPORT_ARTICLE_ONLY_WHEN_LOGGED_IN'), _confirmfunc: this.$t('GO_TO_LOGIN'), _cancelfunc: this.$t('CAN_NOT'), deals: undefined, contract: 3})
        return
      }
      this.$store.commit('callToast', {msgHeader: this.$t('CAVEAT'), msgContent: this.$t('IS_THIS_ARTICLE_REPORTED'), _confirmfunc: this.$t('REPORT'), _cancelfunc: this.$t('CAN_NOT'), deals: that.item.id, contract: 2})
    },
    // 替换成模态框输入（环境假设为state） / Replace modal box input (environment is assumed to be state)
    voteForA: function (id) {
      let that = this
      let awArg = this.pushAward(id, this.awardNum)
      this.$store.dispatch('invokeContract', {
        type: 1002,
        fee: '10000000',
        args: awArg,
        that: this,
        callback: function (err, msg) {
          if (err) {
            return
          }
          that.$store.commit('callToast', {msgHeader: this.$t('SUCCESS'), msgContent: this.$t('REWARD_SUCCESS_MSG'), _confirmfunc: null, _cancelfunc: null})
          that.$emit('reFresh')
        }
      })
      // 重新初始化 / Reinitialize
      this.awardNum = undefined
      this.toggleAward()
    },
    reportA: function () {
      let that = this
      this.$store.commit('callInputToast', {msgHeader: this.$t('CAVEAT'), msgContent: this.$t('REPORT_ARTICLE_CONFIRMATION_MSG'), _confirmfunc: this.$t('OK'), _cancelfunc: this.$t('SHUTDOWN'), deals: that.item.id, contract: 4})
    }
  },
  computed: {
    // 处理url显示 / process url display
    getUrl: function () {
      return this.item.url.split('/')[2]
    },
    // 真实时间 / Real time
    realT: function () {
      let pst = ''
      let t = Number(this.item.realTime)
      let ct = Number(new Date().getTime())
      let pt = ct - t
      let sec = Number(pt) / 1000
      let min = 0
      let hor = 0
      let day = 0
      let yea = 0
      if (sec < 60 && sec >= 0) {
        pst = Math.floor(sec) + this.$t('SECONDS_AGO')
      } else if (sec >= 60) {
        min = Math.floor(sec / 60)
        if (min < 60) {
          pst = Math.floor(min) + this.$t('MINUTES_AGO')
        } else {
          hor = Math.floor(min / 60)
          if (hor < 24) {
            pst = hor + this.$t('HOURS_AGO')
          } else {
            day = Math.floor(hor / 24)
            if (day < 360) {
              pst = day + this.$t('DAYS_AGO')
            } else {
              yea = Math.floor(day / 360)
              pst = yea + this.$t('YEARS_AGO')
            }
          }
        }
      } else {
        pst = this.$t('JUST')
      }
      return pst
    }
  }
}
</script>

<style scoped>
  .count_wrapper{
    display: inline-block;
    width: 70px;
    text-align: right;
  }
  .readcount{
    position: relative;
    min-width: 70px;
    width: auto;
    line-height: 18px;
    color: #000;
    font-size: 18px;
    text-align: center;
    top: -29px;
  }
  .list_container{
    position:  relative;
    margin-top: 19px;
    padding-left: 8px;
    display: inline-block;
  }
  .list_container .title{
    display: inline-block;
    padding-left: 10px;
    border-left: 1px solid rgb(87, 97, 106);
  }
  .list_container .titlesuffix{
    font-size: 12px;
    font-weight: bold;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }
  .title a{
    height: 20px;
    line-height: 20px;
    font-size: 18px;
    font-weight: bold;
    color: #000;
    text-decoration: none;
    display: inline-block;
    max-width: 900px;
    text-overflow: clip;
    overflow: hidden;
    white-space: nowrap;
  }
  .title span{
    font-size: 14px;
  }
  .title .titlesuffix{
    margin-left: 10px;
    color: rgb(87, 97, 106);
    width: 120px;
  }
  .meta{
    display: inline-block;
    height: 20px;
    color: rgb(87, 97, 106);
    font-size: 14px;
    font-weight: bold;
    margin-left: 10px;
  }
  .meta .meta_info{
    position: relative;
    display: inline-block;
    height: 40px;
    margin-left: 20px;
    line-height: 40px;
  }
  .meta .author{
    margin-left: 0px;
    cursor: default;
  }
  .meta_info img{
    display: inline-block;
    height: 20px;
    position: relative;
    top: 4px;
  }
  .meta .author a{
    display: inline-block;
    width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    height: 14px;
    line-height: 14px;
  }
  .meta .author img{
    margin-left: 0;
  }
  .meta .author span{
    display: inline-block;
    width: 90px;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 20px;
    line-height: 28px;
  }
  .meta .timestamp{
    width: 85px;
    background-size: 22% 68%;
    cursor: default;
  }
  .meta .comment{
    width: 110px;
    background-size: 18% 63%;
  }
  .comment a{
    color: rgb(87, 97, 106);
  }
  .meta .vote{
    cursor: pointer;
    background-size: 22% 68%;
  }
  .meta .vote:hover{
    color: #f60;
  }
  .award_c_tool{
    display: block;
    width: 220px;
    height: 30px;
    top: -25px;
    right: -20px;
    background-color: #fff;
    border: 5px solid rgb(205, 223, 237);
    position: absolute;
  }
  .award_c_tool .award_confirm{
    cursor: pointer;
    padding-bottom: 30px;
    padding-left: 10px;
    color: rgb(116, 176, 236);
  }
  .award_c_tool:after{
    position: absolute;
    content: ' ';
    width: 0;
    height:0;
    top: 110%;
    left: 70%;
    border: solid transparent;
    border-width: 9px;
    border-top-color: rgb(205, 223, 237);
  }
  .award_c_tool input{
    border-radius: 3px;
    height: 30px;
    outline: none;
    display: inline-block;
    width: 75%;
  }
  .award_c_tool div{
    display: inline-block;
  }
  .meta .price span{
    display: inline-block;
    position: relative;
    top: 1px;
    font-size: 17px;
  }
  .meta a:hover{
    color: #ff6600;
  }
  .reportIn{
      display: none;
  }
  .root_list:hover>.reportIn{
    display: inline-block;
    text-align: center;
    border-radius: 6px;
    font-size: 12px;
    font-weight: bold;
    background-color: rgb(207, 231, 243);
    color: rgb(109, 152, 221);
    cursor: pointer;
    height:20px;
    width: 80px;
    line-height: 20px;
    top: -12px;
    margin-left: 40px;
  }
  @media screen and (max-width: 1441px) {
    .list_container{
      padding-top: 10px;
      margin-top: 0px;
    }
    .readcount{
      line-height: 14px;
      font-size: 14px;
      top: -28px;
    }
    .list_container .titlesuffix{
      font-size: 9px;
      width: 100px;
    }
    .title a{
      max-width: 500px;
    }
    .title span{
      font-size: 9px;
    }
    .meta{
      margin-top: 2px;
      height: 20px;
      font-size: 12px;
   }
   .meta .meta_info{
      height: 20px;
      margin-left: 15px;
      line-height: 20px;
    }
    .meta .timestamp{
      width:70px;
    }
    .meta .comment{
      width: 85px;
    }
    .meta .author{
      margin-left: 0px;
    }
    .meta_info img{
      height: 14px;
      top: 2px;
    }
    .meta .author a{
      width: 100px;
      font-size: 9px;
      height: 9px;
      line-height: 9px;
    }
    .meta .author span{
      display: inline-block;
      width: 50px;
      overflow: hidden;
      text-overflow: ellipsis;
      height: 20px;
      line-height: 30px;
    }
    .award_c_tool{
      top: -25px;
      right: -38px;
    }
    .root_list:hover>.reportIn{
      height:20px;
      width: 80px;
      line-height: 20px;
      top: -12px;
      margin-left: 40px;
    }
  }
</style>
