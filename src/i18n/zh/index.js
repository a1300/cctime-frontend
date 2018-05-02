const lang = {
  lang: 'zh',
  TEST: 'HELLO',

  /* topbar.vue */

  LOGIN: '登录',
  REGISTER: '注册',
  LOGOUT: '注销',
  MY_ACCOUNT: '我的账户',
  PUBLISH: '发布',

  NOTE: '注意！',
  CANCEL_QM: '是否要进行注销？',

  CANCEL: '取消',

  ERROR_OCURRED: '发生错误',
  LOG_IN_FIRST: '请先登录',
  GO_TO_LOGIN: '去登录',
  CAN_NOT: '不了',

  /* withdraw.vue */
  TRANSFER_WITHIN_STATION: '站内转账',
  ENTER_TRANSFER_INFO: '输入转账信息',
  TRANSFER_CURRENCY: '转账币种',
  AVAILABLE_BALANCE: '可用余额',
  TRANSFERS: '转账数量',
  TRANSFER_ADDRESS: '转账地址',
  FEES: '手续费{fee}',
  MAKE_SURE_ADDRESS_IS_CORRECT: '请确保您所填的对方地址是否正确，本操作无法撤销',
  CONFIRM_TRANSFER: '确认转账',
  TRANSFER_RECORD: '转账记录',
  CURRENCY_SCREENING: '币种筛选',
  RECORD_ID: '记录ID',
  SENDER: '转出方',
  RECEIVER: '转入方',
  TRANSFER_AMOUNT: '转移数量',
  SENDING_TIME: '发送时间',
  CURRENCY: '币种',
  TRANSACTION_NOT_COMPLETED: '上一次交易尚未完成，请稍后',
  OK: '了解',
  SHUTDOWN: '关闭',
  SELECT_TRANSACTION_TYPE_FIRST: '请先选择交易内容！',
  SELECT_TRANSACTION_ADDRESS_FIRST: '请先选择交易对象地址！',
  ADDRESS_CAN_NOT_HAVE_SPACES: '交易地址不得有空格/回车',
  AMOUNT_MUST_BE_GREATER_THEN_ZERO: '请确认交易数额大于零！',
  ADDRESS_NOT_IN_RIGHT_FORMAT: '您输入的地址不符合阿希规范',
  SUCCESS: '成功！',
  TRANSFER_SUCCESSFUL_MSG: '转账成功，根据环境原因转账时间可能会略有延长',

  /* top.vue
   no translations
  */

  /* toList.vue */
  COMMENT: '评论',
  ENTER_REWARD_AMOUNT: '输入奖赏金额',
  CONFIRM: '确认',
  TICKET: '票',
  REPORT_ARTICLE: '举报该文章',
  CAN_REWARD_FEATURE_ONLY_WHEN_LOGGED_IN: '仅当您登录后才能使用打赏功能',
  REWARD: '打赏',
  ENTER_NUMBER_OF_TICKETS: '请输入打赏票数',
  REPORT_ARTICLE_ONLY_WHEN_LOGGED_IN: '仅当您登录后才能使用举报功能',
  CAVEAT: '警告',
  IS_THIS_ARTICLE_REPORTED: '是否对该文章进行举报？',
  REPORT: '举报',
  REWARD_SUCCESS_MSG: '打赏成功！大约十秒后将看到更新信息',
  REPORT_ARTICLE_CONFIRMATION_MSG: '举报文章成功，请等待负责人核实',
  SECONDS_AGO: '秒前',
  MINUTES_AGO: '分钟前',
  HOURS_AGO: '小时前',
  DAYS_AGO: '天前',
  YEARS_AGO: '年前',
  JUST: '刚刚',

  /* toastmsg.vue */
  REPORT_COMMENT_CONFIRMATION_MSG: '举报评论成功！请等待负责人核实',

  /* toastinput.vue */
  DETERMINE: '确定',
  REWARD_MUST_BE_INTEGER_MSG: '打赏金额必须为整数！',
  REWARD_REVIEW_SUCCESS_MSG: '打赏评论成功！',
  REWARDED_ARTICLE_SUCCESS_MSG: '打赏文章成功！',

  /* recharge.vue */
  COIN: '提币',
  ENTER_CURRENCY: '输入要提取的币种',
  COINAGE_CURRENCY: '提币币种',
  NUMBER_OF_EXTRACTIONS: '提取数量',
  PROCESSING_FEE: '手续费{fee}',
  CONFIRM_COINS: '确认提币',
  CHARGING_MONEY: '充币',
  COIN_CHARGE_VIA_ASCH_WALLET: '要执行充币的操作请移步',
  ASCH_WALLET: '阿希钱包',
  SELECT_TRANSACTION_CURRENCY_TYPE_MSG: '请填写交易货币类型',
  SELECT_TRANSACTION_AMOUNT_MSG: '请填写交易数额',
  MONEY_EXTRACTION_SUCCESS_MSG: '提币成功！交易将在一定延迟后完成',

  /* publish.vue */
  TITLE: '  标题',
  LABEL: '  标签',
  ARTICLE_CONTENT: '文章内容(最多4096个字符)',
  SUBMIT_ARTICLE: '提交',
  ARTICLE_LENGTH_SHORTER_THEN_4096_BYTES: '发布文章的内容长度要小于4096字节',
  ARTICLE_OR_URL_NOT_BOTH_MSG: '网络地址与文章内容只能选填一个',
  BOTH_ARTICLE_AND_URL_CAN_NOT_BE_EMPTY: '网络地址与文章内容至少要填一项',
  ARTICLE_POSTED_SUCCESS_MSG: '发布文章成功！大约十秒后看到更新',
  URL_NOT_CORRECT_MSG: '请确认是否输入正确的网址，推荐直接复制',
  LOG_JUDGING_SUCCESS: '判断成功',

  /* notfound.vue */
  PAGE_NOTFOUND: '您访问的页面由于各种原因，总之消失了',
  RETURN_TO_HOME: '点击这里返回主页，感谢您对CCTime的大力支持！',

  /* newpost.vue */
  LOG_UPDATED_ONCE: '更新了一次',

  /* newList.vue
     no translations
  */

  /* login.vue */
  USER_LOGIN: '用户登录',
  ENTER_KEY: '  请输入密钥',
  NO_ACCOUNT_QESTION: '尚未拥有账户？',
  KEY_CANNOT_BE_EMPTY: '秘钥不能为空呦',
  KEY_DOES_NOT_MEET_RULES: '秘钥不符合规则'

}

export default lang
