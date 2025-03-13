import { Business, Person, School } from "@mui/icons-material";
import { Avatar, Box, Card, FormControlLabel, Radio, Typography } from "@mui/material";

export default function ChoiseCard({value,change,i}) {
    const values=[{
        value:'user',
        label:'Student',
        icon:<School/>,
        description:"Access courses and learning materials",
        color:"primary.light"

    },
    
    {
        value:'owner',
        label:'Academy/Company',
        icon:<Business />,
        description:"Manage educational programs and resources",
        color:"secondary.light"

    },{
        value:'tech',
        label:'Teacher',
        icon:<Person />,
        description:"Create courses and teach students",
        color:"primary.dark"

    },]
  return (
    <Card
    
    variant="outlined"
    sx={{
      mb: 2,
      borderColor: value === values[i].value ? "primary.main" : "divider",
      borderWidth: value === values[i].value ? 2 : 1,
      transition: "all 0.2s ease-in-out",
      "&:hover": {
        borderColor: "primary.light",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
      },
    }}
    
  >
    <FormControlLabel
      value={values[i].value}
      control={<Radio />}
      onClick={change}
      sx={{
        width: "100%",
        m: 0,
        p: 2,
        "& .MuiFormControlLabel-label": { width: "100%" },
      }}
      label={
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar sx={{ bgcolor: values[i].color, mr: 2 }}>
            {values[i].icon}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight={500}>
              {values[i].label}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {values[i].description}
            </Typography>
          </Box>
        </Box>
      }
    />
  </Card>
  )
}
