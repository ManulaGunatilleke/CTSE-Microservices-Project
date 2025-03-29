import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../ContextComponent/ContextComponent';

const Pricing = () => {

  const { user } = useContext(UserContext);

  return (
    <section id='pricing' className='bg-orange-500'>
      <div className='container px-4 py-12 mx-auto'>
        <h2 className='mb-6 text-3xl font-bold text-center text-gray-800'>
          Choose a Plan That Works for You
        </h2>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
          {/* Basic Plan */}
          <div className='flex flex-col justify-between p-6 bg-white rounded-lg shadow-md'>
            <h3 className='mb-2 text-xl font-semibold text-gray-800'>Basic</h3>
            <p className='mb-4 text-gray-600'>Access to essential courses</p>
            <div className='flex items-center justify-center mb-6'>
              <span className='text-2xl font-semibold text-gray-800'>$9.99</span>
              <span className='ml-1 text-gray-600'>/month</span>
            </div>
                {user ? (
                  <Link to='/all-courses' className='w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2'>
                    Get Started
                  </Link>
                ):(
                  <Link to='/register' className='w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2'>
                    Get Started
                  </Link>
                )}
          </div>

          {/* Standard Plan */}
          <div className='flex flex-col justify-between p-6 bg-white rounded-lg shadow-md'>
            <h3 className='mb-2 text-xl font-semibold text-gray-800'>Standard</h3>
            <p className='mb-4 text-gray-600'>Access to more courses and features</p>
            <div className='flex items-center justify-center mb-6'>
              <span className='text-2xl font-semibold text-gray-800'>$19.99</span>
              <span className='ml-1 text-gray-600'>/month</span>
            </div>
                {user ? (
                  <Link to='/all-courses' className='w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2'>
                    Get Started
                  </Link>
                ):(
                  <Link to='/register' className='w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2'>
                    Get Started
                  </Link>
                )}
          </div>

          {/* Premium Plan */}
          <div className='flex flex-col justify-between p-6 bg-white rounded-lg shadow-md'>
            <h3 className='mb-2 text-xl font-semibold text-gray-800'>Premium</h3>
            <p className='mb-4 text-gray-600'>Unlimited access to all courses and features</p>
            <div className='flex items-center justify-center mb-6'>
              <span className='text-2xl font-semibold text-gray-800'>$29.99</span>
              <span className='ml-1 text-gray-600'>/month</span>
            </div>
              {user ? (
                  <Link to='/all-courses' className='w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2'>
                    Get Started
                  </Link>
                ):(
                  <Link to='/register' className='w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2'>
                    Get Started
                  </Link>
                )}
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Pricing;
