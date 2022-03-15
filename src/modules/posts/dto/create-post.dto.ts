import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { ToBoolean } from 'src/utils/to-boolean.util';

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  title: string;

  @ApiProperty()
  @IsString()
  @MinLength(10)
  content: string;

  @ApiProperty()
  @ToBoolean()
  published: boolean;
}

export class CreatePostSuccess {
  @ApiProperty({ required: true, type: 'string' })
  id: string;

  @ApiProperty({ required: true, type: 'string' })
  title: string;

  @ApiProperty({ required: true, type: 'string' })
  content: string;

  @ApiProperty({ required: true, type: 'boolean' })
  published: boolean;

  @ApiProperty({ required: true, type: 'string', format: 'date-time' })
  createdAt: string;

  @ApiProperty({ required: true, type: 'string', format: 'date-time' })
  updatedAt: string;
}
