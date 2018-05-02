const lang = {
  lang: 'en',
  TEST: 'HELLO',

  /* topbar.vue */
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
  LOGOUT: 'LOGOUT',
  MY_ACCOUNT: 'My Account',
  PUBLISH: 'Publish',

  NOTE: 'NOTE',
  CANCEL_QM: 'Cancel？',

  CANCEL: '取消',

  ERROR_OCURRED: 'An error occured',
  LOG_IN_FIRST: 'Please log in first',
  GO_TO_LOGIN: 'Go to login',
  CAN_NOT: 'Can not',

  /* withdraw.vue */
  TRANSFER_WITHIN_STATION: 'Transfer within the station',
  ENTER_TRANSFER_INFO: 'Enter transfer information',
  TRANSFER_CURRENCY: 'Transfer currency',
  AVAILABLE_BALANCE: 'Available balance',
  TRANSFERS: 'Transfers',
  TRANSFER_ADDRESS: 'Transfer address',
  FEES: '{fee} fee',
  MAKE_SURE_ADDRESS_IS_CORRECT: 'Please make sure that the address you have filled in is correct. This operation cannot be undone.',
  CONFIRM_TRANSFER: 'Confirm transfer',
  TRANSFER_RECORD: 'Transfer record',
  CURRENCY_SCREENING: 'Currency screening',
  RECORD_ID: 'Record ID',
  SENDER: 'Sender',
  RECEIVER: 'Receiver',
  TRANSFER_AMOUNT: 'Amount',
  SENDING_TIME: 'time send',
  CURRENCY: '币种',
  TRANSACTION_NOT_COMPLETED: 'The previous transaction has not been completed yet. Please wait.',
  OK: 'OK',
  SHUTDOWN: 'Shut down',
  SELECT_TRANSACTION_TYPE_FIRST: 'Please select the transaction type first!',
  SELECT_TRANSACTION_ADDRESS_FIRST: 'Please select the transaction address first!',
  ADDRESS_CAN_NOT_HAVE_SPACES: 'Trading address can not have spaces!',
  AMOUNT_MUST_BE_GREATER_THEN_ZERO: 'The transaction amount must be greater then zero!',
  ADDRESS_NOT_IN_RIGHT_FORMAT: 'The entered address is not in the right format!',
  SUCCESS: 'Success!',
  TRANSFER_SUCCESSFUL_MSG: 'Transfers are successful and transfer time may be slightly longer depending on the circumstances',

  /* top.vue
   no translations
  */

  /* toList.vue */
  COMMENT: 'comment',
  ENTER_REWARD_AMOUNT: 'Please enter the reward amount',
  CONFIRM: 'Confirm',
  TICKET: 'ticket',
  REPORT_ARTICLE: 'Report this article',
  CAN_REWARD_FEATURE_ONLY_WHEN_LOGGED_IN: 'You can only use the reward feature if you are logged in',
  REWARD: 'Reward',
  ENTER_NUMBER_OF_TICKETS: 'Please enter the number of tickets',
  REPORT_ARTICLE_ONLY_WHEN_LOGGED_IN: 'You can only report articles if you logged in',
  CAVEAT: 'Caveat',
  IS_THIS_ARTICLE_REPORTED: 'Is this article reported?',
  REPORT: 'Report',
  REWARD_SUCCESS_MSG: 'The reward was succcessful. About ten seconds later you will see the updated information.',
  REPORT_ARTICLE_CONFIRMATION_MSG: 'Article successfully reported. Please wait for the admin to verify the article.',
  SECONDS_AGO: 'seconds ago',
  MINUTES_AGO: 'minutes ago',
  HOURS_AGO: 'hours ago',
  DAYS_AGO: 'days ago',
  YEARS_AGO: 'YEARS AGO',
  JUST: 'just',

  /* toastmsg.vue */
  REPORT_COMMENT_CONFIRMATION_MSG: 'Comment reported. Please wait for a admin to verify.',

  /* toastinput.vue */
  DETERMINE: '确定',
  REWARD_MUST_BE_INTEGER_MSG: 'The reward must be an integer!',
  REWARD_REVIEW_SUCCESS_MSG: 'Rewarded the review successfully!',
  REWARDED_ARTICLE_SUCCESS_MSG: '打赏文章成功！',

  /* recharge.vue */
  COIN: 'COIN',
  ENTER_CURRENCY: 'Enter currency',
  COINAGE_CURRENCY: 'Coinage currency',
  NUMBER_OF_EXTRACTIONS: 'Number of extractions',
  PROCESSING_FEE: 'Processing fee of {fee}',
  CONFIRM_COINS: 'Confirm the coins',
  CHARGING_MONEY: '充币',
  COIN_CHARGE_VIA_ASCH_WALLET: 'To perform a coin charge operation please navigate to',
  ASCH_WALLET: 'Asch wallet',
  SELECT_TRANSACTION_CURRENCY_TYPE_MSG: 'Please set transaction currency type',
  SELECT_TRANSACTION_AMOUNT_MSG: 'Please set the transaction amount',
  MONEY_EXTRACTION_SUCCESS_MSG: 'Money extraction was successful. The transaction will be completed after a certain delay.',

  /* publish.vue */
  TITLE: '  Title',
  LABEL: '  Label',
  ARTICLE_CONTENT: 'Article content (up to 4096 characters)',
  SUBMIT_ARTICLE: 'Submit',
  ARTICLE_LENGTH_SHORTER_THEN_4096_BYTES: 'The length of the article should be less then 4096 bytes',
  ARTICLE_OR_URL_NOT_BOTH_MSG: 'Provide either an article or submit an URL. Both are not allowed.',
  BOTH_ARTICLE_AND_URL_CAN_NOT_BE_EMPTY: 'The article and URL can not be both be empty.',
  ARTICLE_POSTED_SUCCESS_MSG: 'Article posted successfully. In about 10 seconds you will see the update',
  URL_NOT_CORRECT_MSG: 'Please confirm whether the entered website is correct.',
  LOG_JUDGING_SUCCESS: 'judging success',

  /* notfound.vue */
  PAGE_NOTFOUND: 'The page you visited disappeared apparently',
  RETURN_TO_HOME: 'Click here to return to the homepage, thank you, that you support CCTIME!',

  /* newpost.vue */
  LOG_UPDATED_ONCE: 'Updated once',

  /* newList.vue
     no translations
  */

  /* login.vue */
  USER_LOGIN: 'User login',
  ENTER_KEY: '  Please enter the key',
  NO_ACCOUNT_QESTION: 'Do not have a account?',
  KEY_CANNOT_BE_EMPTY: 'Key can not be empty',
  KEY_DOES_NOT_MEET_RULES: '秘钥不符合规则',

  /* footbar.vue */
  ASCH_OFFICIAL_WEBSITE: 'Asch Website',
  ASCH_OFFICIAL_FORUM: 'Asch Forum',
  ASCH_OFFICIAL_QQ_GROUP: 'Official QQ Group: {num}',

  /* detail.vue */
  RECEDE: 'Recede',
  ENTER_COMMENT: 'Enter comment',
  CLEAR: 'Clear',
  POST_COMMENT: 'Post a comment',
  CAN_NOT_PLAY_CCT: 'You can not play CCT',
  GOT_IT: 'Got it',
  COMMENT_FEATURE_ONLY_AVAILABLE_IF_LOGGED_IN: 'The comment feature is only available if you are logged in',
  INPUT_CAN_NOT_BE_EMPTY: 'Input cannot be empty',
  COMMENT_POSTED_SUCCESSFULL_MSG: 'The comment was successfully posted. In about 10 seconds you will see the update.',

  /* detailListl.vue */
  REPLY: 'Reply',
  ENTER_COMMENT_WITH_SPACE: '  Enter comment',
  REPLY_FEATURE_ONLY_AVAILABLE_IF_LOGGED_IN: 'The reply feature is only available if you are logged in.',
  REPORT_COMMENT_ONLY_WHEN_LOGGED_IN: 'You can only report a comment if you are logged in.',
  REPORT_THIS_COMMENT_QM: 'Report this comment?',
  THE_INPUT_CAN_NOT_BE_EMPTY: 'The input can not be empty',
  REPLY_TO_COMMENT_WAS_SUCCESSFUL_MSG: 'The reply to the comment was successful. In about 10 seconds you will see the update.',
  REPORT_COMMENT_QM: 'Should this comment be reported?',

  /* account.vue */
  IMG_ALT_TEXT: 'Refresh',
  IMG_TITLE: 'Refresh',
  USER_NAME: 'Username: ',
  ENTER_NICKNAME: '  Enter nickname',
  LAND: 'Land',
  SITE: 'Site: ',
  CHARGE_WITHDRAWAL: 'Charge/Withdrawal',
  NICKNAME_NOT_EMPTY_MSG: 'The nickname should be filled',
  NICKNAME_NOT_LONGER_THEN_20_BYTES: 'The nickname should not be longer then 20 bytes.',
  NICKNAME_SET_SUCCESSFUL_MSG: 'Nickname successfully modified. In about 10 seconds you will see the update.',
  REFRESH_SUCCESSFUL_MSG: 'Refresh was successful (F5 is not recommended)',
  I_WAS: 'I was',
  PERSONAL_INFORMATION_NOT_SET_MSG: 'Personal information not set',
  NO_BALANCE_INFORMATION: 'No balance information found. It may be a new user or an incorrect input key.'

}

export default lang
