export type Animation = {
  file_id: string;
  file_unique_id: string;
  width: number;
  height: number;
  duration: number;
  thumbnail?: PhotoSize;
  file_name?: string;
  mime_type?: string;
  file_size?: number;
};

export type Audio = {
  file_id: string;
  file_unique_id: string;
  duration: number;
  performer?: string;
  title?: string;
  file_name?: string;
  mime_type?: string;
  file_size?: number;
  thumbnail?: PhotoSize;
};

export type CallbackQuery = {
  id: string;
  from: UserTg;
  message?: Message;
  inline_message_id?: string;
  chat_instance: string;
  data?: string;
  game_short_name?: string;
};

export type ChatTg = {
  id: number;
  type: string; //ChatTypes
  title?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  is_forum?: boolean;
  photo?: ChatPhoto;
  active_usernames?: Array<string>;
  emoji_status_custom_emoji_id?: string;
  emoji_status_expiration_date?: number;
  bio?: string;
  has_private_forwards?: boolean;
  has_restricted_voice_and_video_messages?: boolean;
  join_to_send_messages?: boolean;
  join_by_request?: boolean;
  description?: string;
  invite_link?: string;
  pinned_message?: Message;
  permissions?: ChatPermissionsInterface;
  slow_mode_delay?: number;
  message_auto_delete_time?: number;
  has_aggressive_anti_spam_enabled?: boolean;
  has_hidden_members?: boolean;
  has_protected_content?: boolean;
  sticker_set_name?: string;
  can_set_sticker_set?: boolean;
  linked_chat_id?: number;
  location?: ChatLocationInterface;
};

export type ChatInviteLink = {
  invite_link: string;
  creator: UserTg;
  creates_join_request: boolean;
  is_primary: boolean;
  is_revoked: boolean;
  name?: string;
  expire_date?: number;
  member_limit?: number;
  pending_join_request_count?: number;
};

export type ChatJoinRequest = {
  chat: ChatTg;
  from: UserTg;
  user_chat_id: number;
  date: number;
  bio?: string;
  invite_link?: ChatInviteLink;
};

export type ChatLocationInterface = {
  location: Location;
  address: string;
};

export type ChatMember = {
  user: UserTg;
  status: string;
};

export enum ChatMemberTypes {
  owner,
  administrator,
  member,
  restricted,
  left,
  banned,
}

export type ChatMemberUpdated = {
  chat: ChatTg;
  from: UserTg;
  date: number;
  old_chat_member: ChatMember;
  new_chat_member: ChatMember;
  invite_link?: ChatInviteLink;
  via_chat_folder_invite_link?: boolean;
};

export type ChatPermissionsInterface = {
  can_send_messages?: boolean;
  can_send_audios?: boolean;
  can_send_documents?: boolean;
  can_send_photos?: boolean;
  can_send_videos?: boolean;
  can_send_video_notes?: boolean;
  can_send_voice_notes?: boolean;
  can_send_polls?: boolean;
  can_send_other_messages?: boolean;
  can_add_web_page_previews?: boolean;
  can_change_info?: boolean;
  can_invite_users?: boolean;
  can_pin_messages?: boolean;
  can_manage_topics?: boolean;
};

export type ChatPhoto = {
  small_file_id: string;
  small_file_unique_id: string;
  big_file_id: string;
  big_file_unique_id: string;
};

export enum ChatTypes {
  private,
  group,
  supergroup,
  channel,
}

export type ChosenInlineResult = {
  result_id: string;
  from: UserTg;
  location?: Location;
  inline_message_id?: string;
  query: string;
};

export type Document = {
  file_id: string;
  file_unique_id: string;
  thumbnail?: PhotoSize;
  file_name?: string;
  mime_type?: string;
  file_size?: number;
};

export type InlineKeyboardButton = {
  text: string;
  url?: string;
  callback_data?: string;
  web_app?: WebAppInfo;
  login_url?: LoginUrl;
  switch_inline_query?: string;
  switch_inline_query_current_chat?: string;
  switch_inline_query_chosen_chat?: SwitchInlineQueryChosenChat;
  callback_game?: string;
  pay?: boolean;
};

export type InlineKeyboardMarkup = {
  inline_keyboard: Array<Array<InlineKeyboardButton>>;
};

export type InlineQuery = {
  id: string;
  from: UserTg;
  query: string;
  offset: string;
  chat_type?: string;
  location?: Location;
};

