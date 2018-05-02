<template>
  <div class="article_wrapper" @click="showSS">
    <div class="main">
      <div class="head_info">
        <a class="back_arror" @click="back" v-bind:title="$t('RECEDE')"><img src="/static/img/back.png"></a>
        <div class="list_container">
          <span class="title">
            <h1>{{this.articleDetail.article.title}}</h1>
            <a class="titlesuffix" :href="this.articleDetail.article.url" target="_blank">{{this.getUrl}}</a>
          </span>
          <br/>
          <span class="meta">
            <span class="author meta_info">
              <img :src="'data:image/png;base64,' + this.articleDetail.article.photo">
              <span to="#" v-if="this.articleDetail.article.nickname !== undefined">{{this.articleDetail.article.nickname}}</span>
              <span to="#" v-if="this.articleDetail.article.nickname === undefined">{{this.articleDetail.article.authorId}}</span>
            </span>
            <span class="timestamp meta_info">
              <img src="/static/img/time.png">
              {{this.realT}}
            </span>&nbsp;&nbsp;
            <span class="comment meta_info">
              <a to="#" @click="jumpToCom"><img src="/static/img/comments.png">{{this.articleDetail.article.comments}}</a>&nbsp;&nbsp;
            </span>
            <span class="vote meta_info" v-on:click.stop.capture="voteBtn">
              <img src="/static/img/up.png">
              {{this.articleDetail.article.votes}}
            </span>
          </span>
        </div>
      </div>
      <div id="article">
        <pre>{{this.textContent}}</pre>
      </div>
      <!-- <div class="guide">
        <router-link class="prev" to="/articles/"+this.preId>上一篇</router-link>
        <router-link class="next" to="/articles/"+this.nextId>下一篇</router-link>
      </div> -->
    </div>
    <!--文章评论部分 / Article review section-->
    <div id="article_comment">
      <div>
        <input id="comment_input" type="text" @focus="input_change($event)" v-bind:placeholder="$t('ENTER_COMMENT')" v-model="commentContent">
        <span class="comment_clear" @click="clearComment()">{{$t('CLEAR')}}</span>
        <span class="comment_publish" @click="subCommment()">{{$t('POST_COMMENT')}}</span>
      </div>
    </div>
    <!-- 文章页下部 评论 / Article page Lower Comment-->
    <div class="comment_part">
      <ul>
        <detail-list v-for="(item, index) in this.detailCommentList.comments" :item="item" :key="item.id" :that="this" @reFresh="toRefreshAll"></detail-list>
      </ul>
      <!--未设置逻辑 / no logic set-->
      <div class="pag">
        <div class="ctrbtn" @click="minPage" v-show="this.currentPage_comment != 0">上一页</div>
        <div class="pagespot" v-for="(value, index) in this.page" @click="goto(index)" :class="{'active':currentPage_comment + 1 == Number(value)}">{{Number(value)}}</div>
        <div class="ctrbtn" @click="addPage" v-show="this.allPage != this.currentPage_comment + 1 && this.allPage != 0">下一页</div>
      </div>
    </div>
  </div>
</template>
  
