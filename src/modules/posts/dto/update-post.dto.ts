import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { ToBoolean } from 'src/utils/to-boolean.util';

export class UpdatePostDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  content: string;

  @ApiProperty()
  @IsOptional()
  @ToBoolean()
  published: boolean;
}

export class UpdatePostSuccess {
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
