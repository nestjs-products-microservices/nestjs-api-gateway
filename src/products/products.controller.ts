import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';
import { NATS_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.client.send({ cmd: 'create_product' }, createProductDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.client.send({ cmd: 'find_all_products' }, paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.client.send({ cmd: 'find_one_product' }, { id }).pipe(
      catchError((err: string | object) => {
        throw new RpcException(err);
      }),
    );
    // try {
    //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    //   const product = await firstValueFrom(
    //     this.client.send({ cmd: 'find_one_product' }, { id }),
    //   );
    //   // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    //   return product;
    // } catch (error) {
    //   throw new RpcException(error as object);
    // }
  }
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.client
      .send({ cmd: 'update_product' }, { ...updateProductDto, id })
      .pipe(
        catchError((err: string | object) => {
          throw new RpcException(err);
        }),
      );
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.client.send({ cmd: 'delete_product' }, { id }).pipe(
      catchError((err: string | object) => {
        throw new RpcException(err);
      }),
    );
  }
}
