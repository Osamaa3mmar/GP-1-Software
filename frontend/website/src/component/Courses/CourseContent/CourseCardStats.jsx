import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleIcon from "@mui/icons-material/People";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

export default function CourseCardStats({ duration, enrollmentNumber , schedule }) {
  const scheduleTest = [
    { days: ["Sun", "Tue", "Thu"], time: "2:00 PM - 4:00 PM" },
    // Add more schedule entries as needed
  ];
  const groupedSchedules = schedule?.reduce((acc, session) => {
  const timeKey = `${session.startTime}-${session.endTime}`;
  if (!acc[timeKey]) {
    acc[timeKey] = { 
      days: [], 
      time: `${session.startTime} - ${session.endTime}` 
    };
  }
  acc[timeKey].days.push(session.day);
  return acc;
}, {});

const scheduleGroups = Object.values(groupedSchedules);
  return (
     <Stack direction="column" spacing={1} sx={{ mb: 2 }}>
      <Stack direction="row" spacing={1}>
        <Chip
          icon={<AccessTimeIcon fontSize="small" />}
          label={`${duration || 0} weeks`}
          variant="outlined"
          size="small"
        />
        <Chip
          icon={<PeopleIcon fontSize="small" />}
          label={`${enrollmentNumber || 0} students`}
          variant="outlined"
          size="small"
        />
      </Stack>
      {scheduleGroups.length > 0 && (
        <Stack spacing={1}>
          {scheduleGroups.map((session, index) => (
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
      )}
    </Stack>
  );
}
