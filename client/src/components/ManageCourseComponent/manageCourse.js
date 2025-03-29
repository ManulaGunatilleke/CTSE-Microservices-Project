import React from 'react';
import "../searchCourseComponent/searchCourse.css";
import useManageCourse from '../../hooks/useManageCourse';

const SearchBar = () => {
    const { courses, searchTerm, searchCourse, deleteCourse } = useManageCourse();

    const handleDeleteCourse = async (courseId) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            await deleteCourse(courseId);
        }
    };

    const renderCourses = () => {
        return courses.map((course, index) => (
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
                        <button className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={() => handleDeleteCourse(course._id)}>
                            Delete Course
                        </button>
                    </div>

                </div>
            </div>

        ));
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
                        onChange={(e) => searchCourse(e.target.value)}
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
