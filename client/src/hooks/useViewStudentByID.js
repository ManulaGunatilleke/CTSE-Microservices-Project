import { useState, useEffect } from "react";
import axios from "axios";

const useViewStudentById = () => {
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const viewSingleStudent = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8800/UserManagementService/student/get/${id}`);
            setStudent(response.data.student);
            setLoading(false);
        } catch (error) {
            setError(error.response.data.error);
            setLoading(false);
        }
    };

    useEffect(() => {
        return () => {
            setStudent(null);
            setLoading(true);
            setError(null);
        };
    }, []);

    return { student, loading, error, viewSingleStudent };
};

export default useViewStudentById;
