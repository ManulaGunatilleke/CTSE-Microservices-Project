import React, { useState } from 'react';
import useEditUserDetails from '../../hooks/useEditUserDetails';

const EditProfileForm = ({ user, onCancel }) => {

    const initialFullname = user.Type === 'student' ? user.Fullname : user.Instructorname;
    const { updateUserDetails } = useEditUserDetails();

    // State to manage form fields
    const [formData, setFormData] = useState({
        Fullname: initialFullname,
        Email: user.Email,
    });

    // Handler to update form field values
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handler to submit form data
    const handleSubmit = (e) => {
        e.preventDefault();
        const userId = user._id;
        updateUserDetails(userId, formData);
        onCancel();
    };

    return (
        <div className="px-8 pt-6 pb-8 mb-4 bg-gray-300 rounded shadow-md edit-profile-form">
            <h2 className="mb-4 text-2xl font-bold">Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="fullname">
                        Full Name:
                    </label>
                    <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="fullname"
                        name="Fullname"
                        type="text"
                        value={formData.Fullname}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                        Email:
                    </label>
                    <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="email"
                        name="Email"
                        type="email"
                        value={formData.Email}
                        onChange={handleChange}
                    />
                </div>
                {/* Add more form fields as needed */}
                <div className="flex items-center justify-between">
                    <button
                        className="px-4 py-2 font-bold text-white bg-orange-500 rounded hover:bg-orange-700 focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Save
                    </button>
                    <button
                        className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProfileForm;
