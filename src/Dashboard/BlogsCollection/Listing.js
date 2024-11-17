import React, { useEffect, useState } from 'react';
import { useUsername } from '../../components/user';
import PostItem from '../../Post/PostItem'; // Ensure you import the PostItem component
import DeletePost from '../services/DeletePost';
import NotFoundAnimation from '../../assets/NotFoundAnimation.json'
import Lottie from 'lottie-react';
// Imports the Pacifico font if using a package like @fontsource

export default function Listing() {
    const { userId } = useUsername();

    const { usernameAccess } = useUsername();
    const [userPosts, setUserPosts] = useState([]); // State to store user posts
    const [loading, setLoading] = useState(true); // State to track loading
    const [error, setError] = useState(null); 

    const handleDeletePost = (postId) => {
        setUserPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    };

    useEffect(() => {
        const fetchUserPosts = async () => {
            setLoading(true); // Set loading to true before fetching
            setError(null); // Reset error state before fetching

            try {
                const response = await fetch(`http://localhost:8000/post/userpost/${userId}`); // Correct URL format
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUserPosts(data);
            } catch (error) {
                setError('Error fetching recent posts'); // Set error message
                console.error('Error fetching recent posts:', error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        if (userId) { // Check if userId is available before fetching
            fetchUserPosts();
        }
    }, [userId]); // Re-fetch when userId changes

    if (loading) {
        return <p>Loading...</p>; // Show loading state
    }

    if (error) {
        return <p>{error}</p>; // Show error message
    }

    return (
        <div>
        <h3 style={{
            textAlign: 'center', // Centers the text horizontally
            fontFamily: "'Pacifico', cursive",// Change font as needed
            fontSize: '24px', // Adjust font size if desired
            color: '#333', // Optional color change
            marginBottom: '20px',
            fontStyle:'Italic'// Space below the header
        }}>
            Blogs Collection
        </h3>
    
        {userPosts.length > 0 ? (
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: '20px',
                padding: '20px',
                margin: '0px', // Overwrites margin from padding if not needed
                alignItems: 'flex-start',
               
            }}>
                {userPosts.map((post) => (
                    <PostItem 
                        key={post._id}
                        post={post}
                        showDelete={post.userId === userId}
                        onDelete={handleDeletePost} 
                    />
                ))}
            </div>
        ) : (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '300px',
                    height: '300px',
                    zIndex: 9999,
                }}
            >
                <Lottie
                    animationData={NotFoundAnimation}
                    loop={true}
                    autoplay={true}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                    }}
                />
            </div>
        )}
    </div>
    );
}    