import { useState, useEffect } from "react";
import axios from "axios";

const token = localStorage.getItem("token");
const headers = {
    "Authorization": `Bearer ${token}`
};

const useGetCoursesByUser = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getCourses = async () => {
            try {
                const response = await axios.get(`http://localhost:8800/CourseManagementService/course/getAllCourses/${userID}`,
                    { headers }
                );
                if (response.status === 200){
                    const coursesWithData = await Promise.all(response.data.map(async course => {
                        try {
                            const imageUrl = course.Image;
                            return { ...course, ImageDataUrl: imageUrl };
                        } catch (imageError) {
                            console.error("Error fetching image for course:", imageError);
                            return course;
                        }
                    }));
                    setData(coursesWithData);
                }
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };

        getCourses();
    }, []);

    return data;
};

export default useGetCoursesByUser;