export type Location = {
  longitude: number;
  latitude: number;
  horizontal_accuracy?: number;
  live_period?: number;
  heading?: number;
  proximity_alert_radius?: number;
};

export type LoginUrl = {
  url: string;
  forward_text?: string;
  bot_username?: string;
  request_write_access?: boolean;
};

export type Message = {
  message_id: number;
  message_thread_id?: number;
  from?: UserTg;
  sender_chat?: ChatTg;
  date: number;
  chat: ChatTg;
  forward_from?: UserTg;
  forward_from_chat?: ChatTg;
  forward_from_message_id?: number;
  forward_signature?: string;
  forward_sender_name?: string;
  forward_date?: number;
  is_topic_message?: boolean;
  is_automatic_forward?: boolean;
  reply_to_message?: Message;
  via_bot?: UserTg;
  edit_date?: number;
  has_protected_content?: boolean;
  media_group_id?: string;
  author_signature?: string;
  text?: string;
  entities?: Array<MessageEntity>;
  animation?: Animation;
  audio?: Audio;
  document?: Document;
  photo?: Array<PhotoSize>;
  sticker?: object;
  story?: object;
  video?: object;
  video_note?: object;
  voice?: object;
  caption?: string;
  caption_entities?: Array<MessageEntity>;
  has_media_spoiler?: boolean;
  contact?: object;
  dice?: object;
  game?: object;
  poll?: Poll;
  venue?: object;
  location?: Location;
  new_chat_members?: Array<UserTg>;
  left_chat_member?: UserTg;
  new_chat_title?: string;
  new_chat_photo?: Array<PhotoSize>;
  delete_chat_photo?: boolean;
  group_chat_created?: boolean;
  supergroup_chat_created?: boolean;
  channel_chat_created?: boolean;
  message_auto_delete_timer_changed?: object;
  migrate_to_chat_id?: number;
  migrate_from_chat_id?: number;
  pinned_message?: Message;
  invoice?: object;
  successful_payment?: object;
  user_shared?: object;
  chat_shared?: object;
  connected_website?: string;
  write_access_allowed?: WriteAccessAllowed;
  passport_data?: object;
  proximity_alert_triggered?: object;
  forum_topic_created?: object;
  forum_topic_edited?: object;
  forum_topic_closed?: object;
  forum_topic_reopened?: object;
  general_forum_topic_hidden?: object;
  general_forum_topic_unhidden?: object;
  video_chat_scheduled?: object;
  video_chat_started?: object;
  video_chat_ended?: object;
  video_chat_participants_invited?: object;
  web_app_data?: WebAppInfo;
  reply_markup?: InlineKeyboardMarkup;
};

export type MessageEntity = {
  type: MessageEntityTypes;
  offset: number;
  length: number;
  url?: string;
  user?: UserTg;
  language?: string;
  custom_emoji_id?: string;
};

export enum MessageEntityTypes {
  mention,
  hashtag,
  cashtag,
  bot_command,
  url,
  email,
  phone_number,
  bold,
  italic,
  underline,
  strikethrough,
  spoiler,
  code,
  pre,
  text_link,
  text_mention,
  custom_emoji,
}

export type OrderInfo = {
  name?: string;
  phone_number?: string;
  email?: string;
  shipping_address?: ShippingAddress;
};

export type PhotoSize = {
  file_id: string;
  file_unique_id: string;
  width: number;
  height: number;
  file_size?: number;
};

export type Poll = {
  id: string;
  question: string;
  options: PoolOptions[];
  total_voter_count: number;
  is_closed: boolean;
  is_anonymous: boolean;
  type: PollType;
  allows_multiple_answers: boolean;
  correct_option_id?: number;
  explanation?: string;
  explanation_entities?: MessageEntity;
  open_period?: number;
  close_date?: number;
};

export type PollAnswer = {
  poll_id: string;
  voter_chat?: ChatTg;
  user?: UserTg;
  option_ids?: number[];
};

export type PoolOptions = {
  text: string;
  voter_count: number;
};

export enum PollType {
  regular,
  quiz,
}

export type PreCheckoutQuery = {
  id: string;
  from: UserTg;
  currency: string;
  total_amount: number;
  invoice_payload: string;
  shipping_option_id?: string;
  order_info?: OrderInfo;
};

