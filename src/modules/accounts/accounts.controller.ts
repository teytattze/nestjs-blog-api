import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  RegisterAccountDto,
  RegisterAccountSuccess,
} from './dto/register-account.dto';
import { GetAccountSuccess } from './dto/get-account.dto';
import { GetAccountsSuccess } from './dto/get-accounts.dto';
import { AccountsService } from './accounts.service';
import { DeleteAccountSuccess } from './dto/delete-account.dto';

@ApiTags('Accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OK',
    isArray: true,
    type: GetAccountsSuccess,
  })
  @Get()
  async getAllAccounts() {
    return await this.accountsService.getAllAccounts();
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OK',
    type: GetAccountSuccess,
  })
  @Get('/:id')
  async getAccountById(@Param('id') id: string) {
    return await this.accountsService.getAccountById(id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OK',
    type: RegisterAccountSuccess,
  })
  @HttpCode(HttpStatus.OK)
  @Post('/register')
  async registerAccount(@Body() body: RegisterAccountDto) {
    return await this.accountsService.registerAccount(body);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OK',
    type: DeleteAccountSuccess,
  })
  @HttpCode(HttpStatus.OK)
  @Delete('/delete/:id')
  async deleteAccountById(@Param('id') id: string) {
    return await this.accountsService.deleteAccountById(id);
  }
}
