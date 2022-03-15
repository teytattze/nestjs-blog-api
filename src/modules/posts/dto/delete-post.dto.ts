import { ApiProperty } from '@nestjs/swagger';

export class DeletePostSuccess {
  @ApiProperty({ required: true, type: 'string' })
  message: string;
}
