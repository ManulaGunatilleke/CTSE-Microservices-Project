import CreateCourseForm from "../../components/createCourseComponent/createCourse";
import "../createCoursePage/createCoursePage.css";

export default function createCoursePage() {
    return (
        <section className="createCourseBg bg-white antialiased md:py-16">
            <h1 className="createCourseHeading text-center font-semibold text-gray-900 dark:text-white">Course Creation</h1>
            <form action="#" className=" createCourseBG border-2 rounded-lg border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 mx-auto max-w-screen-xl py-4 2xl:px-0">
                <div className="mx-auto max-w-3xl">
                    <p className="text-lg text-white text-center">As an Instructor, create your course here and make it available to the students who are registered at EduPrep.</p>
                    <div className="mt-6 sm:mt-8">
                        <CreateCourseForm />
                    </div>
                </div>
            </form>
        </section>
    );
}
