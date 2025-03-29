import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../../../ContextComponent/ContextComponent';
import useAuth from '../../config/hooks/authContext'; // Adjust the path if needed

const GoogleComponent = () => {
  const navigate = useNavigate();
  const { setToken, setUser } = useContext(UserContext);
  const { Googlelogin } = useAuth(); 

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    console.log("URL Search Params:", window.location.search);
    console.log("Received token:", token);

    if (token) {
      // Send a request to validate the token
      axios.post(`http://localhost:8800/UserManagementService/auth/validate-token`, { token })
        .then(response => {
          if (response.status === 200) {
            // Successful login
            alert("Login Successfully...!");
            setUser(response.data.user); 
            setToken(response.data.token); 
            navigate('/home'); 
          } else {
            // Handle login failure
            alert("Login failed: " + response.data.message);
            navigate('/login'); 
          }
        })
        .catch(error => {
          console.error("Error during authentication:", error);
          alert("An error occurred during authentication");
        });
    }
  }, [navigate, setToken, setUser]);

  return (
    <div>
      <p>Processing authentication...</p>
    </div>
  );
};

export default GoogleComponent;
