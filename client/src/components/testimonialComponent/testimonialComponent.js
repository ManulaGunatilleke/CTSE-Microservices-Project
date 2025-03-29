import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import avatarAnisha from '../../images/avatar-anisha.png';
import avatarAli from '../../images/avatar-ali.png';
import avatarRichard from '../../images/avatar-richard.png';
import UserContext from '../../ContextComponent/ContextComponent';

const Testimonial = () => {

  const { user } = useContext(UserContext);

  return (
    <section id='testimonials'>
      <div className='max-w-6xl px-5 mx-auto mt-32 text-center'>
        <h2 className='text-4xl font-bold text-center'>
          Join thousands of manage learners achieving their goals
        </h2>
        <div className='flex flex-col mt-24 md:flex-row md:space-x-6'>
          {/* Testimonial 1 */}
          <div className='flex flex-col items-center p-6 mb-20 space-y-6 bg-gray-300 rounded-lg md:mb-0 md:w-1/3'>
            <img src={avatarAnisha} className='w-40 -mt-20' alt='Anisha Li' />
            <h5 className='text-lg font-bold'>Anisha Li</h5>
            <p className='text-sm text-justify'>
              “Manage has supercharged our team's workflow. The ability to
              maintain visibility on larger milestones at all times keeps
              everyone motivated. We have been able to cancel so many other subscriptions since
              using Manage. There is no more cross-channel confusion and
              everyone is much more focused.”
            </p>
          </div>

          {/* Testimonial 2 */}
          <div className='flex flex-col items-center p-6 mb-20 space-y-6 bg-gray-300 rounded-lg md:mb-0 md:flex md:w-1/3'>
            <img src={avatarAli} className='w-40 -mt-20' alt='Ali Bravo' />
            <h5 className='text-lg font-bold'>Ali Bravo</h5>
            <p className='text-sm text-justify'>
              “We have been able to cancel so many other subscriptions since
              using Manage. There is no more cross-channel confusion and
              everyone is much more focused. Manage has supercharged our team's workflow. The ability to
              maintain visibility on larger milestones at all times keeps
              everyone motivated. ”
            </p>
          </div>

          {/* Testimonial 3 */}
          <div className='flex flex-col items-center p-6 space-y-6 bg-gray-300 rounded-lg md:flex md:w-1/3'>
            <img src={avatarRichard} className='w-40 -mt-20' alt='Richard Watts' />
            <h5 className='text-lg font-bold'>Richard Watts</h5>
            <p className='text-sm text-justify'>
              “Manage has supercharged our team's workflow. The ability to
              maintain visibility on larger milestones at all times keeps
              everyone motivated. We have been able to cancel so many other subscriptions since
              using Manage. There is no more cross-channel confusion and
              everyone is much more focused.”
            </p>
          </div>
        </div>
        <div className='my-16'>
          { user ? (
            <Link
              to='/all-Courses'
              className='p-3 px-6 pt-2 text-white bg-orange-600 rounded-full baseline hover:bg-orange-400'
            >
              View Courses
            </Link>
          ) : (
              <Link
              to='/register'
              className='p-3 px-6 pt-2 text-white bg-orange-600 rounded-full baseline hover:bg-orange-400'
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
