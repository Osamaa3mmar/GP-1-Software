import {
  Box,
  createTheme,
  CssBaseline,
  IconButton,
  Step,
  StepLabel,
  Stepper,
  ThemeProvider,
  Typography,
  
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Form1 from './From1.jsx'
import { useState } from "react";
import Form2 from'./Form2/From2.jsx';
import EmailForm from "./EmailForm/EmailForm.jsx";
import { Link } from "react-router-dom";
const theme = createTheme({
  palette: {
    primary: {
      main: "#6366F1", // Indigo
      light: "#818CF8",
      dark: "#4F46E5",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#EC4899", // Pink
      light: "#F472B6",
      dark: "#DB2777",
      contrastText: "#ffffff",
    },
    background: {
      default: "#F9FAFB",
      paper: "#ffffff",
    },
    text: {
      primary: "#1F2937",
      secondary: "#6B7280",
    },
    divider: "#E5E7EB",
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 500,
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 20px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
          },
        },
        contained: {
          "&:hover": {
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#6366F1",
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
        },
      },
    },
  },
})
const steps = ["Account Details", "Account Type", "Verification"];
export default function SignupForm() {
  const [step, setStep] = useState(0);
  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <div className="  bg-white shadow-2xl w-[600px] p-14 rounded-xl flex flex-col gap-3">
      <IconButton sx={{alignSelf:"flex-start"}} component={Link } to={"/auth/login"}>

      <ArrowBackIcon sx={{fontSize:"30px"}}/>
      </IconButton>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={step} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      
      {step == 0 ? 
      <>
        <Box sx={{ mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          Create your account
        </Typography>
        <Typography color="text.secondary" variant="body2" sx={{ mb: 3 }}>
          Fill in your details to get started with our platform
        </Typography>
      </Box>
        <Form1 setStep={setStep}/>
        </> 
      
        : step==1?<Form2 setStep={setStep}/>:<EmailForm setStep={setStep}/>}
    </div>
    </ThemeProvider>
  );
}
