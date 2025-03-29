import axios from "axios";

const useCreateEnrollment = () => {
    const createEnrollment = async (
            userId,
            courseId,
            enrollmentDate,
            status,
            additionalInfo
    ) => {
        try {

            // Send course data along with image URL
            const response = await axios.post(
                "http://localhost:8800/EnrollmentManagementService/enrollment/createEnrollment",
                {
                    userId,
                    courseId,
                    enrollmentDate,
                    status,
                    additionalInfo
                }
            );

            if (response.status === 200) {
                alert("Your Enrollment was successfully created!");
            } else {
                alert("There was an issue creating the Enrollment for the course, please try again...");
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return { createEnrollment };
};

export default useCreateEnrollment;
