import { useState, useEffect } from 'react';
import axios from "axios";

const useManageCourse = () => {
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getCourses();
    }, []);

    const getCourses = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/course/course/publishedCourses`);
            if (response.status === 200) {
                setCourses(response.data);
            }
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    }

    const searchCourse = async (key) => {
        setSearchTerm(key);
        if (key) {
            try {
                const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/course/course/searchCourse/${key}`);
                if (result.status === 200) {
                    setCourses(result.data);
                }
            } catch (error) {
                console.error("Error searching courses:", error);
            }
        } else {
            getCourses();
        }
    }

    const deleteCourse = async (courseId) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/course/course/deleteCourse/${courseId}`);
            if (response.status === 200) {
                setCourses(courses.filter(course => course.id !== courseId));
                alert("Course Deletion Successfully..!")
                getCourses();
            }
        } catch (error) {
            console.error("Error deleting course:", error);
        }
    }

    return {
        courses,
        searchTerm,
        searchCourse,
        deleteCourse
    };
};

export default useManageCourse;
