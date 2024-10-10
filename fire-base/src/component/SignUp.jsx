import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig'; 
import { Link, useNavigate } from 'react-router-dom';  
import { doc, setDoc } from 'firebase/firestore';  
import './SignUp.css';

const SignUp = () => {
    const [name, setName] = useState('');  
    const [city, setCity] = useState('');  
    const [email, setEmail] = useState('');  
    const [password, setPassword] = useState(''); 
    const [gender, setGender] = useState('');  
    const [hobbies, setHobbies] = useState(''); 
    const [error, setError] = useState(''); 
    const navigate = useNavigate();  

    const handleSignUp = () => {
        setError(''); 

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('User signed up:', user);

                
                setDoc(doc(db, 'users', user.uid), {
                    name: name,
                    city: city,
                    email: email,
                    gender: gender,
                    hobbies: hobbies
                })
                .then(() => {
                    console.log('User data stored in Firestore');
                })
                // .catch((error) => {
                //     console.error('Error storing user data:', error);
                //     setError(error.message);
                // });
            })
            .catch((error) => {
                setError(error.message);  
            });
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

          
            <div>
                <label className='l1' htmlFor="">Gender</label> <br /><br />
                <label>
                    <input
                        type="radio"
                        value="Male"
                        checked={gender === 'Male'}
                        onChange={(e) => setGender(e.target.value)}
                    />
                    Male
                </label>
                <label>
                    <input
                        type="radio"
                        value="Female"
                        checked={gender === 'Female'}
                        onChange={(e) => setGender(e.target.value)}
                    />
                    Female
                </label>
            </div>

            
            <input
                type="text"
                placeholder="Hobbies"
                value={hobbies}
                onChange={(e) => setHobbies(e.target.value)}
            />

            <button onClick={handleSignUp}>Sign Up</button>
            {error && <p style={{color: 'red'}}>{error}</p>} 
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default SignUp;
