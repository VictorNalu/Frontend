import React, { useState, useEffect } from 'react';
import '../styles/profilepage.css';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'; // Make sure to install jwt-decode

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [showPrompt, setShowPrompt] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login'); // Redirect to login if there's no token
                return;
            }

            const decodedToken = jwt_decode(token); // Decode the token to get the user ID
            const userId = decodedToken.identity; // Adjust based on your token structure

            try {
                const response = await fetch(`/users/${userId}`, { // Use the user ID to fetch user data
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const userData = await response.json();
                setUser(userData); // Set user data to state
            } catch (error) {
                console.error('Error fetching user data:', error);
                navigate('/login'); // Redirect to login on error
            }
        };

        fetchUserData();
    }, [navigate]); // Dependency array includes navigate to avoid warnings

    const handleEdit = () => {
        console.log("Edit profile clicked");
    };

    const handleDeletePrompt = () => {
        setShowPrompt(true); // Show the prompt when delete is clicked
    };

    const handleDelete = async () => {
        if (!user) return; // Make sure user is available

        try {
            const response = await fetch(`/users/${user.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });

            if (response.ok) {
                navigate('/'); // Redirect to landing page after deletion
            } else {
                console.error('Failed to delete account');
                // Handle error (optional)
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCancel = () => {
        setShowPrompt(false); // Close the prompt
    };

    if (!user) {
        return <div>Loading...</div>; // Loading state while fetching user data
    }

    return (
        <div className="profile-page">
            <header className="header">
                <h1>Welcome to GoPlan</h1>
            </header>
            <div className="profile-body">
                <div className="profile-icon">
                    <img src="/path/to/placeholder-icon.png" alt="Profile Icon" />
                </div>
                <div className="profile-info">
                    <h2>{user.first_name} {user.last_name}</h2>
                    <p>Email: {user.email}</p>
                </div>
                <div className="profile-buttons">
                    <button onClick={handleEdit}>Edit Profile</button>
                    <button onClick={handleDeletePrompt}>Delete Account</button>
                </div>
            </div>

            {showPrompt && (
                <div className="confirmation-prompt">
                    <p>Delete account?</p>
                    <button onClick={handleDelete}>Yes</button>
                    <button onClick={handleCancel}>No</button>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
