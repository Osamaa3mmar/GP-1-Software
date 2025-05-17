import { Box, Grid } from '@mui/material'
import AcceptedInstractourCard from './AcceptedInstractourCard'

export default function InstructorsArea({getAll,instructors}) {
  return (
    <Box 
    sx={{
      marginTop:4
    }}
    >
      <Grid  container  spacing={2}>
      {instructors?.map((item, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
        <Box key={index} sx={{ mb: 2 }}>
          <AcceptedInstractourCard getAll={getAll} {...item} index={index} />
        </Box>
        </Grid>
      ))}
      </Grid>
    </Box>
  )
}
