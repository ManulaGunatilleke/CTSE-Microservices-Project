import { useContext } from "react";
import UserContext from '../../ContextComponent/ContextComponent';
import SearchBar from "../../components/searchCourseComponent/searchCourse";

export default function ViewAllCourses() {

    const { user } = useContext(UserContext);

    return (
        <>
            <SearchBar/>
        </>
    );
}