<script>
  import {mapState, mapGetters} from 'vuex'
  import detailList from './detailList/detailList'
  export default {
    name: 'detail',
    components: {
      detailList
    },
    data: function () {
      return {
        replyContent: '',
        commentContent: '',
        a_num: '',
        c_num: '',
        isAwardToggle: false,
        isReplyToggle: false,
        isCommentToggle: false,
        // 分页初始量 / Paging initial amount
        awardNum: undefined,
        // 引入公共state / Introduce public state
        // currentPage: 0,
        pageSpots: 5,
        pageContent: 6,
        pageNum: 0
      }
    },
    computed: {
      ...mapGetters(['detailCommentList']),
      ...mapState(['articleDetail', 'articleCommentList', 'currentPage_comment']),
      // 处理文章格式 / Processing article format
      formlizedArticle: function () {
        let article = String(this.articleDetail.article.text)
        article.replace(/[\r\n]]/g, '123123')
        article = '<p>' + article
        article = article + '</p>'
        return 1
      },
      // 处理url显示 / Process url display
      getUrl: function () {
        console.log('1SP')
        console.log(this.articleDetail.article)
        return this.articleDetail.article.url.split('/')[2]
      },
      // 构造页签数组 / Constructing an array of tabs
      page: function () {
        let pag = []
        if (this.currentPage_comment < this.pageSpots) {
          let i = Math.min(this.pageSpots, this.allPage)
          while (i) {
            pag.unshift(i--)
          }
        } else if (this.currentPage_comment >= this.pageSpots) {
          let middle = this.currentPage_comment - Math.floor(this.pageSpots / 2)
          let i = this.pageSpots
          if (middle > (this.allPage - this.pageSpots)) {
            middle = (this.allPage - this.pageSpots) + 1
          }
          while (i--) {
            pag.push(middle++)
          }
        }
        return pag
      },
      // 页签总数 / Total number of tabs
      allPage: function () {
        return Math.ceil(Number(this.detailCommentList.count) / this.pageContent)
      },
      // 返回偏移量 / Return offset
      offsetNum: function () {
        return this.currentPage_comment * this.pageContent
      },
      realIndex: function () {
        return this.currentPage_comment * this.pageContent
      },
      // 获取当前文章ID / Get current article ID
      getId: function () {
        console.log('2SP')
        return this.$route.params.id
        // return window.location.hash.split('/')[2]
      },
      // 上一篇文章id / Previous article id
      preId: function () {
        return Number(this.getId) - 1
      },
      // 下一篇文章id / Next article id
      nextId: function () {
        return Number(this.getId) + 1
      },
      // 组织评论状态表 / Organization Review Status Form
      commentStatus: function () {
        let isCselected = []
        for (var i = 0; i <= this.articleCommentList.comments.length - 1; i++) {
          isCselected[i] = {}
          isCselected[i].isSelected = false
          isCselected[i].floor = i + 1
        }
        return isCselected
      },
      yield: function () {
        return this.articleDetail.article.votes * 0.0001
      },
      // 尝试解析text / Try to parse text
      textContent: function () {
        let txt = this.articleDetail.article.text
        console.log(txt, '______________________________________')
        txt.replace(/空格/g, 'BIP')
        return txt
      },
      realT: function () {
        let pst = ''
        let t = Number(this.articleDetail.article.realTime)
        let ct = Number(new Date().getTime())
        let pt = ct - t
        let sec = Number(pt) / 1000
        let min = 0
        let hor = 0
        let day = 0
        let yea = 0
        if (sec < 60) {
          pst = Math.floor(sec) + this.$t('SECONDS_AGO')
        } else {
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
        }
        return pst
      }
    },
    methods: {
      // 测试用 / for testing
      showSS: function () {
        console.log(this.formlizedArticle)
      },
      // 操作页面增减 / Operation page increase or decrease
      addPage: function () {
        if (this.currentPage_comment < this.allPage - 1) {
          this.$store.commit('toAddCurrentPage_c')
          // this.currentPage = this.currentPage + 1
          this.$store.dispatch('getOnearticleComment', {
            id: this.getId,
            limit: String(this.pageContent),
            offset: String(this.currentPage_comment * this.pageContent),
            that: this
          })
        } else {
          this.currentPage_comment = this.allPage - 1
        }
      },
      minPage: function () {
        if (this.currentPage_comment > 0) {
          this.$store.commit('toMinCurrentPage_c')
          // this.currentPage = this.currentPage - 1
          this.$store.dispatch('getOnearticleComment', {
            id: this.getId,
            limit: String(this.pageContent),
            offset: String(this.currentPage_comment * this.pageContent),
            that: this
          })
        } else {
          return
        }
      },
      // 页面跳转 / page jump
      goto: function (index) {
        if (index === this.current) return
        this.$store.commit('toPlusCurrentPage_c', index)
        // this.currentPage = index
        this.$store.dispatch('getOnearticleComment', {
          id: this.getId,
          limit: String(this.pageContent),
          offset: String(this.currentPage_comment * this.pageContent),
          that: this
        })
      },
      // 全部刷新 / refresh all
      toRefreshAll: function () {
        this.toReFreshA()
        this.toReFreshC()
      },
      // 刷新（重新拉取）事件 / Refresh (re-pull) the event
      toReFreshC: function (data) {
        let that = this
        setTimeout(function () {
          that.$store.dispatch('getOnearticleComment', {
            id: that.getId,
            limit: String(that.pageContent),
            offset: String(that.currentPage_comment * that.pageContent),
            that: that
          })
        }, 10000)
      },
      toReFreshA: function (data) {
        let that = this
        setTimeout(function () {
          that.$store.dispatch('getOnearticle', {
            id: that.getId,
            that: that
          })
          console.log(that.getId, 'toReFreshA')
        }, 10000)
      },
      // 跳转评论 / Jump comment
      jumpToCom: function () {
        let pos = document.querySelector('#article_comment')
        document.body.scrollTop = pos.offsetTop - 300
      },
      // 动画开关 / Animation switch
      toggleAward: function () {
        this.isAwardToggle = !this.isAwardToggle
      },
      toggleReply: function (index) {
        for (let i = 0; i < this.articleCommentList.comments.length; i++) {
          this.articleCommentList.comments[i].isSelected = false
        }
        this.articleCommentList.comments[index].isSelected = this.articleCommentList.comments[index].isSelected ? 'false' : 'true'
      },
      // 调用投票  调用toastinput里的方法 / Call Voting Call method in toastinput
      voteBtn: function () {
        let that = this
        if (that.$store.state.isLogin === false) {
          that.$store.commit('callToast', {msgHeader: this.$t('NOTE'), msgContent: this.$t('CAN_REWARD_FEATURE_ONLY_WHEN_LOGGED_IN'), _confirmfunc: this.$t('GO_TO_LOGIN'), _cancelfunc: this.$t('CAN_NOT'), deals: undefined, contract: 3})
          return
        }
        if (this.a_num === 0) {
          that.$store.commit('callToast', {msgHeader: this.$t('NOTE'), msgContent: this.$t('CAN_NOT_PLAY_CCT'), _confirmfunc: this.$t('GOT_IT'), _cancelfunc: this.$t('OK'), deals: undefined, contract: 4})
          return
        }
        this.$store.commit('callInputToast', {msgHeader: this.$t('REWARD'), msgContent: this.$t('ENTER_NUMBER_OF_TICKETS'), _confirmfunc: this.$t('CONFIRM'), _cancelfunc: this.$t('CANCEL'), deals: that.articleDetail.article.id, contract: 2})
      },
      // 文章打赏 / article reward
      voteForA: function () {
        let that = this
        this.isAwardToggle = false
        let awArg = this.pushAward(this.getId, this.a_num)
        this.$store.dispatch('invokeContract', {
          type: 1002,
          fee: '10000000',
          args: awArg,
          that: this,
          callback: function (err, res) {
            if (err) {
              return
            }
            this.$store.commit('callToast', {msgHeader: this.$t('SUCCESS'), msgContent: this.$t('REWARD_SUCCESS_MSG'), _confirmfunc: this.$t('OK'), _cancelfunc: this.$t('SHUTDOWN'), deals: undefined, contract: 4})
            that.toReFreshA()
          }
        })

        // 重新初始化 / Reinitialize
        this.a_num = undefined
      },
      // 评论打赏 / Commentary
      voteForC: function (cid) {
        let awArg = this.pushAward(cid, this.c_num)
        this.$store.dispatch('invokeContract', {
          type: 1003,
          fee: '10000000',
          args: awArg,
          that: this
        })
        // 重新初始化 / Reinitialize
        this.c_num = undefined
      },
      // 评论框效果增添 / Add comment box effect
      input_change: function (e) {
        e.target.value = '    '
      },
      // 清除评论框 / Clear comment box
      clearComment: function () {
        this.commentContent = ''
      },
      // 发布评论 / Post a comment
      subCommment: function () {
        if (this.$store.state.isLogin === false) {
          this.$store.commit('callToast', {msgHeader: this.$t('NOTE'), msgContent: this.$t('COMMENT_FEATURE_ONLY_AVAILABLE_IF_LOGGED_IN'), _confirmfunc: this.$t('GO_TO_LOGIN'), _cancelfunc: this.$t('CANCEL'), deals: undefined, contract: 3})
          return
        }
        let reg = '^[ ]+$'
        let regu = new RegExp(reg)
        let result = regu.test(this.commentContent)
        if (result === true || this.commentContent === '') {
          this.commentContent.test
          this.$store.commit('callToast', {msgHeader: this.$t('NOTE'), msgContent: this.$t('INPUT_CAN_NOT_BE_EMPTY'), _confirmfunc: this.$t('DETERMINE'), _cancelfunc: this.$t('SHUTDOWN'), deals: undefined, contract: 4})
          return
        }
        let that = this
        let reArg = this.pushInEvent(false, null, this.commentContent)
        this.$store.dispatch('invokeContract', {
          type: 1001,
          fee: '10000000',
          args: reArg,
          that: that,
          callback: function (err, res) {
            if (err) {
              return
            }
            that.$store.commit('callToast', {msgHeader: this.$t('SUCCESS'), msgContent: this.$t('COMMENT_POSTED_SUCCESSFULL_MSG'), _confirmfunc: this.$t('OK'), _cancelfunc: this.$t('SHUTDOWN'), deals: undefined, contract: 4})
            // 延迟更新公共state / Delay updating public state
            that.clearComment()
            that.toReFreshA()
            that.toReFreshC()
          }
        })
      },
      // 组织回复arg / Organization reply arg
      pushInEvent: function (isReply, pid, commentCotent) {
        let arr = []
        if (isReply) {
          arr.push(this.getId)
          arr.push(toString(pid))
          arr.push(this.commentContent)
          return arr
        } else {
          arr.push(this.getId)
          arr.push('')
          arr.push(this.commentContent)
          return arr
        }
      },
      // 组织打赏arg The organization enjoys arg
      pushAward: function (id, amount) {
        let arr = []
        arr.push(id)
        arr.push(amount)
        return arr
      },
      back: function () {
        this.$router.back()
      }
    },
    beforeCreate: function () {
      // 渲染以前的session更改 / Render previous session changes
      this.$store.commit('clearArticleDetail')
      console.log(window.location.href)
      console.log(this.getId, 'beforeCreate')
    },
    // created: function () {
    //   // 重置页码
    //   this.$store.commit('toInitPage')
    //   // 首先 判断是否session有文章url字段
    //   console.log(window.location.href)
    //   console.log('5SP')
    //   let aaa = window.location.href.split('/')[5]
    //   console.log(aaa, 'this is window.location.href.split("/")[5]')
    //   if (window.sessionStorage.articleDetail) {
    //     // 如果有字段
    //     console.log('察觉到session的缓存')
    //     console.log('6SP')
    //     let sign = window.location.href.split('/')[5]
    //     console.log('7SP')
    //     let signS = window.sessionStorage.articleDetail.split('/')[5]
    //     console.log(sign, signS, '___________________________________')
    //     if (sign === signS) {
    //       console.log('察觉到原页面刷新')
    //       window.location.href = window.sessionStorage.articleDetail
    //     } else {
    //       this.$store.dispatch('getOnearticle', {
    //         id: this.getId,
    //         that: this
    //       })
    //       console.log(this.getId, 'created')
    //       window.sessionStorage.articleDetail = window.location.href
    //     }
    //   } else {   // 并没有articleDetail 字段
    //     // 判断是否为
    //     // 说明外界加载该页面
    //     this.$store.dispatch('getOnearticle', {
    //       id: this.getId,
    //       that: this
    //     })
    //     console.log(this.getId, 'created2')
    //     window.sessionStorage.setItem('articleDetail', window.location.href)
    //   }
    //   this.$store.dispatch('getOnearticle', {
    //     id: this.getId,
    //     that: this
    //   })
    //   console.log(this.getId, 'created3')
    //   this.$store.dispatch('getOnearticleComment', {
    //     id: this.getId,
    //     limit: String(this.pageContent),
    //     offset: String(this.currentPage_comment * this.pageContent),
    //     that: this
    //   })
    // },
    created: function created () {
      // console.log(this)
      // // 重置页码
      // this.$store.commit('toInitPage')
      // // 首先 判断是否session有文章url字段
      // console.log(window.location.href)
      // console.log('5SP')
      // var aaa = window.location.href.split('/')[5]
      // console.log(aaa)
      // if (window.sessionStorage.articleDetail) {
      //   // 如果有字段
      //   console.log('察觉到session的缓存')
      //   console.log('6SP')
      //   var sign = window.location.href.split('/')[5]
      //   console.log('7SP')
      //   var signS = window.sessionStorage.articleDetail.split('/')[5]
      //   console.log(sign, signS, '___________________________________')
      //   if (sign === signS) {
      //     console.log('察觉到原页面刷新')
      //     window.location.href = window.sessionStorage.articleDetail
      //   } else {
      //     this.$store.dispatch('getOnearticle', {
      //       id: this.getId,
      //       that: this
      //     })
      //     console.log(this.getId, 'created')
      //     window.sessionStorage.articleDetail = window.location.href
      //   }
      // } else {
      //   // 判断是否为
      //   // 说明外界加载该页面
      //   this.$store.dispatch('getOnearticle', {
      //     id: this.getId,
      //     that: this
      //   })
      //   console.log(this.getId, 'created2')
      //   window.sessionStorage.setItem('articleDetail', window.location.href)
      // }
      this.$store.dispatch('getOnearticle', {
        id: this.$route.params.id,
        that: this
      })
      console.log(this.getId, 'created3')
      this.$store.dispatch('getOnearticleComment', {
        id: this.$route.params.id,
        limit: String(this.pageContent),
        offset: String(this.currentPage_comment * this.pageContent),
        that: this
      })
    },
    destroyed: function () {
      // 离开页面的数据清空 / Leave the page empty
      console.log('destroyed begin')
      console.log(window.location.href)
      // this.$store.commit('clearArticleDetail')
      console.log(this.$store.state.articleDetail)
      // 清空page / Empty page
      this.$store.commit('toInitPage')
    }
  }
