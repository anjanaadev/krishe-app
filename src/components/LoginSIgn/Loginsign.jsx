import React from 'react';
import './LoginSign.css';
import { useHistory } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import  { useState } from 'react';

const Loginsign = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleSignIn = async (e) => {
      e.preventDefault();
        const requestBody = {
          loginId: userId,
          password: password
        };

        try {
          const response = await fetch('http://35.154.176.67:8080/ihfc/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
          });
    
          const data = await response.json();
          
          if (response.ok) {
            if(data.is_Administrator === "Y"){
              history.push('/upload');
            }
            else{
              history.push('/user');
              sessionStorage.setItem('user',userId)
            }
          } else {
            // Handle login failure
            console.error('Login failed:', data.message);
          }
        } catch (error) {
          console.error('Error logging in:', error);
        }
      };
    


  return (
    <div className='loginform'>
    <div className='wrapper'>
        <form action=""> 
           <h1> Login</h1>

           <div className='input-box'>
            <input type='text' placeholder='UserName' id="userId" value={userId}
          onChange={(e) => setUserId(e.target.value)} required />
            <FaUser className='icon'/>
           </div>

           <div className='input-box'>
            <input type='password' placeholder='Password' id="password" value={password}
          onChange={(e) => setPassword(e.target.value)}required />
            <FaLock className='icon'/>
           </div>

           
            
           <button type='submit' onClick={handleSignIn}>Login</button>



        </form>
        </div>
        </div>
  )
}

export default Loginsign