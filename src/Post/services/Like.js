// like.js
export const sendLike = async (postId, userId) => {
  console.log("console.log poatId", postId);
  console.log("console.log poatId", userId);
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/post/like/${postId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }), // Send userId to track who liked the post
      }
    );

    if (!response.ok) {
      throw new Error("Failed to like the post");
    }

    const data = await response.json();
    return data; // Return response (like count, success message, etc.)
  } catch (error) {
    console.error("Error sending like:", error);
    throw error; // Rethrow error to handle in PostItem
  }
};
