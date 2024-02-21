import { useState, ChangeEvent } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

interface SearchBarProps {
  setSearchQuery: (query: string) => void;
}
const SearchBar: React.FC<SearchBarProps> = ({ setSearchQuery }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        id="search-bar"
        onInput={handleInputChange}
        label="Enter a name to search"
        variant="outlined"
        placeholder="Search..."
        size="small"
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon style={{ fill: "blue" }} />
      </IconButton>
    </div>
  );
};

export default SearchBar;
