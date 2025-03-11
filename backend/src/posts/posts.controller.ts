import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(@Req() req, @Body() data: { title: string; content: string }) {
    return this.postsService.createPost(req.user.userId, data.title, data.content);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getPosts(@Req() req) {
    return this.postsService.getPosts(req.user.userId);
  }

  @Get(':id')
  async getPost(@Param('id') id: string) {
    return this.postsService.getPost(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updatePost(
    @Param('id') id: string,
    @Req() req,
    @Body() data: { title?: string; content?: string },
  ) {
    return this.postsService.updatePost(id, req.user.userId, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePost(@Param('id') id: string, @Req() req) {
    return this.postsService.deletePost(id, req.user.userId);
  }
}