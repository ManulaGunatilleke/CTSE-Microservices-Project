import { useContext } from "react";
import axios from "axios";
import UserContext from "../ContextComponent/ContextComponent";

const useDeleteUser = () => {
    const { token } = useContext(UserContext);
    const onDeleteUser = async (id) => {
        try {
            if (!token) {
                alert("Token is not available. Cannot delete user.");
                return false;
            }

            if (window.confirm("Are you sure that you want to delete this Student?")) {
                const response = await axios.delete(`http://localhost:8800/UserManagementService/student/delete/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    return true;
                }
            }
        } catch (error) {
            alert("Error deleting student:", error);
        }
        return false;
    };

    return { onDeleteUser };
};

export default useDeleteUser;
