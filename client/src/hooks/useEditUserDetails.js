import { useContext } from "react";
import { useState } from 'react';
import UserContext from "../ContextComponent/ContextComponent";

const useEditUserDetails = () => {
    const { token, user, setUser } = useContext(UserContext);
    const [isEditing, setIsEditing] = useState(false);

    const toggleEditing = () => {
        setIsEditing(prevState => !prevState);
    };

    const updateUserDetails = async (userId, updatedUserData) => {
        try {
            if (!token) {
                alert("Token is not available. Cannot update user details.");
                return;
            }

            const response = await fetch(`http://localhost:8800/UserManagementService/student/update/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedUserData),
            });

            if (response.status === 200) {
                alert("Student Details Updated!");
                const updatedUser = { ...user, ...updatedUserData };
                setUser(updatedUser);
                window.location.reload();
            } else {
                alert("Failed to update user details");
            }

        } catch (error) {
            alert(error);
        }
    };

    return { isEditing, toggleEditing, updateUserDetails };
};

export default useEditUserDetails;
