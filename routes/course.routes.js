import { Router } from "express";
import { getCourses, createCourse, updateCourse, getCourseById, deleleCourse } from '../controllers/course.controllers.js';

const router = Router();

// router.get('/', showLogin);

// router.post('/login', loginPost);

// router.get('/node-course', showCoursePage);

router.get('/', getCourses);

router.post('/', createCourse);

router.patch('/:courseId', updateCourse);

router.get('/:courseId', getCourseById);

router.delete('/:courseId', deleleCourse);

export default router;