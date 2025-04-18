import { useState } from "react";

const token = localStorage.getItem("token");
const headers = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
};

const useUpdateCourse = () => {
    const [isUpdated, setIsUpdated] = useState(false);

    const updateCourse = async (id, formData) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/course/course/updateCourse/${id}`, {
                method: 'PUT',
                body: JSON.stringify(formData),
                headers 
            });
            const data = await response.json();
            if (data) {
                setIsUpdated(true);
            }
        } catch (error) {
            console.error("Error updating course:", error);
        }
    };

    return { isUpdated, updateCourse };
};

export default useUpdateCourse;
