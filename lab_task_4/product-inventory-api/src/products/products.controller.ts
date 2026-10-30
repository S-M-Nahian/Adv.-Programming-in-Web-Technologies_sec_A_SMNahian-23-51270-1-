import { Controller, Get, Post, Patch, Body, Put, Delete, ParseIntPipe, Query, Param } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PartialUpdateProductDto } from './dto/partial-update-product.dto.js';
import { Products } from './entities/products.entities.js';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
   async create(@Body() product: CreateProductDto): Promise<Products>
  {
    return await this.productsService.create(product);
  }

  @Get()
  async allPorducts(): Promise<Products []>
  {
    return await this.productsService.findAll();
  }
  @Get('search')
  async searchProducts(@Query('keyword') keyword: string): Promise<Products[]>
  {
    return await this.productsService.search(keyword);
  }

  @Get('category/:cat')
  async findByCategory(@Param('cat') category: string): Promise<Products[]>
  {
    return await this.productsService.findByCategory(category);
  }

  @Get(':id')
  async productById(@Param('id', ParseIntPipe) id: number)
  {
    return await this.productsService.findOne(id);
  }

  @Patch(':id')
  async patchProduct(@Param('id', ParseIntPipe) id: number, @Body() prod: PartialUpdateProductDto)
  {
    return await this.productsService.update(id, prod);
  }

  @Put(':id')
  async updateProduct(@Param('id', ParseIntPipe) id: number, @Body() prod: UpdateProductDto)
  {
    return await this.productsService.replace(id, prod);
  }

  @Delete(':id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number)
  {
    return await this.productsService.remove(id);
  }

  @Patch(':id/toggle')
  async toggle(@Param('id', ParseIntPipe) id: number)
  {
    return await this.productsService.toggleActive(id);
  }
  
}
