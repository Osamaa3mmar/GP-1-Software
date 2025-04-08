import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';

export default function CourseCardHeader() {
  return (
    <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500]}} aria-label="instructor">
            JD
          </Avatar>
        }
        title="John Doe"
        subheader="Senior Web Developer"
        sx={{ p: 0 , mb: 2}}
      />
  );
}