export type ShippingAddress = {
  country_code: string;
  state: string;
  city: string;
  street_line1: string;
  street_line2: string;
  post_code: string;
};

export type ShippingQuery = {
  id: string;
  from?: UserTg;
  invoice_payload: string;
  shipping_address: ShippingAddress;
};

export type SwitchInlineQueryChosenChat = {
  query?: string;
  allow_user_chats?: boolean;
  allow_bot_chats?: boolean;
  allow_group_chats?: boolean;
  allow_channel_chats?: boolean;
};

export type Update = {
  update_id: number;
  message?: Message;
  edited_message?: Message;
  channel_post?: Message;
  edited_channel_post?: Message;
  inline_query?: InlineQuery;
  chosen_inline_result?: ChosenInlineResult;
  callback_query?: CallbackQuery;
  shipping_query?: ShippingQuery;
  pre_checkout_query?: PreCheckoutQuery;
  poll?: Poll;
  poll_answer?: PollAnswer;
  my_chat_member?: ChatMemberUpdated;
  chat_member?: ChatMember;
  chat_join_request?: ChatJoinRequest;
};

export type UserTg = {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  added_to_attachment_menut_name?: boolean;
  can_join_groups?: boolean;
  can_read_all_group_messages?: boolean;
  supports_inline_queries?: boolean;
};

export type UserProfilePhotos = {
  total_count: number;
  photos: Array<Array<PhotoSize>>;
};

export type WebAppInfo = {
  url: string;
};

export type WriteAccessAllowed = {
  from_request?: boolean;
  web_app_name?: string;
  from_attachment_menu?: boolean;
};

// METHODS
export type AnswerCallbackQueryMethod = {
  callback_query_id: string;
  text?: string;
  show_alert?: boolean;
  url?: string;
  cache_time?: number;
};

export type EditMessageCaptionMethod = {
  chat_id?: bigint;
  message_id?: number;
  inline_message_id?: string;
  caption?: string;
  parse_mode?: string;
  caption_entities?: Array<MessageEntity>;
  reply_markup?: InlineKeyboardMarkup;
};

export type EditMessageMediaMethod = {
  chat_id?: bigint;
  message_id?: number;
  inline_message_id?: string;
  media?: string;
  reply_markup?: InlineKeyboardMarkup;
};

export type editMessageReplyMarkupMethod = {
  chat_id?: bigint;
  message_id?: number;
  inline_message_id?: string;
  reply_markup?: InlineKeyboardMarkup;
};

export type EditMessageTextMethod = {
  chat_id?: bigint;
  message_id?: number;
  inline_message_id?: string;
  text: string;
  parse_mode?: string;
  entities?: Array<MessageEntityTypes>;
  disable_web_page_preview?: boolean;
  reply_markup?: InlineKeyboardMarkup;
};

export type getUserProfilePhotosMethod = {
  user_id: bigint;
  offset?: number;
  limit?: number;
};

export type SendMessageMethod = {
  chat_id: number;
  message_thread_id?: number;
  text: string;
  parse_mode?: string;
  entities?: Array<MessageEntity>;
  disable_web_page_preview?: boolean;
  disable_notification?: boolean;
  protect_content?: boolean;
  reply_to_message_id?: number;
  allow_sending_without_reply?: boolean;
  reply_markup?: InlineKeyboardMarkup;
};

export type SendPhotoMethod = {
  chat_id: bigint;
  message_thread_id?: number;
  photo: string;
  caption?: string;
  parse_mode?: string;
  caption_entities?: Array<MessageEntity>;
  has_spoiler?: boolean;
  disable_notification?: boolean;
  protect_content?: boolean;
  reply_to_message_id?: number;
  allow_sending_without_reply?: boolean;
  reply_markup?: InlineKeyboardMarkup;
};

export type SendPollMethod = {
  chat_id: bigint;
  message_thread_id?: number;
  question: string;
  options: Array<string>;
  is_anonymous?: boolean;
  type?: string; //PollType
  allows_multiple_answers?: boolean;
  correct_option_id?: number;
  explanation?: string;
  explanation_parse_mode?: string;
  explanation_entities?: Array<MessageEntity>;
  open_period?: number;
  close_date?: number;
  is_closed?: boolean;
  disable_notification?: boolean;
  protect_content?: boolean;
  reply_to_message_id?: number;
  allow_sending_without_reply?: boolean;
  reply_markup?: InlineKeyboardMarkup;
};
