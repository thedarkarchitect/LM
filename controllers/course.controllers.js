import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();


const getCourses = async (req, res) => {
  const allCourses = await prisma.course.findMany()
    res.json({
      status: "success",
      count: allCourses.length,
      data: {
        courses : allCourses
      }
    });
};

const createCourse = async (req, res) => {
    // const generateId = courses[courses.length - 1]._id + 1;
    // const time = timeStamp.utc()
  
    // const newCourse = Object.assign({_id: generateId}, req.body, {createdAt: time})
    // console.log(newCourse) //check if works

   try{ 
    const newCourse = await prisma.course.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        instructor: req.body.instructor,
        price: req.body.price
      }
    });
    res.json({
      message: 'Course added successfully',
      data: newCourse
    });
  }catch(e){
    console.log(e);
    res.status(500).json(
      {message: 'Course not added!'}
    );
  }

  
    // courses.push(newCourse);
  
    // fs.writeFile('./model/data.json', JSON.stringify(courses), () => {
    //   res.status(200).json({
    //     status: "success",
    //     data: {
    //       courses: newCourse
    //     }
    //   })
    // })
};

const updateCourse = async (req, res) => {
    let id = +req.params.courseId;//changing it to a number
    // let updateCourse = courses.find((course) => course._id === id);
    // let index = courses.indexOf(updateCourse);//needs to change
    
    // Object.assign(updateCourse, req.body); //this will merge and update the targeted item in the json
  
    // courses[index] = updateCourse; //after merging individual item we replace it in the whole array using index
    const { title, description, instructor, price } = req.body;
    try{
      const updatedCourse = await prisma.course.update({
        where: { id: id },
        data: {
          title: title,
          description: description,
          instructor: instructor,
          price: price
        }
      });

      res.json({
        message: 'Course updated!',
        data: updatedCourse
      });
    }catch(e){
      console.log(e);
      res.json({ message: 'failed to update course!' });
    };

    // fs.writeFile('./model/data.json', JSON.stringify(courses), () => {
    //   res.status(200).json({
    //     status: "success",
    //     count: courses.length,
    //     data: {
    //       courses: updateCourse
    //     }
    //   })
    // })
};

const getCourseById = async (req, res) => {
    let id = +req.params.courseId;//changing it to a number
    // let courseById = courses.find((course) => course._id === id);

    try{
      const courseById = await prisma.course.findUnique({
        where:{
          id: id
        }
      });
      res.json({ message: 'Course has been returned by id provided', data: courseById });
    }catch(e){
      console.log(e);
      res.json({ message: 'Course is not shown by the id provided!' });
    }
  
    // fs.readFile('./model/data.json', 'utf8', () => {
    //   res.status(200).json({
    //     status: "success",
    //     count: courses.length,
    //     data: {
    //       courses : courseById
    //     }
    //   })
    // })
};

const deleleCourse = async (req, res) => {
    const id = +req.params.courseId; //changing it to a number
    // console.log(id)
    // const courseDeleted = courses.find((course) => { 
    //    if(course._id === id) {
    //     return course
    //    } else {
    //     return null
    //    }
    //   });   
    // console.log(courseDeleted) 
    // const index = courses.indexOf(courseDeleted)
    // console.log(index)

    try{
      const deletedById = await prisma.course.delete({
        where: {
          id: id
        }
      });
      res.json({ message: 'Deleted Successfully!', data: deletedById });
    }catch(e){
      console.log(e);
      res.json({ message: 'Not Deleted!' });
    }
  
    // if(index != -1){
    //   courses.splice(index, 1)
      
    //   res.send("Course deleted.")
    // } else {
      
    //   fs.writeFile('./model/data.json', JSON.stringify(courses), () => {
    //     res.status(200).json({ //204 meaning no content found
    //         status: "success",
    //         count: courses.length,
    //         data: {
    //           courses: courses
    //         }
    //     })
    //   })
    // };
    
};

export {
  getCourses,
  createCourse,
  updateCourse,
  getCourseById,
  deleleCourse
}