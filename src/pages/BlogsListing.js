import React from "react";
import PostList from "../Post/PostList";
import webbackground from "../assets/webbackground.png";
import Toolbar from "@mui/material/Toolbar";
import { Box } from "@mui/system";
import SearchBar from "../components/searchbar/SearchBar.js";

export default function BlogsListing() {
  return (
    <Box sx={{ margin: "20px", marginTop: "2px" }}>
      <SearchBar /> {/* Adjust this value if necessary */}
      <PostList />
    </Box>
  );
}
