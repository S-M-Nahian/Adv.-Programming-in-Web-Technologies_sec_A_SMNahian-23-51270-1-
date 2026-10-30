import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entities/products.entities.js';
import { Repository, ILike } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PartialUpdateProductDto } from './dto/partial-update-product.dto.js';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productRepo: Repository<Products>,
  ) {}

  async create(product: CreateProductDto): Promise<Products> {
    const newProduct = this.productRepo.create(product);
    return this.productRepo.save(newProduct);
  }

  async findAll(): Promise<Products[]> {
    return this.productRepo.find({order:{ createdAt: 'DESC'}});
  }

  async findOne(id: number): Promise<Products | null | string> {
    const product = await this.productRepo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    else
        {
            return `Product with id ${id} found successfully.`;;
        } 
  }

  async update(id: number, product: PartialUpdateProductDto): Promise<undefined | Products | string>
  {
    try
    {
        const res = (await this.productRepo.update(id, product)).affected;
        if(res != undefined && res > 0)
            {
                return `Product with id ${id} updated successfully.`;
            }
            else
                {
                    return `Product with id ${id} not found.`;
                }
    }
    catch(error)
    {
        throw new BadRequestException('Product not found');
    }
  }

  async replace(id: number, product: UpdateProductDto): Promise<undefined | Products | string>
  {
    try
    {
        const res = (await this.productRepo.update(id, product)).affected;
        if(res != undefined && res > 0)
            {
                return `Product with id ${id} updated successfully.`;
            }
            else
                {
                    return `Product with id ${id} not found.`;
                }
    }
    catch(error)
    {
        throw new BadRequestException('Product not found');
    }
  }

    async remove(id: number): Promise<string> 
    {
        const res = (await this.productRepo.delete(id)).affected;
        if(res != null && res > 0)
            {
                return `Product with id ${id} deleted successfully;`
            }
        else
            {
                throw new NotFoundException(`Product with id ${id} not found`);
            }
    }

    async findByCategory(category: string): Promise<Products[]> 
    {
        return await this.productRepo.findBy({ category });
    }

    async search(keyword: string): Promise<Products[]>
    {
        return await this.productRepo.find({ where: { name: ILike(`%${keyword}%`) } });
    }

    async toggleActive(id: number): Promise<string>
    {
        const product = await this.productRepo.findOneBy({ id });
        if (!product) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }
        product.isActive = !product.isActive;
        await this.productRepo.save(product);
        return `Product with id ${id} is now ${product.isActive ? 'active' : 'inactive'}.`;
    }
    
}