import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

export default function TF({control,name}) {
  return (
    <Box sx={{width:"100%"}}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Answer Options
        </Typography>
      <FormControl>
        <FormLabel>Correct Answer</FormLabel>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <RadioGroup {...field} row={false}>
              <FormControlLabel value="true" control={<Radio />} label="True" />
              <FormControlLabel value="false" control={<Radio />} label="False" />
            </RadioGroup>
          )}
        />
      </FormControl>
    </Box>
  )
}
