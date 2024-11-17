// DeletePost.js
const DeletePost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:8000/post/deletepost/${postId}`, {
        method: 'POST', // Using POST method for deletion
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'delete' }), // Include any required info in the body if needed
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete the post');
      }
  
      const data = await response.json(); // Optionally get some response data if needed
      return data; // Return response data (e.g., success message)
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error; // Rethrow error to handle it where you call deletePost
    }
  };
  export default DeletePost;