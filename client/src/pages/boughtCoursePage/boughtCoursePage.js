import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import VideoComponent from "../../components/videoComponent/VideoPlayer";
import "../boughtCoursePage/boughtCoursePage.css";

const BoughtCoursePage = () => {
    const [data, setData] = useState([]);
    const { id } = useParams();
    const [videoUrl, setVideoUrl] = useState(''); // YouTube video URL

    useEffect(() => {
        function fetchCourse(){
            axios.get(`http://localhost:8800/CourseManagementService/course/getCourse/${id}`).then((res) => {
                setData(res.data);
                setVideoUrl(res.data.course.VideoLink); // Move setVideoUrl here
                console.log(res.data);
            }).catch((error) => {
                alert(error.message);
            })
        }
        fetchCourse();
    }, []); // Dependency array is empty to run only once after the component mounts

    return (
        <div>
            {data.course && (
                <>
                    <h1 className='text-black font-bold text-3xl text-center pb-6'>{data.course.CourseName}</h1>
                    <div className="videoScreenCourse">
                        <VideoComponent videoUrl={videoUrl} />
                    </div>
                    <div>
                        <h2 className='text-black font-bold text-xl text-center pb-2'>Instructor: {data.course.Instructor} | Duration : {data.course.Duration} hrs.</h2>
                        <div className='courseParaDiv text-center bg-orange-500'>
                            <p>{data.course.Description}</p>
                        </div>
                        <br/>
                    </div>
                </>
            )}
        </div>
    );
};

export default BoughtCoursePage;
