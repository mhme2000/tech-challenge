import {
  Controller,
  Get,
  Param,
  Inject,
  ParseUUIDPipe,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { IGetOrderByIdApplication } from 'src/core/Order/application/interfaces/getOrderById.interface';

@Controller('order')
export class OrderController {
  constructor(
    @Inject('IGetOrderByIdApplication')
    private getOrderByIdApp: IGetOrderByIdApplication,
  ) {}

  @Get('/:id')
  public async Get(
    @Res() res,
    @Param('id', new ParseUUIDPipe({ version: '4' })) orderId: string,
  ) {
    try {
      const order = await this.getOrderByIdApp.getOrderById(orderId);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: order,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: err,
      });
    }
  }
}