import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';  
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';  
import "./Dashboard.css"

export default function Dashboard() {
    const [user, setUser] = useState(null);  
    const [name, setName] = useState('');  

    useEffect(() => {
       
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);  
            } else {
                setUser(null);  
            }
        });
    }, []);

    useEffect(() => {
        
        const fetchUser = async () => {
            if (user) {
                const userDoc = await getDoc(doc(db, 'users', user.uid));  
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setName(userData.name); 
                }
            }
        };
        fetchUser();
    }, [user]);

    return (
        <div>
            <h1>Welcome, {name || 'Guest'}!</h1>
        </div>
    );
}
