import React, { useEffect, useState } from "react";
import PostItem from "./PostItem"; // Ensure this is a valid component

const RecentPosts = () => {
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const response = await fetch(
          `${process.env.BASE_URL}/post/recentPosts`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setRecentPosts(data);
      } catch (error) {
        console.error("Error fetching recent posts:", error);
      }
    };

    fetchRecentPosts();
  }, []);

  return (
    <div>
      {recentPosts.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row", // Keep it in row
            flexWrap: "wrap", // Allow items to wrap to the next line
            gap: "20px",
            paddingTop: "10px",
            alignItems: "flex-start",

            margin: "0px",
          }}
        >
          {recentPosts.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <p>No recent posts found.</p>
      )}
    </div>
  );
};

export default RecentPosts;
