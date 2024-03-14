"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PollType = exports.MessageEntityTypes = exports.ChatTypes = exports.ChatMemberTypes = void 0;
var ChatMemberTypes;
(function (ChatMemberTypes) {
    ChatMemberTypes[ChatMemberTypes["owner"] = 0] = "owner";
    ChatMemberTypes[ChatMemberTypes["administrator"] = 1] = "administrator";
    ChatMemberTypes[ChatMemberTypes["member"] = 2] = "member";
    ChatMemberTypes[ChatMemberTypes["restricted"] = 3] = "restricted";
    ChatMemberTypes[ChatMemberTypes["left"] = 4] = "left";
    ChatMemberTypes[ChatMemberTypes["banned"] = 5] = "banned";
})(ChatMemberTypes || (exports.ChatMemberTypes = ChatMemberTypes = {}));
var ChatTypes;
(function (ChatTypes) {
    ChatTypes[ChatTypes["private"] = 0] = "private";
    ChatTypes[ChatTypes["group"] = 1] = "group";
    ChatTypes[ChatTypes["supergroup"] = 2] = "supergroup";
    ChatTypes[ChatTypes["channel"] = 3] = "channel";
})(ChatTypes || (exports.ChatTypes = ChatTypes = {}));
var MessageEntityTypes;
(function (MessageEntityTypes) {
    MessageEntityTypes[MessageEntityTypes["mention"] = 0] = "mention";
    MessageEntityTypes[MessageEntityTypes["hashtag"] = 1] = "hashtag";
    MessageEntityTypes[MessageEntityTypes["cashtag"] = 2] = "cashtag";
    MessageEntityTypes[MessageEntityTypes["bot_command"] = 3] = "bot_command";
    MessageEntityTypes[MessageEntityTypes["url"] = 4] = "url";
    MessageEntityTypes[MessageEntityTypes["email"] = 5] = "email";
    MessageEntityTypes[MessageEntityTypes["phone_number"] = 6] = "phone_number";
    MessageEntityTypes[MessageEntityTypes["bold"] = 7] = "bold";
    MessageEntityTypes[MessageEntityTypes["italic"] = 8] = "italic";
    MessageEntityTypes[MessageEntityTypes["underline"] = 9] = "underline";
    MessageEntityTypes[MessageEntityTypes["strikethrough"] = 10] = "strikethrough";
    MessageEntityTypes[MessageEntityTypes["spoiler"] = 11] = "spoiler";
    MessageEntityTypes[MessageEntityTypes["code"] = 12] = "code";
    MessageEntityTypes[MessageEntityTypes["pre"] = 13] = "pre";
    MessageEntityTypes[MessageEntityTypes["text_link"] = 14] = "text_link";
    MessageEntityTypes[MessageEntityTypes["text_mention"] = 15] = "text_mention";
    MessageEntityTypes[MessageEntityTypes["custom_emoji"] = 16] = "custom_emoji";
})(MessageEntityTypes || (exports.MessageEntityTypes = MessageEntityTypes = {}));
var PollType;
(function (PollType) {
    PollType[PollType["regular"] = 0] = "regular";
    PollType[PollType["quiz"] = 1] = "quiz";
})(PollType || (exports.PollType = PollType = {}));
//# sourceMappingURL=tg-types.js.map