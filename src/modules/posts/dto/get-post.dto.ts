import { ApiProperty } from '@nestjs/swagger';

export class GetPostSuccess {
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
