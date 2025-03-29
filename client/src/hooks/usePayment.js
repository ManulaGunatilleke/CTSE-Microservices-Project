import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import enrollmentsPage from "../pages/enrollmentsPage/enrollmentsPage";

const usePayment = () => {
    const makePayment = async (product, token) => {
        const stripe = await loadStripe('pk_test_51PDNzJEaSJ1mlAjvQjxA4Zhdhzesxxk6Hkhon3cCcnGbcVenbtWgWExR6kzsfSYZ2aGtZ2obQTCcQFpSdV5gmQd900uF1WkFSr');
        const body = { product };
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };

        try {
            const response = await axios.post(
                "http://localhost:8800/PaymentManagementService/checkout/create-checkout-session",
                body,
                { headers }
            );

            const session = response.data;

            const result = await stripe.redirectToCheckout({
                sessionId: session.id
            });

            if (result.error) {
                console.log(result.error);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const updatePayment = async (product, token) => {
        const paymentRequest = {
            UserId: product.userId,
            CourseId: product.courseId,
            CourseCode: product.courseCode,
            Price: product.price
        };
        console.log(paymentRequest)

        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };

        try {
            const response = await axios.post(
                "http://localhost:8800/PaymentManagementService/payment",
                paymentRequest,
                { headers }
            );
            console.log("Payment request sent:", response.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const updateEnrollment = async (product, token) => {
        const enrollmentRequest = {
            userId: product.userId,
            courseId: product.courseId,
            status:"active",
            additionalInfo:product.additionalInfo,
            
        };
        console.log(enrollmentRequest)

        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };

        try {
            const response = await axios.post(
                "http://localhost:8800/EnrollmentManagementService/enrollment/createEnrollment",
                enrollmentRequest,
                { headers }
            );
            console.log("Enrollment request sent:", response.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return { makePayment, updatePayment, updateEnrollment };
};

export default usePayment;