</script>

<style scoped>
  .article_wrapper{
    min-width: 1000px;
    width: 45%;
    min-height: 700px;
    height: 100%;
    margin: 0 auto;
    padding-bottom: 170px;
  }
  .main{
    position: relative;
    margin: auto auto;
    min-width: 760px;
    width: 94%;
    text-align: left;
    margin-top: 30px;
  }
  .back_arror{
    position: absolute;
    display: block;
    height: 31px;
    width: 24px;
    left: -90px;
    top: 10px;
    cursor: pointer;
  }
  .back_arror img{
    display: block;
    height: 31px;
    width: 18px;
  }
  .list_container{
    margin-left: 0px;
    padding-left: 26px;
    display: inline-block;
    border-left: 2px solid rgb(238, 238, 238);
  }
  .list_container a{
    color: #9f9f9f;
  }
  .title h1{
    display: inline-block;
    font-size: 18px;
    font-weight: bold;
    color: #000;
    text-decoration: none;
  }
  .title span{
    margin-left: 20px;
    font-size: 14px;
    color: rgb(87, 97, 106);
    font-weight: bold;
    display: inline-block;
    color: #9f9f9f;
  }
  .tittlesuffix{
    font-size: 12px;
  }
  .titlesuffix:hover{
    color: #ff6600;
  }
  .meta{
    display: inline-block;
    height: 30px;
    color: #9f9f9f;
    font-size: 14px;
    font-weight: bold;
  }
  .meta .meta_info{
    display: inline-block;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    font-weight: bold;
    line-height: 28px;
  }
  .meta_info img{
    display: inline-block;
    height: 20px;
    position: relative;
    top: 4px;
    margin-right: 5px;
    margin-left: 10px;
  }
  .meta .author img{
    margin-left: 0;
    height: 30px;
  }
  .meta .timestamp{
    background-size: 22% 68%;
  }
  .interaction{
    position: relative;
  }
  .meta .comment{
    background-size: 18% 63%;
    cursor: pointer;
  }
  .meta .vote{
    background-size: 22% 68%;
    cursor: pointer;
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
  #article{
    word-break: break-word;
  }
  #article pre{
    white-space: pre-wrap;
    display: block;
    font-size: 16px;
    line-height: 24px;
    margin-top: 30px;
    text-align: left;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
   /*anti-reset*/
  #article ol li{
    margin-left: 20px;
    list-style: circle;
  }
  /*文章评论块 */
  #article_comment{
    height: 60px;
    width: 94%;
    margin: 60px auto 70px auto;
  }
  #article_comment>div{
    position: relative;
  }
  #article_comment input{
    border: 1px solid #9f9f9f;
    font-size: 14px;
    outline: none;
    background-color: rgb(238, 238, 238);
    margin-top: 10px;
    display: inline-block;
    height: 44px;
    width: 100%;
    border-radius: 3px;
  }
  #article_comment .comment_publish{
    font-size: 16px;
    cursor: pointer;
    position: absolute;
    bottom: -34px;
    right: 0;
  }
  #article_comment .comment_clear{
    font-size: 16px;
    cursor: pointer;
    position: absolute;
    bottom: -34px;
    right: 110px;
  }
  #article_comment .comment_clear:hover{
    color: #ff6600;
  }
  #article_comment .comment_publish:hover{
    color:rgb(102, 146, 217);
  }
  /*评论块*/
  .comment_part{
    line-height: 30px;
    margin: 10px auto 0px auto;
    width: 94%;
    min-width: 760px;
  }
  .comment_part ul{
    width: 100%;
  }
  .interaction_c span{
    display: inline-block;
    color: #9f9f9f;
    font-size: 18px;
    margin-left: 12px;
    cursor: pointer;
  }
  .award_a_tool{
    display: block;
    width: 220px;
    height: 30px;
    top: 10px;
    left: 370px;
    background-color: #fff;
    border: 5px solid rgb(116, 176, 236);
    position: absolute;
  }
  .award_a_tool .award_confirm{
    padding-left: 10px;
    color: rgb(116, 176, 236);
  }
  .award_a_tool:after{
    position: absolute;
    content: ' ';
    width: 0;
    height:0;
    top: 50%;
    left: -11%;
    border: solid transparent;
    border-width: 9px;
    border-right-color: rgb(116, 176, 236);
  }
  .award_a_tool input{
    height: 30px;
    outline: none;
    display: inline-block;
    width: 75%;
  }
  .award_a_tool div{
    display: inline-block;
    cursor: pointer;
  }
  .user_id img{
    display: inline-block;
    height: 20px;
    position: relative;
    top: 4px;
  }
  .comment_list p{
    padding-top: 37px;
    margin-top: 37px;
    text-align: left;
    font-size: 16px;
  }
  .reply_container{
    margin-top: 70px;
    position: relative;
    width: 100%;
    height: 80px;
  }
  .reply_container input{
    border: 1px solid #9f9f9f;
    outline: none;
    background-color: rgb(238, 238, 238);
    margin-top: 10px;
    display: block;
    height: 45px;
    width: 100%;
  }
  .reply_container>.interaction_c{
    bottom: 0;
  }
  /*分页*/
  .pag{
    position: absolute;
    left: 45%;
    bottom:80px;
    margin-bottom: 20px;
    display: block;
  }
  .pagespot{
    color: rgb(102, 146, 217);
  }
  .pag div{
    display: inline-block;
    cursor: pointer;
    height: 35px;
    line-height: 35px;
    min-width: 35px;
    font-size: 12px;
    border-radius: 6px;
  }
  .pag div:hover{
    background-color: gainsboro;
  }
  .ctrbtn{
    border: 1px solid rgb(102, 146, 217);
    color: rgb(102, 146, 217);
    padding: 0 10px;
  }
  .active{
    background-color: rgb(102, 146, 217) !important;
    color: #fff;
  }
   @media screen and (max-width: 1441px) {
     .article_wrapper{
        width: 80%;
        min-height: 700px;
        height: 100%;
        margin: 0 auto;
        padding-bottom: 170px;
      }
       .main{
        min-width: 760px;
        width: 94%;
        margin-top: 30px;
      }
      .back_arror{
        height: 36px;
        width: 19.5px;
        left: -30px;
      }
      .back_arror img{
        display: block;
        height: 26px;
        width: 13.5px;
      }
      .title h1{
        font-size: 23px;
      }
      .title span{
        margin-left: 20px;
        font-size: 9px;
        color: rgb(87, 97, 106);
      }
      .meta{
        height: 20px;
        font-size: 9px;
        font-weight: bold;
      }
      .meta .meta_info{
        height: 20px;
        line-height: 20px;
        font-size: 9px;
        font-weight: bold;
        line-height: 18px;
      }
      .meta_info img{
        height: 16px;
      }
      .meta .price span{
        display: inline-block;
        position: relative;
        top: 1px;
        font-size: 12px;
      }
      .interaction a{
        font-size: 9px;
      }
      #article pre{
        font-size: 16px;
        line-height: 24px;
      }
      .interaction .vote{
        font-size: 9px;
      }
      .pag{
        bottom: 60px;
      }
      .pag div{
        display: inline-block;
        cursor: pointer;
        height: 25px;
        line-height: 25px;
        min-width: 25px;
        font-size: 9px;
        border-radius: 4px;
      }
      .tittlesuffix{
        font-size: 9px;
      }
      .comment_list p{
        padding-top: 37px;
        margin-top: 67px;
        text-align: left;
        font-size: 16px;
      }
      .award_a_tool{
        left: 330px;
        top: -1px;
      }
      #article_comment .comment_clear{
        font-size: 12px;
      }
      #article_comment .comment_publish{
        font-size: 12px;
      }
   }
</style>
