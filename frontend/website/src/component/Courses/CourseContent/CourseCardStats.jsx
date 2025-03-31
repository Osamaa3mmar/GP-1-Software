import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleIcon from "@mui/icons-material/People";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

export default function CourseCardStats() {
  const schedule = [
    { days: ["Sun", "Tue", "Thu"], time: "2:00 PM - 4:00 PM" },
    // Add more schedule entries as needed
  ];
  return (
    <Stack direction="column" spacing={1} sx={{ mb: 2 }}>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Chip
          icon={<AccessTimeIcon fontSize="small" />}
          label="8 weeks"
          variant="outlined"
          size="small"
        />
        <Chip
          icon={<PeopleIcon fontSize="small" />}
          label="1245 students"
          variant="outlined"
          size="small"
        />
      </Stack>
      <Stack spacing={1}>
        {schedule.map((session, index) => (
          <Chip
            key={index}
            label={`${session.days.join(", ")} | ${session.time}`}
            icon={<CalendarTodayIcon fontSize="small" />}
            variant="outlined"
            size="small"
            sx={{
              width: "fit-content",
              justifyContent: "flex-start",
              bgcolor: "background.paper",
              "& .MuiChip-label": { flexGrow: 1 },
            }}
          />
        ))}
      </Stack>
    </Stack>
  );
}
