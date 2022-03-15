import { ApiProperty } from '@nestjs/swagger';

export class DeleteAccountSuccess {
  @ApiProperty({ required: true, type: 'string' })
  message: string;
}
