import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Post } from 'src/modules/posts/posts.entity';
import { AccountRole } from '../accounts.enum';

export class RegisterAccountDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(48)
  firstName: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(48)
  lastName: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(48)
  username: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(AccountRole)
  role: AccountRole;
}

export class RegisterAccountSuccess {
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
