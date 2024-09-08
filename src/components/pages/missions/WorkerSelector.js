import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function WorkerSelector() {
  const [avilUser, setAvailUser] = useState("");

  const handleChange = (event) => {
    setAvailUser(event.target.value);
  };

  return (
    <Box
      sx={{
        minWidth: 220,
        marginLeft: "auto",
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="available-users-select-label" sx={{ color: "white" }}>
          Available Users
        </InputLabel>
        <Select
          sx={{
            color: "white",
          }}
          labelId="available-users-select-label"
          id="available-users-select"
          value={avilUser}
          label="Available Users"
          onChange={handleChange}
        >
          <MenuItem value={0}>None</MenuItem>
          <MenuItem value={10}>User 1</MenuItem>
          <MenuItem value={20}>User 2</MenuItem>
          <MenuItem value={30}>User 3</MenuItem>
          <MenuItem value={40}>User 4</MenuItem>
          <MenuItem value={50}>User 5</MenuItem>
          <MenuItem value={60}>User 6</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
