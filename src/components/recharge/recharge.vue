<template>
  <div class="charge_container">
    <div class="header">
        <h1>{{$t('COIN')}}</h1>
    </div>
    <div class="deal_part">
        <span>{{$t('ENTER_CURRENCY')}}</span>
        <div class="deal_form">
        <select type="text" v-model="trans_type">
            <option disabled selected>{{$t('COINAGE_CURRENCY')}}</option>
            <option v-for="item in this.userInfo.info.balances">{{item.currency}}</option>
        </select>
        <input type="number" v-bind:placeholder="$t('NUMBER_OF_EXTRACTIONS')" v-model="trans_num">
        <input type="text" class="calculate" v-bind:placeholder="$t('PROCESSING_FEE', { fee: 0.1 })" disabled><span class="calculate_info"></span>
        </div>
    </div>
    <div class="confirm_btn">
      <span class="btn" @click="toWithdraw">{{$t('CONFIRM_COINS')}}</span>
    </div>
    <div class="header">
      <h1>{{$t('CHARGING_MONEY')}}</h1>
    </div>
    <div class="address">
      <p>{{$t('COIN_CHARGE_VIA_ASCH_WALLET')}}<a href="http://mainnet.asch.io" target="_blank">{{$t('ASCH_WALLET')}}</a></p>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'recharge',
    components: {
    },
    data: function () {
      return {
        trans_type: '',
        trans_num: null,
        trans_password: ''
      }
    },
    methods: {
      toWithdraw: function () {
        let that = this
        if (this.trans_type === '') {
          this.$store.commit('callToast', {msgHeader: this.$t('NOTE'), msgContent: this.$t('SELECT_TRANSACTION_CURRENCY_TYPE_MSG'), _confirmfunc: this.$t('OK'), _cancelfunc: this.$t('SHUTDOWN'), deals: undefined, contract: 4})
          return
        }
        if (Number(this.trans_num) === 0 || null) {
          that.$store.commit('callToast', {msgHeader: this.$t('NOTE'), msgContent: this.$t('SELECT_TRANSACTION_AMOUNT_MSG'), _confirmfunc: this.$t('OK'), _cancelfunc: this.$t('SHUTDOWN'), deals: undefined, contract: 4})
          return
        }
        let a = []
        a.push(that.trans_type)
        a.push(String(that.trans_num * 1e8))
        a.push(that.userInfo.info.address)
        that.$store.dispatch('invokeContract', {
          type: 2,
          fee: '10000000',
          args: a,
          that: that,
          callback: function (err, data) {
            if (err) {
              return
            }
            that.$store.commit('callToast', {msgHeader: this.$t('SUCCESS'), msgContent: this.$t('MONEY_EXTRACTION_SUCCESS_MSG'), _confirmfunc: this.$t('OK'), _cancelfunc: this.$t('SHUTDOWN'), deals: undefined, contract: 4})
          }
        })
        this.init()
      },
      init: function () {
        this.trans_type = ''
        this.trans_num = undefined
        this.trans_address = ''
        this.trans_password = ''
      }
    },
    computed: {
      ...mapState(['userInfo']),
      // 手续费计算 / Processing fee calculation
      trans_fee: function () {
        if (this.trans_num === undefined) {
          return 0
        }
        return this.trans_num * 0.001
      }
    }
  }
</script>

<style lang="" scoped>
  .charge_container{
    min-width: 1024px;
    width: 80%;
    min-height: 700px;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
    padding-bottom: 210px;
  }
  .header{
    margin: 30px auto 0 auto;
    height: 20px;
    width: 70%;
    border-left: 5px solid rgb(238, 238, 238);
  }
  .header h1{
    margin-left: 16px;
    text-align: left;
    font-size: 20px;
    line-height: 20px;
    font-weight: 600;
  }
  .address{
    height: 81px;
    width: 70%;
    margin: 30px auto 0 auto;
  }
  .address a{
    color: rgb(109, 152, 221);
  }
  .address a:hover{
    color: coral;
  }
  .address p{
    display: block;
    height: 35px;
    margin-left: 15px;
    text-align: left;
    font-size: 14px;
    font-weight: 500;
  }
  .address span{
    margin-left: 15px;
    color: rgb(99, 148, 217);
    display: block;
    font-size: 22px;
    height: 44px;
    line-height: 44px;
    border: .5px solid rgb(99, 148, 217);
    background-color: rgb(210, 229, 244);
  }
  .deal_part{
    width: 70%;
    height: 160px;
    margin: 30px auto 0 auto;
    border-left: 5px solid rgb(238, 238, 238);
  }
  .deal_part>span{
    display: block;
    font-size: 16px;
    margin-left: 15px;
    font-weight: 600;
    text-align: left;
  }
  .deal_form{
    margin-left: 15px;
    text-align: left;
    width: 40%;
  }
  .deal_form select, .deal_form input{
    border: 1px solid #ccc;
    margin: 10px 0 10px 0;
    height: 30px;
    display: inline-block;
    font-size: 16px;
    line-height: 30px;
    border-radius: 5px;
    padding-left: 5px;
    width: 60%;
  }
  .deal_form span{
    margin-left: 25px;
    color: rgb(146, 176, 230);
    font-size: 16px;
  }
  .deal_form .psd{
    background-color: rgb(210, 229, 244);
  }
  .charge_container > p{
      text-align: left;
      width: 68%;
      margin: 15px auto 15px auto;
      color: rgb(146, 176, 230);
  }
  .confirm_btn{
    width:70%;
    margin: 10px auto 0 auto;
  }
  .btn{
    display: block;
    height:35px;
    width: 80px;
    line-height: 35px;
    color: rgb(146, 176, 230);
    border-radius: 5px;
    background-color: rgb(210, 229, 244);
    margin-left: 19%;
    cursor: pointer;
  }
   @media screen and (max-width: 1441px) {
     .charge_container{
      width: 80%;
      min-height: 500px;
      padding-bottom: 210px;
    }
    .header{
      margin: 25px auto 0 auto;
      height: 20px;
      width: 70%;
      border-left: 2px solid rgb(238, 238, 238);
    }
    .deal_part{
      width: 70%;
      height: 160px;
      margin: 20px auto 0 auto;
      border-left: 2px solid rgb(238, 238, 238);
    }
    .deal_form{
      margin-left: 10px;
      width: 60%;
    }
    .deal_form span{
      margin-left: 25px;
      color: rgb(146, 176, 230);
      font-size: 14px;
    }
    .header h1{
      margin-left: 10px;
      font-size: 16px;
      line-height: 16px;
    }
    .deal_part>span{
      font-size: 14px;
      margin-left: 10px;
      font-weight: 500;
    }
    .charge_container > p{
      font-size: 14px;
    }
   }
</style>
