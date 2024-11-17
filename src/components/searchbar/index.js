import { createContext, useContext, useState } from "react";
// Adjust the path as necessary

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState('');
    const [hasSearchedData, setHasSearchedData] = useState(false);


    const doSearchQuery = (search) => {
        setSearchQuery(search);
    };
    const showSearchResult = (data) => {
        setHasSearchedData(true);
        setSearchResult(data);
    };
    const resetSearchResult = (data) => {
        setHasSearchedData(false);
        setSearchResult('');
    };

    return (
        <SearchContext.Provider value={{ searchQuery, doSearchQuery,showSearchResult, searchResult, setSearchResult,hasSearchedData,resetSearchResult}}>
           {/* Render the SearchBar here */}
            {children} {/* Render any children components */}
        </SearchContext.Provider>
    );
};

// Custom hook for using the Search context
export const useSearchBar = () => useContext(SearchContext);
