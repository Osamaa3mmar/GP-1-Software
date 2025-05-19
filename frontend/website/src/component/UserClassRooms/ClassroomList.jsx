import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';

export const ClassroomList = ({ classrooms, selectedClassroom, onSelectClassroom }) => (
  <Paper sx={{ width: '100%', maxWidth: 360, p: 2 }}>
    <Typography variant="h6" gutterBottom>
      Your Classrooms
    </Typography>
    <List>
      {classrooms.map((classroom) => (
        <ListItem
          button
          key={classroom.id}
          selected={selectedClassroom === classroom.id}
          onClick={() => onSelectClassroom(classroom.id)}
        >
          <ListItemText
            primary={classroom.title}
            secondary={`${classroom.courseCode} - ${classroom.instructor}`}
          />
        </ListItem>
      ))}
    </List>
  </Paper>
);