import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto, CreatePostSuccess } from './dto/create-post.dto';
import { DeletePostSuccess } from './dto/delete-post.dto';
import { GetPostSuccess } from './dto/get-post.dto';
import { GetPostsSuccess } from './dto/get-posts.dto';
import { UpdatePostDto, UpdatePostSuccess } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OK',
    isArray: true,
    type: GetPostsSuccess,
  })
  @Get()
  async getAllPosts() {
    return await this.postsService.getAllPosts();
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OK',
    type: GetPostSuccess,
  })
  @Get('/:id')
  async getPostById(@Param('id') id: string) {
    return await this.postsService.getPostById(id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OK',
    type: CreatePostSuccess,
  })
  @HttpCode(HttpStatus.OK)
  @Post('/create')
  async createPost(@Body() body: CreatePostDto) {
    return await this.postsService.createPost(body);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OK',
    type: UpdatePostSuccess,
  })
  @Patch('/update/:id')
  async updatePostById(@Body() body: UpdatePostDto, @Param('id') id: string) {
    return await this.postsService.updatePostById(id, body);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OK',
    type: DeletePostSuccess,
  })
  @Delete('/delete/:id')
  async deletePostById(@Param('id') id: string) {
    return await this.postsService.deletePostById(id);
  }
}
