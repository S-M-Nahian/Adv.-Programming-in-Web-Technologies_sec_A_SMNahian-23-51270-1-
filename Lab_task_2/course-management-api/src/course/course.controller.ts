import { Controller, Get, Post, Put, Patch, Delete, Param, Body, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { CourseService } from './course.service.js';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { randomUUID } from 'crypto';

@Controller('course')
export class CourseController {
    constructor(private readonly courseService: CourseService) {}

    @Get()
    getAllCourses() {
        return this.courseService.getAllCourses();
    }

    @Get(':id')
    getCourseById(@Param('id') id: string) {
        return this.courseService.getCourseById(id);
    }

    @Post()
    createCourse(@Body() dto: CreateCourseDto) {
        return this.courseService.createCourse(dto);
    }

    @Put(':id')
    updateCourse(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
        return this.courseService.updateCourse(id, dto);
    }

    @Patch(':id')
    patchCourse(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
        return this.courseService.patchCourse(id, dto);
    }

    @Delete(':id')
    deleteCourse(@Param('id') id: string) {
        return this.courseService.deleteCourse(id);
    }

        @Post(':id/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './src/uploads',

        filename: (req, file, callback) => {
          const filename =
            `${Date.now()}-${randomUUID()}${extname(file.originalname).toLowerCase()}`;

          callback(null, filename);
        }
      }),

      fileFilter: (req, file, callback) => {
        const allowedExtensions = [
          '.jpg', '.jpeg', '.png', '.pdf'
        ];

        const extension = extname(file.originalname).toLowerCase();

        if (!allowedExtensions.includes(extension)) {
          return callback(
            new BadRequestException(
              'Only JPG, JPEG, PNG and PDF files are allowed'
            ),
            false
          );
        }

        callback(null, true);
      },

      limits: {
        fileSize: 2 * 1024 * 1024
      }
    })
  )
  uploadCourseMaterial(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    return this.courseService.UploadCourseMaterial(id, file);
  }
}
