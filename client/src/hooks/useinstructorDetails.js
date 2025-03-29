import { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../ContextComponent/ContextComponent";

const useFetchInstructorDetails = (userId, searchTerm) => {
    const { token } = useContext(UserContext);
    const [instructorData, setInstructorData] = useState(null);
    const [instructorallData, setInstructorallData] = useState(null);

    useEffect(() => {
        const fetchInstructorDetails = async () => {
            try {
                if(!token) return;
                const response = await axios.get(`http://localhost:8800/UserManagementService/instructor/get/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    setInstructorData(response.data);
                }
            } catch (error) {
                alert(error);
            }
        };
        fetchInstructorDetails();
    }, [userId, token]);

    useEffect(() => {
        const fetchallInstructorDetails = async () => {
            try {
                if (!token) return;
                let url = 'http://localhost:8800/UserManagementService/instructor';
                if (searchTerm) {
                    url = `http://localhost:8800/UserManagementService/instructor/search/${searchTerm}`;
                }
                const responses = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (responses.status === 200) {
                    setInstructorallData(responses.data);
                }
            } catch (error) {
                alert(error);
            }
        };
        fetchallInstructorDetails();
    },[searchTerm, token]);

    return { instructorData, instructorallData };
};

export default useFetchInstructorDetails;
