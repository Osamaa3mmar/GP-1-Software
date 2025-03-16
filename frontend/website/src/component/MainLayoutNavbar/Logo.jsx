import { Stack, Typography } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";

export default function Logo() {
  return (
    <Stack sx={{ alignItems: "center" }} direction={"row"} spacing={1}>
    <SchoolIcon color="primary" sx={{ fontSize: "26px" }} />
    <Typography
      variant=""
      color="primary"
      sx={{ fontSize: "20px", fontWeight: "700" }}
    >
      EduAcademy
    </Typography>
  </Stack>
  )
}
