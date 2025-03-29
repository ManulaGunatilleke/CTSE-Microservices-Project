import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../updateCourseComponent/updateCourse.css";

export default function UpdateCourse() {

    const [CourseName, setCourseName] = useState("");
    const [CourseCode, setCourseCode] = useState("");
    const [Description, setDescription] = useState("");
    const [Instructor, setInstructor] = useState("");
    const [Price, setPrice] = useState("");
    const [Duration, setDuration] = useState("");
    const [Image, setImage] = useState("");
    const [VideoLink, setVideoLink] = useState("");

    const params = useParams();

    // Fetch token from localStorage
    const token = localStorage.getItem("token");

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    useEffect(() => {
        getCourseDetails();
    }, [])

    const getCourseDetails = async () => {
        let result = await fetch(`http://localhost:8800/CourseManagementService/course/getCourse/${params.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        result = await result.json();

        setCourseName(result.course.CourseName);
        setCourseCode(result.course.CourseCode);
        setDescription(result.course.Description);
        setInstructor(result.course.Instructor);
        setPrice(result.course.Price);
        setDuration(result.course.Duration);
        setImage(result.course.Image);
        setVideoLink(result.course.VideoLink);
    }

    const updateCourseDetails = async () => {
        let result = await fetch(`http://localhost:8800/CourseManagementService/course/updateCourse/${params.id}`, {
            method: 'Put',
            body: JSON.stringify({ CourseName, CourseCode, Description, Instructor, Price, Duration, Image, VideoLink }),
            headers: headers
        });
        console.log(result);
        result = await result.json();

        if (result) {
            alert("Course Updated Successfully!")
            window.location.href = `/getCourses`;
        }

    }

    return (
        <div>
            <div className="updateImageDiv">
                <h1 className="text-center text-white font-bold text-xl pb-2">Course :</h1>
                <img src={Image} className="updateCourseImage" />
            </div>
            <section className="createCourseSection bg-orange-200 rounded-lg">
                <div className="flex flex-col items-center justify-center px-0 py-8">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <form className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="courseName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course name</label>
                                    <input type="text" name="coursename" id="courseName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={CourseName} onChange={(e) => {
                                        setCourseName(e.target.value);
                                    }} required />
                                </div>
                                <div>
                                    <label htmlFor="courseCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your course code</label>
                                    <input type="text" name="coursecode" id="coursecode" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter a valid code for your course" value={CourseCode} onChange={(e) => {
                                        setCourseCode(e.target.value);
                                    }} required />
                                </div>
                                <div>
                                    <label htmlFor="courseDescription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Description</label>
                                    <textarea name="courseDescription" id="courseDescription" className="createCourseTextArea bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter course description" value={Description} onChange={(e) => {
                                        setDescription(e.target.value);
                                    }} required></textarea>
                                </div>
                                <div>
                                    <label htmlFor="instructor" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Instructor Name</label>
                                    <input type="text" name="coursecode" id="coursecode" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter the course instructor's name" value={Instructor} onChange={(e) => {
                                        setInstructor(e.target.value);
                                    }} required />
                                </div>
                                <div>
                                    <label htmlFor="videolink" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Video Link</label>
                                    <input type="text" name="coursecode" id="coursecode" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter the course video link" value={VideoLink} onChange={(e) => {
                                        setVideoLink(e.target.value);
                                    }} required />
                                </div>
                                <div className="flex justify-between">
                                    <div className="w-1/2 mr-2">
                                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price (in $)</label>
                                        <input type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter the price" value={Price} onChange={(e) => {
                                            setPrice(e.target.value);
                                        }} required />
                                    </div>
                                    <div className="w-1/2 ml-2">
                                        <label htmlFor="duration" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Duration (in hours)</label>
                                        <input type="number" name="duration" id="duration" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter the duration" value={Duration} onChange={(e) => {
                                            setDuration(e.target.value);
                                        }} required />
                                    </div>
                                </div>
                                <button type="button" onClick={updateCourseDetails} className="w-full text-white bg-orange-500 hover:bg-gray-300 hover:text-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Update Course</button>
                                <button type="button" onClick={(e) => {
                                    e.preventDefault();
                                    window.location.href = `/getCourses`;
                                }} className="w-full text-white bg-green-500 hover:bg-gray-300 hover:text-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Back to Courses</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
