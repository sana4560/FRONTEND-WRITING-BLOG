import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Categories({ value, onChange }) {
  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel
          id="demo-simple-select-standard-label"
          sx={{
            "&.Mui-focused": {
              color: "inherit", // Keep label color default when focused
            },
          }}
        >
          Categories
        </InputLabel>
        <Select
          value={value}
          onChange={onChange}
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          label="Categories"
          sx={{
            "&:before": {
              border: "none", // Remove underline before input
            },
            "&:after": {
              border: "none", // Remove underline after input
            },
            "&:hover:not(.Mui-disabled):before": {
              border: "none", // Remove underline before input on hover
            },
            "&.Mui-focused:before": {
              border: "none", // Remove underline when focused
            },
            "&.Mui-focused:after": {
              border: "2px solid orange", // Change outline color to orange on focus
            },
            border: "2px solid transparent", // Set default border color
            "&.MuiSelect-select": {
              border: "2px solid transparent", // Default border color
              "&:focus": {
                border: "2px solid orange", // Change border color on focus
              },
            },
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="BookReview">Comedy</MenuItem>
          <MenuItem value="Comedy">Comedy</MenuItem>
          <MenuItem value="Fiction">Fiction</MenuItem>
          <MenuItem value="Romance">Romance</MenuItem>
          <MenuItem value="Science">Science</MenuItem>
          <MenuItem value="Thriller">Thriller</MenuItem>
          <MenuItem value="Travel">Travel</MenuItem>
          <MenuItem value="Phsycology">Phsycology</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
