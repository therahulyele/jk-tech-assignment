import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
// TODO: Create and implement PostsModule
import { PostsModule } from './posts/posts.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PostsModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}