// import React from "react";
// import { Route, Redirect } from "react-router-dom";
// import { useAuth } from "./authContext";

// const PrivateRoute = ({ component: Component, ...rest }) => {
//     const { currentUser } = useAuth();

//     return (
//         <Route
//             {...rest}
//             render={(props) => {
//                 return currentUser ? <Component {...props} /> : <Redirect to="/login" />;
//             }}
//         />
//     );
// };

// export default PrivateRoute;
