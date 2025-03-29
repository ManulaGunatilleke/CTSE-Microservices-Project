import { useContext } from "react";
import axios from "axios";
import UserContext from "../ContextComponent/ContextComponent";

const useDeleteInstructor = () => {
    const { token } = useContext(UserContext);
    const onDeleteInstructor = async (id) => {
        try {
            if (!token) {
                alert("Token is not available. Cannot delete user.");
                return false;
            }

            if (window.confirm("Are you sure that you want to delete this Instructor?")) {
                const response = await axios.delete(`http://localhost:8800/UserManagementService/instructor/delete/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    return true;
                }
            }
        } catch (error) {
            alert("Error deleting instructor:", error);
        }
        return false;
    };

    return { onDeleteInstructor };
};

export default useDeleteInstructor;