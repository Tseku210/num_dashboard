import { Box } from "@mui/system";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

const Navbar = ({
  type,
  handleType,
  types,
  filteredData,
  filterSearchDataOnTitle,
  handleSearchVal,
}) => {
  return (
    <Box sx={{ width: "30%" }}>
      <FormControl fullWidth focused={false}>
        <InputLabel id="select-label">Төрөл</InputLabel>
        <Select
          labelId="select-label"
          id="select-select"
          value={type ?? ""}
          label="Төрөл"
          onChange={handleType}>
          {types.map((type, i) => (
            <MenuItem key={i} value={type ?? ""}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Navbar;
