import { useContext } from "react";
import Main from "../../components/mainComponent/mainComponent";
import Features from "../../components/featuresComponent/featuresComponent";
import Testimonial from "../../components/testimonialComponent/testimonialComponent";
import CallToAction from "../../components/callToActionComponent/callToActionComponent";
import InstructorMain from "../../components/instructorMainComponent/instructorMain";
import AdminMain from "../../components/adminMainComponent/adminMain";
import UserContext from '../../ContextComponent/ContextComponent';

export default function Home() {

    const { user } = useContext(UserContext);

    // Check if user is an instructor or admin
    const isInstructor = user && user.Type === "instructor";
    const isAdmin = user && user.Type === "admin";

    return (
        <>
            {isInstructor ? (
                <InstructorMain />
            ) : (
                <>
                    {isAdmin ? (
                        <AdminMain />
                    ) : (
                        <>
                            <Main id="hero"/>
                            <Features id="features"/>
                            <Testimonial id="testimonials"/>
                            <CallToAction id="pricing"/>
                        </>
                    )}
                </>
            )}
        </>
    );
}
