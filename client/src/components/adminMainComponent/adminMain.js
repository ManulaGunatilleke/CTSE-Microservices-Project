import { Link } from 'react-router-dom';
import '../instructorMainComponent/instructorMain.css';
import adminImage from '../../images/adminimg.png';

const AdminMain = () => {
    return (
        <section id='hero'>
            {/* Flex Container */}
            <div className='container flex flex-col-reverse items-center px-6 mx-auto mt-10 space-y-0 md:space-y-0 md:flex-row'>
                {/* Left Item */}
                <div className='flex flex-col mb-32 space-y-12 md:w-1/2'>
                    <h1 className='instructorHeading'>Welcome to Admin Dashboard!</h1>
                    <h2 className='max-w-xl text-4xl font-bold text-left md:text-5xl md:text-left'>
                        Share Your Knowledge, Shape the Future of our Instructors.
                    </h2>
                    <p className='max-w-md text-justify text-darkGrayishBlue md:text-left'>
                        Manage your courses and users efficiently with our intuitive admin dashboard. 
                        From here, you can oversee all aspects of your online course platform, including 
                        course creation, user management, and more.
                    </p>
                    <br/>
                    <div className="flex flex-col md:flex-row md:justify-start">
                        <div className="mb-2 mr-2 md:mb-0">
                            <Link
                                to="/manage-courses"
                                className="block p-3 px-6 pt-2 text-white bg-orange-600 rounded-full baseline hover:bg-orange-400 md:inline-block"
                            >
                                Manage all Courses
                            </Link>
                        </div>
                        <div className="mb-2 md:mb-0">
                            <Link
                                to="/manage-users"
                                className="block p-3 px-6 pt-2 text-white bg-orange-600 rounded-full baseline hover:bg-orange-400 md:inline-block"
                            >
                                Manage all Users
                            </Link>
                        </div>
                    </div>


                </div>
                {/* Image */}
                <div className='md:w-1/2'>
                    <img src={adminImage} alt='' className="w-full h-auto md:h-full md:w-auto" />
                </div>
            </div>
        </section>
    );
};

export default AdminMain;
