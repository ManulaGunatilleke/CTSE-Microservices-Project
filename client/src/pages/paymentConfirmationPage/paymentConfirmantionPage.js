import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import usePayment from "../../hooks/usePayment";
import useSendEmailToStudent from "../../hooks/useSendEmailToStudent";
import useViewCourseById from "../../hooks/useViewCourseById";
import LoadingSpinner from "../../components/loadingSpinnerComponent/loadingSpinnerComponent";

export default function PaymentConfirmationPage() {
    const location = useLocation();
    const courseId = new URLSearchParams(location.search).get("courseId");
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    const { updatePayment, updateEnrollment } = usePayment();
    const { course: fetchedCourse, loading, error, viewOneCourseById } = useViewCourseById();
    const {sendEmailToStudent} = useSendEmailToStudent(); // Initialize the useSendEmail hook
    const navigate = useNavigate();
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (courseId && user && !isUpdated) {
                try {
                    console.log("CourseID:", courseId);
                    console.log("user:", user);
                    await viewOneCourseById(courseId);
                } catch (error) {
                    console.error("Error fetching course data:", error);
                }
            }
        };

        fetchData();
    }, [courseId, user, viewOneCourseById]);

    useEffect(() => {
        const performPaymentAndEnrollment = async () => {
            if (fetchedCourse && user && !isUpdated) {
                setIsUpdated(true); // Update state to indicate that updates have been performed
                const paymentProduct = {
                    courseId: fetchedCourse._id,
                    price: fetchedCourse.Price,
                    courseCode: fetchedCourse.CourseCode,
                    userId: user._id
                };
                const enrollmentProduct = {
                    userId: user._id,
                    courseId: fetchedCourse._id,
                    additionalInfo: "Enrollment of " + fetchedCourse.CourseCode + " by " + user.Fullname,
                };
                const sendConfirmEmail = {
                    toEmail: user.Email,
                    fromName: "Manage_Institute",
                    message: "You enrolled to our " + fetchedCourse.CourseName + " Module",
                };
                try {
                    await Promise.all([
                        updatePayment(paymentProduct, token),
                        updateEnrollment(enrollmentProduct, token),
                        sendEmailToStudent(sendConfirmEmail)
                    ]);
                    
                    console.log("Course data fetched:", fetchedCourse);
                    console.log("Performing payment and enrollment updates with Notification...");
                    
                    navigate(`/coursePage/${courseId}`);
                } catch (error) {
                    console.error("Error performing payment and enrollment updates:", error);
                }
            }
        };

        performPaymentAndEnrollment();
    }, [fetchedCourse, user, token, navigate, updatePayment, updateEnrollment, courseId, isUpdated]);

    if (loading) {
        return <LoadingSpinner />;
    }

    return null;
}
