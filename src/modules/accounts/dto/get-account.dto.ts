import { ApiProperty } from '@nestjs/swagger';
import { Post } from 'src/modules/posts/posts.entity';
import { AccountRole } from '../accounts.enum';

export class GetAccountSuccess {
  @ApiProperty({ required: true, type: 'string' })
  firstName: string;

  @ApiProperty({ required: true, type: 'string' })
  lastName: string;

  @ApiProperty({ required: true, type: 'string' })
  username: string;

  @ApiProperty({ required: true, type: 'string' })
  email: string;

  @ApiProperty({ required: false, type: 'string' })
  password: string;

  @ApiProperty({ required: true, enum: AccountRole })
  role: AccountRole;

  @ApiProperty({ required: true, type: 'boolean' })
  verified: boolean;

  @ApiProperty({ required: true, isArray: true, type: Post })
  posts: Post[];

  @ApiProperty({ required: true, type: 'string', format: 'date-time' })
  createdAt: string;

  @ApiProperty({ required: true, type: 'string', format: 'date-time' })
  updatedAt: string;
}
