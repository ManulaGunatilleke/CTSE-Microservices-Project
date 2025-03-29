import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import illustrationIntro from '../../images/home.png';
import UserContext from '../../ContextComponent/ContextComponent';

const Main = () => {

  const { user } = useContext(UserContext);

  return (
    <section id='hero'>
      {/* Flex Container */}
      <div className='container flex flex-col-reverse items-center px-6 mx-auto mt-10 mb-20 space-y-0 md:space-y-0 md:flex-row'>
        {/* Left Item */}
        <div className='flex flex-col space-y-12 md:w-1/2'>
          <h1 className='max-w-lg text-4xl font-bold text-center md:text-5xl md:text-left'>
           Find The Best Online Course & Learn
          </h1>
          <p className='max-w-sm text-justify text-md:text-left'>
            Welcome to our online course dashboard! Here, you'll find everything you 
            need for a successful learning journey. From accessing course materials 
            to engaging with fellow students, this dashboard is your central hub.
          </p>
          <div className='flex justify-center md:justify-start'>
            { user ? (
              <Link
                to='/all-Courses'
                className='text-white w-64 h-16 bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-bold rounded-lg text-3xl px-5 py-2.5 text-center me-2 mb-2'
              >
                View Courses
              </Link>
            ) : (
              <Link
                to='/register'
                className='text-white w-56 h-16 bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-bold rounded-lg text-3xl px-5 py-2.5 text-center me-2 mb-2'
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
        {/* Image */}
        <div className='md:w-1/2'>
          <img src={illustrationIntro} alt='' />
        </div>
      </div>
    </section>
  );
};

export default Main;