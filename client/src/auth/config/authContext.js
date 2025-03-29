// import React, { createContext, useContext, useEffect, useState } from "react";
// import { auth } from "../../config/firebase";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//     const [currentUser, setCurrentUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();

//     const signup = (email, password) => {
//         return auth.createUserWithEmailAndPassword(email, password);
//     };

//     const login = async (email, password) => {
//         try {
//             await auth.signInWithEmailAndPassword(email, password);
//             navigate("/");
//         } catch (error) {
//             throw error;
//         }
//     };

//     const logout = () => {
//         return auth.signOut();
//     };

//     useEffect(() => {
//         const unsubscribe = auth.onAuthStateChanged(user => {
//             setCurrentUser(user);
//             setLoading(false);
//         });

//         return unsubscribe;
//     }, []);

//     const value = {
//         currentUser,
//         signup,
//         login,
//         logout
//     };

//     return (
//         <AuthContext.Provider value={value}>
//             {!loading && children}
//         </AuthContext.Provider>
//     );
// };
