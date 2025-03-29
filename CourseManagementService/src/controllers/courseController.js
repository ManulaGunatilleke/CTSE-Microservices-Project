let Course = require("../models/course");
const authenticateRole = require("../middleware/authenticationRole");

//create new course
const createCourse = async (req, res) => {
    const { UserId, CourseName, CourseCode, Description, Instructor, Price, Image, Duration, VideoLink } = req.body;

    const newCourse = new Course({
        UserId,
        CourseName,
        CourseCode,
        Description,
        Instructor,
        Price,
        Image,
        Duration,
        VideoLink
    })
    //validations
    if (Price <= 0 || !Price === 'number') {
        return res.status(400).json({ message: 'Price must be a positive number!' })
    }
    if (!CourseName || !CourseCode || !Description || !Instructor || !Price || !Image || !Duration || !VideoLink) {
        return res.status(400).json({ message: 'All fields are required!' })
    }

    newCourse.save().then(() => {
        res.json("Course made successfully")
    }).catch((err) => {
        console.log(err);
    })

}

//view all courses by userId
const getAllCoursesByUserId = async (req, res) => {
    const UserId = req.params.id;

    try {
        const courses = await Course.find({ UserId: UserId });
        res.json(courses);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

//view all courses
const getAllCourses = async (req, res) => {
    try{
        const courses = await Course.find();
        res.json(courses);
    }catch(error){
        res.status(500).json({error: "Internal Server Error"});
    }
}

//update a course by id
const updateCourse = async (req, res) => {
    let courseId = req.params.id;
    const { CourseName, CourseCode, Description, Instructor, Price, Duration, VideoLink } = req.body;

    const updateCourse = {
        CourseName,
        CourseCode,
        Description,
        Instructor,
        Price,
        Duration,
        VideoLink
    }

    const update = await Course.findByIdAndUpdate(courseId, updateCourse).then(() => {
        res.status(200).send({ status: "Course successfully updated!" })
    }).catch((error) => {
        console.log(error);
        res.status(500).send({ status: "Course update unsuccessful, please try again...", error: error.message });
    })
}

//delete course by id
const deleteCourse = async (req, res) => {

    let courseId = req.params.id;

    await Course.findByIdAndDelete(courseId).then(() => {
        res.status(200).send({ status: "Course deleted!" });
    }).catch((error) => {
        console.log(error);
        res.status(500).send({ status: "Course deletion unsuccessful!", error: error.message });
    })
}

//view one specific course by id
const viewOneCourseById = async (req, res) => {
    let courseId = req.params.id;

    const course = await Course.findById(courseId).then((course) => {
        res.status(200).send({ course });
    }).catch((error) => {
        console.log(error);
        res.status(500).send({ status: "Error with fetching the course!", error: error.message });
    })
}

//search course
const searchCourse =
    async (req, resp) => {
        let result = await Course.find({
            "$or": [
                {
                    CourseName: { $regex: req.params.key }
                },
                {
                    CourseName: { $regex: req.params.key }
                },
                {
                    Instructor: { $regex: req.params.key }
                }
            ]
        });
        resp.send(result);
    }

module.exports = {
    createCourse,
    getAllCoursesByUserId,
    getAllCourses,
    updateCourse,
    deleteCourse,
    viewOneCourseById,
    searchCourse
};