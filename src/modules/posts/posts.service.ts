import { NotFoundException } from '@nestjs/common';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { postErrors } from './posts.error';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async getAllPosts() {
    const posts = await this.postsRepository.getAllPosts();
    if (posts) {
      return posts;
    }
    throw new NotFoundException(postErrors.NOT_FOUND);
  }

  async getPostById(id: string) {
    const post = await this.postsRepository.getPostById(id);
    if (post) {
      return post;
    }
    throw new NotFoundException(postErrors.NOT_FOUND);
  }

  async createPost(data: CreatePostDto) {
    const post = await this.postsRepository.createPost(data);
    if (post) {
      return post;
    }
    throw new BadRequestException(postErrors.CREATE_FAIL);
  }

  async updatePostById(id: string, data: UpdatePostDto) {
    const result = await this.postsRepository.updatePostById(id, data);
    if (result.affected === 0) {
      throw new BadRequestException(postErrors.UPDATE_FAIL);
    }
    const updatedPost = await this.postsRepository.getPostById(id);
    return updatedPost;
  }

  async deletePostById(id: string) {
    const result = await this.postsRepository.deletePostById(id);
    if (result.affected === 0) {
      throw new BadRequestException();
    }
    return { message: `Post ${id} deleted successfully` };
  }
}
