import { Get, Param, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { Body, Controller, Post } from '@nestjs/common';
import { ControllerAuthGuard } from './controller-auth.guard';
import { Prisma } from '@prisma/client';
import { ChatService } from './chat.service';
import { JoinChatFields, RequestWithAuth } from 'src/types/types';

@UsePipes(new ValidationPipe())
@Controller('chats')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get('validateUser/:initData')
  initData(@Param('initData') initData: string) {
    return this.chatService.validateUser(initData);
  }

  @Get('messages/:chat')
  messages(@Param('chat') chat: number) {
    return this.chatService.getMessages(+chat);
  }

  @Get('users/:id')
  users(@Param('id') id: number) {
    return this.chatService.userFindById(+id);
  }

  @Post()
  async create(@Body() createPollDto: Prisma.chatCreateInput) {
    return await this.chatService.createChat(createPollDto);
  }

  @Post('/join')
  async join(@Body() joinPollDto: JoinChatFields) {
    return await this.chatService.joinChat(joinPollDto);
  }

  @UseGuards(ControllerAuthGuard)
  @Post('/rejoin')
  async rejoin(@Req() request: RequestWithAuth) {
    const { user, chat } = request;
    return await this.chatService.rejoinChat({
      chat,
      user,
    });
  }
}
