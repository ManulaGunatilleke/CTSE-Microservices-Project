import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";
import firebaseConfig from "../config/firebase";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app); // Initialize storage with the Firebase app
const token = localStorage.getItem("token");
const headers = {
    "Authorization": `Bearer ${token}`
};


const useCreateCourse = () => {
    const createCourse = async (
        UserId,
        CourseName,
        CourseCode,
        Description,
        Instructor,
        Price,
        ImageFile,
        Duration,
        VideoLink
    ) => {
        try {
            // Uploading image to Firebase Storage
            const imageFileName = Date.now().toString();
            const imageRef = ref(storage, `course-images/${imageFileName}`);
            await uploadBytes(imageRef, ImageFile);

            const imageUrl = await getDownloadURL(imageRef);

            console.log(imageUrl);

            // Send course data along with image URL
            const response = await axios.post(
                "http://localhost:8800/CourseManagementService/course/addCourse",
                {
                    UserId,
                    CourseName,
                    CourseCode,
                    Description,
                    Instructor,
                    Price,
                    Image: imageUrl,
                    Duration,
                    VideoLink
                }, 
                {
                    headers
                }
            );

            if (response.status === 200) {
                alert("Your Course was successfully created!");
            } else {
                alert("There was an issue creating the course, please try again...");
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return { createCourse };
};

export default useCreateCourse;
