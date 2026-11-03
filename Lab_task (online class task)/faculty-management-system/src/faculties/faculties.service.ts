import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Faculty } from './entities/faculties.entity.js';
import { CreateFacultyDto } from './dto/create-faculty.dto.js';

@Injectable()
export class FacultiesService {
  constructor(
    @InjectRepository(Faculty)
    private readonly repo: Repository<Faculty>,
  ) {}

    async create(createFacultyDto: CreateFacultyDto): Promise<Faculty> {
      const faculty = this.repo.create(createFacultyDto);
      if (!faculty) {
        throw new BadRequestException('Failed to create faculty');
      }
      else
        {
            return this.repo.save(faculty);
        }
      
    }
}
