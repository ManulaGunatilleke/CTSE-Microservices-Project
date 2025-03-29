import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import UserContext from '../../ContextComponent/ContextComponent';

const UserEnrollments = () => {
    const { user } = useContext(UserContext); 
    const [enrollments, setEnrollments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getUserEnrollments();
    }, []);

    const getUserEnrollments = async () => {
        try {
            console.log("User: ",user._id);
            const response = await axios.get(`http://localhost:8800/EnrollmentManagementService/enrollment/user/${user._id}`);
            if (response.status === 200) {
                setEnrollments(response.data);
                fetchEnrolledCourses(response.data);
            }
        } catch (error) {
            console.error("Error fetching enrollments:", error);
        }
    }

    const fetchEnrolledCourses = async (enrollments) => {
        try {
            console.log("enrollments",enrollments);
            
            const courseIds = enrollments.map(enrollment => enrollment.courseId);
            const promises = courseIds.map(courseId =>
                axios.get(`http://localhost:8800/CourseManagementService/course/getCourse/${courseId}`)
            );
            console.log("enrollments",enrollments);
            const responses = await Promise.all(promises);
            const courses = responses.map(response => response.data);
            setEnrolledCourses(courses);
            console.log("courses",courses);
        } catch (error) {
            console.error("Error fetching enrolled courses:", error);
        }
    }

    const enrollCourse = (courseId) => {
        navigate(`/coursePage/${courseId}`);
    }


    
    const renderEnrollments = () => {
        return enrollments.map((enrollment, index) => {
            const course = enrolledCourses[index];
            console.log("EC:", enrolledCourses[index]); // Get the corresponding course
            console.log("Course:", course);
            if (!course) return null; // Check if course is not defined, return null
    
            return (
                <div key={index} className="w-1/5 p-4">
                    <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-6">
                        <h2 className="text-base font-bold text-center pb-3">Enrollment</h2>
                        <p className="text-base font-bold text-center text-black">{enrollment.additionalInfo}</p>
                        <p className="text-base text-center">Enrollment Date: {new Date(enrollment.enrollmentDate).toLocaleDateString()}</p>
                        <p className="text-base text-center">Status: {enrollment.status}</p>
                        <div className="mt-4">
                            {/* <h2 className="text-base font-bold text-center pb-3">Course</h2>
                            {course.Image && (
                                <img className="ViewAllCoursesImage pb-2" src={course.Image} alt={course.CourseName} />
                            )}
                            <p className="text-base font-bold text-center text-black">{course.CourseName}</p>
                            <div className="flex justify-center items-center">
                                <p className="text-2xl font-bold text-gray-600 mr-8">${course.Price}</p>
                                <p className="text-2xl font-bold text-gray-600">{course.Duration} hrs.</p>
                            </div> */}
                            <div className="button-container">
                                <button onClick={() => enrollCourse(enrollment.courseId)} className="mt-4 bg-orange-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    View course
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    };
    

    return (
        <div>
            <h1 className='font-bold pb-4 text-4xl text-center'>View All Enrollments</h1>
            <p className='text-center'>View All Enrollments to manage and explore the wide variety of the courses available for your learning needs and conquer the world with your knowledge.</p>
            <div className="searchCourseDiv flex justify-center items-center mt-8">
                <div className="relative flex items-center">
                    <input
                        type="text"
                        className="py-2 px-4 pr-12 border border-gray-300 rounded-l focus:outline-none focus:border-blue-500 w-96"
                        placeholder="Search for courses"
                        onChange={(event) => setSearchTerm(event.target.value)}
                    />
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-l-none focus:outline-none focus:shadow-outline">
                        Search
                    </button>
                </div>
            </div>
            <div className="mt-8 flex flex-wrap">
                {renderEnrollments()}
            </div>
        </div>
    );
};

export default UserEnrollments;
