import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../ContextComponent/ContextComponent';

import companyLogoWhite from '../../images/logo-white.svg';
import facebookLogo from '../../images/icon-facebook.svg';
import youtubeLogo from '../../images/icon-youtube.svg';
import twitterLogo from '../../images/icon-twitter.svg';
import pinterestLogo from '../../images/icon-pinterest.svg';
import instagramLogo from '../../images/icon-instagram.svg';

const Footer = () => {

  const { user } = useContext(UserContext);

  // Scroll to hero component
  const scrollToHero = () => {
    const heroComponent = document.getElementById('hero');
    heroComponent.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='bg-black'>
      <footer className='footer'>
        {/* Flex Container */}
        <div className='container flex flex-col-reverse justify-between px-6 py-10 mx-auto space-y-8 md:flex-row md:space-y-0'>
          {/* Logo and social links container */}
          <div className='flex flex-col-reverse items-center justify-between space-y-12 md:flex-col md:space-y-0 md:items-start'>
            <div className='mx-auto my-6 text-center text-white md:hidden'>
              Copyright © 2022, All Rights Reserved
            </div>
            {/* Logo */}
            <Link to={user ? '/home' : '/'}>
              <div onClick={scrollToHero}>
                <img src={companyLogoWhite} className='h-8' alt='' />
              </div>
            </Link>
            {/* Social Links Container */}
            <div className='flex justify-center space-x-4'>
              {/* Link 1 */}
              <Link to='#'>
                <img src={facebookLogo} className='h-8' alt='' />
              </Link>
              {/* Link 2 */}
              <Link to='#'>
                <img src={youtubeLogo} className='h-8' alt='' />
              </Link>
              {/* Link 3 */}
              <Link to='#'>
                <img src={twitterLogo} className='h-8' alt='' />
              </Link>
              {/* Link 4 */}
              <Link to='#'>
                <img src={pinterestLogo} className='h-8' alt='' />
              </Link>
              {/* Link 5 */}
              <Link to='#'>
                <img src={instagramLogo} className='h-8' alt='' />
              </Link>
            </div>
          </div>
          {/* List Container */}
          <div className='flex justify-around space-x-32'>
            <div className='flex flex-col space-y-3 text-white'>
              <Link to='#' className='hover:text-orange-600'>
                Home
              </Link>
              <Link to='#' className='hover:text-orange-600'>
                Pricing
              </Link>
              <Link to='#' className='hover:text-orange-600'>
                Products
              </Link>
              <Link to='#' className='hover:text-orange-600'>
                About
              </Link>
            </div>
            <div className='flex flex-col space-y-3 text-white'>
              <Link to='#' className='hover:text-orange-600'>
                Careers
              </Link>
              <Link to='#' className='hover:text-orange-600'>
                Community
              </Link>
              <Link to='#' className='hover:text-orange-600'>
                Privacy Policy
              </Link>
            </div>
          </div>
          {/* Input Container */}
          <div className='flex flex-col justify-between'>
            <form>
              <div className='flex space-x-3'>
                <input
                  type='text'
                  className='flex-1 px-4 rounded-full focus:outline-none'
                  placeholder='Updated in your inbox'
                />
                <button className='px-6 py-2 text-white bg-orange-600 rounded-full hover:bg-orange-400 focus:outline-none'>
                  Go
                </button>
              </div>
            </form>
            <div className='hidden text-white md:block'>
              Copyright © 2022, All Rights Reserved
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
