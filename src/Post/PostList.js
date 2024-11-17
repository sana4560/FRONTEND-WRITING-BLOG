import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import { useSearchBar } from "../components/searchbar";
import CustomizedPagination from "../components/pagination/CustomizedPagination";
import { usePostCount } from "../components/pagination";
import Lottie from "lottie-react"; // Import Lottie for React
import NotFoundAnimation from "../assets/NotFoundAnimation.json";

const PostList = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [currentPosts, setCurrentPosts] = useState([]);
  const { searchResult, searchQuery } = useSearchBar();
  const { postCount } = usePostCount();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 25;

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${process.env.BASE_URL}/post/AllPosts`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setAllPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);
    setCurrentPosts(currentPosts);
  }, [currentPage, allPosts]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const displayPosts = () => {
    if (searchQuery.trim() === "") {
      // If search query is empty, show current posts
      return currentPosts;
    } else {
      // If search query is not empty, show search results or empty array if no results
      if (searchResult && searchResult.length > 0) {
        return searchResult;
      } else {
        return []; // Return an empty array if no search results
      }
    }
  };

  const postsToDisplay = displayPosts();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "20px",
          paddingTop: "10px",
          alignItems: "flex-start",
        }}
      >
        {postsToDisplay.length > 0 ? (
          postsToDisplay.map((post) => <PostItem key={post._id} post={post} />)
        ) : (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              padding: "20px",
            }}
          >
            <Lottie
              animationData={NotFoundAnimation}
              loop={true}
              style={{ width: "200px", height: "200px" }}
            />
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px 0",
        }}
      >
        <CustomizedPagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default PostList;
