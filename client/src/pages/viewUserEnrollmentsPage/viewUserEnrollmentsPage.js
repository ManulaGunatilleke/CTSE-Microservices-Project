import { useContext } from "react";
import UserContext from '../../ContextComponent/ContextComponent';
import UserEnrollments from "../../components/userEnrollmentsComponent/userEnrollments";

export default function ViewUserEnrollments() {

    const { user } = useContext(UserContext);

    return (
        <>
            <UserEnrollments/>
        </>
    );
}
