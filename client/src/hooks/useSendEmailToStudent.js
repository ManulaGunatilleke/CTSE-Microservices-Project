import emailjs from '@emailjs/browser';

const useSendEmailToStudent = () => {
    // Custom hook logic here
    const sendEmailToStudent = async (details) => { // Declare as async
        const templateParams = {
            to_email: details.toEmail,
            from_name: details.fromName,
            message: details.message
        };
    
        //need to update in .env file
        //return emailjs.send('YOUR_EMAILJS_SERVICE_ID', 'YOUR_EMAILJS_TEMPLATE_ID', templateParams, 'YOUR_EMAILJS_USER_ID')
        try {
            const response = await emailjs.send('service_dy2aaeb', 'template_4gsfe6h', templateParams, 'pZ1o9gGnQ9Tf2YeJY');
            console.log('Email notification sent:', response);
            return response;
        } catch (error) {
            console.error('Error sending email notification:', error);
            throw error; // Throw the error for handling in the component
        }
    };

    return { sendEmailToStudent };
};

export default useSendEmailToStudent;
