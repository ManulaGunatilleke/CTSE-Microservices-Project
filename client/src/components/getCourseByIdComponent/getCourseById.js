import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import useViewCourseById from "../../hooks/useViewCourseById";
import UserContext from "../../ContextComponent/ContextComponent";

function ViewCourse() {
    const { user } = useContext(UserContext);
    const userId = user._id;

    const { id } = useParams();
    const { course, error, viewOneCourseById } = useViewCourseById();

    useEffect(() => {
        if (id) {
            viewOneCourseById(id);
        }
    }, [id, viewOneCourseById]);

    return (
        <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-3xl font-bold text-white text-center my-6">{course ? course.CourseName : "View Course"}</h1>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex">
                <div className="w-1/2 p-6">
                    {error && <p className="text-red-500">Error: {error}</p>}
                    {course && (
                        <div>
                            <h2 className="text-2xl font-bold mb-2">{course.CourseName}</h2>
                            <p><strong>Course Code:</strong> {course.CourseCode}</p>
                            <p><strong>Description:</strong> {course.Description}</p>
                            <p><strong>Instructor:</strong> {course.Instructor}</p>
                            <p><strong>Price:</strong> {course.Price}</p>
                            <p><strong>Duration:</strong> {course.Duration}</p>
                        </div>
                    )}
                </div>
                <div className="w-1/2">
                    {course && (
                        <img src={course.Image} alt={course.CourseName} className="h-full w-full object-cover" />
                    )}
                </div>
            </div>
            <div className="viewCourseButtonDiv flex justify-center mt-4">
                <button className="px-4 py-2 bg-orange-500 hover:bg-gray-500 text-white font-semibold rounded mr-2" onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `/getCourses`;
                }}>
                    Back to Courses
                </button>
                <button className="px-4 py-2 bg-green-500 hover:bg-gray-500 text-white font-semibold rounded mr-2" onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `/updateCourse/${course._id}`;
                }}>
                    Update Course
                </button>
            </div>
        </div>
    );
}

export default ViewCourse;
