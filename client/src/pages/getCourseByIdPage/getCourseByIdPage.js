import React, { useState, useEffect } from 'react';
import GetCourseById from '../../components/getCourseByIdComponent/getCourseById';
import "../getCourseByIdPage/getCourseByIdPage.css";

const GetCourseByIdPage = () => {
    // State to manage loading
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading for 2 seconds
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []); // Only runs on mount

    return (
        <section className="getCourseBg bg-white py-8 antialiased md:py-16">
            {loading ? (
                <div className="loadingScreenCourse flex justify-center h-screen">
                    <p className="text-6xl font-bold text-black">Loading...</p>
                </div>
            ) : (
                <>
                    <form action="#" className="viewCourseBG border-2 rounded border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 mx-auto max-w-screen-xl py-4 2xl:px-0">
                        <div className="mx-auto max-w-3xl">
                            <h2 className="text-xl font-semibold text-center text-gray-900 dark:text-white sm:text-2xl">Course Information</h2>
                            <div className="mt-6 sm:mt-8">
                                <GetCourseById />
                            </div>
                        </div>
                    </form>
                </>
            )}
            <br/><br/>
        </section>
    );
};

export default GetCourseByIdPage;
