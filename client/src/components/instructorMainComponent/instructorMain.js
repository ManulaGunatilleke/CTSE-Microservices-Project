import { Link } from 'react-router-dom';
import '../instructorMainComponent/instructorMain.css';
import instructorImage from '../../images/instructorImage.png';

const Main = () => {
    return (
        <section id='hero'>
            {/* Flex Container */}
            <div className='container flex flex-col-reverse items-center px-6 mx-auto mt-10 space-y-0 md:space-y-0 md:flex-row'>
                {/* Left Item */}
                <div className='flex flex-col mb-32 space-y-12 md:w-1/2'>
                    <h1 className='instructorHeading'>Welcome Teshan!</h1>
                    <h2 className='max-w-lg text-4xl font-bold text-center md:text-5xl md:text-left'>
                        Share Your Knowledge, Shape the Future of our Students
                    </h2>
                    <p className='max-w-sm text-center text-darkGrayishBlue md:text-left'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy 
                    text ever since the 1500s.
                    </p>
                    <br/>
                    <div className="flex justify-center md:justify-start">
                        <div className="mr-2">
                            <Link
                                to="/getCourses"
                                className="p-3 px-6 pt-2 text-white bg-orange-600 rounded-full baseline hover:bg-orange-400"
                            >
                                Check your Courses
                            </Link>
                        </div>
                        <div>
                            <Link
                                to="/createCourse"
                                className="p-3 px-6 pt-2 text-white bg-orange-600 rounded-full baseline hover:bg-orange-400"
                            >
                                Create a new Course
                            </Link>
                        </div>
                    </div>

                </div>
                {/* Image */}
                <div className='md:w-1/2'>
                    <img src={instructorImage} alt='' />
                </div>
            </div>
        </section>
    );
};

export default Main;