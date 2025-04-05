import { Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function Search() {
  return (
    <Box
    sx={{
      flexGrow: 1,
      maxWidth:"30%",
      padding: "8px 10px",
      borderRadius: "100px",
      display: "flex",
      alignItems: "center",
      gap: "4px",
      bgcolor: "#ebebeb",
      "&:hover": { bgcolor: "#e7e7e7" },
    }}
  >
    <SearchIcon sx={{ color: "#6b7280" }} />
    <InputBase
      sx={{ flexGrow: 1 }}
      placeholder="Search courses, resources..."
    />
  </Box>
  )
}
