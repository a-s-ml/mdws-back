import { Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { Body, Controller, Post } from '@nestjs/common';
import { ControllerAuthGuard } from './controller-auth.guard';
import { JoinChatFields, RequestWithAuth } from './types';
import { Prisma } from '@prisma/client';
import { ChatService } from './chat.service';

@UsePipes(new ValidationPipe())
@Controller('chats')
export class ChatController {
  constructor(private chatService: ChatService) {}

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
