import { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../ContextComponent/ContextComponent";

const useFetchUserDetails = (userId, searchTerm) => {
    const { token } = useContext(UserContext);
    const [studentData, setStudentData] = useState(null);
    const [studentallData, setStudentallData] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                console.log("Fetching user details...");
                console.log("Token:", token);
                if (!token) return;
                const response = await axios.get(`http://localhost:8800/UserManagementService/student/get/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    setStudentData(response.data);
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };
        fetchUserDetails();
    }, [userId, token]);

    useEffect(() => {
        const fetchallUserDetails = async () => {
            try {
                if (!token) return;
                let url = 'http://localhost:8800/UserManagementService/student';
                if (searchTerm) {
                    url = `http://localhost:8800/UserManagementService/student/search/${searchTerm}`;
                }
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    setStudentallData(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchallUserDetails();
    }, [searchTerm, token]);

    return { studentData, studentallData };
};

export default useFetchUserDetails;
