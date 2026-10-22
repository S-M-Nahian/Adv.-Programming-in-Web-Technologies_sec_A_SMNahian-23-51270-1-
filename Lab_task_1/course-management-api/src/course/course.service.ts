import { Injectable } from '@nestjs/common';

@Injectable()
export class CourseService {
    getAllCourses() {
    return 'All Courses are available.';
  }

  getCourseById(id: string) {
    return `Course found with course ID: ${id}`;
  }

  createCourse() {
    return 'New Course Created';
  }

  updateCourse(id: string) {
    return `Course with ID: ${id} updated successfully`;
  }

  patchCourse(id: string) {
    return `Course with ID: ${id} partially updated successfully`;
  }

  deleteCourse(id: string) {
    return `Course with ID: ${id} deleted successfully`;
  }
}
