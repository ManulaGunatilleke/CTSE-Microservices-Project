import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import UserContext from '../../ContextComponent/ContextComponent';

const SearchBar = () => {
    const { user } = useContext(UserContext); 
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [enrollmentStatus, setEnrollmentStatus] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        getCourses();
    }, []);

    useEffect(() => {
        const fetchEnrollmentStatus = async () => {
            const status = {};
            for (const course of courses) {
                const isEnrolled = await checkEnrollment(course._id);
                status[course._id] = isEnrolled;
            }
            setEnrollmentStatus(status);
        };
        fetchEnrollmentStatus();
    }, [courses]);

    const getCourses = async () => {
        try {
            const response = await axios.get(`http://localhost:8800/CourseManagementService/course/publishedCourses`);
            if (response.status === 200) {
                setCourses(response.data);
            }
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    }

    const enrollCourse = (courseId) => {
        navigate(`/order-summary?courseId=${courseId}`);
    }

    const checkEnrollment = async (courseId) => {
        try {
            console.log("Checking enrollment for courseId:", courseId);
            const response = await fetch(`http://localhost:8800/EnrollmentManagementService/enrollment/user/${user._id}/course/${courseId}`);
            console.log("Status code for courseId", courseId, ":", response.status);
            return response.status === 200; // Returns true if enrolled, false otherwise
        } catch (error) {
            console.error("Error checking enrollment:", error);
            return false;
        }
    }

    const renderCourses = () => {
        return courses.map((course, index) => {
            const isEnrolled = enrollmentStatus[course._id];

            return (
                <div key={index} className="w-1/5 p-4">
                    <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-6">
                        <h2 className="text-base font-bold text-center pb-3">{course.CourseName}</h2>
                        <img className="ViewAllCoursesImage pb-2" src={course.Image} alt={course.CourseName} />
                        <p className="text-base font-bold text-center text-black">Instructor: {course.Instructor}</p>
                        <p className="text-sm text-gray-600 text-center">{course.CourseCode}</p>
                        <div className="flex justify-center items-center">
                            <p className="text-2xl font-bold text-gray-600 mr-8">${course.Price}</p>
                            <p className="text-2xl font-bold text-gray-600">{course.Duration} hrs.</p>
                        </div>
                        <div className="button-container">
                            <button onClick={() => enrollCourse(course._id)} disabled={isEnrolled} className={`mt-4 ${isEnrolled ? 'bg-gray-400' : 'bg-orange-500 hover:bg-blue-600'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}>
                                {isEnrolled ? 'Enrolled' : 'Enroll Course'}
                            </button>
                        </div>
                    </div>
                </div>
            );
        });
    };

    return (
        <div>
            <h1 className='font-bold pb-4 text-4xl text-center'>View All Courses</h1>
            <p className='text-center'>View All Courses of manage and explore the wide variety of the courses available for your learning needs and conquer the world with your knowledge.</p>
            <div className="searchCourseDiv flex justify-center items-center mt-8">
                <div className="relative">
                    <input
                        type="text"
                        className="py-2 px-4 pr-12 border border-gray-300 rounded-l focus:outline-none focus:border-blue-500 w-96"
                        placeholder="Search for courses"
                        onChange={(event) => setSearchTerm(event.target.value)}
                    />
                </div>
            </div>
            <div className="mt-8 flex flex-wrap">
                {renderCourses()}
            </div>
        </div>
    );
};

export default SearchBar;
