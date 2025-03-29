import React, { useState } from 'react';
import { motion } from 'framer-motion';
import course1 from '../../images/courseSlider/course1.jpg';
import course2 from '../../images/courseSlider/course2.jpg';
import course3 from '../../images/courseSlider/course3.jpg';
import course4 from '../../images/courseSlider/course4.jpg';
import course5 from '../../images/courseSlider/course5.jpg';

const Features = () => {

  const [positionIndex, setPositionIndex] = useState([0, 1, 2, 3, 4]);

  const handleNext = () => {
    setPositionIndex((prevIndexes) => {
      const updatedIndexes = prevIndexes.map((prevIndexes) => (prevIndexes + 1) % 5)
      return updatedIndexes
    })
  }

  const images = [ course1, course2, course3, course4, course5 ];
  const positions = [ 'center', 'left1', 'left', 'right', 'right1'];
  const imageVariants = { 
    center: {x: '0%', scale: 1, zIndex: 5},
    left1: {x: '-50%', scale: 0.7, zIndex: 2},
    left: {x: '-90%', scale: 0.5, zIndex: 1},
    right: {x: '90%', scale: 0.5, zIndex: 1},
    right1: {x: '50%', scale: 0.7, zIndex: 2},
  }

  return (
    <section id='features'>
      <div className='max-w-6xl px-5 mx-auto mt-32 text-center'>
        <h2 className='text-5xl font-bold text-center'>
          Our Popular Courses
        </h2>
        <p className='p-5 mt-10 text-justify bg-orange-300 rounded-md'>
          "Explore a curated selection of our most sought-after courses designed to 
          help you achieve your learning goals. Whether you're looking to enhance your 
          professional skills, delve into a new hobby, or simply expand your knowledge, 
          our popular courses cover a wide range of subjects to cater to your interests 
          and aspirations. Dive in, discover, and embark on your learning journey with us today!"
        </p>
      </div>
      <div className='flex flex-col items-center justify-center'>
        {images.map((image, index) => (
          <motion.img
            key={index}
            src={image}
            alt={image}
            className='rounded-[12px]'
            initial='center'
            animate={positions[positionIndex[index]]}
            variants={imageVariants}
            transition={{ duration: 0.5 }}
            style={{width: '40%', position: 'absolute'}}
          />
        ))}

        <button className='text-white hover:text-black font-bold text-2xl mt-[450px] bg-orange-600 hover:bg-gray-400 rounded-md py-2 px-4 w-80' onClick={handleNext}>Next Course</button>
      </div>
    </section>
  );
};

export default Features;
