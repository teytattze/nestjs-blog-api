import { BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import {
  DeleteResult,
  EntityRepository,
  Repository,
  UpdateResult,
} from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './posts.entity';
import { postErrors } from './posts.error';

@EntityRepository(Post)
export class PostsRepository extends Repository<Post> {
  private readonly logger = new Logger(PostsRepository.name);

  async getAllPosts() {
    try {
      return await this.find();
    } catch (err) {
      this.logger.error(err);
      throw new NotFoundException(postErrors.NOT_FOUND);
    }
  }

  async getPostById(id: string) {
    try {
      return await this.findOne(id);
    } catch (err) {
      this.logger.error(err);
      throw new NotFoundException(postErrors.NOT_FOUND);
    }
  }

  async createPost(data: CreatePostDto) {
    try {
      const post = await this.create({ ...data });
      await this.save(post);
      return post;
    } catch (err) {
      this.logger.error(err);
      throw new BadRequestException(postErrors.CREATE_FAIL);
    }
  }

  async updatePostById(id: string, data: UpdatePostDto): Promise<UpdateResult> {
    try {
      return await this.update(id, { ...data });
    } catch (err) {
      this.logger.error(err);
      throw new BadRequestException(postErrors.UPDATE_FAIL);
    }
  }

  async deletePostById(id: string): Promise<DeleteResult> {
    try {
      return await this.delete(id);
    } catch (err) {
      this.logger.error(err);
      throw new BadRequestException(postErrors.DELETE_FAIL);
    }
  }
}
