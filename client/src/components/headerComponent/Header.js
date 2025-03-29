import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import companyLogo from '../../images/logo.svg';
import UserContext from '../../ContextComponent/ContextComponent';
import useAuth from '../../auth/config/hooks/authContext';

const Navbar = () => {
  
  const [toggleMenu, setToggleMenu] = useState(false);
  const { user } = useContext(UserContext);
  const { logout } = useAuth();

  // Logout function
  const handleLogout = () => {
    logout();
  };

  const handleProfile = () => {
  if (user.Type !== 'admin') {
    window.location.href = `/profile/${user._id}`;
  } else {
    console.log('Admins cannot access the profile page.');
  }
  };

  // Check if user is an instructor or admin
  const isInstructor = user && user.Type === "instructor";
  const isAdmin = user && user.Type === "admin";

  // Scroll to Features component
  const scrollToFeatures = () => {
    const featuresComponent = document.getElementById('features');
    featuresComponent.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Scroll to testimonials component
  const scrollToTestimonials = () => {
    const testimonialsComponent = document.getElementById('testimonials');
    testimonialsComponent.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to Pricing component
  const scrollToPricing = () => {
    const pricingComponent = document.getElementById('pricing');
    pricingComponent.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      {/* Navbar */}
      <nav className='container relative p-6 mx-auto'>
        {/* Flex Container */}
        <div className='flex items-center justify-between'>
          {/* Logo */}
          { user ? (
            <>
              <div className='pt-2'>
                <Link to='/home'>
                  <img src={companyLogo} alt='' />
                </Link>
              </div>
              <div className='hidden space-x-16 md:flex'>
                {isInstructor ? (
                  <>
                    <Link to='/createCourse' className='hover:text-gray-400'>
                      Create Course
                    </Link>
                    <Link to='/getCourses' className='hover:text-gray-400'>
                      Your Courses
                    </Link>
                </>
                ) : (
                  <>
                      {isAdmin ? (
                        <>
                            <Link to='/manage-courses' className='hover:text-gray-400'>
                              Manage all Courses
                            </Link>
                            <Link to='/manage-users' className='hover:text-gray-400'>
                              Manage all Users
                            </Link>
                            <Link to='/all-enrollments' className='hover:text-gray-400'>
                              All Enrollments
                            </Link>
                            <Link to='/all-payments' className='hover:text-gray-400'>
                              All Payments
                            </Link>
                        </>
                      ) : (
                          <>
                            <Link to='/home' className='hover:text-gray-400'>
                              Home
                            </Link>
                            <Link to='/all-Courses' onClick={scrollToFeatures} className='hover:text-gray-400'>
                              Courses
                            </Link>
                            <Link to='/user-enrollments'  className='hover:text-gray-400'>
                              My Enrollments
                            </Link>
                            <Link to='/home' onClick={scrollToPricing} className='hover:text-gray-400'>
                              Pricing
                            </Link>
                            <Link to='/home' onClick={scrollToPricing} className='hover:text-gray-400'>
                              About Us
                            </Link>
                          </>
                      )}
                  </>
                )}
              </div>
            </>
          ) : (
            <>
                <div className='pt-2'>
                  <Link to='/'>
                    <img src={companyLogo} alt='' />
                  </Link>
                </div>
                {/* Menu Items */}
                <div className='hidden space-x-16 md:flex'>
                  {isInstructor ? (
                    <>
                      <Link to='/createCourse' className='hover:text-gray-400'>
                        Create Course
                      </Link>
                      <Link to='/getCourses' className='hover:text-gray-400'>
                        Your Courses
                      </Link>
                  </>
                  ) : (
                    <>
                        {isAdmin ? (
                          <>
                              <Link to='/manage-courses' className='hover:text-gray-400'>
                                Manage all Courses
                              </Link>
                              <Link to='/manage-users' className='hover:text-gray-400'>
                                Manage all Users
                              </Link>
                          </>
                        ) : (
                            <>
                              <Link to='/' className='hover:text-gray-400'>
                                Home
                              </Link>
                              <Link to='' onClick={scrollToFeatures} className='hover:text-gray-400'>
                                Courses
                              </Link>
                              <Link to='' onClick={scrollToTestimonials}  className='hover:text-gray-400'>
                                Achievements
                              </Link>
                              <Link to='' onClick={scrollToPricing} className='hover:text-gray-400'>
                                Pricing
                              </Link>
                              <Link to='' onClick={scrollToPricing} className='hover:text-gray-400'>
                                About Us
                              </Link>
                            </>
                        )}
                    </>
                  )}
                </div>
            </>
          )}
          <div className='flex space-x-1'>
            {user ? (
              // Display user's name and logout button
              <div className='hidden space-x-1 md:flex'>
                <button
                  onClick={handleProfile}
                  className='relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-black focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800'
                >
                  <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-white rounded-md group-hover:bg-opacity-0'>
                    {user.Type === 'student'
                      ? user.Fullname
                      : user.Type === 'instructor'
                      ? user.Instructorname
                      : user.Type === 'admin'
                      ? user.Adminname
                      : 'Unknown'}
                  </span>
                </button>
                <button
                  onClick={handleLogout}
                  className='relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-black focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800'
                >
                  <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-white rounded-md group-hover:bg-opacity-0'>
                    Logout
                  </span>
                </button>
              </div>
            ) : (
              // Display login and Get Started buttons
              <>
                <Link
                  to='/login'
                  className='hidden p-3 px-6 pt-2 text-xl font-bold text-black rounded-full baseline hover:text-orange-600 md:block'
                >
                  Login
                </Link>
                <Link
                  to='/register'
                  className='hidden p-3 px-6 pt-3 text-white bg-orange-600 rounded-full baseline hover:bg-orange-400 md:block'
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Hamburger Icon */}
          <button
            className={
              toggleMenu
                ? 'open block hamburger md:hidden focus:outline-none'
                : 'block hamburger md:hidden focus:outline-none'
            }
            onClick={() => setToggleMenu(!toggleMenu)}
          >
            <span className='hamburger-top'></span>
            <span className='hamburger-middle'></span>
            <span className='hamburger-bottom'></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className='md:hidden'>
        <div
          className={
            toggleMenu
              ? 'absolute flex flex-col items-center self-end py-8 mt-10 space-y-6 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md'
              : 'absolute flex-col items-center hidden self-end py-8 mt-10 space-y-6 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md'
          }
        >
        {isAdmin && (
            <>
              <Link to='/manage-courses'>Manage all Courses</Link>
              <Link to='/manage-users'>Manage all Users</Link>
            </>
          )}
          {isInstructor && (
            <>
              <Link to='#'>Create Course</Link>
              <Link to='#'>Your Courses</Link>
            </>
          )}
          {!isAdmin && !isInstructor && (
            <>
              <Link to='/'>Home</Link>
              <Link to='' onClick={scrollToFeatures}>Popular Courses</Link>
              <Link to='' onClick={scrollToTestimonials}>Achievements</Link>
              <Link to='' onClick={scrollToPricing}>Pricing</Link>
              <Link to='' onClick={scrollToPricing}>About Us</Link>
            </>
          )}
          {user ? (
            // Display user's name and logout button
            <>
            <button
              className='relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-black focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800'
            >
              <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-white rounded-md group-hover:bg-opacity-0'>
                {user.Type === 'student'
                  ? user.Fullname
                  : user.Type === 'instructor'
                  ? user.Instructorname
                  : user.Type === 'admin'
                  ? user.Adminname
                  : 'Unknown'}
              </span>
            </button>
            <button
              onClick={handleLogout}
              className='relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-black focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800'
            >
              <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-white rounded-md group-hover:bg-opacity-0'>
                Logout
              </span>
            </button>
          </>
          ) : (
            // Display login and Get Started buttons
            <>
              <Link to='/login'>Login</Link>
              <Link to='/register'>Get Started</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
