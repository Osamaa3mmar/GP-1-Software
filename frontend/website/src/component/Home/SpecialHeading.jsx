import { Typography } from '@mui/material';
import { keyframes } from '@mui/system';

// Define animations
const fillLeft = keyframes`
  50%{
    left: 0;
    width: 12px;
    height: 12px;
  }
  100%{
    left: 0;
    border-radius: 0;
    width: 100%;
    height: 100%;
  }
`;

const fillRight = keyframes`
  50%{
    right: 0;
    width: 12px;
    height: 12px;
    /* top: 50%;
    transform: translateY(-50%); */
  }
  100%{
    right: 0;
    border-radius: 0;
    width: 100%;
    /* top: 0;
    transform: translateY(0); */
    height: 100%;
  }
`;

export default function SpecialHeading({ children }) {
  return (
    <Typography
      variant="h2"
      sx={{
        textTransform: 'uppercase',
        margin: '0 auto 40px',
        width: 'fit-content',
        padding: '10px 10px',
        border: '2px solid black',
        position: 'relative',
        transition: (theme) => theme.transitions.create(
          ['background-color', 'color', 'border-color'],
          { duration: 500 }
        ),
        fontSize: '30px',
        fontWeight: "bold",
        zIndex: 1,
        '&:hover': {
          backgroundColor: 'primary.main',
          color: 'white',
          borderColor: 'transparent',
          transitionDelay: 1000
        },
        '&::before, &::after': {
          content: '""',
          backgroundColor: 'primary.main',
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '12px',
          height: '12px',
          borderRadius: '50%'
        },
        '&::before': { left: '-30px' },
        '&::after': { right: '-30px' },
        '&:hover::before': {
          zIndex: -1,
          animation: `${fillLeft} 500ms linear forwards`
        },
        '&:hover::after': {
          zIndex: -1,
          animation: `${fillRight} 500ms linear forwards`
        }
      }}
    >
      {children}
    </Typography>
  );
}