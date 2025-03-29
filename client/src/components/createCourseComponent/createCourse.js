import React, { useState, useContext } from "react";
import "../createCourseComponent/createCourse.css";
import useCreateCourse from "../../hooks/useCreateCourse";
import UserContext from "../../ContextComponent/ContextComponent";

export default function CreateCourse() {

    const { user } = useContext(UserContext);
    const userId = user._id;

    const { createCourse } = useCreateCourse();

    const [courseName, setCourseName] = useState("");
    const [courseCode, setCourseCode] = useState("");
    const [description, setDescription] = useState("");
    const [instructor, setInstructor] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const [duration, setDuration] = useState("");
    const [link, setLink] = useState("");

    const submitCourse = async (e) => {
        console.log("hello");
        e.preventDefault();
        try {
            await createCourse(userId,courseName, courseCode, description, instructor, price, image, duration, link);

            if(createCourse){
                window.location.href = `/getCourses`;
            }
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div>
            <section className="createCourseSection bg-orange-200 rounded-lg">
                <div className="flex flex-col items-center justify-center px-0 py-8">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <form className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="courseName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course name</label>
                                    <input type="text" name="coursename" id="courseName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your course name" onChange={(e) => {
                                        setCourseName(e.target.value);
                                    }} required />
                                </div>
                                <div>
                                    <label htmlFor="courseCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your course code</label>
                                    <input type="text" name="coursecode" id="coursecode" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter a valid code for your course" onChange={(e) => {
                                        setCourseCode(e.target.value);
                                    }} required />
                                </div>
                                <div>
                                    <label htmlFor="courseDescription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Description</label>
                                    <textarea name="courseDescription" id="courseDescription" className="createCourseTextArea bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter course description" onChange={(e) => {
                                        setDescription(e.target.value);
                                    }} required></textarea>
                                </div>
                                <div>
                                    <label htmlFor="instructor" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Instructor Name</label>
                                    <input type="text" name="coursecode" id="coursecode" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter the course instructor's name" onChange={(e) => {
                                        setInstructor(e.target.value);
                                    }} required />
                                </div>
                                <div>
                                    <label htmlFor="instructor" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Video Link</label>
                                    <input type="text" name="coursecode" id="coursecode" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter the course link" onChange={(e) => {
                                        setLink(e.target.value);
                                    }} required />
                                </div>
                                <div className="flex justify-between">
                                    <div className="w-1/2 mr-2">
                                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price (in $)</label>
                                        <input type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter the price" onChange={(e) => {
                                            setPrice(e.target.value);
                                        }} required />
                                    </div>
                                    <div className="w-1/2 ml-2">
                                        <label htmlFor="duration" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Duration (in hours)</label>
                                        <input type="number" name="duration" id="duration" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter the duration" onChange={(e) => {
                                            setDuration(e.target.value);
                                        }} required />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="courseImage" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Thumbnail</label>
                                    <label htmlFor="courseImage" className="bg-gray-50 border text-center border-gray-300 text-gray-900 sm:text-sm rounded-lg cursor-pointer focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        {image ? `File uploaded: ${image.name}` : "Click here to upload"}
                                        <input type="file" accept="image/*" name="courseImage" id="courseImage" className="hidden" onChange={(e) => {
                                            setImage(e.target.files[0]);
                                        }} />
                                    </label>
                                </div>
                                <button type="button" onClick={submitCourse} className="w-full text-white bg-orange-500 hover:bg-gray-300 hover:text-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create Course</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
