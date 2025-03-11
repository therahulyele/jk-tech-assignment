import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async createPost(authorId: string, title: string, content: string) {
    return this.prisma.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });
  }

  async getPosts(authorId: string) {
    return this.prisma.post.findMany({
      where: {
        authorId,
      },
      include: {
        author: true,
      },
    });
  }

  async getPost(id: string) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return post;
  }

  async updatePost(id: string, authorId: string, data: { title?: string; content?: string }) {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!post || post.authorId !== authorId) {
      throw new NotFoundException(`Post not found or unauthorized`);
    }

    return this.prisma.post.update({
      where: { id },
      data,
    });
  }

  async deletePost(id: string, authorId: string) {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!post || post.authorId !== authorId) {
      throw new NotFoundException(`Post not found or unauthorized`);
    }

    return this.prisma.post.delete({
      where: { id },
    });
  }
}