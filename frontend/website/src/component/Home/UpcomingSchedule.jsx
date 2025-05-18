import { Box, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import SpecialHeading from './SpecialHeading';

export default function UpcomingSchedule({ schedule }) {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <SpecialHeading>Upcoming Schedule</SpecialHeading>
        
        <TableContainer component={Paper} elevation={0} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Course</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Instructor</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Duration</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schedule.map(item => (
                <TableRow key={item.id} hover>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.instructor}</TableCell>
                  <TableCell>{item.company}</TableCell>
                  <TableCell>{item.duration}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}