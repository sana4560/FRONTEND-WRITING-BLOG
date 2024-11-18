import React, { useState, useEffect } from "react";
import { Input, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSnackbar } from "../snackbar";
import { useSearchBar } from ".";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";

export default function SearchBar() {
  const { showSuccessSnackbar, showWarningSnackbar } = useSnackbar();
  const { searchQuery, doSearchQuery, resetSearchResult, showSearchResult } =
    useSearchBar();
  const [isSearched, setIsSearched] = useState(false);
  const navigate = useNavigate();

  // Debounced search function
  const debouncedSearch = debounce(async (query) => {
    if (query.trim() === "") return; // Avoid empty query searches
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/post/search`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ searchQuery: query }),
        }
      );

      const data = await response.json();
      if (!data || data.length === 0) {
        console.log("not found");
        showWarningSnackbar("Search not found");
        resetSearchResult(); // Optionally reset the results on not found
      } else {
        console.log("Search results:", data);
        showSearchResult(data); // Show the search results in context
        navigate("/blogs", { state: { searchResults: data } }); // Pass results to next page
      }
    } catch (error) {
      console.error("Error during search:", error);
      showWarningSnackbar("An error occurred while searching");
    }
  }, 300); // Debounce time in milliseconds

  // Handle search query change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    doSearchQuery(query); // Update context with the new search query
    debouncedSearch(query); // Trigger the debounced search
  };

  useEffect(() => {
    // Reset search results if search query is empty
    if (searchQuery.trim() === "") {
      resetSearchResult();
    }
  }, [searchQuery, resetSearchResult]);

  return (
    <div>
      <Input
        type="search"
        placeholder="Search here"
        value={searchQuery}
        onChange={handleSearchChange} // Trigger search on input change
        endAdornment={
          <InputAdornment position="start">
            <IconButton>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
        fullWidth
        disableUnderline
        sx={{
          borderRadius: "50px",
          border: "1px solid #ccc",
          padding: "8px",
          "&:focus": {
            borderColor: "#1976d2",
          },
        }}
      />
    </div>
  );
}
