import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import UserContext from "../../ContextComponent/ContextComponent";
import useDeleteCourse from "../../hooks/useDeleteCourse";

const CourseList = () => {
    const { user } = useContext(UserContext);
    const userId = user._id;

    const [data, setData] = useState([]);

    useEffect(() => {
        getCourses();
    }, [])

    const getCourses = async () => {
        const response = await axios.get(`http://localhost:8800/CourseManagementService/course/getAllCourses/${userId}`);

        if (response.status === 200) {
            setData(response.data);
        }
    }

    const onDeleteCourse = useDeleteCourse();

    const handleDelete = async (data) => {
        const isDeleted = await onDeleteCourse(data._id);
        if (isDeleted) {
            alert("Your Course has been deleted successfully!");
            window.location.href = `/getCourses`;
        } else {
            alert("Error with course deletion, please try again later...");
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="table-auto min-w-full w-full divide-y divide-gray-200 font-bold">
                <thead className="bg-orange-400 font-bold">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Course Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Code</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Instructor</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data && data.map((item, index) => {

                        return (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">{item.CourseName}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.CourseCode}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.Instructor}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = `/viewCourse/${item._id}`;
                                    }} className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline mr-2">
                                        <FontAwesomeIcon icon={faEye} />
                                    </button>
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = `/updateCourse/${item._id}`;
                                    }} className="text-yellow-600 hover:text-yellow-900 focus:outline-none focus:underline mr-2">
                                        <FontAwesomeIcon icon={faPencilAlt} />
                                    </button>
                                    <button onClick={() => handleDelete(item)} className="text-red-600 hover:text-red-900 focus:outline-none focus:underline">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default CourseList;
