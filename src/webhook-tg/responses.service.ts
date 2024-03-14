import 'dotenv/config';
import axios from 'axios';
import { Injectable } from '@nestjs/common';
import {
  AnswerCallbackQueryMethod,
  EditMessageCaptionMethod,
  EditMessageTextMethod,
  SendMessageMethod,
  SendPhotoMethod,
  SendPollMethod,
  editMessageReplyMarkupMethod,
} from 'src/types/tg-types';

@Injectable()
export class ResponsesService {
  async sendMessage(message: SendMessageMethod) {
    try {
      const response = await axios.get(
        `
			${process.env.SEND_MESSAGE}
			chat_id=${message.chat_id}
			&text=${message.text}
			&reply_markup=${JSON.stringify(message.reply_markup)}
			&disable_web_page_preview=true
			&parse_mode=HTML
			`,
      );
      return response.data.result;
    } catch (error) {}
  }

  async editMessageText(message: EditMessageTextMethod) {
    try {
      const response = await axios.get(
        `
			${process.env.SEND_MESSAGE}
			message_id=${message.message_id}
			&text=${message.text}
			&reply_markup=${JSON.stringify(message.reply_markup)}
			&disable_web_page_preview=true
			&parse_mode=HTML
			`,
      );
      return response.data.result;
    } catch (error) {}
  }

  async sendPoll(message: SendPollMethod) {
    try {
      const response = await axios.get(
        `
			${process.env.SEND_POLL}
			chat_id=${message.chat_id}
			&question=${message.question}
			&options=${JSON.stringify(message.options)}
			&correct_option_id=${message.correct_option_id}
			&type=quiz
			&is_anonymous=${message.is_anonymous}
			`,
      );
      return response.data.result;
    } catch (error) {}
  }

  async editMessageCaption(message: EditMessageCaptionMethod) {
    try {
      const response = await axios.get(
        `
			${process.env.SEND_POLL}
			message_id=${message.message_id}
			&caption=${message.caption}
			&reply_markup=${JSON.stringify(message.reply_markup)}
			&disable_web_page_preview=true
			&parse_mode=HTML
			`,
      );
      return response.data.result;
    } catch (error) {}
  }

  async sendPhoto(message: SendPhotoMethod) {
    try {
      const response = await axios.get(
        `
			${process.env.SEND_PHOTO}
			chat_id=${message.chat_id}
			&caption=${message.caption}
			&photo=${message.photo}
			&reply_markup=${JSON.stringify(message.reply_markup)}
			&disable_web_page_preview=true
			&parse_mode=HTML
			`,
      );
      return response.data.result;
    } catch (error) {}
  }

  async editMessageReplyMarkup(message: editMessageReplyMarkupMethod) {
    try {
      const response = await axios.get(
        `
			${process.env.SEND_PHOTO}
			message_id=${message.message_id}
			&reply_markup=${JSON.stringify(message.reply_markup)}
			&disable_web_page_preview=true
			&parse_mode=HTML
			`,
      );
      return response.data.result;
    } catch (error) {}
  }

  async answerCallbackQuery(answerCallbackQuery: AnswerCallbackQueryMethod) {
    try {
      const response = await axios.get(
        `
			${process.env.SEND_ANSWER_CALLBACKQUERY}
			callback_query_id=${answerCallbackQuery.callback_query_id}
			&text=${answerCallbackQuery.text}
			&show_alert=true
			`,
      );
      return response.data.result;
    } catch (error) {}
  }

  async sendChatAction(chat: bigint, action: string) {
    try {
      const response = await axios.get(
        `
			${process.env.SEND_ACTION}
			chat_id=${chat}
			&action=${action}
			`,
      );
      return response.data;
    } catch (error) {}
  }
}
