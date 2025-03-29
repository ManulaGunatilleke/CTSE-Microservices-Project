import Main from "../../components/mainComponent/mainComponent";
import Features from "../../components/featuresComponent/featuresComponent";
import Testimonial from "../../components/testimonialComponent/testimonialComponent";
import CallToAction from "../../components/callToActionComponent/callToActionComponent";

export default function Index() {

    return (
        <>
            <Main id="hero"/>
            <Features id="features"/>
            <Testimonial id="testimonials"/>
            <CallToAction id="pricing"/>
        </>
    );
}
